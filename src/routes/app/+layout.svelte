<script lang="ts">
	import AppNavbar from '$lib/components/app/AppNavbar.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-crx-page font-sans selection:bg-crx-black selection:text-white">
	<AppNavbar />
	
	<main class="mx-auto max-w-7xl px-6 py-8">
		{@render children()}
	</main>
</div>
