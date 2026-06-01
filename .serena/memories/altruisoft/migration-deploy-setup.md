# pullpay — Migration & CI/CD Setup

## Repo Migration
- **From:** Personal repo `Ramasanjaya22/pullpay`
- **To:** GitHub org `Altruisoft/pullpay`
- **Method:** `git remote set-url origin` + `git push -u origin main`
- **Notes:** Branch renamed from `master` to `main`

## CI/CD — Cloudflare Pages Deploy
- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push ke branch `main`
- **Action:** `cloudflare/wrangler-action@v3`
- **Wrangler:** v4 (`wranglerVersion: "4"`)
- **Build:** `oven-sh/setup-bun@v1` → `bun install` → `bun run build`
- **Output dir:** `.svelte-kit/cloudflare` (SvelteKit adapter-cloudflare)
- **Command:** `pages deploy .svelte-kit/cloudflare --project-name=pullpay`
- **Secrets needed:**
  - `CLOUDFLARE_API_TOKEN` — API token dengan permission **Cloudflare Pages → Edit**
  - `CLOUDFLARE_ACCOUNT_ID` — `2e88721f906b9a31ef9c0eac319be6a1`
  - `gitHubToken: ${{ secrets.GITHUB_TOKEN }}` (built-in)

## Project Config
- `wrangler.toml` — name, compatibility_date, pages_build_output_dir
- `svelte.config.js` — `@sveltejs/adapter-cloudflare`
- Svelte 5 + runes mode + Tailwind CSS v4 + motion

## Troubleshooting
- **First failure:** Wrangler v3.90.0 too old → pinned `wranglerVersion: "4"`
- **Second failure:** API token missing Pages permission → dibuat custom token baru
- **Token type:** Custom API Token, scope **Account → Cloudflare Pages → Edit**
