<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { parallax, reveal } from '$lib/motion';

	const { logoMark } = $props<{
		logoMark: string;
	}>();
</script>

<!-- ═══════════════════════════════════════════
     HERO SECTION
     ═══════════════════════════════════════════ -->
<section id="top" class="hero-section bg-crx-page relative overflow-hidden">
	<!-- ─── Background Image (Desktop) ─── -->
	<div class="absolute inset-0 z-0 max-lg:hidden">
		<img
			use:parallax={{ from: -6, to: 6 }}
			src="/images/hero-pullpay.png"
			alt="Developer workspace"
			class="hero-bg absolute top-0 right-0 h-full w-[75%] object-cover object-[center_20%]"
		/>
	</div>

	<div class="relative z-10 mx-auto flex h-full w-full max-w-[1280px] flex-col px-6 lg:px-12">
		<!-- ── Headline + CTA ── -->
		<div class="flex items-center pt-28 pb-10 lg:flex-1 lg:pt-24 lg:pb-0">
			<div class="max-w-152 min-w-0 xl:max-w-2xl" use:reveal={{ y: 30 }}>
				<h1
					class="text-crx-black text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] font-medium tracking-[-0.04em]"
				>
					Merge the PR<br />
					<span class="text-[#0FA8F1]">Payment is Automatic</span>
				</h1>

				<div class="mt-6 flex items-center gap-4">
					<div class="h-px w-10 bg-[#0FA8F1]"></div>
					<p class="text-crx-gray-500 text-base font-medium lg:text-lg">
						Automated contributor rewards on Stellar
					</p>
				</div>

				<div class="mt-8 flex flex-wrap items-center gap-6">
					<Button
						href="/app"
						variant="primary"
						size="lg"
						class="hover:bg-crx-orange-hover rounded-[0.9rem] bg-[#0FA8F1] px-8 py-3.5 font-medium text-white shadow-lg"
					>
						Create Reward <span class="ml-1.5 font-light opacity-90">↗</span>
					</Button>
					<a
						href="#how-it-works"
						class="text-crx-black inline-flex items-center gap-2 text-base font-medium transition-colors hover:text-[#0FA8F1]"
					>
						How it works <span aria-hidden="true" class="text-sm font-light">↗</span>
					</a>
				</div>
			</div>
		</div>

		<!-- ── Escrow Card Row ── -->
		<div class="pb-8 lg:pb-10">
			<div class="flex flex-col gap-6 lg:flex-row lg:items-end">
				<!-- Escrow Card -->
				<div
					class="relative z-20 w-full max-w-2xl min-w-0 shrink-0 lg:w-[50%] lg:max-w-none xl:w-[46%]"
					use:reveal={{ delay: 0.1, y: 40 }}
				>
					<div
						class="border-crx-border-subtle/60 rounded-[1.5rem] border bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.06)] sm:p-8"
					>
						<!-- Top Section -->
						<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
							<div>
								<div class="text-crx-gray-500 flex items-center gap-2 text-sm font-semibold">
									<span class="size-1.5 rounded-full bg-[#0FA8F1]"></span>
									Open PR
								</div>
								<h3 class="text-crx-black mt-2.5 text-xl font-medium tracking-tight">
									Fix Navigation Bug
								</h3>
								<p class="text-crx-gray-500 mt-0.5 text-sm font-medium">by Contributor</p>
								<div
									class="bg-crx-page text-crx-gray-700 mt-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-semibold"
								>
									<svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										></path></svg
									>
									Code Fix
								</div>
							</div>
							<div class="sm:text-right">
								<p class="text-crx-gray-500 text-sm font-semibold tracking-widest uppercase">
									Reward Amount
								</p>
								<p class="text-crx-black mt-1 text-2xl leading-none font-semibold tracking-tight">
									37.25 USDC
								</p>
								<p class="text-crx-gray-500 mt-1.5 text-sm font-medium">Stellar Network</p>
							</div>
						</div>

						<!-- Progress Section -->
						<div class="relative mt-8 pt-4 pb-7">
							<!-- Background track -->
							<div class="bg-crx-border-subtle absolute top-8 right-4 left-4 h-px"></div>
							<!-- Active track — full width = all steps done -->
							<div class="absolute top-8 left-4 right-4 h-px bg-[#0FA8F1]"></div>
							<div class="relative z-10 flex justify-between">
								<!-- Step 1: Locked (completed) -->
								<div class="flex w-1/3 min-w-0 flex-col gap-2.5 pr-2">
									<div class="grid size-8 place-items-center rounded-full bg-[#0FA8F1] text-white">
										<svg
											class="size-3.5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.5"
											><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path
												d="M7 11V7a5 5 0 0 1 10 0v4"
											></path></svg
										>
									</div>
									<div>
										<p class="text-crx-black text-sm font-bold">Locked</p>
										<p class="text-crx-gray-500 mt-0.5 text-sm leading-snug font-medium">
											Maintainer funded
										</p>
									</div>
								</div>
								<!-- Step 2: Merged (completed) -->
								<div class="flex w-1/3 min-w-0 flex-col gap-2.5 px-2">
									<div class="grid size-8 place-items-center rounded-full bg-[#0FA8F1] text-white">
										<svg
											class="size-3.5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg
										>
									</div>
									<div>
										<p class="text-crx-black text-sm font-bold">Merged</p>
										<p class="text-crx-gray-500 mt-0.5 text-sm leading-snug font-medium">
											PR verified
										</p>
									</div>
								</div>
								<!-- Step 3: Settled (completed) -->
								<div class="flex w-1/3 min-w-0 flex-col items-end gap-2.5 pl-2 text-right">
									<div
										class="grid size-8 place-items-center rounded-full bg-crx-success text-white"
									>
										<svg
											class="size-3.5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg
										>
									</div>
									<div>
										<p class="text-crx-black text-sm font-bold">Settled</p>
										<p class="text-crx-gray-500 mt-0.5 text-sm leading-snug font-medium">
											USDC sent
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Bottom Section -->
						<div
							class="border-crx-border-subtle/70 flex flex-wrap items-center justify-between gap-4 border-t pt-5"
						>
							<div class="flex flex-wrap items-center gap-4 sm:gap-7">
								<div class="flex items-center gap-2.5">
									<img
										src={logoMark}
										alt="Maintainer"
										class="bg-crx-page size-7 rounded-full object-cover"
									/>
									<div>
										<p class="text-crx-gray-500 text-sm font-semibold">Maintainer</p>
										<p class="text-crx-black text-sm font-medium">GBXF...7Q3K</p>
									</div>
								</div>
								<div class="flex items-center gap-2.5">
									<div
										class="bg-crx-black grid size-7 place-items-center rounded-full text-sm font-medium text-white"
									>
										NS
									</div>
									<div>
										<p class="text-crx-gray-500 text-sm font-semibold">Contributor</p>
										<p class="text-crx-black text-sm font-medium">GDN...4KJ2</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Right side: Built On card (desktop only) -->
				<div class="relative z-30 hidden flex-1 items-end justify-end lg:flex">
					<!-- Built On Card -->
					<div
						class="border-crx-border-subtle mr-6 mb-6 shrink-0 rounded-[1.25rem] border bg-white px-7 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] xl:mr-10"
						use:reveal={{ delay: 0.15, y: 20 }}
					>
						<p class="text-crx-gray-500 mb-4 text-sm font-bold tracking-widest uppercase">
							Built on
						</p>
						<div class="flex flex-col gap-4">
							<div class="text-crx-black flex items-center gap-3 text-base font-medium">
								<svg class="size-[1.15rem]" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M12.003 1.716c-1.37 0-2.7.27-3.948.78A10.18 10.18 0 0 0 2.66 7.901a10.136 10.136 0 0 0-.797 3.954c0 .258.01.516.027.775a1.942 1.942 0 0 1-1.055 1.88L0 14.934v1.902l2.463-1.26.072-.032v.005l.77-.39.758-.385.066-.039 14.807-7.56 1.666-.847 3.392-1.732V2.694L17.792 5.86 3.744 13.025l-.104.055-.017-.115a8.286 8.286 0 0 1-.071-1.105c0-2.255.88-4.377 2.474-5.977a8.462 8.462 0 0 1 2.71-1.82 8.513 8.513 0 0 1 3.2-.654h.067a8.41 8.41 0 0 1 4.09 1.055l1.628-.83.126-.066a10.11 10.11 0 0 0-5.845-1.853zM24 7.143 5.047 16.808l-1.666.847L0 19.382v1.902l3.282-1.671 2.91-1.485 14.058-7.153.105-.055.016.115c.05.369.072.743.072 1.11 0 2.255-.88 4.383-2.475 5.978a8.461 8.461 0 0 1-2.71 1.82 8.305 8.305 0 0 1-3.2.654h-.06c-1.441 0-2.86-.369-4.102-1.061l-.066.033-1.683.857c.594.418 1.232.776 1.903 1.062a10.11 10.11 0 0 0 3.947.797 10.09 10.09 0 0 0 7.17-2.975 10.136 10.136 0 0 0 2.969-7.18c0-.259-.005-.523-.027-.781a1.942 1.942 0 0 1 1.055-1.88L24 9.044z"
									/>
								</svg>
								Stellar
							</div>
							<div class="text-crx-black flex items-center gap-3 text-base font-medium">
								<svg
									class="size-[1.15rem]"
									width="104"
									height="105"
									viewBox="0 0 104 105"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
								>
									<rect width="104" height="105" fill="url(#pattern0_156_3)" />
									<defs>
										<pattern
											id="pattern0_156_3"
											patternContentUnits="objectBoundingBox"
											width="1"
											height="1"
										>
											<use
												xlink:href="#image0_156_3"
												transform="matrix(0.00595238 0 0 0.00589569 0 -0.00113379)"
											/>
										</pattern>
										<image
											id="image0_156_3"
											width="168"
											height="170"
											preserveAspectRatio="none"
											xlink:href="data:image/png;base64,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t6+//vpoeajb+w/oX0w7/3ryrO/ky5fviIomXKEqnuh/UsCpLnlbn+jU0CXfl8w/gTJQsGDBI/fcc887us6srU3PJcuXL79PV7kLNHh2JfNYpmFHP0AzgSpZp2oj9TU7/8WLFz82evToi7t06XKXANK5apWqc0qVKvW9NllHBTQ8bDDZ3uFxY4VaQstI/MESwj4TExMTuPzyyw/pZOFrTd2j+QGLV1999frJkyfn00XDYyNGjJhcu3Zt1siJa8jEqSyAhsF4mk5/79mz53J5194LFi544NNPP71GIMo/ePDgq3r06FGmVatWj9epU6eDjnqGqOyQatWqvV2hQoWP7rzzzk8IK1WqNOfBBx8cJbB15IfTNEU/yXMC42UCf/61a9fepKn72WHDhk3Di2uA4LHD0JOMr9Kf8SKc+RLIc8byBpWA+SN3/7oHf2fixIkDdNTTevr06a3nz5//hO7I71mxYsWdhFrfPjB79uwmkyZN6jtmzBiWENN5rlmzZrsE5r+o78zXWlwPswAap4eszyjVQBZAo9QwWWLFaSALoHF6yPqMUg2cyQCNUpVniZUaDWQBNDXayiobcQ1kATTiKs9qMDUayAJoarSVVTbiGsgCaMRVntVgajSQBdDUaCurbMQ18P8AAAD//ys2U3sAAAAGSURBVAMA97DkCFxEBboAAAAASUVORK5CYII="
										/>
									</defs>
								</svg>

								Soroban
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ═══════════════════════════════════════════
     HERO FEATURES BAR — separate section below hero
     ═══════════════════════════════════════════ -->
<section class="bg-crx-page relative z-20" use:reveal={{ delay: 0.2, y: 30 }}>
	<div class="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
		<div
			class="divide-crx-border-subtle border-crx-border-subtle grid divide-y border-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
		>
			<!-- Feature 1 -->
			<div class="flex flex-col gap-4 p-8 sm:flex-row sm:items-start lg:p-12">
				<div class="mt-0.5 shrink-0 text-[#0FA8F1]">
					<svg
						class="size-8"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg
					>
				</div>
				<div>
					<h4 class="text-crx-black text-base font-semibold tracking-tight">Trust-Minimized</h4>
					<p class="text-crx-gray-500 mt-2 text-sm leading-relaxed font-medium">
						No custody.<br class="hidden sm:block" />GitHub APIs enforce payouts.
					</p>
				</div>
			</div>
			<!-- Feature 2 -->
			<div class="flex flex-col gap-4 p-8 sm:flex-row sm:items-start lg:p-12">
				<div class="mt-0.5 shrink-0 text-[#0FA8F1]">
					<svg
						class="size-8"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.2"
						><path
							d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
						></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line
							x1="12"
							y1="22.08"
							x2="12"
							y2="12"
						></line></svg
					>
				</div>
				<div>
					<h4 class="text-crx-black text-base font-semibold tracking-tight">
						Built for Open Source
					</h4>
					<p class="text-crx-gray-500 mt-2 text-sm leading-relaxed font-medium">
						Bug fixes, docs, translations,<br class="hidden sm:block" />and ecosystem growth.
					</p>
				</div>
			</div>
			<!-- Feature 3 -->
			<div class="flex flex-col gap-4 p-8 sm:flex-row sm:items-start lg:p-12">
				<div class="mt-0.5 shrink-0 text-[#0FA8F1]">
					<svg
						class="size-8"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.2"
						><polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						></polygon></svg
					>
				</div>
				<div>
					<h4 class="text-crx-black text-base font-semibold tracking-tight">
						On Stellar & Soroban
					</h4>
					<p class="text-crx-gray-500 mt-2 text-sm leading-relaxed font-medium">
						Fast, low-cost, and<br class="hidden sm:block" />developer friendly.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		min-height: auto;
		height: auto;
	}
	@media (min-width: 1024px) {
		.hero-section {
			height: 100dvh;
			max-height: 100dvh;
		}
	}

	/* Seamless image blend using CSS mask */
	.hero-bg {
		-webkit-mask-image:
			linear-gradient(
				to right,
				transparent 0%,
				transparent 25%,
				rgba(0, 0, 0, 0.15) 35%,
				rgba(0, 0, 0, 0.5) 45%,
				rgba(0, 0, 0, 0.85) 55%,
				black 65%
			),
			linear-gradient(
				to top,
				transparent 0%,
				rgba(0, 0, 0, 0.4) 8%,
				rgba(0, 0, 0, 0.85) 18%,
				black 30%
			),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, black 8%);
		-webkit-mask-composite: destination-in;
		mask-image:
			linear-gradient(
				to right,
				transparent 0%,
				transparent 25%,
				rgba(0, 0, 0, 0.15) 35%,
				rgba(0, 0, 0, 0.5) 45%,
				rgba(0, 0, 0, 0.85) 55%,
				black 65%
			),
			linear-gradient(
				to top,
				transparent 0%,
				rgba(0, 0, 0, 0.4) 8%,
				rgba(0, 0, 0, 0.85) 18%,
				black 30%
			),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, black 8%);
		mask-composite: intersect;
	}
</style>
