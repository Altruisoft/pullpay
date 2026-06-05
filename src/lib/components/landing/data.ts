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
	title: 'Why Small Contributions Rarely Get Rewarded',
	paragraphs: [
		'Open-source ecosystems depend on hundreds of small contributions: bug fixes, documentation updates, translations, and developer tooling improvements. Yet rewarding these contributions is surprisingly difficult.',
		'For a $5–20 reward, maintainers often coordinate payouts manually through Discord, spreadsheets, direct messages, and wallet collection. The <strong class="text-crx-black font-semibold">administrative overhead</strong> frequently exceeds the value of the reward itself.',
		'As a result, many valuable contributions go unrewarded. PullPay automates the entire settlement process through GitHub workflows and Soroban escrow.'
	]
};

export const traditionalRails: RailComparison[] = [
	{ name: 'Stripe', limitation: '2.9% + $0.30 fee — 36% erosion on a $5 reward.' },
	{ name: 'PayPal', limitation: 'Account freezes. Geographically restricted.' },
	{ name: 'Bank Wire', limitation: '$15–$45 overhead. 3–5 day settlement delay.' },
	{ name: 'Ethereum', limitation: '$15+ gas fees. Micro-rewards are economically dead.' }
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
			'Built with <span class="bg-crx-black text-white px-1.5 py-0.5 mx-0.5 font-mono text-sm tracking-tight rounded-sm">rs-soroban-sdk</span>. Interfaces natively with <span class="bg-crx-black text-white px-1.5 py-0.5 mx-0.5 font-mono text-sm tracking-tight rounded-sm">SEP-41 (Stellar Asset Contract)</span> to lock USDC upfront and handle automated releases and timeout refunds.'
	},
	{
		title: 'GitHub Reward Automation Toolkit',
		description:
			'A pullpay.yml workflow utilizing <span class="bg-crx-black text-white px-1.5 py-0.5 mx-0.5 font-mono text-sm tracking-tight rounded-sm">@actions/core</span> and a Cloudflare Worker oracle. Settlement requests are authenticated via workflow executions and verify PR merges.'
	},
	{
		title: 'Validation Layer Security',
		description:
			'The worker verifies the merge via GitHub API, then triggers the Soroban contract via <span class="bg-crx-black text-white px-1.5 py-0.5 mx-0.5 font-mono text-sm tracking-tight rounded-sm">@stellar/stellar-sdk</span> using ephemeral, allowance-limited keys.'
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
		label: 'A funded Stellar wallet',
		description: 'Every contributor who claims a reward creates or funds a Stellar wallet.'
	},
	{
		value: 'USDC Transfer',
		label: 'A USDC transaction',
		description: 'Each settlement is a real USDC transaction on the Stellar network.'
	},
	{
		value: 'Contract Invocation',
		label: 'A Soroban contract interaction',
		description: 'Every reward release is a Soroban contract interaction.'
	},
	{
		value: 'Developer Exposed',
		label: 'A developer exposed to Stellar',
		description:
			'For some contributors, this may become their first practical interaction with Stellar.'
	}
];

// ─── FAQ ───
export const faqItems: FaqItem[] = [
	{
		question: 'Why not just use GitHub Sponsors?',
		answer:
			'GitHub Sponsors is designed for subscriptions or donations to a person, not for paying out specific tasks. It also relies on traditional fiat rails (like Stripe), which have high geographic barriers and exclude many global developers. PullPay is task-based (pay-per-merge) and uses permissionless, global Stellar USDC.'
	},
	{
		question: 'Does PullPay hold my funds?',
		answer:
			'No. USDC is locked inside a Soroban smart contract on Stellar Testnet. The validation worker only acts as an oracle to trigger the release upon a verified PR merge.'
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
		question: 'Who pays the transaction fees?',
		answer:
			'Transaction fees on Stellar are near-zero (<$0.01). When creating a reward, the maintainer deposits a tiny fraction of XLM alongside the USDC to cover the automated settlement cost. There are zero hidden platform fees, and the contributor receives exactly the stated USDC amount.'
	},
	{
		question: 'Is my wallet address public if I claim via GitHub?',
		answer:
			'Yes — claiming via a PR comment makes your Stellar address visible on the PR. If you prefer privacy, you can claim through the PullPay web interface instead, where your address is only shared with the smart contract.'
	},
	{
		question: 'How do contributors know a reward is real and funded?',
		answer:
			'When a maintainer funds a reward, the USDC is locked transparently in a Soroban smart contract. PullPay automatically comments on the GitHub Issue with a link to the on-chain escrow, so contributors have cryptographic proof that the funds exist before they start working.'
	},
	{
		question: 'What is PullPay’s cut or fee?',
		answer:
			'PullPay charges 0% fees. It is built as public ecosystem infrastructure funded by the Stellar Community Fund. 100% of the reward goes to the contributor, and the sub-cent network transaction fees are subsidized by the protocol.'
	},
	{
		question: 'Does PullPay use the GitHub API?',
		answer:
			'Yes. While payouts are settled on blockchain, the validation relies on GitHub. Our Cloudflare Worker checks the official GitHub API to cryptographically verify that the specific PR was actually merged into the correct repository before releasing any funds.'
	}
];

// ─── Footer ───
export const footerLinks: FooterLink[] = [
	{ label: 'Problem', href: '#problem' },
	{ label: 'How It Works', href: '#how-it-works' },
	{ label: 'Why Stellar', href: '#why-stellar' },
	{ label: 'Use Cases', href: '#use-cases' }
];
