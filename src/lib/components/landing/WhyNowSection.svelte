<script lang="ts">
	import { reveal } from '$lib/motion';
</script>

<section id="why-now" class="border-crx-border-subtle bg-crx-panel border-b">
	<div class="mx-auto max-w-[1140px] px-6 py-20 lg:px-10 lg:py-28">
		<div class="grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
			<div class="space-y-5 lg:sticky lg:top-28 lg:self-start" use:reveal={{ y: 24 }}>
				<p class="text-crx-gray-500 text-sm font-medium tracking-[0.2em] uppercase">Timing</p>
				<h2
					class="text-crx-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
				>
					Why Now
				</h2>
			</div>

			<div class="space-y-10" use:reveal={{ delay: 0.1, y: 24 }}>
				<div class="text-crx-gray-700 space-y-6 text-lg leading-7">
					<p>
						Stellar continues to invest in developer tooling, grants, hackathons, and ecosystem growth. As more projects launch on Stellar, contributor incentives become increasingly important.
					</p>
					<p>
						PullPay explores a reusable infrastructure layer that allows ecosystem projects to reward open-source work using the same programmable financial rails that power the broader Stellar network.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
