<script lang="ts">
	import { reveal } from '$lib/motion';
	import type { InfoCard } from './types';

	const { cards } = $props<{ cards: InfoCard[] }>();
</script>

<section id="architecture" class="border-crx-border-subtle bg-crx-page border-b">
	<div class="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="grid gap-14 lg:grid-cols-[0.45fr_0.55fr]">
			<div class="space-y-5 lg:sticky lg:top-28 lg:self-start" use:reveal={{ y: 24 }}>
				<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">Architecture</p>
				<h2
					class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
				>
					Trust-minimized settlement infrastructure
				</h2>
				<p class="text-crx-gray-700 max-w-88 text-sm leading-6">
					PullPay relies on three core components. The GitHub Action only notifies — the Worker
					independently verifies via GitHub API and the contract enforces per-reward release limits.
				</p>
			</div>

			<div class="space-y-5" use:reveal={{ delay: 0.1, y: 24 }}>
				{#each cards as mechanism, index (index)}
					<div
						class="border-crx-border-subtle bg-crx-panel rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-lg"
					>
						<div class="flex items-start gap-4">
							<div class="mt-1 shrink-0 rounded-full bg-[#0FA8F1]/10 p-1">
								<svg
									class="size-3 text-[#0FA8F1]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="3"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="text-crx-black text-[0.95rem] leading-snug font-semibold">
									{mechanism.title}
								</h3>
								<p class="text-crx-gray-700 mt-2.5 text-sm leading-6">
									{@html mechanism.description}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
