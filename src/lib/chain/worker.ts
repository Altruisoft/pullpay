/** Worker index API — cached reads; chain is the source of truth. */
import { config } from '$lib/config';
import type { RewardView } from './types';

export async function listRewards(filter?: {
	repo?: string;
	maintainer?: string;
}): Promise<{ rewards: RewardView[]; cached: boolean }> {
	const params = new URLSearchParams();
	if (filter?.repo) params.set('repo', filter.repo);
	if (filter?.maintainer) params.set('maintainer', filter.maintainer);
	const res = await fetch(`${config.workerUrl}/rewards?${params}`);
	if (!res.ok) throw new Error(`Worker index unavailable (${res.status})`);
	return res.json();
}

export async function getRewardById(id: number): Promise<RewardView | null> {
	const { rewards } = await listRewards();
	return rewards.find((r) => r.id === id) ?? null;
}

export async function retryPayout(id: number, prNumber: number): Promise<{ txHash: string }> {
	const res = await fetch(`${config.workerUrl}/retry/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ pr_number: prNumber })
	});
	const data = (await res.json()) as {
		settled?: Array<{ txHash: string }>;
		error?: string;
	};
	if (!res.ok || !data.settled?.length) {
		throw new Error(data.error ?? 'Retry failed');
	}
	return { txHash: data.settled[0].txHash };
}
