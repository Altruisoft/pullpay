import type {
	FooterLink,
	InfoCard,
	LinkItem,
	StepItem,
	FaqItem,
	RailComparison,
	StellarFeature,
	UseCase
} from './types';

// ─── Assets ───
export const assets = {
	logo: '/images/pullpay-logo-horizontal.webp',
	logoMark: '/images/pullpay-logo-only.webp',
	stellarSoroban: '/images/live-reward-escrow.png',
	automatePayout: '/images/automate-payout.png'
} as const;

// ─── Navigation ───
export const navLinks: LinkItem[] = [
	{ label: 'Problem', href: '#problem' },
	{ label: 'How It Works', href: '#how-it-works' },
	{ label: 'Why Stellar', href: '#why-stellar' },
	{ label: 'Use Cases', href: '#use-cases' },
	{ label: 'FAQ', href: '#faq' }
];

// ─── Problem Section ───
export const problemData = {
	title: 'Manual Payment Coordination Discourages Participation',
	description:
		'Stellar ecosystem projects can distribute grants and hackathon prizes, but there is no reusable infrastructure for rewarding small, verifiable GitHub contributions.',
	paragraphs: [
		'Today, if a maintainer wants to reward a contributor for a bug fix, they have to ask for a wallet address on Discord, calculate exchange rates, and send a manual transaction. This creates friction that accelerates maintainer burnout and discourages recurring participation.',
		'Traditional payment rails fail for small, global contributor rewards — and other blockchains suffer from high gas fees that make micro-rewards economically impossible.'
	]
};

export const traditionalRails: RailComparison[] = [
	{ name: 'Stripe', limitation: '2.9% + $0.30 — a $5 reward loses 36%' },
	{ name: 'PayPal', limitation: 'Frequent account freezes. Restricted in many countries.' },
	{ name: 'Bank Transfer', limitation: '$15–$45 per international transfer. 3–5 day settlement.' },
	{ name: 'Ethereum', limitation: 'Gas fees exceed $15. Micro-rewards are impossible.' }
];

// ─── How It Works ───
export const howItWorksSteps: StepItem[] = [
	{
		eyebrow: '01',
		title: 'Create Reward',
		description:
			'The maintainer creates a USDC reward linked to a GitHub Issue via the PullPay interface. Funds are locked in Soroban escrow.',
		microcopy: 'Contributors can see that the reward exists on-chain before they start working.',
		role: 'Maintainer'
	},
	{
		eyebrow: '02',
		title: 'Add Workflow',
		description:
			'The maintainer adds a single `pullpay.yml` GitHub workflow file to their repository. You can choose Instant Payouts or a 24-hour Timelock for a dispute window.',
		microcopy: 'One file. No SDK, no API keys, no complex integration.',
		role: 'Maintainer'
	},
	{
		eyebrow: '03',
		title: 'Merge & Auto-Pay',
		description:
			'When a contributor submits a PR, the maintainer reviews and merges it. The GitHub Action triggers the Cloudflare validation layer, which verifies the merge and tells the Soroban contract to release USDC.',
		microcopy: 'Merge the PR → payment is automatic.',
		role: 'Settlement'
	}
];

// ─── Why Stellar ───
export const stellarFeatures: StellarFeature[] = [
	{
		feature: 'Near-zero fees (<$0.01)',
		enables: '$5 micro-rewards remain $5. No fee erosion.'
	},
	{
		feature: 'Native USDC',
		enables: 'Stable, real-world value. No volatile tokens.'
	},
	{
		feature: 'Soroban smart contracts',
		enables: 'Programmable escrow — funds locked upfront, released on merge, refunded on timeout.'
	},
	{
		feature: 'Sub-5-second finality',
		enables: 'The moment a PR is merged, USDC arrives in the contributor\'s wallet.'
	},
	{
		feature: 'Permissionless & global',
		enables: 'Removes geographic barriers common in traditional payment systems.'
	}
];

// ─── Architecture ───
export const architectureCards: InfoCard[] = [
	{
		title: 'Soroban Reward Escrow Contract',
		description:
			'Locks USDC upfront so contributors trust the reward exists. Handles automated releasing upon verified PR merge and timeout-based automatic refunding. Written in Rust.'
	},
	{
		title: 'GitHub Reward Automation Toolkit',
		description:
			'A reusable pullpay.yml workflow and a Cloudflare Worker. Settlement requests are authenticated through GitHub workflow executions and independently verified against live GitHub API data.'
	},
	{
		title: 'Validation Layer Security',
		description:
			'The worker acts solely as a verification layer using ephemeral, allowance-limited keys so it cannot drain the escrow. It confirms PR merge status against the official GitHub API before triggering Soroban settlement.'
	}
];

// ─── Use Cases ───
export const useCases: UseCase[] = [
	{
		title: 'SDK Bug Fixes',
		example:
			'Stellar SDK maintainer posts $20 reward for a bug fix. Contributor submits PR. On merge, $20 USDC is released automatically.'
	},
	{
		title: 'Documentation Rewards',
		example:
			'Community program offers $5–$10 for documentation improvements. Only viable because Stellar fees are <$0.01.'
	},
	{
		title: 'Hackathon Follow-ups',
		example:
			'Organizer pre-funds rewards via Soroban escrow. Winners are paid automatically when their code is merged.'
	},
	{
		title: 'Ambassador Campaigns',
		example:
			'Chapter leads run transparent bounty campaigns with verifiable on-chain settlement.'
	}
];

// ─── Ecosystem Impact ───
export const impactMetrics = [
	{
		value: 'Funded Wallet',
		label: 'New ecosystem user',
		description: 'Every contributor who claims a reward creates or funds a Stellar wallet.'
	},
	{
		value: 'USDC Transfer',
		label: 'On-chain activity',
		description: 'Each settlement is a real USDC transaction on the Stellar network.'
	},
	{
		value: 'Contract Invocation',
		label: 'Smart contract usage',
		description: 'Every reward release is a Soroban contract interaction.'
	},
	{
		value: 'Developer Onboarded',
		label: 'Ecosystem growth',
		description:
			'For some contributors, this may become their first practical interaction with Stellar.'
	}
];

// ─── FAQ ───
export const faqItems: FaqItem[] = [
	{
		question: 'Does PullPay hold my funds?',
		answer:
			'No. USDC is locked inside a Soroban smart contract on Stellar Testnet. The validation worker only acts as an oracle to trigger the release upon a verified PR merge.'
	},
	{
		question: 'What does PullPay validate?',
		answer:
			'PullPay validates only three things: repository association (the PR belongs to the correct repo), PR existence, and PR merged status. It does not evaluate code quality, contribution value, or contributor intent.'
	},
	{
		question: 'How does the validation layer work?',
		answer:
			'A Cloudflare Worker performs a deterministic verification request against the official GitHub API to confirm the PR was merged. Settlement requests are authenticated via GitHub workflow executions.'
	},
	{
		question: 'What happens if a PR is never merged?',
		answer:
			'The Soroban contract includes a timeout-based automatic refund mechanism. If a PR takes longer than expected, contributors can request a timeout extension. Otherwise, the maintainer gets their USDC back automatically.'
	},
	{
		question: 'What if I accidentally merge a bad PR?',
		answer:
			'Maintainers can configure a 24-hour timelock instead of instant payouts. This provides a dispute window to cancel the settlement if the merged code contains fatal bugs or malicious changes.'
	},
	{
		question: 'Do I need Freighter to use PullPay?',
		answer:
			'Yes. PullPay currently requires the Freighter browser extension to interact with the Stellar network and Soroban smart contracts.'
	},
	{
		question: 'Why Stellar instead of traditional payment rails?',
		answer:
			'Stripe charges 2.9% + $0.30 per transaction, making a $5 micro-reward economically unviable (36% fee erosion). Stellar enables near-zero fee (<$0.01), instant, global settlement via USDC.'
	}
];

// ─── Footer ───
export const footerLinks: FooterLink[] = [
	{ label: 'Problem', href: '#problem' },
	{ label: 'How It Works', href: '#how-it-works' },
	{ label: 'Why Stellar', href: '#why-stellar' },
	{ label: 'Use Cases', href: '#use-cases' }
];
