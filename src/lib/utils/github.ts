/** GitHub URL parsing + claim marker helpers (UI-SPEC §3–4). */

export interface ParsedIssue {
	repo: string; // "owner/repo" lowercase
	issueNumber: number;
	url: string;
}

export interface ParsedPr {
	repo: string;
	prNumber: number;
	url: string;
}

const ISSUE_RE = /^https?:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)\/?$/i;
const PR_RE = /^https?:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)\/?$/i;

export function parseIssueUrl(url: string): ParsedIssue | null {
	const m = url.trim().match(ISSUE_RE);
	if (!m) return null;
	return {
		repo: `${m[1]}/${m[2]}`.toLowerCase(),
		issueNumber: Number(m[3]),
		url: url.trim()
	};
}

export function isPrUrl(url: string): boolean {
	return PR_RE.test(url.trim());
}

export function parsePrUrl(url: string): ParsedPr | null {
	const m = url.trim().match(PR_RE);
	if (!m) return null;
	return { repo: `${m[1]}/${m[2]}`.toLowerCase(), prNumber: Number(m[3]), url: url.trim() };
}

export function claimMarker(address: string): string {
	return `pullpay:${address}`;
}

/** Non-blocking issue title fetch (unauthenticated, 60 req/h). */
export async function fetchIssueTitle(repo: string, issueNumber: number): Promise<string | null> {
	try {
		const res = await fetch(`https://api.github.com/repos/${repo}/issues/${issueNumber}`, {
			headers: { Accept: 'application/vnd.github+json' }
		});
		if (!res.ok) return null;
		const data = (await res.json()) as { title?: string };
		return data.title ?? null;
	} catch {
		return null;
	}
}
