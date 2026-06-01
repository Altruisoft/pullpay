<script lang="ts">
	import { reveal } from '$lib/motion';
	import type { UseCase } from './types';

	const { cases } = $props<{ cases: UseCase[] }>();
</script>

<section id="use-cases" class="border-crx-border-subtle bg-crx-panel border-b">
	<div class="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="mb-14 max-w-152 space-y-5" use:reveal={{ y: 24 }}>
			<p class="text-crx-gray-500 text-xs font-medium tracking-[0.2em] uppercase">Use Cases</p>
			<h2
				class="text-crx-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
			>
				Built for the open-source economy.
			</h2>
			<p class="text-crx-gray-700 max-w-lg text-sm leading-6">
				PullPay is designed for any scenario where small, verifiable contributions need to be rewarded
				quickly and efficiently.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			{#each cases as useCase, index (index)}
				<article
					class="border-crx-border-subtle bg-crx-page rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-lg sm:p-8"
					use:reveal={{ delay: 0.06 + index * 0.06, y: 20 }}
				>
					<div class="mb-5 h-0.5 w-8 bg-[#0FA8F1]"></div>
					<h3 class="text-crx-black text-lg leading-tight font-semibold tracking-[-0.02em]">
						{useCase.title}
					</h3>
					<p class="text-crx-gray-700 mt-3 text-sm leading-6">{useCase.example}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
