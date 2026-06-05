<script lang="ts">
	import { reveal } from '$lib/motion';
	import type { StellarFeature } from './types';

	const { features } = $props<{ features: StellarFeature[] }>();
</script>

<section id="why-stellar" class="border-crx-border-subtle bg-crx-page border-b">
	<div class="mx-auto max-w-[1140px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
			<div class="space-y-5 lg:sticky lg:top-28 lg:self-start" use:reveal={{ y: 24 }}>
				<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">Why Stellar</p>
				<h2
					class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.1] font-medium tracking-[-0.06em]"
				>
					Why Stellar Makes Contributor Rewards Practical
				</h2>
				<p class="text-crx-gray-700 text-sm leading-6 max-w-sm">
					Contributor rewards are often small — sometimes only $5–10. Traditional payment rails make these rewards inefficient because fees can consume a significant portion of the payout. Stellar enables economically viable contributor rewards through:
				</p>
			</div>

			<div class="space-y-0" use:reveal={{ delay: 0.1, y: 24 }}>
				{#each features as feat, index (index)}
					<div
						class="border-crx-border-subtle bg-crx-panel group border-b p-6 transition-colors duration-300 hover:bg-white first:border-t"
						use:reveal={{ delay: 0.06 + index * 0.06, y: 16 }}
					>
						<div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
							<div
								class="text-crx-gray-400 font-mono text-sm font-semibold transition-colors group-hover:text-crx-orange w-12"
							>
								[{String(index + 1).padStart(2, '0')}]
							</div>
							<div class="flex-1 grid sm:grid-cols-[1fr_1.5fr] gap-2 sm:gap-8">
								<h3 class="text-crx-black text-lg font-medium tracking-tight">
									{feat.feature}
								</h3>
								<p class="text-crx-gray-600 text-sm leading-6">
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
