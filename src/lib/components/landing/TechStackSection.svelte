<script lang="ts">
	import { reveal } from '$lib/motion';

	const { tools } = $props<{
		tools: { title: string; description: string }[];
	}>();
</script>

<section id="tech-stack" class="border-crx-border-subtle bg-crx-page border-b">
	<div class="mx-auto max-w-[1140px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="mb-16 max-w-2xl space-y-5" use:reveal={{ y: 24 }}>
			<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">Stellar Infrastructure</p>
			<h2
				class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
			>
				Built on production-ready tools.
			</h2>
			<p class="text-crx-gray-700 max-w-lg text-sm leading-6">
				PullPay is not a custodial service with a blockchain badge. It is a Soroban smart contract
				deployed directly on Stellar Testnet. Every tool below was chosen for a specific technical
				reason, not for checkbox compliance.
			</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each tools as tool, index (index)}
				<div
					class="group border-crx-border-subtle bg-crx-panel shadow-crx-sm hover:border-crx-orange/30 hover:shadow-crx-md relative overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7"
					use:reveal={{ delay: 0.08 + index * 0.08, y: 20 }}
				>
					<div
						class="bg-crx-orange/5 group-hover:bg-crx-orange/15 absolute -top-12 -right-12 size-40 rounded-full blur-3xl transition-all duration-700"
					></div>

					<div class="relative z-10">
						<div
							class="text-crx-orange mb-5 flex h-10 items-center font-mono text-sm font-semibold"
						>
							{tool.title}
						</div>
						<p class="text-crx-gray-700 text-sm leading-6">
							{tool.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
