# PullPay: Automated Contributor Rewards on Stellar

PullPay is a GitHub-native contributor reward infrastructure built for the Stellar ecosystem. It enables open-source maintainers to automate USDC payouts to contributors using Soroban smart contracts, completely eliminating the friction of manual payment coordination.

**Built by:** Altruisoft · **Funded by:** Stellar Community Fund (Instaward) · **License:** MIT

## The Problem

Stellar ecosystem projects — SDKs, developer tools, community resources — can distribute large grants and hackathon prizes, but there is no reusable infrastructure for rewarding small, verifiable contributions like bug fixes, documentation improvements, translations, and SDK enhancements.

As a result, contributor rewards are coordinated manually (via Discord, spreadsheets, or direct messages), creating friction that discourages recurring participation. Traditional payment rails fail for small, global contributor rewards:

| Alternative | Key Limitation |
|---|---|
| Stripe | 2.9% + $0.30 — a $5 reward loses 36% |
| PayPal | Frequent account freezes, restricted in many countries |
| Bank Transfer | $15–$45 per international transfer |
| Ethereum | Gas fees exceed $15 for micro-rewards |

Stellar enables economically viable micro-rewards due to its near-zero transaction costs (<$0.01) and sub-5-second finality. PullPay replaces the entire manual payout process with: **merge the PR → payment is automatic.**

## How It Works

```
Maintainer creates reward (via PullPay interface)
        ↓
USDC deposited into Soroban escrow contract
        ↓
Contributor submits Pull Request
        ↓
Maintainer reviews and merges PR
        ↓
GitHub merge event triggers pullpay.yml
        ↓
Cloudflare Worker verifies merge via GitHub API
        ↓
Soroban contract releases USDC to contributor
```

## Architecture

PullPay consists of four deliverables:

1. **Soroban Reward Escrow Contract (Rust):** Locks USDC upfront so contributors trust the reward exists. Handles automated releasing upon verified PR merge, contributor assignment, and timeout-based automatic refunding.
2. **GitHub Reward Automation Toolkit:** A reusable `pullpay.yml` GitHub workflow and a Cloudflare Worker. Settlement requests are authenticated through GitHub workflow executions and independently verified against live GitHub API data before triggering Soroban settlement. The worker acts solely as a verification layer and does not hold custody of funds.
3. **Reward Creation & Claim Interface (SvelteKit):** A minimal web interface deployed on Testnet. Maintainers create rewards linked to GitHub Issues. Contributors register Freighter wallet addresses and submit PR links.
4. **Ecosystem Validation Package:** End-to-end demonstration across ≥3 public repositories with ≥5 successful reward settlements and ≥5 unique Stellar wallets, a demo video, and a public integration guide.

### Validation Scope

PullPay validates only repository association, PR existence, and PR merged status. It intentionally does **not** evaluate code quality, contribution value, or contributor intent. Maintainers remain fully responsible for deciding which Pull Requests to merge. PullPay automates the payment — not the judgment.

## Why Stellar

| Stellar Feature | What It Enables |
|---|---|
| Near-zero fees (<$0.01) | $5 micro-rewards remain $5. No fee erosion. |
| Native USDC | Stable, real-world value. No volatile tokens. |
| Soroban smart contracts | Programmable escrow — funds locked upfront, released on merge, refunded on timeout. |
| Sub-5-second finality | The moment a PR is merged, USDC arrives in the contributor's wallet. |
| Permissionless & global | Removes geographic barriers common in traditional payment systems. |

## Ecosystem Impact

Every successful reward settlement creates:
- A funded Stellar wallet (new ecosystem user)
- A USDC transaction on Stellar (on-chain activity)
- A Soroban contract interaction (smart contract usage)
- A contributor exposed to the Stellar ecosystem (developer acquisition)

## Use Cases

| Use Case | Example |
|---|---|
| SDK bug fixes | Maintainer posts $20 reward. Contributor submits PR. On merge, $20 USDC released. |
| Documentation rewards | $5–$10 for docs improvements. Only viable because Stellar fees are <$0.01. |
| Hackathon follow-ups | Organizer pre-funds rewards. Winners paid automatically when code is merged. |
| Ambassador campaigns | Chapter leads run transparent bounty campaigns with verifiable on-chain settlement. |

## Tech Stack

- **Frontend:** SvelteKit (Svelte 5 Runes), Tailwind CSS v4, TypeScript
- **Smart Contracts:** Stellar Soroban (Rust)
- **Validation Layer:** Cloudflare Workers
- **Deployment:** Cloudflare Pages (`@sveltejs/adapter-cloudflare`)
- **Runtime:** Bun

## Local Development

### Prerequisites

- [Bun](https://bun.sh/) (latest stable)
- [Node.js](https://nodejs.org/) (v20+ recommended)

### Installation

```bash
git clone https://github.com/AltruiSoft/pullpay.git
cd pullpay
bun install
```

### Running

```bash
bun run dev
```

The application will bind to `http://localhost:5173`.

## Available Scripts

| Script | Description |
|---|---|
| `bun run dev` | Start development server with HMR |
| `bun run build` | Compile for Cloudflare Pages |
| `bun run preview` | Preview production build locally |
| `bun run check` | Run `svelte-check` for type analysis |
| `bun run lint:check` | Validate formatting via Prettier |
| `bun run lint:format` | Auto-format via Prettier |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Auto-fix ESLint warnings |

## Open Source Commitment

All source code is released under the **MIT License**. After this grant, any project can use PullPay without permission, payment, or dependency on Altruisoft. This includes:

- Soroban smart contracts (Rust)
- GitHub workflow templates
- Cloudflare Worker validation adapter
- SvelteKit web application
- Maintainer onboarding documentation
