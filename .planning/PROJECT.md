# PullPay: Automated Contributor Rewards on Stellar

## Vision
An automated, GitHub-native contributor reward infrastructure for the Stellar ecosystem. 
PullPay enables maintainers to automate USDC payouts to contributors via Soroban smart contracts—completely eliminating manual payment coordination.

## Core Principles
- **Ecosystem Infrastructure:** PullPay is a reusable piece of public infrastructure, not a centralized bounty startup.
- **Trust-Minimized Validation:** The Cloudflare worker layer only verifies PR merge status via GitHub API; it does not custody funds.
- **GitHub-Native:** Meet maintainers where they work. A single `pullpay.yml` handles automation.
- **Stellar Focus:** Convert GitHub contributions into measurable on-chain activity (wallets, USDC transfers, Soroban invocations).

## Non-Negotiables
- **No Complex Dashboards:** UI must remain minimal, focusing strictly on reward creation and claiming.
- **Open Source:** All code must be released under the MIT License.
- **Security Boundary:** The validation layer must independently authenticate GitHub workflow executions against live GitHub API data.

## Stack
- **Frontend:** SvelteKit (Svelte 5 Runes), Tailwind CSS v4
- **Backend/Validation:** Cloudflare Workers
- **Smart Contracts:** Stellar Soroban (Rust)
- **Deployment:** Cloudflare Pages
