<script lang="ts">
	import { reveal } from '$lib/motion';
	import type { RailComparison } from './types';

	const { title, description, paragraphs, rails } = $props<{
		title: string;
		description: string;
		paragraphs: string[];
		rails: RailComparison[];
	}>();
</script>

<section id="problem" class="border-crx-border-subtle bg-crx-panel border-b">
	<div class="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="grid gap-14 lg:grid-cols-[0.45fr_0.55fr]">
			<div class="space-y-5 lg:sticky lg:top-28 lg:self-start" use:reveal={{ y: 24 }}>
				<p class="text-crx-gray-500 text-xs font-medium tracking-[0.2em] uppercase">The Problem</p>
				<h2
					class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
				>
					{title}
				</h2>
			</div>

			<div class="space-y-10" use:reveal={{ delay: 0.1, y: 24 }}>
				<div class="text-crx-gray-700 space-y-6 text-lg leading-7">
					{#each paragraphs as paragraph, _i (_i)}
						<p>{@html paragraph}</p>
					{/each}
				</div>

				<div
					class="border-crx-border-subtle divide-crx-border-subtle flex flex-col divide-y border-y"
				>
					{#each rails as rail, index (index)}
						<div
							class="grid grid-cols-[100px_1fr] items-center gap-4 py-4 sm:grid-cols-[140px_1fr]"
						>
							<h3 class="text-crx-black text-sm font-bold tracking-wider uppercase">{rail.name}</h3>
							<p class="text-crx-gray-600 text-sm font-medium">{rail.limitation}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
