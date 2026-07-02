/**
 * Soroban interaction: read reward state and invoke `release`.
 *
 * The oracle key held here is least-privilege by contract design: `release`
 * can only pay the PR-author-verified claimant; escrow cannot be redirected.
 * Uses the browser-safe minimal entrypoint (no Node-only deps) so the SDK
 * runs inside Workers.
 */
import {
	Address,
	Contract,
	Keypair,
	StrKey,
	TransactionBuilder,
	nativeToScVal,
	scValToNative,
	rpc
} from '@stellar/stellar-sdk/minimal';

export interface StellarEnv {
	NETWORK_PASSPHRASE: string;
	SOROBAN_RPC_URL: string;
	CONTRACT_ID: string;
	ORACLE_SECRET: string;
}

export interface RewardView {
	id: number;
	maintainer: string;
	repo: string;
	issue_number: number;
	amount: string; // i128 as string
	deadline: number;
	timelock_secs: number;
	status: 'Funded' | 'Releasable' | 'Released' | 'Refunded';
	contributor: string | null;
	pr_number: number | null;
	releasable_at: number | null;
}

export function isValidStellarAddress(addr: string): boolean {
	return StrKey.isValidEd25519PublicKey(addr);
}

function server(env: StellarEnv): rpc.Server {
	return new rpc.Server(env.SOROBAN_RPC_URL);
}

/** Read-only contract call via transaction simulation (free, keyless). */
async function simulateCall<T>(env: StellarEnv, method: string, args: import('@stellar/stellar-sdk/minimal').xdr.ScVal[]): Promise<T> {
	const s = server(env);
	const oracle = Keypair.fromSecret(env.ORACLE_SECRET);
	const account = await s.getAccount(oracle.publicKey());
	const contract = new Contract(env.CONTRACT_ID);

	const tx = new TransactionBuilder(account, {
		fee: '100',
		networkPassphrase: env.NETWORK_PASSPHRASE
	})
		.addOperation(contract.call(method, ...args))
		.setTimeout(30)
		.build();

	const sim = await s.simulateTransaction(tx);
	if (!rpc.Api.isSimulationSuccess(sim) || !sim.result?.retval) {
		throw new Error(`Simulation of ${method} failed`);
	}
	return scValToNative(sim.result.retval) as T;
}

export async function getReward(env: StellarEnv, id: number): Promise<RewardView> {
	const raw = await simulateCall<Record<string, unknown>>(env, 'get_reward', [
		nativeToScVal(BigInt(id), { type: 'u64' })
	]);
	return normalizeReward(id, raw);
}

export async function getNextId(env: StellarEnv): Promise<number> {
	const cfg = await simulateCall<unknown[]>(env, 'get_config', []);
	return Number(cfg[3]);
}

function normalizeReward(id: number, raw: Record<string, unknown>): RewardView {
	const statusRaw = raw['status'];
	const status = (Array.isArray(statusRaw) ? statusRaw[0] : statusRaw) as RewardView['status'];
	return {
		id,
		maintainer: String(raw['maintainer']),
		repo: String(raw['repo']),
		issue_number: Number(raw['issue_number']),
		amount: String(raw['amount']),
		deadline: Number(raw['deadline']),
		timelock_secs: Number(raw['timelock_secs']),
		status,
		contributor: raw['contributor'] ? String(raw['contributor']) : null,
		pr_number: raw['pr_number'] != null ? Number(raw['pr_number']) : null,
		releasable_at: raw['releasable_at'] != null ? Number(raw['releasable_at']) : null
	};
}

/** Find Funded rewards for a repo + issue set by scanning ids (sprint-scale volume). */
export async function findFundedRewards(
	env: StellarEnv,
	repo: string,
	issueNumbers: number[]
): Promise<RewardView[]> {
	const next = await getNextId(env);
	const out: RewardView[] = [];
	for (let id = 0; id < next; id++) {
		try {
			const r = await getReward(env, id);
			if (
				r.status === 'Funded' &&
				r.repo.toLowerCase() === repo.toLowerCase() &&
				issueNumbers.includes(r.issue_number)
			) {
				out.push(r);
			}
		} catch {
			// expired/archived entry — skip
		}
	}
	return out;
}

/** Sign and submit `release(id, contributor, pr_number)` with the oracle key. */
export async function submitRelease(
	env: StellarEnv,
	id: number,
	contributor: string,
	prNumber: number
): Promise<string> {
	const s = server(env);
	const oracle = Keypair.fromSecret(env.ORACLE_SECRET);
	const account = await s.getAccount(oracle.publicKey());
	const contract = new Contract(env.CONTRACT_ID);

	const tx = new TransactionBuilder(account, {
		fee: '10000',
		networkPassphrase: env.NETWORK_PASSPHRASE
	})
		.addOperation(
			contract.call(
				'release',
				nativeToScVal(BigInt(id), { type: 'u64' }),
				new Address(contributor).toScVal(),
				nativeToScVal(prNumber, { type: 'u32' })
			)
		)
		.setTimeout(60)
		.build();

	const prepared = await s.prepareTransaction(tx);
	prepared.sign(oracle);
	const send = await s.sendTransaction(prepared);
	if (send.status === 'ERROR') {
		throw new Error(`release() submit failed: ${JSON.stringify(send.errorResult)}`);
	}

	// Poll for confirmation (finality ~5s).
	for (let i = 0; i < 12; i++) {
		await new Promise((r) => setTimeout(r, 1500));
		const res = await s.getTransaction(send.hash);
		if (res.status === 'SUCCESS') return send.hash;
		if (res.status === 'FAILED') {
			throw new Error(`release() failed on-chain: ${send.hash}`);
		}
	}
	throw new Error(`release() confirmation timeout: ${send.hash}`);
}

/** Check whether an account holds a trustline for the escrow token. */
export async function hasUsdcTrustline(
	horizonUrl: string,
	account: string,
	assetCode: string,
	assetIssuer: string
): Promise<boolean> {
	const res = await fetch(`${horizonUrl}/accounts/${account}`, {
		headers: { Accept: 'application/json' }
	});
	if (res.status === 404) return false; // unfunded account
	if (!res.ok) throw new Error(`Horizon error ${res.status}`);
	const data = (await res.json()) as {
		balances: Array<{ asset_code?: string; asset_issuer?: string }>;
	};
	return data.balances.some(
		(b) => b.asset_code === assetCode && b.asset_issuer === assetIssuer
	);
}
