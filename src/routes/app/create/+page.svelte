<script lang="ts">
	import { walletStore } from '$lib/stores/wallet.svelte';
	import { parseIssueUrl, isPrUrl, fetchIssueTitle } from '$lib/utils/github';
	import { createReward, hasTrustline, usdcBalance, ChainError } from '$lib/chain/contract';
	import Github from '$lib/components/ui/GithubIcon.svelte';
	import TrustlineBanner from '$lib/components/app/TrustlineBanner.svelte';
	import TxBadge from '$lib/components/app/TxBadge.svelte';
	import CopyBlock from '$lib/components/app/CopyBlock.svelte';
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';
	import Loader2 from 'lucide-svelte/icons/loader-2';
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
	import { reveal } from '$lib/motion';

	const DEADLINES = [7, 14, 30, 60, 90];
	const TIMELOCKS = [
		{ label: 'Off', secs: 0 },
		{ label: '24h', secs: 86_400 },
		{ label: '48h', secs: 172_800 },
		{ label: '72h', secs: 259_200 }
	];

	let step = $state<1 | 2 | 3>(1);
	let form = $state({ issueUrl: '', amount: '', deadlineDays: 30, timelockSecs: 0 });

	let issueTitle = $state<string | null>(null);
	let balance = $state<number | null>(null);
	let trustlineOk = $state<boolean | null>(null);
	let busy = $state(false);
	let errorMsg = $state<string | null>(null);
	let infoMsg = $state<string | null>(null);
	let txHash = $state<string | null>(null);

	let parsed = $derived(parseIssueUrl(form.issueUrl));
	let urlError = $derived.by(() => {
		if (!form.issueUrl) return null;
		if (isPrUrl(form.issueUrl))
			return "Enter a GitHub Issue URL — pull requests can't be bountied directly";
		if (!parsed) return 'Enter a valid GitHub Issue URL (github.com/owner/repo/issues/123)';
		return null;
	});
	let amountNum = $derived(Number(form.amount));
	let amountError = $derived.by(() => {
		if (!form.amount) return null;
		if (!(amountNum >= 1)) return 'Minimum reward is 1 USDC';
		if (balance !== null && amountNum > balance)
			return `Exceeds your balance (${balance} USDC) — get test USDC from the faucet first`;
		return null;
	});
	let step1Valid = $derived(Boolean(parsed) && amountNum >= 1 && !amountError);

	async function toReview() {
		if (!parsed) return;
		errorMsg = null;
		if (!walletStore.isConnected) {
			await walletStore.connect();
			if (!walletStore.isConnected) return;
		}
		issueTitle = await fetchIssueTitle(parsed.repo, parsed.issueNumber);
		try {
			[trustlineOk, balance] = await Promise.all([
				hasTrustline(walletStore.address!),
				usdcBalance(walletStore.address!)
			]);
		} catch {
			trustlineOk = null; // Horizon unreachable — contract enforces at deposit anyway
		}
		step = 2;
	}

	async function submit() {
		if (!parsed || !walletStore.address) return;
		errorMsg = null;
		infoMsg = null;
		busy = true;
		try {
			txHash = await createReward({
				maintainer: walletStore.address,
				repo: parsed.repo,
				issueNumber: parsed.issueNumber,
				amountUsdc: amountNum,
				deadlineUnix: Math.floor(Date.now() / 1000) + form.deadlineDays * 86_400,
				timelockSecs: form.timelockSecs
			});
			step = 3;
		} catch (e) {
			if (e instanceof ChainError && e.kind === 'signature-declined') {
				infoMsg = 'Signature declined — nothing was submitted';
			} else {
				errorMsg = (e as Error).message;
			}
		} finally {
			busy = false;
		}
	}
</script>

<svelte:head>
	<title>Create Reward - PullPay</title>
</svelte:head>

<div class="mx-auto max-w-2xl py-8" use:reveal={{ y: 20 }}>
	<div class="mb-10 space-y-2">
		<a
			href="/app"
			class="mb-6 inline-flex items-center text-sm font-medium text-crx-gray-500 hover:text-crx-black"
		>
			&larr; Back to Dashboard
		</a>
		<h1 class="text-3xl font-medium tracking-tight text-crx-black lg:text-4xl">Create Reward</h1>
		<p class="text-lg text-crx-gray-500">Link a GitHub issue and fund it with USDC via Soroban.</p>
	</div>

	<div
		class="relative overflow-hidden rounded-3xl border border-crx-border-subtle bg-white shadow-xl shadow-crx-black/5"
	>
		<div class="flex h-1.5 w-full bg-crx-gray-100">
			<div
				class="h-full bg-crx-orange transition-all duration-500 ease-out"
				style="width: {step === 1 ? '40%' : step === 2 ? '75%' : '100%'}"
			></div>
		</div>

		<div class="p-8 md:p-12">
			{#if step === 1}
				<div class="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
					<div class="space-y-3">
						<label for="issueUrl" class="block text-sm font-semibold text-crx-black">
							GitHub Issue URL
						</label>
						<div class="relative">
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-crx-gray-500"
							>
								<Github class="h-5 w-5" />
							</div>
							<input
								type="url"
								id="issueUrl"
								bind:value={form.issueUrl}
								placeholder="https://github.com/owner/repo/issues/123"
								aria-describedby="issueUrl-error"
								class="block w-full rounded-xl border border-crx-border-subtle bg-crx-panel py-4 pl-12 pr-4 text-crx-black transition-shadow placeholder:text-crx-gray-500 focus:border-crx-black focus:outline-none focus:ring-1 focus:ring-crx-black"
							/>
						</div>
						{#if urlError}
							<p id="issueUrl-error" class="text-sm text-crx-danger" aria-live="assertive">
								{urlError}
							</p>
						{/if}
					</div>

					<div class="space-y-3">
						<label for="amount" class="block text-sm font-semibold text-crx-black">
							Reward Amount (USDC)
						</label>
						<div class="relative">
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-crx-gray-500"
							>
								<DollarSign class="h-5 w-5" />
							</div>
							<input
								type="number"
								id="amount"
								min="1"
								step="1"
								bind:value={form.amount}
								placeholder="20"
								aria-describedby="amount-error"
								class="block w-full rounded-xl border border-crx-border-subtle bg-crx-panel py-4 pl-12 pr-4 text-xl font-medium tabular-nums text-crx-black transition-shadow placeholder:text-crx-gray-500 focus:border-crx-black focus:outline-none focus:ring-1 focus:ring-crx-black"
							/>
						</div>
						{#if amountError}
							<p id="amount-error" class="text-sm text-crx-danger" aria-live="assertive">
								{amountError}
							</p>
						{/if}
					</div>

					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div class="space-y-3">
							<label for="deadline" class="block text-sm font-semibold text-crx-black">
								Deadline
							</label>
							<select
								id="deadline"
								bind:value={form.deadlineDays}
								class="block w-full rounded-xl border border-crx-border-subtle bg-crx-panel px-4 py-4 text-crx-black focus:border-crx-black focus:outline-none"
							>
								{#each DEADLINES as d (d)}
									<option value={d}>{d} days</option>
								{/each}
							</select>
						</div>
						<div class="space-y-3">
							<label for="timelock" class="block text-sm font-semibold text-crx-black">
								Dispute timelock
							</label>
							<select
								id="timelock"
								bind:value={form.timelockSecs}
								class="block w-full rounded-xl border border-crx-border-subtle bg-crx-panel px-4 py-4 text-crx-black focus:border-crx-black focus:outline-none"
							>
								{#each TIMELOCKS as t (t.secs)}
									<option value={t.secs}>{t.label}</option>
								{/each}
							</select>
							<p class="text-xs text-crx-gray-500">
								Hold released funds for a review window before final settlement
							</p>
						</div>
					</div>

					<button
						type="button"
						onclick={toReview}
						disabled={!step1Valid}
						class="w-full rounded-xl bg-crx-orange py-4 text-base font-semibold text-white transition-all hover:bg-crx-orange-hover disabled:pointer-events-none disabled:opacity-40"
					>
						Continue to review
					</button>
				</div>
			{:else if step === 2 && parsed}
				<div class="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
					<div class="divide-y divide-crx-border-subtle text-sm">
						{#each [['Repository', parsed.repo], ['Issue', `#${parsed.issueNumber}${issueTitle ? ` — ${issueTitle}` : ''}`], ['Amount', `${amountNum} USDC`], ['Deadline', `${form.deadlineDays} days`], ['Timelock', TIMELOCKS.find((t) => t.secs === form.timelockSecs)?.label ?? 'Off'], ['Network', 'Stellar Testnet']] as [label, value] (label)}
							<div class="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
								<span class="font-medium text-crx-gray-500">{label}</span>
								<span class="wrap-break-word text-crx-black">{value}</span>
							</div>
						{/each}
					</div>

					{#if issueTitle === null}
						<p class="text-xs text-crx-gray-500">
							Could not fetch issue title — verify the URL is correct before locking funds.
						</p>
					{/if}

					{#if trustlineOk === false && walletStore.address}
						<TrustlineBanner
							address={walletStore.address}
							onresolved={() => (trustlineOk = true)}
						/>
					{/if}

					{#if infoMsg}
						<div class="rounded-xl bg-crx-info-soft p-4 text-sm text-crx-info" role="status">
							{infoMsg}
						</div>
					{/if}
					{#if errorMsg}
						<div class="rounded-xl bg-crx-danger-soft p-4 text-sm text-crx-danger" role="alert">
							{errorMsg}
						</div>
					{/if}

					<div class="flex gap-3">
						<button
							type="button"
							onclick={() => (step = 1)}
							disabled={busy}
							class="rounded-xl border border-crx-border-subtle px-6 py-4 font-medium text-crx-black transition-colors hover:bg-crx-muted disabled:opacity-50"
						>
							Back
						</button>
						<button
							type="button"
							onclick={submit}
							disabled={busy || trustlineOk === false}
							class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-crx-orange py-4 text-base font-semibold text-white transition-all hover:bg-crx-orange-hover disabled:pointer-events-none disabled:opacity-40"
						>
							{#if busy}
								<Loader2 class="h-5 w-5 animate-spin" />
								Waiting for signature…
							{:else}
								Lock {amountNum || ''} USDC in escrow
							{/if}
						</button>
					</div>
				</div>
			{:else if step === 3}
				<div
					class="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in-95 duration-500"
				>
					<CheckCircle2 class="mb-6 h-12 w-12 text-crx-success" strokeWidth={1.5} />
					<h2 class="mb-2 text-2xl font-medium tracking-tight text-crx-black">Reward funded</h2>
					<p class="mb-6 max-w-sm text-crx-gray-500">
						USDC is locked in the escrow contract — contributors can verify it on-chain before
						writing a line of code.
					</p>
					{#if txHash}
						<div class="mb-8 flex items-center gap-3">
							<span class="text-sm text-crx-gray-500">Deposit tx</span>
							<TxBadge value={txHash} kind="tx" />
						</div>
					{/if}
					<div class="w-full space-y-3 text-left">
						<p class="text-sm font-semibold text-crx-black">
							Final step — add the workflow to your repo (no secrets needed):
						</p>
						<CopyBlock
							text={'Copy action/pullpay.yml from the PullPay repository into .github/workflows/pullpay.yml'}
							label="Copy workflow instructions"
						/>
					</div>
					<div class="mt-8 flex w-full flex-col gap-3">
						<a
							href="/app"
							class="inline-flex w-full items-center justify-center rounded-xl bg-crx-orange py-4 font-semibold text-white transition-all hover:bg-crx-orange-hover"
						>
							View dashboard
						</a>
						<a
							href={form.issueUrl}
							target="_blank"
							rel="noopener"
							class="inline-flex w-full items-center justify-center rounded-xl bg-crx-panel py-4 font-semibold text-crx-black transition-all hover:bg-crx-gray-100"
						>
							View issue on GitHub
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
