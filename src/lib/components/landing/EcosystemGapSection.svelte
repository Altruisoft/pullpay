<script lang="ts">
	import { reveal } from '$lib/motion';
</script>

<section id="ecosystem-gap" class="border-crx-border-subtle bg-crx-page border-b">
	<div class="mx-auto max-w-[1140px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
			<div class="space-y-5 lg:sticky lg:top-28 lg:self-start" use:reveal={{ y: 24 }}>
				<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">Ecosystem Gap</p>
				<h2
					class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
				>
					The Missing Layer Between GitHub and Stellar
				</h2>
			</div>

			<div class="space-y-10" use:reveal={{ delay: 0.1, y: 24 }}>
				<div class="text-crx-gray-700 space-y-6 text-lg leading-7">
					<p>Stellar already supports grants, hackathons, and ecosystem funding.</p>
					<p>What is still missing is reusable infrastructure for rewarding everyday contributions:</p>
				</div>

				<div
					class="border-crx-border-subtle divide-crx-border-subtle flex flex-col divide-y border-y"
				>
					{#each ['Fixing bugs', 'Improving documentation', 'Maintaining SDKs', 'Translating resources', 'Supporting community tooling'] as item, index (index)}
						<div class="flex items-center gap-4 py-4">
							<div class="text-crx-gray-400 w-10 shrink-0 font-mono text-sm font-semibold">
								[{String(index + 1).padStart(2, '0')}]
							</div>
							<p class="text-crx-black text-base font-medium">{item}</p>
						</div>
					{/each}
				</div>

				<p class="text-crx-gray-700 text-lg leading-7">
					PullPay fills this gap by connecting GitHub contribution events directly to Soroban-based reward settlement.
				</p>
			</div>
		</div>
	</div>
</section>
