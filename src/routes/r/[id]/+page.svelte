<script lang="ts">
	import { page } from '$app/state';
	import { walletStore } from '$lib/stores/wallet.svelte';
	import { getRewardById } from '$lib/chain/worker';
	import { refundReward, extendDeadline } from '$lib/chain/contract';
	import { config, fromBaseUnits } from '$lib/config';
	import { formatUSDC } from '$lib/utils/stellar';
	import type { RewardView } from '$lib/chain/types';
	import { uiStatus } from '$lib/chain/types';
	import StatusChip from '$lib/components/app/StatusChip.svelte';
	import TxBadge from '$lib/components/app/TxBadge.svelte';
	import Timeline from '$lib/components/app/Timeline.svelte';
	import type { TimelineNode } from '$lib/components/app/Timeline.svelte';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import { reveal } from '$lib/motion';

	let id = $derived(Number(page.params.id));
	let reward = $state<RewardView | null>(null);
	let loading = $state(true);
	let notFound = $state(false);
	let actionBusy = $state(false);
	let actionMsg = $state<string | null>(null);

	$effect(() => {
		if (!Number.isInteger(id) || id < 0) {
			notFound = true;
			loading = false;
			return;
		}
		load();
	});

	async function load() {
		loading = true;
		try {
			reward = await getRewardById(id);
			notFound = reward === null;
		} catch {
			notFound = reward === null;
		} finally {
			loading = false;
		}
	}

	let status = $derived(reward ? uiStatus(reward) : null);
	let isMaintainer = $derived(
		Boolean(reward && walletStore.isConnected && walletStore.address === reward.maintainer)
	);
	let refundable = $derived(status === 'expired');

	let nodes = $derived.by<TimelineNode[]>(() => {
		if (!reward) return [];
		const amount = formatUSDC(fromBaseUnits(reward.amount));
		const list: TimelineNode[] = [
			{ title: `Reward funded — ${amount} locked in escrow`, state: 'done' }
		];
		if (reward.status === 'Releasable') {
			list.push({
				title: `Merge verified — timelock until ${new Date((reward.releasable_at ?? 0) * 1000).toLocaleString()}`,
				meta: reward.pr_number ? `PR #${reward.pr_number}` : undefined,
				state: 'done'
			});
			list.push({ title: 'Final settlement', state: 'pending' });
		} else if (reward.status === 'Released') {
			if (reward.pr_number) {
				list.push({ title: `Merge verified — PR #${reward.pr_number}`, state: 'done' });
			}
			list.push({
				title: `Settled — ${amount} sent to ${reward.contributor?.slice(0, 5)}…${reward.contributor?.slice(-4)}`,
				state: 'done'
			});
		} else if (reward.status === 'Refunded') {
			list.push({ title: 'Deadline passed — refunded to maintainer', state: 'done' });
		} else {
			list.push({ title: 'Awaiting merged pull request', state: 'pending' });
			list.push({ title: 'Automatic settlement', state: 'pending' });
		}
		return list;
	});

	async function doRefund() {
		if (!reward || !walletStore.address) return;
		if (!confirm(`Refund ${formatUSDC(fromBaseUnits(reward.amount))} back to your wallet?`)) return;
		actionBusy = true;
		actionMsg = null;
		try {
			const tx = await refundReward(walletStore.address, reward.id);
			actionMsg = `Refunded — tx ${tx.slice(0, 8)}…`;
			await load();
		} catch (e) {
			actionMsg = (e as Error).message;
		} finally {
			actionBusy = false;
		}
	}

	async function doExtend() {
		if (!reward || !walletStore.address) return;
		actionBusy = true;
		actionMsg = null;
		try {
			const tx = await extendDeadline(walletStore.address, reward.id, reward.deadline + 30 * 86_400);
			actionMsg = `Deadline extended 30 days — tx ${tx.slice(0, 8)}…`;
			await load();
		} catch (e) {
			actionMsg = (e as Error).message;
		} finally {
			actionBusy = false;
		}
	}
</script>

<svelte:head>
	<title>Reward #{page.params.id} - PullPay</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-6 py-16" use:reveal={{ y: 20 }}>
	{#if loading}
		<div class="space-y-4">
			{#each [0, 1, 2] as i (i)}
				<div class="h-16 animate-pulse rounded-xl bg-crx-muted"></div>
			{/each}
		</div>
	{:else if notFound || !reward}
		<div class="space-y-4 text-center">
			<p class="text-xs uppercase tracking-[0.2em] text-crx-gray-500">Reward #{page.params.id}</p>
			<h1 class="text-3xl font-medium tracking-tight text-crx-black">
				Reward not found on Testnet
			</h1>
			<p class="text-crx-gray-500">
				It may never have existed, or its on-chain entry has expired.
			</p>
			<a href="/" class="inline-block font-medium text-crx-orange hover:underline">PullPay home ↗</a>
		</div>
	{:else}
		<div class="mb-10 space-y-4">
			<p class="text-xs uppercase tracking-[0.2em] text-crx-gray-500">Reward #{reward.id}</p>
			<h1 class="text-3xl font-medium tracking-tight text-crx-black">
				{reward.repo} · issue #{reward.issue_number}
			</h1>
			{#if status}<StatusChip {status} releasableAt={reward.releasable_at} />{/if}
		</div>

		<div class="mb-12 rounded-3xl border border-crx-border-subtle bg-white p-8 shadow-sm">
			<Timeline {nodes} />
		</div>

		<div class="divide-y divide-crx-border-subtle rounded-3xl border border-crx-border-subtle bg-white px-8 shadow-sm">
			{#each [{ label: 'Contract', badge: config.contractId, kind: 'contract' }, { label: 'Maintainer', badge: reward.maintainer, kind: 'address' }, ...(reward.contributor ? [{ label: 'Contributor', badge: reward.contributor, kind: 'address' }] : [])] as row (row.label)}
				<div class="grid grid-cols-1 items-center gap-2 py-4 sm:grid-cols-[9rem_1fr]">
					<span class="text-sm font-medium text-crx-gray-500">{row.label}</span>
					<TxBadge value={row.badge} kind={row.kind as 'contract' | 'address'} />
				</div>
			{/each}
			<div class="grid grid-cols-1 items-center gap-2 py-4 sm:grid-cols-[9rem_1fr]">
				<span class="text-sm font-medium text-crx-gray-500">Repository</span>
				<a
					href="https://github.com/{reward.repo}"
					target="_blank"
					rel="noopener"
					class="text-sm font-medium text-crx-black hover:underline">{reward.repo} ↗</a
				>
			</div>
			<div class="grid grid-cols-1 items-center gap-2 py-4 sm:grid-cols-[9rem_1fr]">
				<span class="text-sm font-medium text-crx-gray-500">Amount</span>
				<span class="text-sm tabular-nums text-crx-black"
					>{formatUSDC(fromBaseUnits(reward.amount))}</span
				>
			</div>
			<div class="grid grid-cols-1 items-center gap-2 py-4 sm:grid-cols-[9rem_1fr]">
				<span class="text-sm font-medium text-crx-gray-500">Deadline</span>
				<span
					class="text-sm tabular-nums text-crx-black"
					title={new Date(reward.deadline * 1000).toUTCString()}
					>{new Date(reward.deadline * 1000).toLocaleString()}</span
				>
			</div>
			<div class="grid grid-cols-1 items-center gap-2 py-4 sm:grid-cols-[9rem_1fr]">
				<span class="text-sm font-medium text-crx-gray-500">Timelock</span>
				<span class="text-sm text-crx-black"
					>{reward.timelock_secs === 0 ? 'Off' : `${reward.timelock_secs / 3600}h`}</span
				>
			</div>
		</div>

		{#if isMaintainer && reward.status === 'Funded'}
			<div class="mt-8 flex flex-wrap items-center gap-3">
				<button
					type="button"
					onclick={doExtend}
					disabled={actionBusy}
					class="inline-flex items-center gap-2 rounded-xl border border-crx-border-subtle px-5 py-3 text-sm font-medium text-crx-black transition-colors hover:bg-crx-muted disabled:opacity-60"
				>
					{#if actionBusy}<Loader2 class="h-4 w-4 animate-spin" />{/if}
					Extend deadline +30 days
				</button>
				{#if refundable}
					<button
						type="button"
						onclick={doRefund}
						disabled={actionBusy}
						class="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-crx-danger transition-colors hover:bg-crx-danger-soft disabled:opacity-60"
					>
						Refund to my wallet
					</button>
				{/if}
			</div>
			{#if actionMsg}<p class="mt-3 text-sm text-crx-gray-700" aria-live="polite">{actionMsg}</p>{/if}
		{/if}
	{/if}
</div>
