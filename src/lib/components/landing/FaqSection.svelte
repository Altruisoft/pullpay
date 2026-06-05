<script lang="ts">
	import { reveal } from '$lib/motion';
	import type { FaqItem } from './types';

	const { items } = $props<{ items: FaqItem[] }>();

	let openIndex = $state<number | null>(null);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<section id="faq" class="border-crx-border-subtle bg-crx-panel border-b">
	<div class="mx-auto max-w-[1140px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
			<div class="space-y-5 lg:sticky lg:top-28 lg:self-start" use:reveal={{ y: 24 }}>
				<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">FAQ</p>
				<h2
					class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
				>
					Common questions
				</h2>
				<p class="text-crx-gray-700 max-w-72 text-sm leading-6">
					Everything you need to know about how PullPay works.
				</p>
			</div>

			<div class="space-y-3" use:reveal={{ delay: 0.1, y: 24 }}>
				{#each items as item, index (index)}
					<div
						class="border-crx-border-subtle bg-crx-panel hover:shadow-crx-sm overflow-hidden rounded-2xl border transition-shadow duration-300"
					>
						<button
							class="text-crx-black hover:text-crx-orange flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold transition-colors sm:text-base"
							onclick={() => toggle(index)}
							aria-expanded={openIndex === index}
						>
							<span>{item.question}</span>
							<span
								class="border-crx-border-subtle bg-crx-page/70 text-crx-gray-500 flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 {openIndex ===
								index
									? 'border-crx-orange/30 bg-crx-orange-soft text-crx-orange rotate-45'
									: ''}"
							>
								+
							</span>
						</button>
						{#if openIndex === index && item.answer}
							<div class="faq-expand border-crx-border-subtle/60 border-t px-6 pt-4 pb-5">
								<p class="text-crx-gray-700 max-w-xl text-sm leading-6">{item.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.faq-expand {
		animation: faq-slide 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes faq-slide {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.faq-expand {
			animation: none;
		}
	}
</style>
