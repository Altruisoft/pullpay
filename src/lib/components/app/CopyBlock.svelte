<script lang="ts">
	import Copy from 'lucide-svelte/icons/copy';
	import Check from 'lucide-svelte/icons/check';

	let { text, label = 'Copy' }: { text: string; label?: string } = $props();
	let copied = $state(false);

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<div class="relative rounded-lg bg-crx-black p-4">
	<button
		type="button"
		onclick={copy}
		aria-label={label}
		class="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/20 px-2.5 py-1 text-xs text-white/80 transition-colors hover:bg-white/10"
	>
		{#if copied}
			<Check class="h-3.5 w-3.5 text-crx-success" strokeWidth={2} /> Copied
		{:else}
			<Copy class="h-3.5 w-3.5" strokeWidth={1.5} /> Copy
		{/if}
	</button>
	<code class="block overflow-x-auto whitespace-pre-wrap break-all pr-20 font-mono text-sm text-white"
		>{text}</code
	>
</div>
