#![cfg(test)]

use super::*;
use soroban_sdk::testutils::{Address as _, Ledger};
use soroban_sdk::{token::StellarAssetClient, Address, Env, String};

const DAY: u64 = 86_400;

struct Setup {
    env: Env,
    contract: RewardEscrowClient<'static>,
    token: StellarAssetClient<'static>,
    token_client: token::Client<'static>,
    admin: Address,
    oracle: Address,
    maintainer: Address,
    contributor: Address,
}

fn setup() -> Setup {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().with_mut(|l| l.timestamp = 1_000_000);

    let admin = Address::generate(&env);
    let oracle = Address::generate(&env);
    let maintainer = Address::generate(&env);
    let contributor = Address::generate(&env);

    let issuer = Address::generate(&env);
    let sac = env.register_stellar_asset_contract_v2(issuer.clone());
    let token = StellarAssetClient::new(&env, &sac.address());
    let token_client = token::Client::new(&env, &sac.address());
    token.mint(&maintainer, &1_000_0000000); // 1,000 USDC (7 dp)

    let contract_id = env.register(RewardEscrow, ());
    let contract = RewardEscrowClient::new(&env, &contract_id);
    contract.initialize(&admin, &oracle, &sac.address());

    Setup { env, contract, token, token_client, admin, oracle, maintainer, contributor }
}

fn repo(env: &Env) -> String {
    String::from_str(env, "altruisoft/pullpay")
}

fn create(s: &Setup, amount: i128, timelock: u64) -> u64 {
    let deadline = s.env.ledger().timestamp() + 30 * DAY;
    s.contract
        .create_reward(&s.maintainer, &repo(&s.env), &42u32, &amount, &deadline, &timelock)
}

// ---- Initialization ----

#[test]
fn test_initialize_once_only() {
    let s = setup();
    let res = s.contract.try_initialize(&s.admin, &s.oracle, &s.token.address);
    assert_eq!(res, Err(Ok(Error::AlreadyInitialized)));
}

// ---- Create ----

#[test]
fn test_create_locks_funds() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    assert_eq!(id, 0);
    assert_eq!(s.token_client.balance(&s.contract.address), 20_0000000);
    assert_eq!(s.token_client.balance(&s.maintainer), 980_0000000);

    let r = s.contract.get_reward(&id);
    assert_eq!(r.status, RewardStatus::Funded);
    assert_eq!(r.amount, 20_0000000);
    assert_eq!(r.contributor, None);
}

#[test]
fn test_create_rejects_zero_amount() {
    let s = setup();
    let deadline = s.env.ledger().timestamp() + 30 * DAY;
    let res = s.contract.try_create_reward(
        &s.maintainer, &repo(&s.env), &42u32, &0i128, &deadline, &0u64,
    );
    assert_eq!(res, Err(Ok(Error::InvalidAmount)));
}

#[test]
fn test_create_rejects_negative_amount() {
    let s = setup();
    let deadline = s.env.ledger().timestamp() + 30 * DAY;
    let res = s.contract.try_create_reward(
        &s.maintainer, &repo(&s.env), &42u32, &(-5i128), &deadline, &0u64,
    );
    assert_eq!(res, Err(Ok(Error::InvalidAmount)));
}

#[test]
fn test_create_rejects_near_deadline() {
    let s = setup();
    let deadline = s.env.ledger().timestamp() + 60; // < 1h lead
    let res = s.contract.try_create_reward(
        &s.maintainer, &repo(&s.env), &42u32, &10_0000000i128, &deadline, &0u64,
    );
    assert_eq!(res, Err(Ok(Error::InvalidDeadline)));
}

#[test]
fn test_create_rejects_excessive_timelock() {
    let s = setup();
    let deadline = s.env.ledger().timestamp() + 30 * DAY;
    let res = s.contract.try_create_reward(
        &s.maintainer, &repo(&s.env), &42u32, &10_0000000i128, &deadline,
        &(MAX_TIMELOCK_SECS + 1),
    );
    assert_eq!(res, Err(Ok(Error::InvalidTimelock)));
}

#[test]
fn test_ids_increment() {
    let s = setup();
    assert_eq!(create(&s, 10_0000000, 0), 0);
    assert_eq!(create(&s, 10_0000000, 0), 1);
    assert_eq!(create(&s, 10_0000000, 0), 2);
}

// ---- Release: happy paths ----

#[test]
fn test_release_no_timelock_pays_immediately() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    s.contract.release(&id, &s.contributor, &101u32);

    assert_eq!(s.token_client.balance(&s.contributor), 20_0000000);
    assert_eq!(s.token_client.balance(&s.contract.address), 0);
    let r = s.contract.get_reward(&id);
    assert_eq!(r.status, RewardStatus::Released);
    assert_eq!(r.contributor, Some(s.contributor.clone()));
    assert_eq!(r.pr_number, Some(101));
}

#[test]
fn test_release_with_timelock_holds_then_finalizes() {
    let s = setup();
    let id = create(&s, 20_0000000, DAY); // 24h timelock
    s.contract.release(&id, &s.contributor, &101u32);

    // Held: no transfer yet.
    assert_eq!(s.token_client.balance(&s.contributor), 0);
    let r = s.contract.get_reward(&id);
    assert_eq!(r.status, RewardStatus::Releasable);
    assert_eq!(r.releasable_at, Some(1_000_000 + DAY));

    // finalize() before window closes must fail.
    let early = s.contract.try_finalize(&id);
    assert_eq!(early, Err(Ok(Error::TimelockActive)));

    // After the window: anyone finalizes.
    s.env.ledger().with_mut(|l| l.timestamp += DAY + 1);
    s.contract.finalize(&id);
    assert_eq!(s.token_client.balance(&s.contributor), 20_0000000);
    assert_eq!(s.contract.get_reward(&id).status, RewardStatus::Released);
}

// ---- Release: adversarial ----

#[test]
fn test_release_after_deadline_panics() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    s.env.ledger().with_mut(|l| l.timestamp += 31 * DAY);
    let res = s.contract.try_release(&id, &s.contributor, &101u32);
    assert_eq!(res, Err(Ok(Error::DeadlinePassed)));
}

#[test]
fn test_double_release_impossible() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    s.contract.release(&id, &s.contributor, &101u32);
    let res = s.contract.try_release(&id, &s.contributor, &101u32);
    assert_eq!(res, Err(Ok(Error::AlreadySettled)));
}

#[test]
fn test_release_unknown_reward() {
    let s = setup();
    let res = s.contract.try_release(&999u64, &s.contributor, &1u32);
    assert_eq!(res, Err(Ok(Error::RewardNotFound)));
}

// ---- Dispute ----

#[test]
fn test_dispute_within_window_reverts_to_funded() {
    let s = setup();
    let id = create(&s, 20_0000000, DAY);
    s.contract.release(&id, &s.contributor, &101u32);
    s.contract.dispute(&id);

    let r = s.contract.get_reward(&id);
    assert_eq!(r.status, RewardStatus::Funded);
    assert_eq!(r.contributor, None);
    assert_eq!(r.releasable_at, None);
    // Funds stayed in escrow — not returned to maintainer.
    assert_eq!(s.token_client.balance(&s.contract.address), 20_0000000);

    // Oracle can re-release after a corrected verification.
    let other = Address::generate(&s.env);
    s.contract.release(&id, &other, &102u32);
    assert_eq!(s.contract.get_reward(&id).status, RewardStatus::Releasable);
}

#[test]
fn test_dispute_after_window_fails() {
    let s = setup();
    let id = create(&s, 20_0000000, DAY);
    s.contract.release(&id, &s.contributor, &101u32);
    s.env.ledger().with_mut(|l| l.timestamp += DAY + 1);
    let res = s.contract.try_dispute(&id);
    assert_eq!(res, Err(Ok(Error::TimelockExpired)));
}

// ---- Refund ----

#[test]
fn test_refund_after_deadline() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    s.env.ledger().with_mut(|l| l.timestamp += 31 * DAY);
    s.contract.refund(&id);
    assert_eq!(s.token_client.balance(&s.maintainer), 1_000_0000000);
    assert_eq!(s.contract.get_reward(&id).status, RewardStatus::Refunded);
}

#[test]
fn test_refund_before_deadline_fails() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    let res = s.contract.try_refund(&id);
    assert_eq!(res, Err(Ok(Error::DeadlineNotPassed)));
}

#[test]
fn test_refund_of_released_reward_fails() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    s.contract.release(&id, &s.contributor, &101u32);
    s.env.ledger().with_mut(|l| l.timestamp += 31 * DAY);
    let res = s.contract.try_refund(&id);
    assert_eq!(res, Err(Ok(Error::AlreadySettled)));
}

#[test]
fn test_releasable_cannot_be_refunded() {
    // Contributor protection: verified work past deadline still settles.
    let s = setup();
    let id = create(&s, 20_0000000, DAY);
    s.contract.release(&id, &s.contributor, &101u32);
    s.env.ledger().with_mut(|l| l.timestamp += 40 * DAY);
    let res = s.contract.try_refund(&id);
    assert_eq!(res, Err(Ok(Error::AlreadySettled)));
    // finalize still works.
    s.contract.finalize(&id);
    assert_eq!(s.token_client.balance(&s.contributor), 20_0000000);
}

// ---- Extend ----

#[test]
fn test_extend_deadline() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    let new_deadline = s.env.ledger().timestamp() + 60 * DAY;
    s.contract.extend_deadline(&id, &new_deadline);
    assert_eq!(s.contract.get_reward(&id).deadline, new_deadline);
}

#[test]
fn test_extend_cannot_shorten() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    let earlier = s.env.ledger().timestamp() + 1 * DAY;
    let res = s.contract.try_extend_deadline(&id, &earlier);
    assert_eq!(res, Err(Ok(Error::InvalidDeadline)));
}

// ---- Oracle rotation ----

#[test]
fn test_set_oracle_rotates_key() {
    let s = setup();
    let id = create(&s, 20_0000000, 0);
    let new_oracle = Address::generate(&s.env);
    s.contract.set_oracle(&new_oracle);
    let (_, oracle, _, _) = s.contract.get_config();
    assert_eq!(oracle, new_oracle);
    // Existing reward still releasable under the new oracle (mock auth).
    s.contract.release(&id, &s.contributor, &101u32);
    assert_eq!(s.contract.get_reward(&id).status, RewardStatus::Released);
}

// ---- Auth enforcement (non-mocked) ----

#[test]
#[should_panic]
fn test_release_requires_oracle_auth() {
    let env = Env::default();
    env.ledger().with_mut(|l| l.timestamp = 1_000_000);
    let admin = Address::generate(&env);
    let oracle = Address::generate(&env);
    let maintainer = Address::generate(&env);
    let contributor = Address::generate(&env);

    let issuer = Address::generate(&env);
    let sac = env.register_stellar_asset_contract_v2(issuer);
    let token = StellarAssetClient::new(&env, &sac.address());

    let contract_id = env.register(RewardEscrow, ());
    let contract = RewardEscrowClient::new(&env, &contract_id);

    // Mock auths only for setup calls, then drop mocking for release.
    env.mock_all_auths();
    contract.initialize(&admin, &oracle, &sac.address());
    token.mint(&maintainer, &100_0000000);
    let deadline = env.ledger().timestamp() + 30 * DAY;
    let id = contract.create_reward(
        &maintainer,
        &String::from_str(&env, "altruisoft/pullpay"),
        &42u32,
        &20_0000000i128,
        &deadline,
        &0u64,
    );

    env.set_auths(&[]); // no authorization provided
    contract.release(&id, &contributor, &101u32); // must panic
}
