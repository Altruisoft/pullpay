<script lang="ts">
	import ConnectWallet from '$lib/components/ui/ConnectWallet.svelte';
	import { page } from '$app/state';
	import { assets } from '$lib/components/landing/data';

	let scrollY = $state(0);
	const isScrolled = $derived(scrollY > 10);
</script>

<svelte:window bind:scrollY />

<header class={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'px-4 py-4 sm:px-6' : 'px-6 py-6 lg:px-12 lg:py-8'}`}>
	<div class={`mx-auto flex items-center justify-between transition-all duration-300 ${isScrolled ? 'max-w-[1180px] rounded-[1.75rem] bg-white/95 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl border border-crx-border-subtle' : 'max-w-[1440px]'}`}>
		<div class="flex items-center gap-8">
			<a href="/" class="flex items-center gap-3 transition-opacity outline-none hover:opacity-80">
				<img src={assets.logoMark} alt="PullPay" class="h-8 w-8 object-contain" />
				<span class="text-xl font-bold tracking-tight text-crx-black">PullPay</span>
			</a>
			
			<nav class="hidden md:flex gap-6 text-base font-medium">
				<a 
					href="/app" 
					class="transition-colors hover:text-[#0FA8F1] {page.url.pathname === '/app' ? 'text-crx-black' : 'text-crx-gray-500'}"
				>
					Dashboard
				</a>
				<a
					href="/app/create"
					class="transition-colors hover:text-[#0FA8F1] {page.url.pathname.startsWith('/app/create') ? 'text-crx-black' : 'text-crx-gray-500'}"
				>
					Create Reward
				</a>
				<a
					href="/app/claim"
					class="transition-colors hover:text-[#0FA8F1] {page.url.pathname.startsWith('/app/claim') ? 'text-crx-black' : 'text-crx-gray-500'}"
				>
					Claim
				</a>
			</nav>
		</div>

		<div class="flex items-center gap-4">
			<span class="rounded-full bg-crx-warning-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-700">
				Testnet
			</span>
			<ConnectWallet />
		</div>
	</div>
</header>

<!-- Testnet badge per docs/UI-SPEC.md global rules -->
