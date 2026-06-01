---
name: pullpay
description: Agent instructions for developing the PullPay ecosystem infrastructure
---

# pullpay

Context and instructions for developing PullPay, an automated contributor reward infrastructure for the Stellar network.

## When to use

Use this skill whenever working on the PullPay repository to understand the project's core architecture, positioning, scope, and terminology.

## Project Context

PullPay is **not** a centralized bounty marketplace or a startup pitching a massive web application. It is a narrowly-scoped, reusable piece of **public ecosystem infrastructure** designed to onboard developers into the Stellar ecosystem by converting GitHub contributions into on-chain Stellar activity (USDC transfers, wallet creation, and Soroban contract invocations).

**Team:** Altruisoft (Builder), Indonesia Ambassador Chapter.
**Funding:** SCF Instaward — $5,000, 30-day sprint.

## Core Architecture

PullPay consists of four specific deliverables:

1. **Soroban Reward Escrow Contract (Rust):** Handles secure locking of USDC, automated releasing upon verified PR merge, timeout-based automatic refunding, and contributor assignment. Deployed on Stellar Testnet.
2. **GitHub Reward Automation Toolkit:** A reusable `pullpay.yml` GitHub workflow template and a Cloudflare Worker. This layer MUST NOT hold funds. It authenticates settlement requests through GitHub workflow executions and independently verifies PR merge status against the live GitHub API before triggering the Soroban contract.
3. **Reward Creation & Claim Interface (SvelteKit):** A minimalistic frontend interface deployed on Testnet. Maintainers create rewards linked to GitHub Issues. Contributors register Freighter wallet addresses and submit PR links. Do not build complex dashboards, analytics, or proprietary authentication systems.
4. **Ecosystem Validation Package:** End-to-end demonstration across ≥3 public repositories with ≥5 successful reward settlements and ≥5 unique Stellar wallets. Includes a demo video and public integration guide.

## Validation Scope

PullPay validates only:
- Repository association (the PR belongs to the correct repo)
- Pull request existence (the PR is real)
- Pull request merged status (the PR was merged, not just closed)

PullPay intentionally does **not** evaluate code quality, contribution value, or contributor intent. Maintainers remain fully responsible for deciding which Pull Requests to merge. PullPay automates the payment — not the judgment.

## Development Instructions

1. **Tech Stack:** SvelteKit (Svelte 5 Runes), Tailwind CSS v4, TypeScript, Bun, Cloudflare Workers/Pages, and Stellar Soroban (Rust).
2. **Design Philosophy:** Code should be minimal, secure, and easily verifiable. The UI should be extremely straightforward, reflecting an execution-oriented infrastructure tool rather than a consumer SaaS.
3. **Security:** Always maintain the trust model. The Cloudflare worker is only an oracle/validator. Maintainers decide what to merge; PullPay only automates the payment layer upon verification.
4. **Scope Control:** Avoid adding feature creep (e.g., reputation scoring, complex DAOs, multi-chain support, decentralized arbitration, mobile apps). The focus is entirely on a seamless GitHub-to-Soroban pipeline for Stellar.
5. **License:** All source code is MIT Licensed.

## Terminology Rules

| Term | Correct Usage | Avoid |
|---|---|---|
| Product Category | Ecosystem infrastructure, Reward automation | "Startup", "Bounty marketplace" |
| Validation | GitHub API verification, PR merge verification | "Quality checking", "Code review" |
| Security | Trust-minimized, verification layer | "Fully decentralized", "Trustless" |
| Users | Maintainer, Contributor | "Buyer", "Seller", "Customer" |
