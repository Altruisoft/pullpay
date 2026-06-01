<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	interface CardProps extends HTMLAttributes<HTMLDivElement> {
		elevated?: boolean;
		interactive?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
	}

	const {
		elevated = false,
		interactive = false,
		class: className,
		children,
		...rest
	}: CardProps = $props();
</script>

<div
	{...rest}
	class={cn(
		'bg-crx-panel border-crx-border-subtle rounded-xl border p-6',
		elevated && 'shadow-crx-md',
		interactive && 'hover:shadow-crx-md cursor-pointer transition-shadow hover:-translate-y-0.5',
		className
	)}
>
	{@render children?.()}
</div>
