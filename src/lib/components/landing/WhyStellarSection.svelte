<script lang="ts">
	import { reveal } from '$lib/motion';
	import type { StellarFeature } from './types';

	const { features } = $props<{ features: StellarFeature[] }>();
</script>

<section id="why-stellar" class="border-crx-border-subtle bg-crx-page border-b">
	<div class="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="grid gap-14 lg:grid-cols-[0.42fr_0.58fr]">
			<div class="space-y-5 lg:sticky lg:top-28 lg:self-start" use:reveal={{ y: 24 }}>
				<p class="text-crx-gray-500 text-xs font-medium tracking-[0.2em] uppercase">
					Why Stellar
				</p>
				<h2
					class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
				>
					Why this works on Stellar.
				</h2>
				<p class="text-crx-gray-700 max-w-80 text-sm leading-6">
					Stellar provides a uniquely attractive combination of features that make contributor reward
					automation viable.
				</p>
			</div>

			<div class="space-y-4" use:reveal={{ delay: 0.1, y: 24 }}>
				{#each features as feat, index (index)}
					<div
						class="border-crx-border-subtle bg-crx-panel group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
						use:reveal={{ delay: 0.06 + index * 0.06, y: 16 }}
					>
						<div class="flex items-start gap-4">
							<div
								class="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-crx-orange/10 text-crx-orange transition-colors group-hover:bg-crx-orange group-hover:text-white"
							>
								<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="text-crx-black text-base font-semibold tracking-tight">
									{feat.feature}
								</h3>
								<p class="text-crx-gray-700 mt-2 text-sm leading-6">
									{feat.enables}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
