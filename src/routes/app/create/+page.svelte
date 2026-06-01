<script lang="ts">
	import { walletStore } from '$lib/stores/wallet.svelte';
	import Github from '$lib/components/ui/GithubIcon.svelte';
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { reveal } from '$lib/motion';

	let step = $state(1); // 1: Issue Details, 2: Deposit
	let isSimulating = $state(false);
	
	let form = $state({
		issueUrl: '',
		amount: ''
	});

	let isFormValid = $derived(
		form.issueUrl.includes('github.com') && 
		Number(form.amount) > 0
	);

	async function simulateDeposit() {
		if (!walletStore.isConnected) {
			await walletStore.connect();
			if (!walletStore.isConnected) return;
		}

		isSimulating = true;
		// Simulate network delay and Soroban contract call
		await new Promise(resolve => setTimeout(resolve, 2000));
		step = 3; // Success step
		isSimulating = false;
	}
</script>

<svelte:head>
	<title>Create Reward - PullPay</title>
</svelte:head>

<div class="mx-auto max-w-2xl py-8" use:reveal={{ y: 20 }}>
	<div class="mb-10 space-y-2">
		<a href="/app" class="mb-6 inline-flex items-center text-sm font-medium text-crx-gray-500 hover:text-crx-black">
			&larr; Back to Dashboard
		</a>
		<h1 class="text-3xl font-bold tracking-tight text-crx-black lg:text-4xl">Create Reward</h1>
		<p class="text-lg text-crx-gray-500">Link a GitHub issue and fund it with USDC via Soroban.</p>
	</div>

	<div class="relative overflow-hidden rounded-3xl border border-crx-border-subtle bg-white shadow-xl shadow-crx-black/5">
		<!-- Progress Bar -->
		<div class="flex h-1.5 w-full bg-crx-gray-100">
			<div 
				class="h-full bg-[#0FA8F1] transition-all duration-500 ease-out" 
				style="width: {step === 1 ? '50%' : step === 2 ? '80%' : '100%'}"
			></div>
		</div>

		<div class="p-8 md:p-12">
			{#if step === 1}
				<div class="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
					<div class="space-y-4">
						<label for="issueUrl" class="block text-sm font-semibold text-crx-black">
							GitHub Issue URL
						</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-crx-gray-400">
								<Github class="h-5 w-5" />
							</div>
							<input 
								type="url" 
								id="issueUrl" 
								bind:value={form.issueUrl}
								placeholder="https://github.com/owner/repo/issues/123"
								class="block w-full rounded-xl border border-crx-border-subtle bg-crx-panel py-4 pl-12 pr-4 text-crx-black placeholder:text-crx-gray-400 focus:border-crx-black focus:outline-none focus:ring-1 focus:ring-crx-black transition-shadow"
							/>
						</div>
						<p class="text-sm text-crx-gray-500">
							The PullPay bot will automatically track the status of this issue.
						</p>
					</div>

					<div class="space-y-4">
						<label for="amount" class="block text-sm font-semibold text-crx-black">
							Reward Amount (USDC)
						</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-crx-gray-400">
								<DollarSign class="h-5 w-5" />
							</div>
							<input 
								type="number" 
								id="amount" 
								bind:value={form.amount}
								min="1"
								placeholder="50"
								class="block w-full rounded-xl border border-crx-border-subtle bg-crx-panel py-4 pl-12 pr-4 text-crx-black text-xl font-medium placeholder:text-crx-gray-400 focus:border-crx-black focus:outline-none focus:ring-1 focus:ring-crx-black transition-shadow"
							/>
						</div>
						<div class="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
							<AlertCircle class="h-4 w-4 shrink-0" />
							<p>Funds will be locked in the Soroban escrow contract and can be refunded if the issue times out.</p>
						</div>
					</div>

					<button 
						class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0FA8F1] py-4 text-base font-semibold text-white transition-all hover:bg-[#15376E] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
						disabled={!isFormValid}
						onclick={() => step = 2}
					>
						Continue to Deposit
						<ArrowRight class="h-4 w-4" />
					</button>
				</div>
			{:else if step === 2}
				<div class="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
					<div class="rounded-2xl bg-crx-panel p-6 space-y-4">
						<h3 class="font-semibold text-crx-black">Summary</h3>
						<div class="flex justify-between border-b border-crx-border-subtle pb-4">
							<span class="text-crx-gray-500">Issue</span>
							<span class="max-w-[200px] truncate font-medium text-crx-black">{form.issueUrl}</span>
						</div>
						<div class="flex justify-between items-end pt-2">
							<span class="text-crx-gray-500">Total to Lock</span>
							<div class="text-right">
								<div class="text-3xl font-bold text-crx-black">${form.amount}<span class="text-xl text-crx-gray-400">.00</span></div>
								<div class="text-sm font-medium text-crx-gray-500 uppercase">USDC (Stellar Testnet)</div>
							</div>
						</div>
					</div>

					<button 
						class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0FA8F1] py-4 text-base font-semibold text-white transition-all hover:bg-[#15376E] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
						disabled={isSimulating}
						onclick={simulateDeposit}
					>
						{#if isSimulating}
							<div class="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
							Waiting for Signature...
						{:else}
							Sign & Deposit with Freighter
						{/if}
					</button>
					
					<button 
						class="w-full text-sm font-medium text-crx-gray-500 hover:text-crx-black"
						onclick={() => step = 1}
						disabled={isSimulating}
					>
						Cancel
					</button>
				</div>
			{:else if step === 3}
				<div class="flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in-95 duration-500">
					<div class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
						<CheckCircle2 class="h-10 w-10" />
					</div>
					<h2 class="mb-2 text-2xl font-bold text-crx-black">Reward Funded!</h2>
					<p class="mb-8 max-w-sm text-crx-gray-500">
						Your USDC has been locked in the Soroban escrow. Contributors can now claim this reward by commenting on the GitHub PR.
					</p>
					
					<div class="flex w-full flex-col gap-3">
						<a 
							href="/app" 
							class="inline-flex w-full items-center justify-center rounded-xl bg-[#0FA8F1] py-4 font-semibold text-white hover:bg-[#15376E] active:scale-[0.98] transition-all"
						>
							Back to Dashboard
						</a>
						<a 
							href={form.issueUrl} 
							target="_blank"
							rel="noreferrer"
							class="inline-flex w-full items-center justify-center rounded-xl bg-crx-panel py-4 font-semibold text-crx-black hover:bg-crx-gray-100 active:scale-[0.98] transition-all"
						>
							View Issue on GitHub
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
