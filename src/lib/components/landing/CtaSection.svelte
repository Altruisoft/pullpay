<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { parallax, reveal } from '$lib/motion';

	const { portraitImage } = $props<{ portraitImage: string }>();
</script>

<section id="final-cta" class="bg-crx-page relative">
	<!-- Ambient background glow -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div
			class="bg-crx-orange/6 absolute top-0 left-1/2 h-200 w-200 -translate-x-1/2 rounded-full blur-[120px]"
		></div>
	</div>

	<div class="relative mx-auto max-w-[1280px] px-6 py-24 lg:px-10">
		<div
			class="group border-crx-border-subtle shadow-crx-lg relative overflow-hidden rounded-[2.4rem] border bg-[#0FA8F1] transition-shadow duration-700 hover:shadow-[0_32px_100px_rgba(15,168,241,0.28)]"
		>
			<!-- Card gradient overlay -->
			<div
				class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,0.06),transparent_40%)]"
			></div>

			<div class="relative grid gap-10 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
				<!-- Left: Copy & Actions -->
				<div class="relative z-10 flex flex-col justify-between gap-8">
					<div class="space-y-5">
						<p class="text-crx-white/60 text-sm tracking-[0.18em] uppercase" use:reveal={{ y: 20 }}>
							Start now
						</p>

						<!-- Heading with gradient glow underneath -->
						<div class="relative">
							<div
								class="bg-crx-white/10 pointer-events-none absolute -top-8 -left-8 h-40 w-56 rounded-full blur-[60px]"
							></div>
							<h2
								class="text-crx-white max-w-[11ch] text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-tighter"
								use:reveal={{ delay: 0.08, y: 20 }}
							>
								Automate Payouts on Merge.
							</h2>
						</div>

						<p
							class="text-crx-white/80 max-w-132 text-lg leading-7"
							use:reveal={{ delay: 0.14, y: 16 }}
						>
							PullPay converts GitHub contributions into on-chain Stellar activity. Trust-minimized
							settlement built for the Stellar ecosystem.
						</p>
					</div>

					<div class="flex flex-wrap gap-4" use:reveal={{ delay: 0.2, y: 16 }}>
						<Button
							href="/app"
							variant="black"
							size="lg"
							class="rounded-2xl transition-transform duration-300 hover:scale-[1.03]"
						>
							Create a Reward ↗
						</Button>
						<Button
							href="#how-it-works"
							variant="ghost"
							size="lg"
							class="border-crx-white/30 text-crx-white hover:bg-crx-white hover:text-crx-black rounded-2xl border transition-all duration-300 hover:scale-[1.03]"
						>
							See How It Works
						</Button>
					</div>
				</div>

				<!-- Right: Image panel -->
				<div
					class="border-crx-white/20 bg-crx-orange/80 relative min-h-[380px] overflow-hidden rounded-4xl border transition-shadow duration-500"
					use:reveal={{ delay: 0.28, y: 24 }}
				>
					<!-- Image panel gradient depth -->
					<div
						class="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_40%,rgba(0,0,0,0.06)_100%)]"
					></div>

					<!-- Portrait -->
					<img
						src={portraitImage}
						alt="PullPay closing visual"
						class="absolute inset-0 h-full w-full object-cover object-[56%_28%] p-8 pl-12 transition-transform duration-1200 group-hover:scale-[1.04]"
						use:parallax={{ from: -16, to: 18, scaleFrom: 1.04, scaleTo: 1 }}
					/>

					<!-- Decorative gradient blob behind glass -->
					<div
						class="bg-crx-white/12 pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full blur-[50px]"
					></div>

					<!-- Bottom edge gradient -->
					<div
						class="from-crx-orange/20 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-linear-to-t to-transparent"
					></div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@media (prefers-reduced-motion: reduce) {
		/* placeholder for future animations */
	}
</style>
