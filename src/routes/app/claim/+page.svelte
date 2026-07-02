<script lang="ts">
	import { walletStore } from '$lib/stores/wallet.svelte';
	import { parsePrUrl, claimMarker } from '$lib/utils/github';
	import { isValidAddress } from '$lib/chain/contract';
	import { listRewards, retryPayout } from '$lib/chain/worker';
	import { fromBaseUnits } from '$lib/config';
	import { formatUSDC } from '$lib/utils/stellar';
	import type { RewardView } from '$lib/chain/types';
	import { uiStatus } from '$lib/chain/types';
	import StatusChip from '$lib/components/app/StatusChip.svelte';
	import CopyBlock from '$lib/components/app/CopyBlock.svelte';
	import TrustlineBanner from '$lib/components/app/TrustlineBanner.svelte';
	import Github from '$lib/components/ui/GithubIcon.svelte';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import Wallet from 'lucide-svelte/icons/wallet';
	import { reveal } from '$lib/motion';

	let prUrl = $state('');
	let pastedAddress = $state('');
	let rewards = $state<RewardView[] | null>(null);
	let lookupBusy = $state(false);
	let lookupError = $state<string | null>(null);
	let retryBusy = $state(false);
	let retryMsg = $state<string | null>(null);

	let parsed = $derived(parsePrUrl(prUrl));
	let urlError = $derived(
		prUrl && !parsed ? 'Enter a valid GitHub pull request URL (github.com/owner/repo/pull/123)' : null
	);

	let address = $derived(walletStore.address ?? pastedAddress.trim());
	let addressError = $derived(
		pastedAddress && !isValidAddress(pastedAddress.trim()) ? 'Not a valid Stellar public key' : null
	);
	let addressReady = $derived(Boolean(address) && isValidAddress(address));

	let matched = $derived(rewards?.filter((r) => uiStatus(r) !== 'refunded') ?? []);
	let needsTrustline = $derived(matched.some((r) => uiStatus(r) === 'awaiting-trustline'));

	$effect(() => {
		if (!parsed) {
			rewards = null;
			return;
		}
		lookup(parsed.repo);
	});

	async function lookup(repo: string) {
		lookupBusy = true;
		lookupError = null;
		try {
			const res = await listRewards({ repo });
			rewards = res.rewards;
		} catch {
			lookupError = 'Could not reach the PullPay index — data may be stale';
			rewards = null;
		} finally {
			lookupBusy = false;
		}
	}

	async function retry(r: RewardView) {
		if (!r.pr_number && !parsed) return;
		retryBusy = true;
		retryMsg = null;
		try {
			const { txHash } = await retryPayout(r.id, r.pr_number ?? parsed!.prNumber);
			retryMsg = `Payout settled — tx ${txHash.slice(0, 8)}…`;
			if (parsed) await lookup(parsed.repo);
		} catch (e) {
			retryMsg = (e as Error).message;
		} finally {
			retryBusy = false;
		}
	}
</script>

<svelte:head>
	<title>Claim Reward - PullPay</title>
</svelte:head>

<div class="mx-auto max-w-2xl py-8" use:reveal={{ y: 20 }}>
	<div class="mb-10 space-y-2">
		<a
			href="/app"
			class="mb-6 inline-flex items-center text-sm font-medium text-crx-gray-500 hover:text-crx-black"
		>
			&larr; Back to Dashboard
		</a>
		<h1 class="text-3xl font-medium tracking-tight text-crx-black lg:text-4xl">Claim a Reward</h1>
		<p class="text-lg text-crx-gray-500">
			Bind your Stellar address to your pull request — payment is automatic when it merges.
		</p>
	</div>

	<div
		class="space-y-10 rounded-3xl border border-crx-border-subtle bg-white p-8 shadow-xl shadow-crx-black/5 md:p-12"
	>
		<!-- 1. PR URL -->
		<div class="space-y-3">
			<label for="prUrl" class="block text-sm font-semibold text-crx-black">
				1 · Your pull request URL
			</label>
			<div class="relative">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-crx-gray-500"
				>
					<Github class="h-5 w-5" />
				</div>
				<input
					type="url"
					id="prUrl"
					bind:value={prUrl}
					placeholder="https://github.com/owner/repo/pull/123"
					aria-describedby="prUrl-error"
					class="block w-full rounded-xl border border-crx-border-subtle bg-crx-panel py-4 pl-12 pr-10 text-crx-black transition-shadow placeholder:text-crx-gray-500 focus:border-crx-black focus:outline-none focus:ring-1 focus:ring-crx-black"
				/>
				{#if lookupBusy}
					<div class="absolute inset-y-0 right-0 flex items-center pr-4">
						<Loader2 class="h-4 w-4 animate-spin text-crx-gray-500" />
					</div>
				{/if}
			</div>
			{#if urlError}
				<p id="prUrl-error" class="text-sm text-crx-danger" aria-live="assertive">{urlError}</p>
			{/if}
			{#if lookupError}
				<div class="rounded-xl bg-crx-danger-soft p-3 text-sm text-crx-danger" role="alert">
					{lookupError}
				</div>
			{/if}

			{#if parsed && rewards !== null && !lookupBusy}
				{#if matched.length === 0}
					<div class="rounded-xl bg-crx-muted p-4 text-sm text-crx-gray-700">
						No active reward found for <span class="font-mono">{parsed.repo}</span> — check with
						the maintainer, or read <a href="/#how-it-works" class="underline">how it works</a>.
					</div>
				{:else}
					<div class="divide-y divide-crx-border-subtle rounded-xl border border-crx-border-subtle">
						{#each matched as r (r.id)}
							<div class="flex items-center justify-between gap-3 p-4">
								<div class="min-w-0">
									<p class="truncate text-sm font-medium text-crx-black">
										{r.repo} · issue #{r.issue_number}
									</p>
									<p class="text-xs text-crx-gray-500 tabular-nums">
										{formatUSDC(fromBaseUnits(r.amount))} · deadline
										{new Date(r.deadline * 1000).toLocaleDateString()}
									</p>
								</div>
								<StatusChip status={uiStatus(r)} releasableAt={r.releasable_at} />
							</div>
						{/each}
					</div>
				{/if}
			{/if}
		</div>

		<!-- 2. Address -->
		<div class="space-y-3">
			<p class="text-sm font-semibold text-crx-black">2 · Your Stellar address</p>
			{#if walletStore.isConnected && walletStore.address}
				<div class="flex items-center gap-3 rounded-xl bg-crx-success-soft p-4">
					<Wallet class="h-4 w-4 text-crx-success" strokeWidth={1.5} />
					<span class="font-mono text-sm text-crx-black">{walletStore.address}</span>
				</div>
			{:else}
				<div class="flex flex-col gap-3 sm:flex-row">
					<button
						type="button"
						onclick={() => walletStore.connect()}
						disabled={walletStore.isConnecting}
						class="inline-flex items-center justify-center gap-2 rounded-xl bg-crx-orange px-6 py-3.5 font-medium text-white transition-colors hover:bg-crx-orange-hover disabled:opacity-60"
					>
						{#if walletStore.isConnecting}<Loader2 class="h-4 w-4 animate-spin" />{/if}
						Connect Freighter
					</button>
					<input
						type="text"
						bind:value={pastedAddress}
						placeholder="…or paste your Stellar address (G…)"
						aria-label="Stellar address"
						aria-describedby="address-error"
						class="flex-1 rounded-xl border border-crx-border-subtle bg-crx-panel px-4 py-3.5 font-mono text-sm text-crx-black placeholder:font-sans placeholder:text-crx-gray-500 focus:border-crx-black focus:outline-none"
					/>
				</div>
				{#if addressError}
					<p id="address-error" class="text-sm text-crx-danger" aria-live="assertive">
						{addressError}
					</p>
				{/if}
				<p class="text-xs text-crx-gray-500">
					No wallet? <a
						href="https://freighter.app"
						target="_blank"
						rel="noopener"
						class="underline">Install Freighter ↗</a
					> (2 minutes)
				</p>
			{/if}
		</div>

		<!-- 3. Marker -->
		{#if addressReady}
			<div class="space-y-3">
				<p class="text-sm font-semibold text-crx-black">3 · Post your claim marker</p>
				<CopyBlock text={claimMarker(address)} label="Copy claim marker" />
				<ol class="list-decimal space-y-1 pl-5 text-sm text-crx-gray-700">
					<li>Copy the marker above.</li>
					<li>
						Paste it into your PR description or a new comment — <strong
							>from your own account</strong
						>.
					</li>
					<li>Done. Payment is automatic when the PR merges.</li>
				</ol>
				<p class="text-xs text-crx-gray-500">
					The marker must be posted by the PR author — comments by others are ignored. Also make
					sure the PR description contains "closes #&lt;issue-number&gt;".
				</p>
			</div>
		{/if}

		<!-- 4. Trustline remediation / retry -->
		{#if needsTrustline && addressReady}
			<div class="space-y-3" aria-live="polite">
				<TrustlineBanner {address} onresolved={() => parsed && lookup(parsed.repo)} />
				{#each matched.filter((r) => uiStatus(r) === 'awaiting-trustline') as r (r.id)}
					<button
						type="button"
						onclick={() => retry(r)}
						disabled={retryBusy}
						class="inline-flex items-center gap-2 rounded-xl border border-crx-border-subtle px-5 py-3 text-sm font-medium text-crx-black transition-colors hover:bg-crx-muted disabled:opacity-60"
					>
						{#if retryBusy}<Loader2 class="h-4 w-4 animate-spin" />{/if}
						Retry payout for reward #{r.id}
					</button>
				{/each}
				{#if retryMsg}<p class="text-sm text-crx-gray-700">{retryMsg}</p>{/if}
			</div>
		{/if}
	</div>
</div>
