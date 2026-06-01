<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const inputVariants = tv({
		base: 'h-12 w-full rounded-xl border border-crx-border-default bg-crx-white px-4 text-sm text-crx-black transition-colors placeholder:text-crx-gray-500 focus-visible:ring-2 focus-visible:ring-crx-orange focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
		variants: {
			state: {
				normal: '',
				error: 'border-crx-danger focus-visible:ring-crx-danger',
				disabled: 'cursor-not-allowed bg-crx-gray-100 text-crx-gray-500'
			},
			hasIcon: {
				true: 'pl-11',
				false: ''
			}
		},
		defaultVariants: {
			state: 'normal',
			hasIcon: false
		}
	});

	export type InputState = VariantProps<typeof inputVariants>['state'];

	export type InputProps = WithElementRef<HTMLInputAttributes> & {
		label?: string;
		helperText?: string;
		error?: string;
		icon?: import('svelte').Snippet;
	};
</script>

<script lang="ts">
	let {
		class: className,
		label,
		helperText,
		error,
		icon,
		ref = $bindable(null),
		disabled,
		id = $bindable(crypto.randomUUID()),
		...restProps
	}: InputProps = $props();

	const currentState = $derived(error ? 'error' : disabled ? 'disabled' : 'normal');
	const hasIcon = $derived(!!icon);
</script>

<div class="flex flex-col gap-1.5">
	{#if label}
		<label for={id} class="text-crx-graphite text-sm font-medium">
			{label}
		</label>
	{/if}

	<div class="relative">
		{#if icon}
			<div
				class="text-crx-gray-500 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5"
			>
				{@render icon()}
			</div>
		{/if}

		<input
			bind:this={ref}
			{id}
			class={cn(inputVariants({ state: currentState, hasIcon }), className)}
			{disabled}
			{...restProps}
		/>
	</div>

	{#if error}
		<p class="text-crx-danger text-sm" role="alert">
			{error}
		</p>
	{:else if helperText}
		<p class="text-crx-gray-500 text-sm">
			{helperText}
		</p>
	{/if}
</div>
