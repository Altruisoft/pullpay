/**
 * Independent GitHub verification.
 *
 * Regardless of what the triggering workflow asserts, every fact is
 * re-fetched from api.github.com: PR existence, merged status, repo binding,
 * issue linkage (closing keywords), and the claim marker — which is only
 * accepted when authored by the PR author.
 */

const API = 'https://api.github.com';
const MARKER_RE = /pullpay:(G[A-Z2-7]{55})/g;
const CLOSING_RE = /\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s*:?\s+#(\d+)/gi;

export class GithubVerificationError extends Error {
	constructor(
		message: string,
		public readonly status = 422
	) {
		super(message);
		this.name = 'GithubVerificationError';
	}
}

interface PrData {
	merged: boolean;
	number: number;
	body: string | null;
	authorLogin: string;
	baseRepoFullName: string;
}

async function gh(path: string, token?: string): Promise<Response> {
	return fetch(`${API}${path}`, {
		headers: {
			Accept: 'application/vnd.github+json',
			'User-Agent': 'pullpay-verifier',
			'X-GitHub-Api-Version': '2022-11-28',
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	});
}

export async function fetchPr(repo: string, prNumber: number, token?: string): Promise<PrData> {
	const res = await gh(`/repos/${repo}/pulls/${prNumber}`, token);
	if (res.status === 404) throw new GithubVerificationError(`PR ${repo}#${prNumber} not found`, 404);
	if (!res.ok) throw new GithubVerificationError(`GitHub API error ${res.status}`, 502);
	const pr = (await res.json()) as {
		merged: boolean;
		number: number;
		body: string | null;
		user: { login: string };
		base: { repo: { full_name: string } };
	};
	return {
		merged: pr.merged,
		number: pr.number,
		body: pr.body,
		authorLogin: pr.user.login,
		baseRepoFullName: pr.base.repo.full_name.toLowerCase()
	};
}

/** Issue numbers referenced by closing keywords in the PR body. */
export function linkedIssues(body: string | null): number[] {
	if (!body) return [];
	const out: number[] = [];
	for (const m of body.matchAll(CLOSING_RE)) out.push(Number(m[1]));
	return out;
}

function lastMarker(text: string | null): string | null {
	if (!text) return null;
	let found: string | null = null;
	for (const m of text.matchAll(MARKER_RE)) found = m[1];
	return found;
}

/**
 * Resolve the contributor's Stellar address from claim markers.
 * Only markers authored by the PR author count; the most recent wins
 * (comments are returned oldest-first; PR body is treated as oldest).
 */
export async function resolveClaimAddress(
	repo: string,
	pr: PrData,
	token?: string
): Promise<string> {
	let address: string | null = null;

	if (lastMarker(pr.body)) address = lastMarker(pr.body);

	const res = await gh(`/repos/${repo}/issues/${pr.number}/comments?per_page=100`, token);
	if (res.ok) {
		const comments = (await res.json()) as Array<{ body: string; user: { login: string } }>;
		for (const c of comments) {
			if (c.user.login !== pr.authorLogin) continue; // author-only rule
			const m = lastMarker(c.body);
			if (m) address = m;
		}
	}

	if (!address) {
		throw new GithubVerificationError(
			`No claim marker found. The PR author (@${pr.authorLogin}) must add ` +
				`"pullpay:<G...address>" to the PR description or a comment. ` +
				`Generate one at https://pullpay.pages.dev/app/claim`
		);
	}
	return address;
}

export interface VerifiedMerge {
	prNumber: number;
	issueNumbers: number[];
	contributorAddress: string;
	authorLogin: string;
}

/** Full pipeline: PR real + merged + belongs to repo + linked issues + claim. */
export async function verifyMergedPr(
	repo: string,
	prNumber: number,
	token?: string
): Promise<VerifiedMerge> {
	const pr = await fetchPr(repo, prNumber, token);
	if (pr.baseRepoFullName !== repo.toLowerCase()) {
		throw new GithubVerificationError('PR does not belong to the asserted repository');
	}
	if (!pr.merged) {
		throw new GithubVerificationError(`PR #${prNumber} is not merged`);
	}
	const issues = linkedIssues(pr.body);
	if (issues.length === 0) {
		throw new GithubVerificationError(
			`PR #${prNumber} does not reference an issue via closing keywords ` +
				`(e.g. "closes #42" in the PR description)`
		);
	}
	const contributorAddress = await resolveClaimAddress(repo, pr, token);
	return { prNumber: pr.number, issueNumbers: issues, contributorAddress, authorLogin: pr.authorLogin };
}
