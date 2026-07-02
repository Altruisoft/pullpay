/**
 * Test-USDC faucet for validation participants (TDD §7.3).
 * Sends 100 test-USDC from the issuer to a recipient that has a trustline.
 *
 * Usage: npx tsx scripts/faucet.ts G...RECIPIENT
 * Env:   ISSUER_SECRET (secret key of pullpay-issuer identity)
 */
import {
	Asset,
	Horizon,
	Keypair,
	Networks,
	Operation,
	TransactionBuilder
} from '@stellar/stellar-sdk';

const HORIZON = 'https://horizon-testnet.stellar.org';
const AMOUNT = '100';

async function main() {
	const recipient = process.argv[2];
	const issuerSecret = process.env.ISSUER_SECRET;
	if (!recipient?.startsWith('G') || !issuerSecret) {
		console.error('Usage: ISSUER_SECRET=S... npx tsx scripts/faucet.ts G...RECIPIENT');
		process.exit(1);
	}

	const server = new Horizon.Server(HORIZON);
	const issuer = Keypair.fromSecret(issuerSecret);
	const usdc = new Asset('USDC', issuer.publicKey());

	// Trustline check with actionable guidance.
	const acct = await server.loadAccount(recipient).catch(() => null);
	if (!acct) {
		console.error(`Account ${recipient} not found. Fund it first: https://friendbot.stellar.org?addr=${recipient}`);
		process.exit(1);
	}
	const hasTrustline = acct.balances.some(
		(b) => 'asset_code' in b && b.asset_code === 'USDC' && b.asset_issuer === issuer.publicKey()
	);
	if (!hasTrustline) {
		console.error(
			`Recipient lacks a USDC trustline. Establish one (e.g. in Freighter: add asset USDC / ${issuer.publicKey()}), then re-run.`
		);
		process.exit(1);
	}

	const issuerAccount = await server.loadAccount(issuer.publicKey());
	const tx = new TransactionBuilder(issuerAccount, {
		fee: '100',
		networkPassphrase: Networks.TESTNET
	})
		.addOperation(Operation.payment({ destination: recipient, asset: usdc, amount: AMOUNT }))
		.setTimeout(60)
		.build();
	tx.sign(issuer);

	const res = await server.submitTransaction(tx);
	console.log(`Sent ${AMOUNT} test-USDC to ${recipient}`);
	console.log(`Tx: https://stellar.expert/explorer/testnet/tx/${res.hash}`);
}

main().catch((e) => {
	console.error(e?.response?.data ?? e);
	process.exit(1);
});
