//! PullPay Reward Escrow — Soroban smart contract.
//!
//! Locks USDC (any SEP-41 token) against a GitHub issue; a designated oracle
//! releases funds to the contributor after off-chain merge verification;
//! deadline expiry enables a permissionless refund to the maintainer.
//!
//! Security invariants (see docs/TECH-DESIGN.md §3.4):
//! 1. Escrow can only flow to the contributor recorded at `release`, or back
//!    to the original maintainer. No other destination exists in code.
//! 2. `release` after the deadline panics — the oracle cannot race a refund.
//! 3. Every transition is status-gated: double settlement is impossible.
//! 4. Re-initialization is blocked; oracle rotation never touches funds.

#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env,
    String,
};

pub const MAX_TIMELOCK_SECS: u64 = 259_200; // 72 hours
pub const MIN_DEADLINE_LEAD_SECS: u64 = 3_600; // deadline must be >= now + 1h
pub const REWARD_TTL_EXTEND: u32 = 535_680; // ~31 days of ledgers (5s each)
pub const REWARD_TTL_THRESHOLD: u32 = 172_800; // ~10 days

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    InvalidAmount = 3,
    InvalidDeadline = 4,
    InvalidTimelock = 5,
    RewardNotFound = 6,
    AlreadySettled = 7,
    DeadlinePassed = 8,
    DeadlineNotPassed = 9,
    NotReleasable = 10,
    TimelockActive = 11,
    TimelockExpired = 12,
    Unauthorized = 13,
}

#[contracttype]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum RewardStatus {
    Funded,
    Releasable,
    Released,
    Refunded,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Reward {
    pub maintainer: Address,
    pub repo: String,
    pub issue_number: u32,
    pub amount: i128,
    pub deadline: u64,
    pub timelock_secs: u64,
    pub status: RewardStatus,
    pub contributor: Option<Address>,
    pub pr_number: Option<u32>,
    pub releasable_at: Option<u64>,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    Oracle,
    Token,
    NextId,
    Reward(u64),
}

fn get_reward(env: &Env, id: u64) -> Result<Reward, Error> {
    env.storage()
        .persistent()
        .get(&DataKey::Reward(id))
        .ok_or(Error::RewardNotFound)
}

fn put_reward(env: &Env, id: u64, reward: &Reward) {
    let key = DataKey::Reward(id);
    env.storage().persistent().set(&key, reward);
    env.storage()
        .persistent()
        .extend_ttl(&key, REWARD_TTL_THRESHOLD, REWARD_TTL_EXTEND);
}

fn token_client(env: &Env) -> token::Client<'_> {
    let token_addr: Address = env
        .storage()
        .instance()
        .get(&DataKey::Token)
        .expect("not initialized");
    token::Client::new(env, &token_addr)
}

fn oracle(env: &Env) -> Address {
    env.storage()
        .instance()
        .get(&DataKey::Oracle)
        .expect("not initialized")
}

#[contract]
pub struct RewardEscrow;

#[contractimpl]
impl RewardEscrow {
    /// One-time configuration. `admin` may only rotate the oracle key;
    /// `oracle` is the only address allowed to call `release`;
    /// `token` is the SEP-41 (SAC) contract for USDC.
    pub fn initialize(env: Env, admin: Address, oracle: Address, token: Address) -> Result<(), Error> {
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(Error::AlreadyInitialized);
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Oracle, &oracle);
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::NextId, &0u64);
        Ok(())
    }

    /// Create a reward and atomically lock `amount` of the escrow token.
    /// Returns the reward id.
    pub fn create_reward(
        env: Env,
        maintainer: Address,
        repo: String,
        issue_number: u32,
        amount: i128,
        deadline: u64,
        timelock_secs: u64,
    ) -> Result<u64, Error> {
        if !env.storage().instance().has(&DataKey::Admin) {
            return Err(Error::NotInitialized);
        }
        maintainer.require_auth();

        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        let now = env.ledger().timestamp();
        if deadline < now + MIN_DEADLINE_LEAD_SECS {
            return Err(Error::InvalidDeadline);
        }
        if timelock_secs > MAX_TIMELOCK_SECS {
            return Err(Error::InvalidTimelock);
        }

        // Atomic deposit: panics (reverting everything) if balance/trustline insufficient.
        token_client(&env).transfer(&maintainer, &env.current_contract_address(), &amount);

        let id: u64 = env.storage().instance().get(&DataKey::NextId).unwrap_or(0);
        env.storage().instance().set(&DataKey::NextId, &(id + 1));

        let reward = Reward {
            maintainer: maintainer.clone(),
            repo,
            issue_number,
            amount,
            deadline,
            timelock_secs,
            status: RewardStatus::Funded,
            contributor: None,
            pr_number: None,
            releasable_at: None,
        };
        put_reward(&env, id, &reward);

        env.events()
            .publish((symbol_short!("created"), id), (maintainer, amount, deadline));
        Ok(id)
    }

    /// Oracle-only. Records the verified contributor and either pays out
    /// immediately (timelock == 0) or opens the dispute window.
    pub fn release(
        env: Env,
        id: u64,
        contributor: Address,
        pr_number: u32,
    ) -> Result<(), Error> {
        oracle(&env).require_auth();

        let mut reward = get_reward(&env, id)?;
        if reward.status != RewardStatus::Funded {
            return Err(Error::AlreadySettled);
        }
        let now = env.ledger().timestamp();
        if now > reward.deadline {
            return Err(Error::DeadlinePassed);
        }

        reward.contributor = Some(contributor.clone());
        reward.pr_number = Some(pr_number);

        if reward.timelock_secs == 0 {
            reward.status = RewardStatus::Released;
            put_reward(&env, id, &reward);
            token_client(&env).transfer(
                &env.current_contract_address(),
                &contributor,
                &reward.amount,
            );
            env.events()
                .publish((symbol_short!("released"), id), (contributor, reward.amount));
        } else {
            let releasable_at = now + reward.timelock_secs;
            reward.status = RewardStatus::Releasable;
            reward.releasable_at = Some(releasable_at);
            put_reward(&env, id, &reward);
            env.events()
                .publish((symbol_short!("rlsable"), id), (contributor, releasable_at));
        }
        Ok(())
    }

    /// Permissionless. Completes a timelocked release once the window closed.
    pub fn finalize(env: Env, id: u64) -> Result<(), Error> {
        let mut reward = get_reward(&env, id)?;
        if reward.status != RewardStatus::Releasable {
            return Err(Error::NotReleasable);
        }
        let releasable_at = reward.releasable_at.ok_or(Error::NotReleasable)?;
        if env.ledger().timestamp() < releasable_at {
            return Err(Error::TimelockActive);
        }
        let contributor = reward.contributor.clone().ok_or(Error::NotReleasable)?;

        reward.status = RewardStatus::Released;
        put_reward(&env, id, &reward);
        token_client(&env).transfer(
            &env.current_contract_address(),
            &contributor,
            &reward.amount,
        );
        env.events()
            .publish((symbol_short!("released"), id), (contributor, reward.amount));
        Ok(())
    }

    /// Maintainer-only, inside the timelock window: revert a pending release
    /// back to escrow (funds return to Funded state, NOT to the maintainer wallet).
    pub fn dispute(env: Env, id: u64) -> Result<(), Error> {
        let mut reward = get_reward(&env, id)?;
        reward.maintainer.require_auth();

        if reward.status != RewardStatus::Releasable {
            return Err(Error::NotReleasable);
        }
        let releasable_at = reward.releasable_at.ok_or(Error::NotReleasable)?;
        if env.ledger().timestamp() >= releasable_at {
            return Err(Error::TimelockExpired);
        }

        reward.status = RewardStatus::Funded;
        reward.contributor = None;
        reward.pr_number = None;
        reward.releasable_at = None;
        put_reward(&env, id, &reward);
        env.events().publish((symbol_short!("disputed"), id), ());
        Ok(())
    }

    /// Permissionless after the deadline: return escrow to the maintainer.
    pub fn refund(env: Env, id: u64) -> Result<(), Error> {
        let mut reward = get_reward(&env, id)?;
        if reward.status != RewardStatus::Funded {
            return Err(Error::AlreadySettled);
        }
        if env.ledger().timestamp() <= reward.deadline {
            return Err(Error::DeadlineNotPassed);
        }

        reward.status = RewardStatus::Refunded;
        put_reward(&env, id, &reward);
        token_client(&env).transfer(
            &env.current_contract_address(),
            &reward.maintainer,
            &reward.amount,
        );
        env.events()
            .publish((symbol_short!("refunded"), id), (reward.maintainer.clone(), reward.amount));
        Ok(())
    }

    /// Maintainer-only: push the deadline further out (never earlier).
    pub fn extend_deadline(env: Env, id: u64, new_deadline: u64) -> Result<(), Error> {
        let mut reward = get_reward(&env, id)?;
        reward.maintainer.require_auth();

        if reward.status != RewardStatus::Funded {
            return Err(Error::AlreadySettled);
        }
        if new_deadline <= reward.deadline {
            return Err(Error::InvalidDeadline);
        }
        reward.deadline = new_deadline;
        put_reward(&env, id, &reward);
        env.events()
            .publish((symbol_short!("extended"), id), new_deadline);
        Ok(())
    }

    /// Admin-only oracle key rotation. Cannot touch escrowed funds.
    pub fn set_oracle(env: Env, new_oracle: Address) -> Result<(), Error> {
        let admin: Address = env
            .storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(Error::NotInitialized)?;
        admin.require_auth();
        env.storage().instance().set(&DataKey::Oracle, &new_oracle);
        env.events().publish((symbol_short!("oracle"),), new_oracle);
        Ok(())
    }

    // ---- Read-only ----

    pub fn get_reward(env: Env, id: u64) -> Result<Reward, Error> {
        get_reward(&env, id)
    }

    pub fn get_config(env: Env) -> (Address, Address, Address, u64) {
        (
            env.storage().instance().get(&DataKey::Admin).unwrap(),
            env.storage().instance().get(&DataKey::Oracle).unwrap(),
            env.storage().instance().get(&DataKey::Token).unwrap(),
            env.storage().instance().get(&DataKey::NextId).unwrap_or(0),
        )
    }
}

#[cfg(test)]
mod test;
