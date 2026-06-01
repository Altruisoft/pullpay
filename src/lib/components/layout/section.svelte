<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const sectionVariants = tv({
		slots: {
			root: 'py-16 md:py-32',
			container: 'mx-auto max-w-7xl px-5 md:px-8'
		},
		variants: {
			variant: {
				default: { root: '' },
				alt: { root: 'bg-crx-gray-100' },
				muted: { root: 'bg-crx-muted' }
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type SectionVariant = VariantProps<typeof sectionVariants>['variant'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface SectionProps extends HTMLAttributes<HTMLElement> {
		variant?: SectionVariant;
		children?: import('svelte').Snippet;
	}

	const {
		variant = 'default',
		class: className,
		id,
		children,
		...restProps
	}: SectionProps = $props();

	const classes = $derived(sectionVariants({ variant }));
</script>

<section {id} data-slot="section" class={cn(classes.root(), className)} {...restProps}>
	<div class={classes.container()}>
		{@render children?.()}
	</div>
</section>
