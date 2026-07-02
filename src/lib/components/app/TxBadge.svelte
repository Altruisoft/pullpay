<script lang="ts">
	import { config } from '$lib/config';
	import { formatAddress } from '$lib/utils/stellar';
	import Copy from 'lucide-svelte/icons/copy';
	import Check from 'lucide-svelte/icons/check';
	import ExternalLink from 'lucide-svelte/icons/external-link';

	let {
		value,
		kind = 'tx'
	}: { value: string; kind?: 'tx' | 'contract' | 'address' } = $props();

	let copied = $state(false);

	let href = $derived(
		kind === 'tx'
			? config.explorer.tx(value)
			: kind === 'contract'
				? config.explorer.contract(value)
				: config.explorer.account(value)
	);

	async function copy() {
		await navigator.clipboard.writeText(value);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<span class="inline-flex items-center gap-1.5 font-mono text-xs">
	<button
		type="button"
		onclick={copy}
		aria-label="Copy {kind}"
		class="inline-flex items-center gap-1 rounded-sm bg-crx-black px-1.5 py-0.5 text-white transition-colors hover:bg-crx-charcoal"
	>
		{formatAddress(value)}
		{#if copied}
			<Check class="h-3 w-3 text-crx-success" strokeWidth={2} />
		{:else}
			<Copy class="h-3 w-3 opacity-60" strokeWidth={1.5} />
		{/if}
	</button>
	<a
		{href}
		target="_blank"
		rel="noopener"
		aria-label="View {kind} on Stellar Expert"
		class="text-crx-gray-500 transition-colors hover:text-crx-black"
	>
		<ExternalLink class="h-3.5 w-3.5" strokeWidth={1.5} />
	</a>
</span>
