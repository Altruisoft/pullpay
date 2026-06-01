<script lang="ts">
	import RewardCard from '$lib/components/app/RewardCard.svelte';
	import { walletStore } from '$lib/stores/wallet.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import Wallet from 'lucide-svelte/icons/wallet';
	import ShieldCheck from 'lucide-svelte/icons/shield-check';
	import Activity from 'lucide-svelte/icons/activity';
	import Github from '$lib/components/ui/GithubIcon.svelte';
	import { reveal } from '$lib/motion';

	// Mock Data for demonstration
	const MOCK_REWARDS = [
		{
			id: 1,
			repo: 'altruisoft/pullpay',
			issueTitle: 'Fix rendering bug on mobile navbar',
			issueNumber: 42,
			amount: 50,
			status: 'active' as const,
			date: 'May 12, 2026'
		},
		{
			id: 2,
			repo: 'stellar/rs-soroban-sdk',
			issueTitle: 'Implement new auth trait for standard token',
			issueNumber: 1056,
			amount: 250,
			status: 'completed' as const,
			date: 'May 10, 2026'
		},
		{
			id: 3,
			repo: 'altruisoft/pullpay',
			issueTitle: 'Update README with deployment instructions',
			issueNumber: 45,
			amount: 15,
			status: 'completed' as const,
			date: 'May 08, 2026'
		}
	];

	let totalActive = $derived(MOCK_REWARDS.filter(r => r.status === 'active').reduce((sum, r) => sum + r.amount, 0));
	let totalPaid = $derived(MOCK_REWARDS.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.amount, 0));
</script>

<svelte:head>
	<title>Dashboard - PullPay</title>
</svelte:head>

{#if !walletStore.isConnected}
	<div class="flex h-[70vh] flex-col items-center justify-center text-center px-4" use:reveal={{ y: 20 }}>
		<div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0FA8F1] text-white shadow-xl">
			<Wallet class="h-10 w-10" />
		</div>
		<h1 class="mb-4 text-3xl font-bold tracking-tight text-crx-black lg:text-4xl">
			Connect your wallet
		</h1>
		<p class="mb-8 max-w-md text-lg text-crx-gray-500">
			Connect your Freighter wallet to view your dashboard, manage active rewards, and deposit USDC to the Soroban escrow.
		</p>
		<button 
			class="inline-flex h-12 items-center justify-center rounded-full bg-[#0FA8F1] px-8 text-base font-medium text-white transition-all hover:scale-105 hover:bg-[#15376E] active:scale-95"
			disabled={walletStore.isConnecting}
			onclick={() => walletStore.connect()}
		>
			{walletStore.isConnecting ? 'Connecting...' : 'Connect Freighter'}
		</button>
	</div>
{:else}
	<div class="space-y-12">
		<!-- Header & Stats -->
		<div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between" use:reveal={{ y: 20 }}>
			<div class="space-y-2">
				<h1 class="text-3xl font-bold tracking-tight text-crx-black lg:text-4xl">Overview</h1>
				<p class="text-crx-gray-500">Manage your open-source bounties and on-chain settlements.</p>
			</div>
			<a 
				href="/app/create" 
				class="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0FA8F1] px-6 text-sm font-medium text-white transition-all hover:bg-[#15376E] active:scale-95 shadow-sm"
			>
				<Plus class="h-4 w-4" />
				New Reward
			</a>
		</div>

		<div class="grid gap-6 md:grid-cols-3" use:reveal={{ y: 20, delay: 0.1 }}>
			<div class="rounded-2xl border border-crx-border-subtle bg-white p-6 shadow-sm">
				<div class="flex items-center gap-4 text-crx-gray-500">
					<div class="rounded-xl bg-blue-50 p-2 text-blue-600">
						<Activity class="h-5 w-5" />
					</div>
					<span class="font-medium">Active Locked</span>
				</div>
				<div class="mt-4 text-3xl font-bold text-crx-black">
					${totalActive}<span class="text-lg text-crx-gray-400">.00</span>
				</div>
			</div>
			
			<div class="rounded-2xl border border-crx-border-subtle bg-white p-6 shadow-sm">
				<div class="flex items-center gap-4 text-crx-gray-500">
					<div class="rounded-xl bg-green-50 p-2 text-green-600">
						<ShieldCheck class="h-5 w-5" />
					</div>
					<span class="font-medium">Total Settled</span>
				</div>
				<div class="mt-4 text-3xl font-bold text-crx-black">
					${totalPaid}<span class="text-lg text-crx-gray-400">.00</span>
				</div>
			</div>
			
			<div class="rounded-2xl border border-crx-border-subtle bg-white p-6 shadow-sm">
				<div class="flex items-center gap-4 text-crx-gray-500">
					<div class="rounded-xl bg-purple-50 p-2 text-purple-600">
						<Github class="h-5 w-5" />
					</div>
					<span class="font-medium">Repositories</span>
				</div>
				<div class="mt-4 text-3xl font-bold text-crx-black">
					2
				</div>
			</div>
		</div>

		<!-- Reward List -->
		<div class="space-y-6" use:reveal={{ y: 20, delay: 0.2 }}>
			<h2 class="text-xl font-semibold text-crx-black">Recent Rewards</h2>
			
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each MOCK_REWARDS as reward}
					<RewardCard {...reward} />
				{/each}
			</div>
		</div>
	</div>
{/if}
