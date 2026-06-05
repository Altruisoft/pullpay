<script lang="ts">
	import { reveal } from '$lib/motion';

	const { metrics } = $props<{
		metrics: { value: string; label: string; description: string }[];
	}>();
</script>

<section id="impact" class="border-crx-border-subtle bg-crx-page border-b">
	<div class="mx-auto max-w-[1140px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="mb-14 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6" use:reveal={{ y: 24 }}>
			<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">
				Ecosystem Impact
			</p>
			<h2
				class="text-crx-black text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.06em]"
			>
				GitHub Is One of the Largest Developer Networks in the World
			</h2>
			
			<div class="text-crx-gray-700 text-base leading-relaxed max-w-2xl pt-2" use:reveal={{ delay: 0.1, y: 24 }}>
				<p>
					PullPay introduces Stellar through a workflow developers already understand. Instead of asking contributors to learn blockchain first, PullPay embeds Stellar directly into the contribution process.
				</p>
			</div>
		</div>

		<p class="mb-6 font-semibold text-crx-black text-center" use:reveal={{ delay: 0.2, y: 20 }}>
			Every successful reward creates:
		</p>

		<div class="border-crx-border-subtle grid border-t sm:grid-cols-2 lg:grid-cols-4 lg:border-l">
			{#each metrics as metric, index (index)}
				<div
					class="border-crx-border-subtle group relative flex flex-col justify-between border-b p-8 transition-colors duration-300 hover:bg-white sm:even:border-l lg:border-r lg:even:border-l-0"
					use:reveal={{ delay: 0.06 + index * 0.08, y: 20 }}
				>
					<div>
						<div class="text-crx-gray-400 mb-6 font-mono text-sm font-semibold">
							[{String(index + 1).padStart(2, '0')}]
						</div>
						<h3 class="text-crx-black text-2xl font-medium tracking-tight">
							{metric.value}
						</h3>
						<p class="text-crx-gray-500 mt-2 text-sm font-bold tracking-[0.16em] uppercase">
							{metric.label}
						</p>
					</div>
					<p class="text-crx-gray-600 mt-8 text-sm leading-6">
						{metric.description}
					</p>
				</div>
			{/each}
		</div>

		<p class="text-crx-gray-700 mt-14 max-w-2xl text-lg leading-7" use:reveal={{ delay: 0.4, y: 16 }}>
			PullPay turns contribution activity into measurable ecosystem activity.
		</p>
	</div>
</section>
