/**
 * PullPay verification oracle — Cloudflare Worker.
 *
 * Routes (docs/TECH-DESIGN.md §4.2):
 *   POST /verify      OIDC-authenticated settlement trigger (from pullpay.yml)
 *   POST /retry/:id   Re-run verification for a stuck reward (public data only)
 *   GET  /rewards     KV-cached reward index for the web dashboard
 *   GET  /health      Liveness
 */
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { verifyGithubOidc, OidcError } from './oidc';
import { verifyMergedPr, GithubVerificationError, fetchPr, linkedIssues, resolveClaimAddress } from './github';
import {
	findFundedRewards,
	getReward,
	getNextId,
	isValidStellarAddress,
	submitRelease,
	type StellarEnv,
	type RewardView
} from './stellar';

type Bindings = StellarEnv & {
	HORIZON_URL: string;
	OIDC_AUDIENCE: string;
	GITHUB_TOKEN?: string;
	REWARDS_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use('*', cors());

app.get('/health', (c) => c.json({ ok: true, service: 'pullpay-verify' }));

/** Settlement trigger. Auth: GitHub Actions OIDC bearer token. */
app.post('/verify', async (c) => {
	const env = c.env;
	const auth = c.req.header('Authorization') ?? '';
	if (!auth.startsWith('Bearer ')) {
		return c.json({ error: 'Missing OIDC bearer token' }, 401);
	}

	let body: { repo?: string; pr_number?: number };
	try {
		body = await c.req.json();
	} catch {
		return c.json({ error: 'Invalid JSON body' }, 400);
	}
	if (!body.repo || !body.pr_number) {
		return c.json({ error: 'Body requires { repo, pr_number }' }, 400);
	}

	try {
		// 1. Authenticate: JWT signature + repository claim binding.
		const claims = await verifyGithubOidc(auth.slice(7), env.OIDC_AUDIENCE);
		if (claims.repository !== body.repo.toLowerCase()) {
			return c.json(
				{ error: `OIDC repository claim (${claims.repository}) does not match body.repo` },
				403
			);
		}

		const result = await settle(env, claims.repository, body.pr_number);
		return c.json(result, result.settled.length > 0 ? 200 : 409);
	} catch (err) {
		return errorResponse(c, err);
	}
});

/** Public retry — safe because it re-derives everything from public data. */
app.post('/retry/:id', async (c) => {
	const env = c.env;
	const id = Number(c.req.param('id'));
	if (!Number.isInteger(id) || id < 0) return c.json({ error: 'Invalid id' }, 400);

	try {
		const reward = await getReward(env, id);
		if (reward.status !== 'Funded') {
			return c.json({ error: `Reward is ${reward.status}, nothing to retry` }, 409);
		}
		// Re-verify from GitHub: find the merged PR that closes this issue.
		// The caller supplies pr_number for determinism.
		const { pr_number } = (await c.req.json().catch(() => ({}))) as { pr_number?: number };
		if (!pr_number) return c.json({ error: 'Body requires { pr_number }' }, 400);

		const pr = await fetchPr(reward.repo, pr_number, env.GITHUB_TOKEN);
		if (!pr.merged) return c.json({ error: 'PR is not merged' }, 422);
		if (!linkedIssues(pr.body).includes(reward.issue_number)) {
			return c.json({ error: 'PR does not close the bountied issue' }, 422);
		}
		const address = await resolveClaimAddress(reward.repo, pr, env.GITHUB_TOKEN);
		if (!isValidStellarAddress(address)) {
			return c.json({ error: `Claim marker address is invalid: ${address}` }, 422);
		}

		const txHash = await submitRelease(env, id, address, pr_number);
		await indexReward(env, id);
		return c.json({ settled: [{ id, txHash, contributor: address }] });
	} catch (err) {
		return errorResponse(c, err);
	}
});

/** Dashboard index. Chain remains the source of truth; KV is a cache. */
app.get('/rewards', async (c) => {
	const env = c.env;
	const repo = c.req.query('repo')?.toLowerCase();
	const maintainer = c.req.query('maintainer');

	const cached = await env.REWARDS_KV.get('index', 'json');
	let index = (cached ?? []) as RewardView[];

	// Refresh if stale (>60s) or empty.
	const stamp = await env.REWARDS_KV.get('index:updated');
	if (!stamp || Date.now() - Number(stamp) > 60_000) {
		index = await rebuildIndex(env);
	}

	let out = index;
	if (repo) out = out.filter((r) => r.repo.toLowerCase() === repo);
	if (maintainer) out = out.filter((r) => r.maintainer === maintainer);
	return c.json({ rewards: out, cached: Boolean(stamp) });
});

// ---- internals ----

async function settle(env: Bindings, repo: string, prNumber: number) {
	// 2–4. Independent GitHub verification + claim resolution.
	const verified = await verifyMergedPr(repo, prNumber, env.GITHUB_TOKEN);
	if (!isValidStellarAddress(verified.contributorAddress)) {
		throw new GithubVerificationError(
			`Claim marker contains an invalid Stellar address: ${verified.contributorAddress}`
		);
	}

	// Reward lookup: Funded rewards on this repo matching a linked issue.
	const rewards = await findFundedRewards(env, repo, verified.issueNumbers);
	if (rewards.length === 0) {
		return {
			settled: [] as Array<{ id: number; txHash: string; contributor: string }>,
			message: `No Funded reward found for ${repo} issues [${verified.issueNumbers.join(', ')}] — already settled or never created`
		};
	}

	// 6. On-chain release for each matched reward (usually exactly one).
	const settled = [];
	for (const r of rewards) {
		const txHash = await submitRelease(env, r.id, verified.contributorAddress, prNumber);
		settled.push({ id: r.id, txHash, contributor: verified.contributorAddress });
		await audit(env, r.id, { repo, prNumber, txHash, author: verified.authorLogin });
		await indexReward(env, r.id);
	}
	return { settled, message: `Settled ${settled.length} reward(s)` };
}

async function rebuildIndex(env: Bindings): Promise<RewardView[]> {
	const next = await getNextId(env);
	const index: RewardView[] = [];
	for (let id = 0; id < next; id++) {
		try {
			index.push(await getReward(env, id));
		} catch {
			/* archived */
		}
	}
	await env.REWARDS_KV.put('index', JSON.stringify(index));
	await env.REWARDS_KV.put('index:updated', String(Date.now()));
	return index;
}

async function indexReward(env: Bindings, id: number) {
	try {
		await rebuildIndex(env);
	} catch (err) {
		console.error(JSON.stringify({ evt: 'index_refresh_failed', id, err: String(err) }));
	}
}

async function audit(env: Bindings, id: number, record: Record<string, unknown>) {
	await env.REWARDS_KV.put(
		`audit:${id}:${Date.now()}`,
		JSON.stringify({ ...record, at: new Date().toISOString() })
	);
}

function errorResponse(c: { json: (o: object, s?: number) => Response }, err: unknown) {
	if (err instanceof OidcError) {
		console.error(JSON.stringify({ evt: 'oidc_reject', err: err.message }));
		return c.json({ error: err.message }, 401);
	}
	if (err instanceof GithubVerificationError) {
		console.error(JSON.stringify({ evt: 'verify_reject', err: err.message }));
		return c.json({ error: err.message }, err.status as 404 | 422 | 502);
	}
	console.error(JSON.stringify({ evt: 'internal_error', err: String(err) }));
	return c.json({ error: 'Internal verification error' }, 500);
}

export default app;
