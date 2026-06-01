<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { parallax, reveal } from '$lib/motion';

	const { logoMark } = $props<{
		logoMark: string;
	}>();
</script>

<!-- ═══════════════════════════════════════════
     HERO SECTION — exactly 1 viewport on desktop
     ═══════════════════════════════════════════ -->
<section id="top" class="hero-section bg-crx-page relative overflow-hidden">
	<!-- ─── Background Image (Desktop) ─── -->
	<div class="absolute inset-0 z-0 max-lg:hidden">
		<img
			use:parallax={{ from: -6, to: 6 }}
			src="/images/hero-pullpay.png"
			alt="Developer merging a pull request and receiving USDC payment"
			class="hero-bg absolute top-0 right-0 h-full w-[75%] object-cover object-[center_20%]"
		/>
	</div>

	<!-- ─── Content ─── -->
	<div class="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-6 lg:px-12">
		<!-- ── Headline + CTA (vertically centered, takes available space) ── -->
		<div class="flex items-center pt-28 pb-10 lg:flex-1 lg:pt-24 lg:pb-0">
			<div class="max-w-152 min-w-0 xl:max-w-2xl" use:reveal={{ y: 30 }}>
				<h1
					class="text-crx-black text-[clamp(2.5rem,4.5vw,4.2rem)] leading-[1.05] font-medium tracking-[-0.04em]"
				>
					Merge the PR<br />
					<span class="text-[#0FA8F1]">Payment is automatic</span>
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
						Create a Reward <span class="ml-1.5 font-light opacity-90">↗</span>
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
							<div class="bg-crx-border-subtle absolute top-8 right-4 left-4 h-px"></div>
							<div class="bg-crx-black/30 absolute top-8 left-4 h-px w-1/2"></div>
							<div class="relative z-10 flex justify-between">
								<!-- Step 1 -->
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
											Maintainer funded reward
										</p>
									</div>
								</div>
								<!-- Step 2 -->
								<div class="flex w-1/3 min-w-0 flex-col gap-2.5 px-2">
									<div
										class="border-crx-border-subtle text-crx-black grid size-8 place-items-center rounded-full border bg-white"
									>
										<svg
											class="size-4"
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
											PR verified by worker
										</p>
									</div>
								</div>
								<!-- Step 3 -->
								<div class="flex w-1/3 min-w-0 flex-col items-end gap-2.5 pl-2 text-right">
									<div
										class="border-crx-border-subtle text-crx-black grid size-8 place-items-center rounded-full border bg-white"
									>
										<svg
											class="size-4"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg
										>
									</div>
									<div>
										<p class="text-crx-black text-sm font-bold">Settled</p>
										<p class="text-crx-gray-500 mt-0.5 text-sm leading-snug font-medium">
											USDC sent to contributor
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
							<a href="#stellar" class="text-crx-black text-sm font-medium hover:text-[#0FA8F1]">
								View on Stellar ↗
							</a>
						</div>
					</div>
				</div>

				<!-- Right side: Built On card + Glass Token (desktop only) -->
				<div class="relative z-30 hidden flex-1 items-end justify-end lg:flex">
					<!-- Built On Card -->
					<div
						class="mr-6 mb-6 shrink-0 rounded-[1.25rem] border border-white/80 bg-white/85 px-7 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl xl:mr-10"
						use:reveal={{ delay: 0.15, y: 20 }}
					>
						<p class="text-crx-gray-500 mb-4 text-sm font-bold tracking-widest uppercase">
							Built on
						</p>
						<div class="flex flex-col gap-4">
							<div class="text-crx-black flex items-center gap-3 text-base font-medium">
								<svg class="size-[1.15rem]" viewBox="0 0 24 24" fill="none"
									><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" /><path
										d="M8 12h8m-4-4v8"
										stroke="currentColor"
										stroke-width="2"
									/></svg
								>
								Stellar
							</div>
							<div class="text-crx-black flex items-center gap-3 text-base font-medium">
								<svg class="size-[1.15rem]" viewBox="0 0 24 24" fill="none"
									><rect
										x="4"
										y="4"
										width="16"
										height="16"
										rx="2"
										stroke="currentColor"
										stroke-width="2"
									/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" /></svg
								>
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
	<div class="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
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

	/* Seamless image blend using CSS mask — no overlay artifacts */
	.hero-bg {
		-webkit-mask-image:
			linear-gradient(
				to right,
				transparent 0%,
				rgba(0, 0, 0, 0.03) 8%,
				rgba(0, 0, 0, 0.15) 18%,
				rgba(0, 0, 0, 0.5) 30%,
				rgba(0, 0, 0, 0.85) 42%,
				black 55%
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
				rgba(0, 0, 0, 0.03) 8%,
				rgba(0, 0, 0, 0.15) 18%,
				rgba(0, 0, 0, 0.5) 30%,
				rgba(0, 0, 0, 0.85) 42%,
				black 55%
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
