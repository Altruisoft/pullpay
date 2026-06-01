<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	interface PageShellProps extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		header?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	const { class: className, header, footer, children, ...rest }: PageShellProps = $props();
</script>

<div {...rest} class={cn('bg-crx-page text-crx-black flex min-h-screen flex-col', className)}>
	{#if header}
		{@render header()}
	{/if}

	<main class="flex-1">
		{@render children?.()}
	</main>

	{#if footer}
		{@render footer()}
	{/if}
</div>
