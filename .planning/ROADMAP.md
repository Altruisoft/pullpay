# Roadmap: PullPay 30-Day Instaward Scope

## Deliverable 1: Soroban Reward Escrow Contract
- [ ] Build Soroban smart contract in Rust
- [ ] Implement reward creation and USDC deposit
- [ ] Implement assign contributor logic
- [ ] Implement release on verified merge
- [ ] Implement timeout-based automatic refund
- [ ] Write unit tests and deploy to Testnet

## Deliverable 2: GitHub Reward Automation Toolkit
- [ ] Create reusable GitHub workflow template (`pullpay.yml`)
- [ ] Build Cloudflare Worker for PR merge verification via GitHub API
- [ ] Implement security boundaries (authenticate workflow execution)
- [ ] Connect Cloudflare Worker to trigger Soroban contract release

## Deliverable 3: Reward Creation & Claim Interface
- [ ] Build minimal SvelteKit frontend (pullpay.dev/testnet)
- [ ] Build reward creation flow for maintainers
- [ ] Build reward claim flow for contributors (Freighter wallet connection + PR link submission)
- [ ] Display settlement status

## Deliverable 4: Ecosystem Validation Package
- [ ] Conduct 5 successful reward settlements across 3 public repositories
- [ ] Validate with 5 unique Stellar wallets
- [ ] Record end-to-end demo video
- [ ] Publish public integration guide
- [ ] Open-source all code under MIT License
