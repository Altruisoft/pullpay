# Instawards SOW Proposal

## 1. Project & Team Information

| **Project Name**                   | PullPay: Automated Contributor Rewards on Stellar |
| ---------------------------------------- | ------------------------------------------------- |
| **Builder / Team Name**            | Altruisoft                                        |
| **Primary Contact (Name + Email)** | Irham Tri Ahmadi — irhamtria@gmail.com           |
| **Ambassador Chapter**             | Indonesia                                         |
| **Ambassador Chapter Lead**        | Kenny Rivaldi                                     |
| **Date Submitted**                 | May 2026                                          |
| **Suggested Sprint Start Date**    | 1 June 2026                                       |

## 2. Instawards Overview & Intent

### 2.1 Instawards Purpose (for Builder Context)

Instawards are designed to support short, clearly scoped, execution-focused work that helps a project make tangible progress toward building on Stellar. Instawards are meant to fund specific, achievable outcomes that can be completed and demonstrated within 30 days or less.

This SOW represents a shared commitment between the Builder and the Ambassador Chapter Lead on what will be delivered, why it matters, and how success will be verified.

## 3. Problem Statement & Objective

| **Problem Being Addressed** | What specific problem, gap, or blocker is this Instaward intended to solve?                            | Data shows 37% of open-source Pull Requests (PRs) are merged in under 1 hour for minor fixes. Yet, rewarding a contributor $5 for a quick fix requires 15–20 minutes of administrative overhead (DMing for addresses, calculating fiat/crypto exchange rates, manual transfers). Because the manual coordination friction costs more than the micro-reward itself, recurring ecosystem participation is heavily discouraged. There is zero automated infrastructure for bottom-up, automated micro-grants ($5–$50). |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objective of This Instaward**  | **In one or two sentences, what will be true at the end of 30 days if this Instaward is successful?** | Deliver a working contributor reward infrastructure that eliminates the 15-minute administrative friction. Using SEP-41 (Stellar Asset Contract) and Soroban, PullPay automates USDC settlements natively via a GitHub workflow — automatically converting GitHub merge events into measurable on-chain Stellar activity.                                                                                                                                                                                            |

*Example prompts for builders: What is currently preventing progress? What is unclear, missing, or unbuilt today? Why is this problem worth solving now?*

### 3.1 Key Outcome

At the end of this sprint, any open-source maintainer can:

1. Create a USDC reward linked to a GitHub Issue
2. Add a single workflow file (`pullpay.yml`) to their repository
3. Merge a contributor's Pull Request
4. USDC is automatically released to the contributor via Soroban

**No manual payment coordination required.**

### 3.2 The Gap & Traditional Rails

Stellar projects distribute massive top-down grants (e.g. ~$1.16M in SCF Round 20), but micro-rewards for bottom-up GitHub contributions are choked by manual coordination (Discord DMs, spreadsheets). A maintainer spends an average of 15 minutes processing a single payout. Traditional rails fail for micro-settlement:

| Alternative        | Key Limitation                                            |
| :----------------- | :-------------------------------------------------------- |
| **Stripe**   | 2.9% + $0.30 fee — 36% erosion on a $5 reward.           |
| **PayPal**   | Frequent account freezes. Geographically restricted.      |
| **Ethereum** | Gas fees exceed $15. Micro-rewards are economically dead. |

### 3.3 Why Stellar & Ecosystem Impact

Stellar enables economically viable micro-rewards. PullPay introduces Stellar through a familiar GitHub workflow, converting contributions into measurable on-chain activity:

- **Near-zero fees (<$0.01):** $5 micro-rewards remain $5. No fee erosion.
- **Sub-5-second finality:** USDC arrives instantly on merge.
- **On-chain Growth:** Every settlement creates a funded Stellar wallet, a USDC transfer, and a Soroban contract invocation.

### 3.4 Existing Approaches

Existing platforms focus on traditional rails or generalized grants. PullPay focuses exclusively on Soroban-powered automated settlement using native Stellar developer tooling.

| Platform           | Primary Focus                                                                                                                           |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Algora**   | GitHub bounties via traditional payment rails (Stripe). Minimum feasible reward is $20 due to fee floors.                               |
| **Polar.sh** | Open-source monetization and subscription sponsorship.                                                                                  |
| **PullPay**  | Automated settlement natively on Stellar (via**`rs-soroban-sdk`**, **SEP-41 SAC**, & **`@stellar/stellar-sdk`**). |

### 3.5 Validation Scope & Practical Use Cases

**Validation Scope:** PullPay validates repository association, PR existence, and PR merged status. It does **not** evaluate code quality (maintainers retain full judgment).

**Use Cases:**

- **SDK bug fixes:** Maintainer posts $20 reward. Paid instantly on merge.
- **Documentation rewards:** Community offers $5 improvements (viable due to <$0.01 fees).
- **Ambassador campaigns:** Transparent bounty campaigns with verifiable on-chain settlement.

### 3.6 Sprint Constraints & Targets

- **Open Source:** MIT Licensed (Soroban contracts, GitHub workflows, SvelteKit app).
- **Sustainability:** Zero protocol fee. Focus is entirely on building ecosystem tooling.
- **Adoption Target:** 3 public repos, 5 unique contributors, 5 successful testnet settlements.
- **Why Instawards:** Focuses purely on delivering a reusable 30-day execution POC, not an open-ended marketplace.

### 3.7 How It Works

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

## 4. Scope of Work (30-Day Deliverables)

> **Important guidance:** This scope must be achievable within **30 calendar days**. If the work feels larger, it should be reduced or split into more achievable phases.

### 4.1 In-Scope Deliverables

| **Deliverable** | **Description (What will be built or produced?)**                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Why this matters**                                                                                                                                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Deliverable 1         | **Soroban Reward Escrow Contract:** A Soroban smart contract built with **`rs-soroban-sdk`** deployed on Testnet. Interfaces natively with **SEP-41 (Stellar Asset Contract)** for USDC locking and transfers. Supports: create reward, deposit USDC, assign contributor, release on verified merge, optional timelocks (dispute windows), and timeout-based automatic refunds.                                                                                                               | The on-chain settlement layer. Funds are locked upfront (contributor trusts the reward exists), released automatically on merge (no manual payout), and refunded on timeout (maintainer is protected). Maintainers have dispute windows, and contributors can extend timeouts. |
| Deliverable 2         | **GitHub Reward Automation Toolkit:** A reusable GitHub workflow template (`pullpay.yml`) utilizing `@actions/core` and a Cloudflare Worker that verifies PR merge status via the official GitHub API. Upon verification, the worker acts as an oracle and triggers the Soroban contract via **`@stellar/stellar-sdk`**. The worker uses ephemeral, allowance-limited keys to prevent escrow draining if compromised. **Result:** A maintainer automates payouts by adding one YAML file. | This is the core adoption mechanism. It meets maintainers where they already work — inside GitHub — with zero Web3 expertise required. Eliminates the 15-minute manual payout friction.                                                                                      |
| Deliverable 3         | **Reward Creation & Claim Interface:** A minimal SvelteKit web interface (deployed on Testnet) integrating **`@stellar/freighter-api`** allowing maintainers to create rewards linked to GitHub Issues. Includes a GitHub Bot integration allowing contributors to claim rewards simply by commenting `/pullpay claim <address>` on the PR.                                                                                                                                                       | A focused entry point for creating and claiming rewards. By moving claiming to GitHub comments, we remove the friction of requiring contributors to connect wallets on a separate site.                                                                                        |
| Deliverable 4         | **Ecosystem Validation Package:** Demonstrated end-to-end operation across at least 3 publicly accessible repositories with a minimum of 5 successful reward settlements and 5 unique Stellar wallets. Validation will be performed using publicly accessible open-source repositories and contributors participating during the sprint. Includes a demo video showing both maintainer and contributor perspectives, and a public integration guide.                                                        | Proves the full contributor reward lifecycle works end-to-end and generates real on-chain Stellar activity. Reviewer can verify every settlement on Stellar Testnet Explorer.                                                                                                  |

**Out-of-Scope (Explicitly Not Included)**

List anything that might be assumed but is not included in this Instaward scope.

|                                                                                   |  |  |
| --------------------------------------------------------------------------------- | - | - |
| Decentralized arbitration or DAO governance                                       |  |  |
| Generalized freelance marketplaces (focus is strictly GitHub contributor rewards) |  |  |
| Contributor reputation systems or code-quality scoring algorithms                 |  |  |
| Payroll systems or milestone-based vesting streams                                |  |  |
| Mobile applications — web only                                                   |  |  |

### 4.2 Deliverable-Aligned Budget Request

| **Requested Budget Amount**                                                                                                                                                                                                                                                                                                                                         | **Rationale for Budget Request** |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **$5,000** | 30 days of full development across a 3-person team:`<br>`• Soroban escrow contract & Freighter integration (Web3 Backend): $1,700 `<br>`• SvelteKit Reward Portal & UX flows (Frontend): $1,500 `<br>`• GitHub Automation Toolkit & Cloudflare Worker (Fullstack): $1,500 `<br>`• Infrastructure, testing, and demo video production: $300 |                                        |

## 5. 30-Day Execution Plan & Timeline

### 5.1 Weekly Breakdown

| **Week** | **Planned Work**                                                                                                                 | **Expected Output**                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Week 1         | Soroban contract development (escrow, release, refund, timeout logic), unit tests, and Freighter wallet integration.                   | Reward escrow contract deployed on Testnet with passing unit tests.                  |
| Week 2         | Build GitHub workflow template (`pullpay.yml`) and Cloudflare Worker for GitHub API merge verification. Connect to Soroban contract. | A merged PR triggers automatic on-chain payout on Testnet.                           |
| Week 3         | Build SvelteKit reward interface (maintainer creates reward) and GitHub Bot integration (contributor claims via comment).              | Working web interface where rewards can be created, and automated claiming workflow. |
| Week 4         | End-to-end testing, bug fixes, conduct 5 live Testnet settlements across 3 repositories, and record demo video.                        | 5 verified settlements, demo video complete, documentation ready.                    |

## 6. Evidence of Completion (Required)

> **Important guidance:** Evidence should be clear, verifiable, and easy to review by the Ambassador Chapter Lead **with minimal technical expertise**.

### 6.1 Planned Evidence to Be Submitted

| **Deliverable** | **Evidence Type (link, repo, demo, screenshot, doc, tx hash, etc.)** | **Description**                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deliverable 1         | GitHub URL + Stellar Expert                                                | Public GitHub repo (MIT License) with Rust contract source. Stellar Expert Testnet URL showing contract ID and invocation history.                         |
| Deliverable 2         | GitHub URL + Integration Guide                                             | Open-source workflow template and Cloudflare Worker. Step-by-step guide showing a maintainer how to add `pullpay.yml` to their repo.                     |
| Deliverable 3         | Live URL + Testnet tx hashes                                               | Publicly accessible testnet deployment. Chapter Lead can test creating a reward and viewing settlement status.                                             |
| Deliverable 4         | Demo video + tx hash list                                                  | Screen recording: create reward → contributor submits PR → PR merged → USDC released automatically. 5 verifiable tx hashes on Stellar Testnet Explorer. |

### 6.2 Evidence Verification Checklist (For Ambassador Use)

For each deliverable, the Ambassador Chapter Lead will assess whether evidence is present and sufficient.

| **Deliverable** | **Evidence Present** | **Evidence Partial** | **Evidence Missing** | **Comments** |
| --------------------- | -------------------------- | -------------------------- | -------------------------- | ------------------ |
| Deliverable 1         | ☐                         | ☐                         | ☐                         |                    |
| Deliverable 2         | ☐                         | ☐                         | ☐                         |                    |
| Deliverable 3         | ☐                         | ☐                         | ☐                         |                    |
| Deliverable 4         | ☐                         | ☐                         | ☐                         |                    |

### 6.3 Success Metrics

| Metric                                     | Target |
| :----------------------------------------- | :----- |
| Successful reward settlements on Testnet   | ≥ 5   |
| Unique Stellar wallet addresses            | ≥ 5   |
| Public GitHub repositories integrated      | ≥ 3   |
| Public integration guide published         | Yes    |
| Demo video published                       | Yes    |
| All source code released under MIT License | Yes    |

## 7. Next-Step Alignment

### 7.1 Anticipated Next Step After Completion

After this Instaward, the most likely next step is:

> ☐ Apply to SCF Build Award
> ☐ Continue development independently
> ☑ Apply for a follow-on Instaward (if eligible)
> ☐ Seek other ecosystem support
> ☐ Other:

## 8. Instawards Constraints Acknowledgement

By submitting this SOW, the Builder acknowledges:

> ☑ This scope will be completed within **30 days or less**.
> ☑ Instawards support execution, not open-ended exploration.
> ☑ A project may receive **no more than two follow-on Instawards**.
> ☑ Each Instaward is capped at **$5,000**.
> ☑ Total Instawards funding may not exceed **$15,000**.

## 9. Submission Confirmation

Once finalized, this Statement of Work will be submitted by the Ambassador Chapter Lead via the Instawards Airtable submission form for review and approval.
