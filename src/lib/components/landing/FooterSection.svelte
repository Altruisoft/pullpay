<script lang="ts">
	import type { FooterLink } from './types';
	import { parallax, reveal } from '$lib/motion';

	const { logo, links } = $props<{ logo: string; links: FooterLink[] }>();
</script>

<footer class="border-crx-black bg-crx-black text-crx-white relative overflow-hidden border-t">
	<div class="footer-grid pointer-events-none absolute inset-0 opacity-[0.16]"></div>
	<div
		class="bg-crx-orange/25 absolute top-0 -right-24 h-72 w-72 rounded-full blur-3xl"
		use:parallax={{ from: 18, to: -18 }}
	></div>
	<div
		class="bg-crx-orange-soft/10 absolute -bottom-32 left-10 h-64 w-64 rounded-full blur-3xl"
		use:parallax={{ from: -18, to: 18 }}
	></div>

	<div class="relative mx-auto max-w-[1140px] px-6 py-12 lg:px-10 lg:py-16">
		<div class="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
			<div class="footer-brand max-w-xl" use:reveal={{ y: 24 }}>
				<a
					href="#top"
					class="group focus-visible:ring-crx-orange/45 inline-flex items-center gap-3 rounded-3xl outline-none focus-visible:ring-3"
					aria-label="PullPay home"
				>
					<img src={logo} alt="PullPay" class="h-10 w-auto brightness-0 invert" />
				</a>

				<p
					class="text-crx-white mt-6 max-w-132 text-2xl leading-[1.05] font-semibold tracking-[-0.055em] text-balance sm:text-4xl"
				>
					Automated Contributor Rewards on Stellar
				</p>
				<p class="text-crx-white/62 mt-4 max-w-120 text-sm leading-6">
					Merge the PR. Payment is automatic. Built with Soroban escrow and GitHub Actions.
				</p>
			</div>

			<div
				class="border-crx-white/10 bg-crx-white/6 rounded-[1.75rem] border p-3 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
			>
				<div
					class="border-crx-white/10 flex flex-col gap-3 rounded-[1.35rem] border p-4 sm:flex-row sm:items-center sm:justify-between"
				>
					<div>
						<p class="text-crx-white/40 text-sm font-semibold tracking-[0.34em] uppercase">
							Network ready
						</p>
						<p class="text-crx-white mt-2 text-sm font-semibold">Stellar + Soroban</p>
					</div>
					<span
						class="bg-crx-orange text-crx-white inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold tracking-[0.18em] uppercase"
					>
						<span class="status-dot bg-crx-white size-2 rounded-full"></span>
						Live
					</span>
				</div>

				<nav
					class="text-crx-white/70 mt-3 grid grid-cols-2 gap-2 text-sm font-semibold"
					aria-label="Footer navigation"
					use:reveal={{ delay: 0.12, y: 16 }}
				>
					{#each links as link, _i (_i)}
						<a
							href={link.href}
							class="footer-link group border-crx-white/8 bg-crx-white/[0.035] hover:border-crx-orange/45 hover:bg-crx-white/8 hover:text-crx-white focus-visible:ring-crx-orange/40 relative overflow-hidden rounded-2xl border px-4 py-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:outline-none"
						>
							<span class="relative z-10">{link.label}</span>
							<span
								class="text-crx-orange absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:right-3 group-hover:opacity-100"
								>↗</span
							>
						</a>
					{/each}
				</nav>
			</div>
		</div>

		<div
			class="border-crx-white/10 text-crx-white/42 mt-10 flex flex-col gap-4 border-t pt-6 text-sm font-semibold tracking-[0.22em] uppercase sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {new Date().getFullYear()} PullPay</p>
			<p>Built on Stellar · Powered by Soroban</p>
		</div>
	</div>
</footer>

<style>
	.footer-grid {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
		background-size: 46px 46px;
		mask-image: linear-gradient(to bottom, transparent, black 22%, black 72%, transparent);
	}

	.footer-brand {
		animation: footer-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.status-dot {
		animation: status-pulse 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
	}

	@keyframes footer-rise {
		from {
			opacity: 0;
			transform: translate3d(0, 18px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes status-pulse {
		0%,
		100% {
			opacity: 0.55;
			transform: scale(0.82);
		}
		50% {
			opacity: 1;
			transform: scale(1.15);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.footer-brand,
		.status-dot {
			animation: none;
		}
	}
</style>
