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

| **Problem Being Addressed**     | What specific problem, gap, or blocker is this Instaward intended to solve?                       | **Stellar ecosystem projects can distribute grants and hackathon prizes, but there is no reusable infrastructure for rewarding small, verifiable GitHub contributions — bug fixes, documentation, translations, SDK enhancements. As a result, contributor rewards are coordinated manually, creating friction that discourages recurring ecosystem participation.** |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objective of This Instaward** | In one or two sentences, what will be true at the end of 30 days if this Instaward is successful? | **Deliver a working, testnet-ready contributor reward infrastructure that enables Stellar ecosystem projects to compensate contributors through automated Soroban-based USDC settlements — converting GitHub contributions into measurable on-chain Stellar activity.**                                                                                              |

*Example prompts for builders: What is currently preventing progress? What is unclear, missing, or unbuilt today? Why is this problem worth solving now?*

### 3.1 Key Outcome

At the end of this sprint, any open-source maintainer can:

1. Create a USDC reward linked to a GitHub Issue
2. Add a single workflow file (`pullpay.yml`) to their repository
3. Merge a contributor's Pull Request
4. USDC is automatically released to the contributor via Soroban

**No manual payment coordination required.**

### 3.2 Current Ecosystem Gap

Today, Stellar ecosystem projects — SDKs, developer tools, community resources — can distribute large grants and hackathon prizes, but there is no reusable infrastructure for rewarding small, verifiable contributions like bug fixes, documentation improvements, translations, and SDK enhancements.

As a result, contributor rewards are coordinated manually (via Discord, spreadsheets, or direct messages), creating friction that discourages recurring participation. Historical examples of custodial bounty platforms have highlighted the risks of relying on centralized fund management for contributor rewards.

### 3.3 Why Not Traditional Payment Rails?

Traditional alternatives fail for small, global contributor rewards:

| Alternative             | Key Limitation                                                                       |
| :---------------------- | :----------------------------------------------------------------------------------- |
| **Stripe**        | 2.9% + $0.30 — a $5 reward loses 36%. Not universally available across all regions. |
| **PayPal**        | Frequent account freezes. Restricted in many developing nations.                     |
| **Bank Transfer** | $15–$45 per international transfer. 3–5 day settlement.                            |
| **Ethereum**      | Gas fees exceed $15. Micro-rewards are economically impossible.                      |

Stellar enables economically viable micro-rewards due to its low transaction costs and fast settlement. PullPay replaces the entire manual payout process with: **merge the PR → payment is automatic.**

### 3.5 Why Stellar

Stellar provides a uniquely attractive combination of features that make contributor reward automation viable:

| Stellar Feature                                                                 | What It Enables                                                                                                                                 |
| :------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Near-zero fees (<$0.01)** | $5 micro-rewards remain $5. No fee erosion. |                                                                                                                                                 |
| **Native USDC**                                                           | Stable, real-world value. No volatile tokens.                                                                                                   |
| **Soroban smart contracts**                                               | Programmable escrow — funds locked upfront, released on merge, refunded on timeout. No intermediary holds funds.                               |
| **Sub-5-second finality**                                                 | The moment a PR is merged, USDC arrives in the contributor's wallet. Instant.                                                                   |
| **Permissionless & global**                                               | Stellar supports global participation through permissionless wallet access, removing geographic barriers common in traditional payment systems. |

### 3.6 Why This Benefits Stellar

PullPay is designed to onboard developers into Stellar through a workflow they already understand: GitHub.

PullPay introduces Stellar through a familiar GitHub workflow, reducing onboarding friction for open-source contributors. For some contributors, receiving a reward through PullPay may become their first practical interaction with:

- A Stellar wallet (Freighter)
- USDC on Stellar
- A Soroban smart contract

This creates a low-friction path from **GitHub contributor → Stellar ecosystem participant**.

### 3.7 Ecosystem Impact

Every successful reward settlement creates:

- A funded Stellar wallet (new ecosystem user)
- A USDC transaction on Stellar (on-chain activity)
- A Soroban contract interaction (smart contract usage)
- A contributor exposed to the Stellar ecosystem (developer acquisition)

This Instaward directly converts GitHub contributions into measurable on-chain Stellar activity.

### 3.8 Existing Approaches

Existing bounty and sponsorship platforms demonstrate demand for contributor incentives, but most are designed around centralized payment rails, sponsorship funding, or campaign-based grants. PullPay focuses specifically on automated contribution-level settlement using Soroban smart contracts and Stellar USDC.

| Platform           | Primary Focus                                      |
| :----------------- | :------------------------------------------------- |
| **Algora**   | GitHub bounties via traditional payment rails      |
| **Polar.sh** | Open-source monetization and sponsorship           |
| **Gitcoin**  | Community funding rounds and public goods grants   |
| **PullPay**  | Automated contribution-level settlement on Stellar |

PullPay complements these existing approaches by providing a lightweight, GitHub-native reward workflow built around Soroban escrow and Stellar USDC settlements.

### 3.9 Practical Use Cases

| Use Case                        | Example                                                                                                                      |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| **SDK bug fixes**         | Stellar SDK maintainer posts $20 reward for a bug fix. Contributor submits PR. On merge, $20 USDC is released automatically. |
| **Documentation rewards** | Community program offers $5–$10 for documentation improvements. Only viable because Stellar fees are <$0.01.                |
| **Hackathon follow-ups**  | Organizer pre-funds rewards via Soroban escrow. Winners are paid automatically when their code is merged.                    |
| **Ambassador campaigns**  | Chapter leads run transparent bounty campaigns with verifiable on-chain settlement.                                          |

### 3.10 Open Source Commitment

All source code will be released under the **MIT License**:

- Soroban smart contracts (Rust)
- GitHub workflow templates
- Cloudflare Worker validation adapter
- SvelteKit web application
- Maintainer onboarding documentation

After this grant, any project can use PullPay without permission, payment, or dependency on Altruisoft.

### 3.11 Sustainability

This sprint introduces **no protocol fee**. The focus is entirely on building a working, open-source tool. Future sustainability and commercialization are outside the scope of this Instaward.

### 3.12 Initial Adoption Targets

During the sprint, PullPay will be validated with:

- 3 public GitHub repositories
- 5 unique contributors
- 5 successful reward settlements on Testnet

Candidate validation repositories include Stellar community tooling, open-source developer utilities, and ambassador-led repositories. The validation repositories will be selected from publicly accessible open-source projects to ensure the integration process can be replicated by other Stellar ecosystem teams after the sprint.

### 3.13 Why This Fits Instawards

This sprint focuses on delivering a narrowly scoped, testnet-ready implementation of contributor reward infrastructure. The objective is not to build a complete bounty marketplace, but to validate a reusable piece of ecosystem tooling that Stellar projects can adopt immediately after completion.

### 3.14 Validation Scope

PullPay validates only:

- Repository association (the PR belongs to the correct repo)
- Pull request existence (the PR is real)
- Pull request merged status (the PR was merged, not just closed)

PullPay intentionally does **not** evaluate:

- Code quality
- Contribution value
- Contributor intent

Maintainers remain fully responsible for deciding which Pull Requests to merge. PullPay automates the payment — not the judgment.

### 3.15 How It Works

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

| **Deliverable** | **Description (What will be built or produced?)**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Why this matters**                                                                                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Deliverable 1         | **Soroban Reward Escrow Contract:** A Soroban smart contract deployed on Testnet supporting: create reward, deposit USDC, assign contributor, release on verified merge, refund, and timeout-based automatic refund.                                                                                                                                                                                                                                                                                                                                                             | The on-chain settlement layer. Funds are locked upfront (contributor trusts the reward exists), released automatically on merge (no manual payout), and refunded on timeout (maintainer is protected). |
| Deliverable 2         | **GitHub Reward Automation Toolkit:** A reusable GitHub workflow template (`pullpay.yml`) and Cloudflare Worker that verifies PR merge status via official GitHub API and triggers the Soroban contract. Settlement requests are authenticated through GitHub workflow executions and independently verified against live GitHub API data before triggering Soroban settlement. The worker acts solely as a verification layer and does not hold custody of funds. **Result:** A maintainer can automate contributor payouts by adding a single YAML file to their repo. | This is the core adoption mechanism. It meets maintainers where they already work — inside GitHub — with zero Web3 expertise required.                                                               |
| Deliverable 3         | **Reward Creation & Claim Interface:** A minimal SvelteKit web interface (deployed on Testnet) allowing maintainers to create rewards linked to GitHub Issues, and contributors to register wallet addresses and submit associated PR links.                                                                                                                                                                                                                                                                                                                                     | A focused entry point for creating and claiming rewards. No dashboards, no analytics, no auth system.                                                                                                  |
| Deliverable 4         | **Ecosystem Validation Package:** Demonstrated end-to-end operation across at least 3 publicly accessible repositories with a minimum of 5 successful reward settlements and 5 unique Stellar wallets. Validation will be performed using publicly accessible open-source repositories and contributors participating during the sprint. Includes a demo video showing both maintainer and contributor perspectives, and a public integration guide.                                                                                                                             | Proves the full contributor reward lifecycle works end-to-end and generates real on-chain Stellar activity. Reviewer can verify every settlement on Stellar Testnet Explorer.                          |

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

| **Requested Budget Amount**                                                                                                                                                                                                                                                                                                                                      | **Rationale for Budget Request** |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **$5,000** | 30 days of full development across a 3-person team:`<br>`• Soroban escrow contract & Freighter integration (Web3 Backend): $1,700`<br>`• SvelteKit Reward Portal & UX flows (Frontend): $1,500`<br>`• GitHub Automation Toolkit & Cloudflare Worker (Fullstack): $1,500`<br>`• Infrastructure, testing, and demo video production: $300 |                                        |

## 5. 30-Day Execution Plan & Timeline

### 5.1 Weekly Breakdown

| **Week** | **Planned Work**                                                                                                                 | **Expected Output**                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Week 1         | Soroban contract development (escrow, release, refund, timeout logic), unit tests, and Freighter wallet integration.                   | Reward escrow contract deployed on Testnet with passing unit tests.                               |
| Week 2         | Build GitHub workflow template (`pullpay.yml`) and Cloudflare Worker for GitHub API merge verification. Connect to Soroban contract. | A merged PR triggers automatic on-chain payout on Testnet.                                        |
| Week 3         | Build SvelteKit reward interface: maintainer creates reward, contributor claims and submits PR link.                                   | Working web interface where rewards can be created, claimed, and settlement status can be viewed. |
| Week 4         | End-to-end testing, bug fixes, conduct 5 live Testnet settlements across 3 repositories, and record demo video.                        | 5 verified settlements, demo video complete, documentation ready.                                 |

## 6. Evidence of Completion (Required)

> **Important guidance:** Evidence should lear, verifiable, and easy to review by the Ambassador Chapter Lead **with minimal technical expertise**.

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
