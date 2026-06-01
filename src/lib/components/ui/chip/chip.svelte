<script lang="ts">
	import { cn } from '$lib/utils';

	type Tone = 'neutral' | 'orange' | 'success' | 'warning' | 'danger';
	type Size = 'sm' | 'md';

	interface Props {
		tone?: Tone;
		size?: Size;
		dot?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
	}

	const {
		tone = 'neutral',
		size = 'md',
		dot = false,
		class: className,
		children
	}: Props = $props();

	const toneClasses: Record<Tone, string> = {
		neutral: 'bg-crx-gray-100 text-crx-gray-700',
		orange: 'bg-crx-orange-soft text-crx-orange',
		success: 'bg-crx-success-soft text-crx-success',
		warning: 'bg-crx-warning-soft text-crx-warning',
		danger: 'bg-crx-danger-soft text-crx-danger'
	};

	const sizeClasses: Record<Size, string> = {
		sm: 'h-6 px-2 text-sm',
		md: 'h-7 px-3 text-sm'
	};
</script>

<span
	class={cn(
		'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap',
		toneClasses[tone],
		sizeClasses[size],
		className
	)}
>
	{#if dot}
		<span class="size-1.5 rounded-full bg-current"></span>
	{/if}
	{@render children?.()}
</span>
