<script lang="ts">
	import { parallax, reveal } from '$lib/motion';
	import type { StepItem } from './types';

	const { steps } = $props<{ steps: StepItem[] }>();
</script>

<section id="how-it-works" class="border-crx-border-subtle bg-crx-page relative border-b">
	<div class="mx-auto min-h-screen max-w-[1280px] px-6 py-20 lg:px-10">
		<div class="grid min-h-[calc(100vh-10rem)] gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
			<div class="space-y-7" use:reveal={{ y: 24 }}>
				<h2
					class="text-crx-black max-w-[9ch] text-[clamp(3.4rem,6vw,6.8rem)] leading-[0.9] font-medium tracking-[-0.07em]"
				>
					Three steps. One file.
				</h2>
				<p class="text-crx-gray-700 max-w-[18rem] text-sm leading-6">
					Verifiable settlement from GitHub to Stellar.
				</p>
			</div>
			<div class="relative" use:reveal={{ delay: 0.1, y: 24 }}>
				<div
					class="from-crx-orange/40 via-crx-border-subtle absolute top-6 left-5 hidden h-[calc(100%-3rem)] w-px bg-linear-to-b to-transparent md:block"
					use:parallax={{ from: -18, to: 18 }}
				></div>

				<div class="space-y-10 md:space-y-12">
					{#each steps as step, index (index)}
						<article
							class="group relative grid gap-5 md:grid-cols-[3.5rem_1fr] md:items-start"
							use:reveal={{ delay: 0.12 + index * 0.08, y: 20 }}
						>
							<div class="relative z-10 flex size-10 items-start justify-center pt-2">
								<div class="size-2 rounded-full bg-crx-gray-300 ring-4 ring-crx-page transition-colors group-hover:bg-crx-orange"></div>
							</div>

							<div class="border-crx-border-subtle border-b pb-10 last:border-b-0 last:pb-0">
								<div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
									<h3
										class="text-crx-black text-[clamp(2rem,3vw,3.35rem)] leading-[0.96] font-medium tracking-[-0.055em]"
									>
										{step.title}
									</h3>
									<span class="text-[#0FA8F1] text-sm tracking-[0.16em] uppercase"
										>{step.role}</span
									>
								</div>
								<p class="text-crx-gray-700 mt-4 max-w-lg text-sm leading-6">
									{step.description}
								</p>
								<p class="text-crx-orange/70 mt-3 text-sm tracking-[0.16em] uppercase">
									{step.microcopy}
								</p>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
