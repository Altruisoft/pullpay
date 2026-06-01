<script lang="ts">
	import { reveal } from '$lib/motion';

	const { metrics } = $props<{
		metrics: { value: string; label: string; description: string }[];
	}>();
</script>

<section id="impact" class="border-crx-border-subtle bg-crx-panel border-b">
	<div class="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="mb-14 max-w-2xl space-y-5" use:reveal={{ y: 24 }}>
			<p class="text-crx-gray-500 text-xs font-medium tracking-[0.2em] uppercase">
				Ecosystem Impact
			</p>
			<h2
				class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
			>
				Every settlement creates Stellar activity.
			</h2>
			<p class="text-crx-gray-700 max-w-lg text-sm leading-6">
				PullPay directly converts GitHub contributions into measurable on-chain Stellar activity.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each metrics as metric, index (index)}
				<div
					class="border-crx-border-subtle bg-crx-page group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					use:reveal={{ delay: 0.06 + index * 0.08, y: 20 }}
				>
					<div
						class="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-crx-orange/5 blur-2xl transition-all duration-700 group-hover:bg-crx-orange/15"
					></div>

					<div class="relative z-10">
						<div class="mb-4 flex items-center gap-3">
							<div
								class="flex size-10 items-center justify-center rounded-xl bg-crx-orange/10 text-crx-orange"
							>
								<span class="text-lg font-bold">{index + 1}</span>
							</div>
						</div>
						<h3 class="text-crx-black text-lg font-semibold tracking-tight">
							{metric.value}
						</h3>
						<p class="text-crx-orange mt-1 text-xs font-medium tracking-[0.16em] uppercase">
							{metric.label}
						</p>
						<p class="text-crx-gray-700 mt-3 text-sm leading-6">
							{metric.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
