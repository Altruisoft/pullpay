#!/usr/bin/env bash
# PullPay Testnet deployment — contract build, deploy, initialize.
# Prereqs: stellar-cli >= 22 (`cargo install stellar-cli`), rust wasm target
#          (`rustup target add wasm32v1-none` or wasm32-unknown-unknown).
# Usage:   ./scripts/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

NETWORK="testnet"
RPC="https://soroban-testnet.stellar.org"
PASSPHRASE="Test SDF Network ; September 2015"

# ---- 1. Identities (created once; funded via Friendbot) ----
for who in pullpay-admin pullpay-oracle pullpay-issuer pullpay-maintainer-demo; do
  if ! stellar keys address "$who" >/dev/null 2>&1; then
    stellar keys generate "$who" --network "$NETWORK" --fund
    echo "Created + funded identity: $who → $(stellar keys address "$who")"
  fi
done

ADMIN=$(stellar keys address pullpay-admin)
ORACLE=$(stellar keys address pullpay-oracle)
ISSUER=$(stellar keys address pullpay-issuer)

# ---- 2. Test USDC: classic asset wrapped as SAC (TDD §7.3) ----
USDC_ID=$(stellar contract asset deploy \
  --asset "USDC:$ISSUER" \
  --source-account pullpay-issuer \
  --network "$NETWORK" 2>/dev/null || \
  stellar contract id asset --asset "USDC:$ISSUER" --network "$NETWORK")
echo "USDC SAC contract: $USDC_ID"

# ---- 3. Build + deploy escrow contract ----
stellar contract build --manifest-path contracts/reward-escrow/Cargo.toml
WASM=contracts/reward-escrow/target/wasm32v1-none/release/pullpay_reward_escrow.wasm
[ -f "$WASM" ] || WASM=contracts/reward-escrow/target/wasm32-unknown-unknown/release/pullpay_reward_escrow.wasm
[ -f "$WASM" ] || WASM=target/wasm32v1-none/release/pullpay_reward_escrow.wasm

CONTRACT_ID=$(stellar contract deploy \
  --wasm "$WASM" \
  --source-account pullpay-admin \
  --network "$NETWORK")
echo "Escrow contract: $CONTRACT_ID"

# ---- 4. Initialize ----
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account pullpay-admin \
  --network "$NETWORK" \
  -- initialize --admin "$ADMIN" --oracle "$ORACLE" --token "$USDC_ID"

# ---- 5. Record deployment ----
mkdir -p docs
cat > docs/DEPLOYMENTS.md <<EOF
# PullPay Testnet Deployments

| Item | Value |
|---|---|
| Network | Stellar Testnet (\`$PASSPHRASE\`) |
| RPC | $RPC |
| Escrow contract | \`$CONTRACT_ID\` |
| USDC SAC | \`$USDC_ID\` |
| USDC issuer | \`$ISSUER\` |
| Admin | \`$ADMIN\` |
| Oracle | \`$ORACLE\` |
| Deployed | $(date -u +"%Y-%m-%d %H:%M UTC") |

Stellar Expert: https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID
EOF
echo "Recorded docs/DEPLOYMENTS.md"

echo ""
echo "NEXT STEPS:"
echo "  1. wrangler kv namespace create REWARDS_KV        # paste id into worker/wrangler.toml"
echo "  2. Set CONTRACT_ID=$CONTRACT_ID in worker/wrangler.toml [vars]"
echo "  3. wrangler secret put ORACLE_SECRET               # value: stellar keys show pullpay-oracle"
echo "  4. cd worker && npm install && npm run deploy"
echo "  5. Set PUBLIC_CONTRACT_ID / PUBLIC_USDC_* in .env for the web app"
