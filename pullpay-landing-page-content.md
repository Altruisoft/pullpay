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

### Primary Headline

> Turn GitHub Contributions Into On-Chain Stellar Activity

### Sub-headline

Automate contributor rewards with Soroban escrow and Stellar USDC. Maintainers create rewards once. Contributors get paid when PRs are merged.

### CTA

* **[Create Reward]** - Primary CTA (for Maintainers)
* **[How it works]** - Secondary CTA (anchor link)

### Visual

No background photograph. The hero visual is the product itself — an escrow reward card showing a live reward state (locked → merged → settled) with real wallet addresses and USDC amounts. A small "Built on" badge shows Stellar + Soroban.

---

## SECTION 2 - PROBLEM STATEMENT

### Section Headline

**"Why Small Contributions Rarely Get Rewarded"**

### Body

Open-source ecosystems depend on hundreds of small contributions: bug fixes, documentation updates, translations, and developer tooling improvements. Yet rewarding these contributions is surprisingly difficult.

For a $5–20 reward, maintainers often coordinate payouts manually through Discord, spreadsheets, direct messages, and wallet collection. The administrative overhead frequently exceeds the value of the reward itself.

As a result, many valuable contributions go unrewarded. PullPay automates the entire settlement process through GitHub workflows and Soroban escrow.

### Fee Comparison Table

| Rail | Limitation |
|---|---|
| **Stripe** | 2.9% + $0.30 fee — 36% erosion on a $5 reward. |
| **PayPal** | Account freezes. Geographically restricted. |
| **Bank Wire** | $15–$45 overhead. 3–5 day settlement delay. |
| **Ethereum** | $15+ gas fees. Micro-rewards are economically dead. |

---

## SECTION 3 - ECOSYSTEM GAP

### Section Headline

**"The Missing Layer Between GitHub and Stellar"**

### Body

Stellar already supports grants, hackathons, and ecosystem funding.

What is still missing is reusable infrastructure for rewarding everyday contributions:

* fixing bugs
* improving documentation
* maintaining SDKs
* translating resources
* supporting community tooling

PullPay fills this gap by connecting GitHub contribution events directly to Soroban-based reward settlement.

---

## SECTION 4 - HOW IT WORKS

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

## SECTION 5 - WHY STELLAR

### Section Headline

**"Why Stellar Makes Contributor Rewards Practical"**

### Intro

Contributor rewards are often small — sometimes only $5–10. Traditional payment rails make these rewards inefficient because fees can consume a significant portion of the payout. Stellar enables economically viable contributor rewards through:

### Body

| Stellar Feature | What It Enables |
|---|---|
| **Near-zero fees (<$0.01)** | $5 micro-rewards remain $5. No fee erosion. |
| **Native USDC** | Stable, real-world value. No volatile tokens. |
| **Soroban smart contracts** | Programmable escrow — funds locked upfront, released on merge, refunded on timeout. |
| **Sub-5-second finality** | The moment a PR is merged, USDC arrives in the contributor's wallet. |
| **Permissionless & global** | Removes geographic barriers common in traditional payment systems. |

---

## SECTION 6 - ARCHITECTURE & SECURITY

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

## SECTION 7 - USE CASES

| Use Case | Example |
|---|---|
| **SDK bug fixes** | Stellar SDK maintainer posts $20 reward for a bug fix. Contributor submits PR. On merge, $20 USDC is released automatically. |
| **Documentation rewards** | Community program offers $5–$10 for documentation improvements. Only viable because Stellar fees are <$0.01. |
| **Hackathon follow-ups** | Organizer pre-funds rewards via Soroban escrow. Winners are paid automatically when their code is merged. |
| **Ambassador campaigns** | Chapter leads run transparent bounty campaigns with verifiable on-chain settlement. |

---

## SECTION 8 - ECOSYSTEM IMPACT

### Section Headline

**"GitHub Is One of the Largest Developer Networks in the World"**

### Body

PullPay introduces Stellar through a workflow developers already understand. Instead of asking contributors to learn blockchain first, PullPay embeds Stellar directly into the contribution process.

Every successful reward creates:

* A funded Stellar wallet
* A USDC transaction
* A Soroban contract interaction
* A developer exposed to the Stellar ecosystem

PullPay turns contribution activity into measurable ecosystem activity.

---

## SECTION 9 - WHY NOW

### Section Headline

**"Why Now"**

### Body

Stellar continues to invest in developer tooling, grants, hackathons, and ecosystem growth. As more projects launch on Stellar, contributor incentives become increasingly important.

PullPay explores a reusable infrastructure layer that allows ecosystem projects to reward open-source work using the same programmable financial rails that power the broader Stellar network.

---

## SECTION 10 - FAQ

Priority order:
1. Why not just use GitHub Sponsors?
2. Does PullPay hold my funds?
3. What does PullPay validate?
4. How does the validation layer work?
5. What happens if a PR is never merged?
6. What if I accidentally merge a bad PR?
7. Do I need Freighter to use PullPay?
8. Why Stellar instead of traditional payment rails?
9. How do I convert USDC to local currency?
10. Do I need a USDC trustline?
11. Who pays the transaction fees?
12. Is my wallet address public if I claim via GitHub?

---

## DEVELOPER / COPYWRITER REFERENCE

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
