/**
 * Client-side Soroban writes: build → simulate → Freighter sign → submit.
 * Reads go through the Worker index (`worker.ts`); the chain remains the
 * source of truth (FR-6) — the Worker only caches it.
 */
import {
	Address,
	Asset,
	Contract,
	Operation,
	StrKey,
	TransactionBuilder,
	nativeToScVal,
	rpc
} from '@stellar/stellar-sdk';
import freighter from '@stellar/freighter-api';
import { config, toBaseUnits } from '$lib/config';

const { signTransaction, getNetwork } = freighter;

export class ChainError extends Error {
	constructor(
		message: string,
		public readonly kind:
			| 'network-mismatch'
			| 'signature-declined'
			| 'submit-failed'
			| 'rpc'
			| 'validation' = 'rpc'
	) {
		super(message);
		this.name = 'ChainError';
	}
}

export function isValidAddress(addr: string): boolean {
	return StrKey.isValidEd25519PublicKey(addr);
}

async function assertTestnet(): Promise<void> {
	const net = await getNetwork();
	if (net.networkPassphrase !== config.networkPassphrase) {
		throw new ChainError(
			'Freighter is not on Testnet — switch networks in the extension and retry',
			'network-mismatch'
		);
	}
}

function server(): rpc.Server {
	return new rpc.Server(config.sorobanRpcUrl);
}

async function signAndSend(
	txXdr: string,
	signerAddress: string
): Promise<string> {
	let signed: { signedTxXdr: string };
	try {
		signed = await signTransaction(txXdr, {
			networkPassphrase: config.networkPassphrase,
			address: signerAddress
		});
	} catch {
		throw new ChainError('Signature declined — nothing was submitted', 'signature-declined');
	}

	const s = server();
	const tx = TransactionBuilder.fromXDR(signed.signedTxXdr, config.networkPassphrase);
	const send = await s.sendTransaction(tx);
	if (send.status === 'ERROR') {
		throw new ChainError(`Transaction rejected: ${send.hash}`, 'submit-failed');
	}
	for (let i = 0; i < 12; i++) {
		await new Promise((r) => setTimeout(r, 1500));
		const res = await s.getTransaction(send.hash);
		if (res.status === 'SUCCESS') return send.hash;
		if (res.status === 'FAILED') throw new ChainError(`Transaction failed on-chain`, 'submit-failed');
	}
	throw new ChainError('Confirmation timeout — check the explorer', 'submit-failed');
}

async function invoke(
	signerAddress: string,
	method: string,
	args: import('@stellar/stellar-sdk').xdr.ScVal[]
): Promise<string> {
	await assertTestnet();
	const s = server();
	const account = await s.getAccount(signerAddress);
	const contract = new Contract(config.contractId);

	const tx = new TransactionBuilder(account, {
		fee: '100000',
		networkPassphrase: config.networkPassphrase
	})
		.addOperation(contract.call(method, ...args))
		.setTimeout(120)
		.build();

	const prepared = await s.prepareTransaction(tx);
	return signAndSend(prepared.toXDR(), signerAddress);
}

/** Lock USDC and create the reward. Returns tx hash. */
export async function createReward(params: {
	maintainer: string;
	repo: string;
	issueNumber: number;
	amountUsdc: number;
	deadlineUnix: number;
	timelockSecs: number;
}): Promise<string> {
	if (params.amountUsdc < 1) throw new ChainError('Minimum reward is 1 USDC', 'validation');
	return invoke(params.maintainer, 'create_reward', [
		new Address(params.maintainer).toScVal(),
		nativeToScVal(params.repo, { type: 'string' }),
		nativeToScVal(params.issueNumber, { type: 'u32' }),
		nativeToScVal(toBaseUnits(params.amountUsdc), { type: 'i128' }),
		nativeToScVal(BigInt(params.deadlineUnix), { type: 'u64' }),
		nativeToScVal(BigInt(params.timelockSecs), { type: 'u64' })
	]);
}

export async function refundReward(maintainer: string, id: number): Promise<string> {
	return invoke(maintainer, 'refund', [nativeToScVal(BigInt(id), { type: 'u64' })]);
}

export async function extendDeadline(
	maintainer: string,
	id: number,
	newDeadlineUnix: number
): Promise<string> {
	return invoke(maintainer, 'extend_deadline', [
		nativeToScVal(BigInt(id), { type: 'u64' }),
		nativeToScVal(BigInt(newDeadlineUnix), { type: 'u64' })
	]);
}

// ---- Trustline (classic op, still via Freighter) ----

export async function hasTrustline(address: string): Promise<boolean> {
	const res = await fetch(`${config.horizonUrl}/accounts/${address}`);
	if (res.status === 404) return false;
	if (!res.ok) throw new ChainError('Horizon unreachable');
	const data = (await res.json()) as {
		balances: Array<{ asset_code?: string; asset_issuer?: string; balance: string }>;
	};
	return data.balances.some(
		(b) => b.asset_code === config.usdc.code && b.asset_issuer === config.usdc.issuer
	);
}

export async function usdcBalance(address: string): Promise<number> {
	const res = await fetch(`${config.horizonUrl}/accounts/${address}`);
	if (!res.ok) return 0;
	const data = (await res.json()) as {
		balances: Array<{ asset_code?: string; asset_issuer?: string; balance: string }>;
	};
	const line = data.balances.find(
		(b) => b.asset_code === config.usdc.code && b.asset_issuer === config.usdc.issuer
	);
	return line ? Number(line.balance) : 0;
}

export async function establishTrustline(address: string): Promise<string> {
	await assertTestnet();
	const s = server();
	const account = await s.getAccount(address);
	const tx = new TransactionBuilder(account, {
		fee: '100',
		networkPassphrase: config.networkPassphrase
	})
		.addOperation(
			Operation.changeTrust({ asset: new Asset(config.usdc.code, config.usdc.issuer) })
		)
		.setTimeout(120)
		.build();
	return signAndSend(tx.toXDR(), address);
}
