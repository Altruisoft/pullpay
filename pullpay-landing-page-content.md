# PullPay - Landing Page Content Brief

> Internal reference document for landing page development.
> All data sourced from the official SCF Instaward SOW (`pullpay-instaward-doc.md`).
> Use this as the canonical reference for copywriting, page structure, and information hierarchy.

---

## PRODUCT IDENTITY

**Product Name:** PullPay

**Primary Tagline:** Automated Contributor Rewards on Stellar

**One-Line GTM:** Convert GitHub contributions into measurable on-chain Stellar activity through automated Soroban-based USDC settlements.

**Positioning:** PullPay is a reusable piece of public ecosystem infrastructure that enables open-source maintainers to automate USDC payouts to contributors simply by merging a Pull Request.

---

## SECTION 1 - HERO

### Primary Headline (Options)

**Option A - Developer-driven:**
> Merge the PR. Payment is Automatic.
> GitHub-to-Soroban reward infrastructure for the Stellar ecosystem.

**Option B - Maintainer-driven:**
> Stop Coordinating Payouts Manually.
> Automate USDC contributor rewards directly from your GitHub workflow.

### Sub-headline

PullPay enables Stellar ecosystem projects to compensate contributors without manual payment coordination. Funds are secured in a Soroban escrow contract and released automatically the moment a Pull Request is verified and merged.

### CTA

* **[Create a Reward]** - Primary CTA (for Maintainers)
* **[Claim a Reward]** - Secondary CTA (for Contributors)

---

## SECTION 2 - PROBLEM STATEMENT

### Section Headline

**"Traditional Rails Bleed Open Source."**

### Body

Traditional payment rails fail for micro-rewards: Stripe charges $0.30 + 2.9% (destroying $5 rewards), and Ethereum gas fees exceed $15. PullPay replaces manual payout friction (Discord DMs, spreadsheets) with automated, near-zero fee Soroban escrow.

---

## SECTION 3 - HOW IT WORKS

### Section Headline

**"Three Steps. One File. Verifiable Settlement."**

### Maintainer Flow
1. **Create Reward** - The maintainer creates a USDC reward linked to a GitHub Issue via the PullPay interface. (Optional: Configures a 24-hour timelock for dispute protection).
2. **Add Workflow** - The maintainer adds a single `pullpay.yml` GitHub workflow file to their repository.
3. **Merge PR** - When a contributor submits a PR, the maintainer reviews and merges it. The GitHub Action triggers the Cloudflare validation layer, which then tells the Soroban contract to release the funds.

### Contributor Flow
1. **Claim Reward** - The contributor simply comments `/pullpay claim <stellar-address>` directly on their PR. No need to register on a separate website.
2. **Get Paid** - Upon successful merge, the USDC is automatically deposited into their Stellar wallet (after the optional timelock period). If the review takes too long, the contributor can request a timeout extension directly from the bot.

---

## SECTION 4 - WHY STELLAR

### Section Headline

**"Why Stellar Makes This Possible"**

### Body

| Stellar Feature | What It Enables |
|---|---|
| **Near-zero fees (<$0.01)** | $5 micro-rewards remain $5. No fee erosion. |
| **Native USDC** | Stable, real-world value. No volatile tokens. |
| **Soroban smart contracts** | Programmable escrow — funds locked upfront, released on merge, refunded on timeout. |
| **Sub-5-second finality** | The moment a PR is merged, USDC arrives in the contributor's wallet. |
| **Permissionless & global** | Removes geographic barriers common in traditional payment systems. |

---

## SECTION 5 - ARCHITECTURE & SECURITY

### Section Headline

**"Trust-Minimized Settlement Infrastructure"**

### Body

PullPay relies on three core components:
1. **Soroban Reward Escrow Contract:** Locks USDC upfront so contributors trust the reward exists, handles automated releases, optional timelocks (dispute windows), and timeout refunds (with extension requests).
2. **GitHub Reward Automation Toolkit:** A reusable `pullpay.yml` workflow and a Cloudflare Worker.
3. **Validation Layer Security:** Settlement requests are authenticated through GitHub workflow executions and independently verified against live GitHub API data. The worker uses ephemeral, allowance-limited keys so it acts solely as a verification layer and can never drain the escrow even if compromised.

### Validation Scope

PullPay validates only:
- Repository association (the PR belongs to the correct repo)
- Pull request existence (the PR is real)
- Pull request merged status (the PR was merged, not just closed)

PullPay does **not** evaluate code quality, contribution value, or contributor intent. Maintainers decide what to merge; PullPay automates the payment.

---

## SECTION 6 - USE CASES

| Use Case | Example |
|---|---|
| **SDK bug fixes** | Stellar SDK maintainer posts $20 reward for a bug fix. Contributor submits PR. On merge, $20 USDC is released automatically. |
| **Documentation rewards** | Community program offers $5–$10 for documentation improvements. Only viable because Stellar fees are <$0.01. |
| **Hackathon follow-ups** | Organizer pre-funds rewards via Soroban escrow. Winners are paid automatically when their code is merged. |
| **Ambassador campaigns** | Chapter leads run transparent bounty campaigns with verifiable on-chain settlement. |

---

## SECTION 7 - ECOSYSTEM IMPACT

**"On-Chain Developer Acquisition"**

Every successfully claimed reward is a measurable adoption event:
- **Funded Wallet:** Contributor creates/funds a Stellar wallet.
- **USDC Transfer:** Real on-chain settlement activity.
- **Contract Invocation:** Direct Soroban usage.
- **Ecosystem Growth:** A GitHub developer practically exposed to the Stellar ecosystem.

---

## SECTION 8 - DEVELOPER / COPYWRITER REFERENCE

### Terminology - Strict Consistency Rules

| Term | Correct Usage | Avoid (BANNED TERMS) |
| --- | --- | --- |
| **Product Category** | Ecosystem infrastructure, Reward automation | "Startup", "Bounty marketplace" |
| **Validation** | GitHub API verification, PR merge verification | "Quality checking", "Code review" |
| **Security** | Trust-minimized, verification layer | "Fully decentralized", "Trustless" |
| **Users** | Maintainer, Contributor | "Buyer", "Seller", "Customer" |

### Tone and Voice

* Professional, execution-oriented, and infrastructure-focused.
* PullPay complements existing solutions (like Gitcoin or Algora) by providing a lightweight, GitHub-native workflow built around Soroban escrow.
* Do not make sweeping competitive attacks or absolute claims (e.g., avoid saying "Stellar is the only network", say "Stellar enables economically viable micro-rewards").
