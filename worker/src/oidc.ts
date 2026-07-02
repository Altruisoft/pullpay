/**
 * GitHub Actions OIDC token validation.
 *
 * The `pullpay.yml` workflow requests a JWT from GitHub's OIDC provider
 * (issuer https://token.actions.githubusercontent.com) with audience
 * "pullpay" and sends it as a Bearer token. We verify the signature against
 * GitHub's JWKS and bind the request to the `repository` claim — a caller
 * cannot impersonate another repository without compromising GitHub itself.
 */
import { createRemoteJWKSet, jwtVerify } from 'jose';

const GITHUB_OIDC_ISSUER = 'https://token.actions.githubusercontent.com';
const JWKS_URL = `${GITHUB_OIDC_ISSUER}/.well-known/jwks`;

// Module-scope cache: persists across requests within a Worker isolate.
let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

export interface OidcClaims {
	repository: string; // "owner/repo"
	repository_owner: string;
	run_id: string;
	ref: string;
	workflow: string;
}

export class OidcError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'OidcError';
	}
}

export async function verifyGithubOidc(token: string, audience: string): Promise<OidcClaims> {
	if (!jwks) {
		jwks = createRemoteJWKSet(new URL(JWKS_URL), {
			cacheMaxAge: 10 * 60 * 1000 // 10 min; jose re-fetches on unknown kid
		});
	}

	let payload: Record<string, unknown>;
	try {
		const result = await jwtVerify(token, jwks, {
			issuer: GITHUB_OIDC_ISSUER,
			audience
		});
		payload = result.payload as Record<string, unknown>;
	} catch (err) {
		throw new OidcError(`OIDC token rejected: ${(err as Error).message}`);
	}

	const repository = payload['repository'];
	if (typeof repository !== 'string' || !/^[\w.-]+\/[\w.-]+$/.test(repository)) {
		throw new OidcError('OIDC token missing valid `repository` claim');
	}

	return {
		repository: repository.toLowerCase(),
		repository_owner: String(payload['repository_owner'] ?? ''),
		run_id: String(payload['run_id'] ?? ''),
		ref: String(payload['ref'] ?? ''),
		workflow: String(payload['workflow'] ?? '')
	};
}
