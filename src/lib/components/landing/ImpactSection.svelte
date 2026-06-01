<script lang="ts">
	import { reveal } from '$lib/motion';

	const { metrics } = $props<{
		metrics: { value: string; label: string; description: string }[];
	}>();
</script>

<section id="impact" class="border-crx-border-subtle bg-crx-page border-b">
	<div class="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="mb-14 max-w-2xl space-y-5" use:reveal={{ y: 24 }}>
			<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">
				Ecosystem Impact
			</p>
			<h2
				class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
			>
				Verifiable on-chain execution
			</h2>
			<p class="text-crx-gray-700 max-w-lg text-sm leading-6">
				PullPay directly converts GitHub contributions into measurable on-chain Stellar activity.
			</p>
		</div>

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
	</div>
</section>
