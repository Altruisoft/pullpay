<script lang="ts">
	import { reveal } from '$lib/motion';
	import type { UseCase } from './types';

	const { cases } = $props<{ cases: UseCase[] }>();
</script>

<section id="use-cases" class="border-crx-border-subtle bg-crx-panel border-b">
	<div class="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="mb-14 max-w-152 space-y-5" use:reveal={{ y: 24 }}>
			<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">Use Cases</p>
			<h2
				class="text-crx-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
			>
				Built for the open-source economy
			</h2>
			<p class="text-crx-gray-700 max-w-lg text-sm leading-6">
				PullPay is designed for any scenario where small, verifiable contributions need to be
				rewarded quickly and efficiently.
			</p>
		</div>

		<div class="border-crx-border-subtle divide-crx-border-subtle flex flex-col divide-y border-y">
			{#each cases as useCase, index (index)}
				<article
					class="group grid gap-4 py-8 transition-colors duration-300 hover:bg-white/50 sm:grid-cols-[1fr_2fr]"
					use:reveal={{ delay: 0.06 + index * 0.06, y: 20 }}
				>
					<h3 class="text-crx-black text-xl font-medium tracking-tight">
						{useCase.title}
					</h3>
					<p
						class="text-crx-gray-600 max-w-xl text-base leading-7 group-hover:text-crx-gray-900 transition-colors"
					>
						{useCase.example}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>
