<script lang="ts">
	import TxBadge from './TxBadge.svelte';

	export interface TimelineNode {
		title: string;
		meta?: string;
		txHash?: string;
		state: 'done' | 'pending';
	}

	let { nodes }: { nodes: TimelineNode[] } = $props();
</script>

<ol aria-label="Reward history" class="space-y-0">
	{#each nodes as node, i (i)}
		<li class="relative flex gap-4 pb-8 last:pb-0">
			{#if i < nodes.length - 1}
				<span class="absolute left-[5px] top-4 h-full w-px bg-crx-border-subtle" aria-hidden="true"
				></span>
			{/if}
			<span
				class="mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full {node.state === 'done'
					? 'bg-crx-success'
					: 'bg-crx-border-default'}"
				aria-hidden="true"
			></span>
			<div class="min-w-0 space-y-1">
				<p
					class="text-sm font-medium {node.state === 'done'
						? 'text-crx-black'
						: 'text-crx-gray-500'}"
				>
					{node.title}
				</p>
				{#if node.meta || node.txHash}
					<p class="flex flex-wrap items-center gap-2 text-xs text-crx-gray-500">
						{#if node.meta}<span>{node.meta}</span>{/if}
						{#if node.txHash}<TxBadge value={node.txHash} kind="tx" />{/if}
					</p>
				{/if}
			</div>
		</li>
	{/each}
</ol>
