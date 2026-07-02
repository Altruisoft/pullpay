// PullPay chain/environment configuration (Testnet v1).
// Values marked (deploy) come from scripts/deploy.sh → docs/DEPLOYMENTS.md.
import { env } from '$env/dynamic/public';

export const config = {
	networkPassphrase: 'Test SDF Network ; September 2015',
	network: 'TESTNET' as const,
	sorobanRpcUrl: env.PUBLIC_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org',
	horizonUrl: env.PUBLIC_HORIZON_URL || 'https://horizon-testnet.stellar.org',
	contractId: env.PUBLIC_CONTRACT_ID || '', // (deploy)
	usdc: {
		code: 'USDC',
		issuer: env.PUBLIC_USDC_ISSUER || '', // (deploy)
		sacId: env.PUBLIC_USDC_SAC_ID || '', // (deploy)
		decimals: 7
	},
	workerUrl: env.PUBLIC_WORKER_URL || 'https://pullpay-verify.workers.dev',
	explorer: {
		tx: (hash: string) => `https://stellar.expert/explorer/testnet/tx/${hash}`,
		contract: (id: string) => `https://stellar.expert/explorer/testnet/contract/${id}`,
		account: (addr: string) => `https://stellar.expert/explorer/testnet/account/${addr}`
	}
} as const;

export const USDC_UNIT = 10_000_000n; // 7 decimals

export function toBaseUnits(amount: number): bigint {
	return BigInt(Math.round(amount * 1e7));
}

export function fromBaseUnits(amount: bigint | string): number {
	return Number(BigInt(amount)) / 1e7;
}
