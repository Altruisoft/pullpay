<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { LinkItem } from './types';

	const {
		logo,
		logoMark = logo,
		links
	} = $props<{ logo: string; logoMark?: string; links: LinkItem[] }>();

	let mobileOpen = $state(false);
	let scrollY = $state(0);
	const isScrolled = $derived(scrollY > 50);

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<svelte:window bind:scrollY />

<header
	class={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'px-4 py-4 sm:px-6' : 'px-6 py-6 lg:px-12 lg:py-8'}`}
>
	<div
		class={`mx-auto flex items-center justify-between transition-all duration-300 ${isScrolled ? 'max-w-[1180px] rounded-[1.75rem] bg-white/95 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl' : 'max-w-[1440px]'}`}
	>
		<!-- Logo -->
		<a
			href="#top"
			class="flex items-center gap-3 transition-opacity outline-none hover:opacity-80"
			aria-label="PullPay home"
		>
			<img src={logoMark} alt="PullPay" class="h-8 w-8 object-contain" />
			<span class="text-crx-black text-xl font-semibold tracking-tight">PullPay</span>
		</a>

		<!-- Desktop Nav -->
		<nav
			class="text-crx-black hidden items-center gap-10 text-base font-medium lg:flex"
			aria-label="Primary navigation"
		>
			{#each links as link, _i (_i)}
				<a href={link.href} class="transition-colors hover:text-[#0FA8F1]">
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-4">
			<Button
				href="#final-cta"
				variant="secondary"
				size="sm"
				class="border-crx-border-subtle text-crx-black hidden rounded-xl border bg-white px-5 py-2.5 text-base font-medium shadow-sm transition-all hover:shadow-md lg:inline-flex"
			>
				Create a Reward <span class="ml-1.5 opacity-80">↗</span>
			</Button>

			<!-- Mobile hamburger -->
			<button
				class="border-crx-border-subtle text-crx-black relative z-10 grid size-11 place-items-center rounded-xl border bg-white lg:hidden"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
			>
				<div class="flex w-5 flex-col gap-1.5 transition-all duration-300">
					<span
						class={`h-[2px] w-full bg-current transition-all duration-300 ${mobileOpen ? 'translate-y-[8px] rotate-45' : ''}`}
					></span>
					<span
						class={`h-[2px] w-full bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
					></span>
					<span
						class={`h-[2px] w-full bg-current transition-all duration-300 ${mobileOpen ? 'translate-y-[-8px] -rotate-45' : ''}`}
					></span>
				</div>
			</button>
		</div>
	</div>

	<!-- Mobile menu drawer -->
	{#if mobileOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="bg-crx-black/30 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
			onclick={closeMobile}
			onkeydown={closeMobile}
		></div>
		<nav
			class="border-crx-border-subtle bg-crx-page fixed inset-x-4 top-22 z-50 overflow-hidden rounded-[1.5rem] border p-3 shadow-2xl sm:inset-x-6 lg:hidden"
			aria-label="Mobile navigation"
		>
			<div class="grid gap-1">
				{#each links as link, _i (_i)}
					<a
						href={link.href}
						class="text-crx-black hover:bg-crx-muted rounded-xl px-4 py-3.5 text-base font-medium transition-colors"
						onclick={closeMobile}
					>
						{link.label}
					</a>
				{/each}
			</div>
			<div class="border-crx-border-subtle mt-3 border-t pt-3">
				<Button
					href="#final-cta"
					variant="secondary"
					size="lg"
					class="border-crx-border-subtle w-full justify-center rounded-xl border bg-white shadow-sm"
					onclick={closeMobile}
				>
					Create a Reward ↗
				</Button>
			</div>
		</nav>
	{/if}
</header>
