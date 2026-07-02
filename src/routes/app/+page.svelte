<script lang="ts">
	import { walletStore } from '$lib/stores/wallet.svelte';
	import { listRewards } from '$lib/chain/worker';
	import { fromBaseUnits } from '$lib/config';
	import { formatUSDC } from '$lib/utils/stellar';
	import type { RewardView } from '$lib/chain/types';
	import { uiStatus } from '$lib/chain/types';
	import StatusChip from '$lib/components/app/StatusChip.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import Wallet from 'lucide-svelte/icons/wallet';
	import ShieldCheck from 'lucide-svelte/icons/shield-check';
	import Activity from 'lucide-svelte/icons/activity';
	import Github from '$lib/components/ui/GithubIcon.svelte';
	import { reveal } from '$lib/motion';

	let rewards = $state<RewardView[] | null>(null);
	let loading = $state(false);
	let loadError = $state<string | null>(null);
	let cached = $state(false);

	$effect(() => {
		if (walletStore.isConnected && walletStore.address) load(walletStore.address);
	});

	async function load(address: string) {
		loading = true;
		loadError = null;
		try {
			const res = await listRewards({ maintainer: address });
			rewards = res.rewards.sort((a, b) => b.id - a.id);
			cached = res.cached;
		} catch {
			loadError = 'Could not reach Stellar RPC — data may be stale';
		} finally {
			loading = false;
		}
	}

	let totalActive = $derived(
		(rewards ?? [])
			.filter((r) => r.status === 'Funded' || r.status === 'Releasable')
			.reduce((sum, r) => sum + fromBaseUnits(r.amount), 0)
	);
	let totalPaid = $derived(
		(rewards ?? [])
			.filter((r) => r.status === 'Released')
			.reduce((sum, r) => sum + fromBaseUnits(r.amount), 0)
	);
	let repoCount = $derived(new Set((rewards ?? []).map((r) => r.repo)).size);
	let activeCount = $derived((rewards ?? []).filter((r) => r.status === 'Funded').length);
</script>

<svelte:head>
	<title>Dashboard - PullPay</title>
</svelte:head>

{#if !walletStore.isConnected}
	<div
		class="flex h-[70vh] flex-col items-center justify-center px-4 text-center"
		use:reveal={{ y: 20 }}
	>
		<div
			class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-crx-orange text-white shadow-xl"
		>
			<Wallet class="h-10 w-10" />
		</div>
		<h1 class="mb-4 text-3xl font-medium tracking-tight text-crx-black lg:text-4xl">
			Connect your wallet
		</h1>
		<p class="mb-8 max-w-md text-lg text-crx-gray-500">
			Connect your Freighter wallet to view your dashboard, manage active rewards, and deposit USDC
			to the Soroban escrow.
		</p>
		<button
			class="inline-flex h-12 items-center justify-center rounded-full bg-crx-orange px-8 text-base font-medium text-white transition-all hover:scale-105 hover:bg-crx-orange-hover active:scale-95"
			disabled={walletStore.isConnecting}
			onclick={() => walletStore.connect()}
		>
			{walletStore.isConnecting ? 'Connecting...' : 'Connect Freighter'}
		</button>
	</div>
{:else}
	<div class="space-y-12">
		<!-- Header & Stats -->
		<div
			class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
			use:reveal={{ y: 20 }}
		>
			<div class="space-y-2">
				<h1 class="text-3xl font-medium tracking-tight text-crx-black lg:text-4xl">Overview</h1>
				<p class="text-crx-gray-500">Manage your open-source rewards and on-chain settlements.</p>
			</div>
			<a
				href="/app/create"
				class="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-crx-orange px-6 text-sm font-medium text-white shadow-sm transition-all hover:bg-crx-orange-hover active:scale-95"
			>
				<Plus class="h-4 w-4" />
				New Reward
			</a>
		</div>

		{#if loadError}
			<div
				class="flex items-center justify-between rounded-xl bg-crx-danger-soft p-4 text-sm text-crx-danger"
				role="alert"
			>
				<span>{loadError}{cached ? ' (showing cached data)' : ''}</span>
				<button
					type="button"
					class="font-medium underline"
					onclick={() => walletStore.address && load(walletStore.address)}
				>
					Retry
				</button>
			</div>
		{/if}

		<div class="grid gap-6 md:grid-cols-3" use:reveal={{ y: 20, delay: 0.1 }}>
			<div class="rounded-2xl border border-crx-border-subtle bg-white p-6 shadow-sm">
				<div class="flex items-center gap-4 text-crx-gray-500">
					<div class="rounded-xl bg-crx-info-soft p-2 text-crx-info">
						<Activity class="h-5 w-5" />
					</div>
					<span class="font-medium">Locked in escrow</span>
				</div>
				<div
					class="mt-4 text-3xl font-medium tabular-nums text-crx-black"
					aria-label="Locked in escrow: {formatUSDC(totalActive)}"
				>
					{formatUSDC(totalActive)}
				</div>
			</div>

			<div class="rounded-2xl border border-crx-border-subtle bg-white p-6 shadow-sm">
				<div class="flex items-center gap-4 text-crx-gray-500">
					<div class="rounded-xl bg-crx-success-soft p-2 text-crx-success">
						<ShieldCheck class="h-5 w-5" />
					</div>
					<span class="font-medium">Total settled</span>
				</div>
				<div
					class="mt-4 text-3xl font-medium tabular-nums text-crx-black"
					aria-label="Total settled: {formatUSDC(totalPaid)}"
				>
					{formatUSDC(totalPaid)}
				</div>
			</div>

			<div class="rounded-2xl border border-crx-border-subtle bg-white p-6 shadow-sm">
				<div class="flex items-center gap-4 text-crx-gray-500">
					<div class="rounded-xl bg-crx-muted p-2 text-crx-charcoal">
						<Github class="h-5 w-5" />
					</div>
					<span class="font-medium">Active rewards</span>
				</div>
				<div class="mt-4 text-3xl font-medium tabular-nums text-crx-black">
					{activeCount}<span class="ml-2 text-lg text-crx-gray-500">across {repoCount} repos</span>
				</div>
			</div>
		</div>

		<!-- Reward List -->
		<div class="space-y-6" use:reveal={{ y: 20, delay: 0.2 }}>
			<h2 class="text-xl font-medium text-crx-black">Rewards</h2>

			{#if loading && rewards === null}
				<div class="space-y-0 divide-y divide-crx-border-subtle rounded-2xl border border-crx-border-subtle bg-white">
					{#each [0, 1, 2] as i (i)}
						<div class="p-6"><div class="h-6 animate-pulse rounded bg-crx-muted"></div></div>
					{/each}
				</div>
			{:else if (rewards ?? []).length === 0}
				<div class="rounded-2xl border border-crx-border-subtle bg-white p-12 text-center">
					<p class="mb-1 text-xs uppercase tracking-[0.2em] text-crx-gray-500">No rewards yet</p>
					<h3 class="mb-4 text-2xl font-medium tracking-tight text-crx-black">
						Create your first reward
					</h3>
					<a
						href="/app/create"
						class="inline-flex items-center gap-2 rounded-full bg-crx-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-crx-orange-hover"
					>
						<Plus class="h-4 w-4" /> New Reward
					</a>
				</div>
			{:else}
				<div
					class="divide-y divide-crx-border-subtle overflow-hidden rounded-2xl border border-crx-border-subtle bg-white"
				>
					{#each rewards ?? [] as r, i (r.id)}
						<a
							href="/r/{r.id}"
							class="grid grid-cols-1 items-center gap-3 p-5 transition-colors duration-300 hover:bg-crx-page focus:outline-none focus:ring-1 focus:ring-crx-black sm:grid-cols-[3rem_1fr_auto_auto]"
						>
							<span class="font-mono text-xs text-crx-gray-500">[{String(i + 1).padStart(2, '0')}]</span>
							<span class="min-w-0">
								<span class="block truncate text-sm font-medium text-crx-black">
									{r.repo}
								</span>
								<span class="block text-xs text-crx-gray-500">issue #{r.issue_number} · deadline {new Date(r.deadline * 1000).toLocaleDateString()}</span>
							</span>
							<span class="text-sm font-medium tabular-nums text-crx-black">
								{formatUSDC(fromBaseUnits(r.amount))}
							</span>
							<StatusChip status={uiStatus(r)} releasableAt={r.releasable_at} />
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
