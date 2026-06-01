<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { parallax, reveal } from '$lib/motion';

	const COL_COUNT = 12;
	const ROW_COUNT = 28;
	const CHARS = '0123456789abcdefxlm';
	const SHAPES = ['■', '□', '▬'];
	const integrations = [
		'USDC via SAC',
		'Soroban',
		'Stellar Asset Contract',
		'Freighter SDK',
		'GitHub API',
		'Cloudflare Workers'
	];
	const channels = ['pullpay.yml', 'GitHub Actions', 'PR Merge', 'Wallet Connect', 'RPC', 'XLM'];

	type CharItem = { char: string; bold: boolean; isShape: boolean };
	type Column = { speed: number; items: CharItem[] };

	const { detailImage } = $props<{
		detailImage: string;
	}>();

	let columns = $state<Column[]>([]);
	let interval: ReturnType<typeof setInterval>;

	function getRandomChar(): CharItem {
		const isShape = Math.random() > 0.9;
		const char = isShape
			? SHAPES[Math.floor(Math.random() * SHAPES.length)]
			: CHARS[Math.floor(Math.random() * CHARS.length)];
		return { char, bold: Math.random() > 0.7, isShape };
	}

	onMount(() => {
		columns = Array.from({ length: COL_COUNT }, () => ({
			speed: 10 + Math.random() * 18,
			items: Array.from({ length: ROW_COUNT }, getRandomChar)
		}));

		interval = setInterval(() => {
			if (columns.length === 0) return;
			for (let i = 0; i < 12; i += 1) {
				const c = Math.floor(Math.random() * COL_COUNT);
				const r = Math.floor(Math.random() * ROW_COUNT);
				columns[c].items[r] = getRandomChar();
			}
		}, 180);
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<section id="stellar-soroban" class="border-crx-border-subtle bg-crx-panel relative border-b">
	<div class="mx-auto min-h-screen max-w-[1280px] px-6 py-20 lg:px-10">
		<div class="mb-14 max-w-2xl space-y-5" use:reveal={{ y: 24 }}>
			<p class="text-crx-gray-500 text-xs font-medium tracking-[0.2em] uppercase">
				Stellar & Soroban
			</p>
			<h2
				class="text-crx-black max-w-[10ch] text-[clamp(3.2rem,6vw,6.8rem)] leading-[0.9] font-medium tracking-[-0.07em]"
			>
				Fast rails. Clear rules.
			</h2>
			<p class="text-crx-gray-700 max-w-84 text-sm leading-6">
				Low fees. Contract release. Visible state.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-[28rem_16rem_12rem]">
			<!-- 1. Stellar rails -->
			<div
				class="border-crx-orange/18 bg-crx-orange shadow-crx-orange relative overflow-hidden rounded-4xl border p-8 text-white md:col-span-2"
				use:reveal={{ delay: 0.06, y: 20 }}
			>
				<div class="absolute -top-24 -right-24 size-72 rounded-full bg-white/18 blur-3xl"></div>
				<div
					class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.13)_1px,transparent_1px)] bg-size-[44px_44px] opacity-10"
				></div>
				<div
					class="absolute inset-0 mask-[linear-gradient(to_bottom,transparent_0%,white_35%,white_100%)]"
				>
					<svg class="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
						<path
							d="M12 68 Q45 8 88 42"
							fill="none"
							stroke="rgba(255,255,255,0.62)"
							stroke-width="0.55"
							stroke-dasharray="100"
							stroke-dashoffset="100"
							pathLength="100"
							class="animate-draw-line"
						/>
						<path
							d="M18 84 Q55 38 92 78"
							fill="none"
							stroke="rgba(255,255,255,0.45)"
							stroke-width="0.45"
							stroke-dasharray="100"
							stroke-dashoffset="100"
							pathLength="100"
							class="animate-draw-line-delay-1"
						/>
						<path
							d="M5 44 Q44 76 78 22"
							fill="none"
							stroke="rgba(255,255,255,0.35)"
							stroke-width="0.35"
							stroke-dasharray="100"
							stroke-dashoffset="100"
							pathLength="100"
							class="animate-draw-line-delay-2"
						/>
						<circle cx="12" cy="68" r="1" fill="white" opacity="0.8" />
						<circle cx="88" cy="42" r="1" fill="white" opacity="0.8" />
					</svg>
				</div>

				<div class="relative z-10 flex h-full flex-col justify-between">
					<div
						class="flex size-14 items-center justify-center rounded-2xl bg-white/18 text-white backdrop-blur-xl"
					>
						<svg aria-hidden="true" viewBox="0 0 48 48" class="size-8" fill="none">
							<path
								d="M36.7 8.9 9.5 24.6"
								stroke="currentColor"
								stroke-width="4.2"
								stroke-linecap="round"
							/>
							<path
								d="M38.5 18.9 11.3 34.6"
								stroke="currentColor"
								stroke-width="4.2"
								stroke-linecap="round"
							/>
							<path
								d="M33.8 31.4A14 14 0 1 1 20.2 10.5"
								stroke="currentColor"
								stroke-width="3.4"
								stroke-linecap="round"
							/>
						</svg>
					</div>
					<div>
						<h3
							class="max-w-[8ch] text-[clamp(3rem,5vw,4rem)] leading-[0.92] font-medium tracking-[-0.06em]"
						>
							Stellar rails
						</h3>
						<p class="mt-4 max-w-[18rem] text-sm leading-6 text-white/80">
							Global, near-instant settlement for contributor rewards.
						</p>
					</div>
				</div>
			</div>

			<!-- 2. Live escrow -->
			<div
				class="border-crx-border-subtle shadow-crx-lg relative w-full overflow-hidden rounded-4xl border bg-white/5 p-4 backdrop-blur-xl md:col-span-1"
				use:reveal={{ delay: 0.1, y: 20 }}
			>
				<img
					src={detailImage}
					alt="PullPay product view"
					class="absolute inset-0 h-full w-full rounded-4xl object-cover p-8 pb-20"
					use:parallax={{ from: -12, to: 12, scaleFrom: 1.025, scaleTo: 1 }}
				/>
				<div
					class="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,246,243,0.08)_0%,rgba(247,246,243,0.72)_100%)]"
				></div>
				<div class="scan-line bg-crx-orange/90 absolute inset-x-0 top-0 h-px"></div>
				<div
					class="text-crx-black absolute right-6 bottom-6 rounded-2xl border border-white/60 bg-white/42 px-5 py-4 text-sm font-medium shadow-[0_18px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl"
				>
					Live reward escrow
				</div>
			</div>

			<!-- 3. Powered by SAC -->
			<div
				class="border-crx-border-subtle bg-crx-panel shadow-crx-sm relative flex flex-col justify-center overflow-hidden rounded-4xl border p-8 md:col-span-1"
				use:reveal={{ delay: 0.18, y: 20 }}
			>
				<p class="text-crx-orange text-sm font-medium tracking-[0.16em] uppercase">Native USDC</p>
				<h3
					class="text-crx-black mt-4 text-[clamp(2rem,3vw,2.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
				>
					Powered by SAC.
				</h3>
				<p class="text-crx-gray-700 mt-4 text-sm leading-6">
					Stellar Asset Contract eliminates token wrapping. Direct USDC transfers cost a fraction of
					a cent without needing approvals.
				</p>
			</div>

			<!-- 4. Soroban lock -->
			<div
				class="border-crx-border-subtle bg-crx-panel shadow-crx-sm relative overflow-hidden rounded-4xl border p-8 md:col-span-2"
				use:reveal={{ delay: 0.1, y: 20 }}
			>
				<div
					class="absolute inset-x-0 top-0 h-[80%] overflow-hidden mask-[linear-gradient(to_bottom,white_12%,transparent_100%)] opacity-45"
				>
					<div
						class="text-crx-orange/60 flex h-full w-full justify-around font-mono text-[12px] leading-8 tracking-widest"
					>
						{#each columns as col, _i (_i)}
							<div
								class="animate-matrix flex w-full flex-col items-center"
								style="--speed: {col.speed}s"
							>
								{#each [...col.items, ...col.items] as item, _i (_i)}
									<span
										class:font-bold={item.bold}
										class:text-crx-black={item.isShape}
										class:opacity-100={item.isShape}>{item.char}</span
									>
								{/each}
							</div>
						{/each}
					</div>
				</div>

				<div class="relative z-10 flex h-full flex-col justify-end">
					<div
						class="bg-crx-orange/15 text-crx-orange mb-6 flex size-16 items-center justify-center rounded-3xl shadow-[0_0_50px_rgba(15,168,241,0.2)] backdrop-blur-xl"
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 48 48"
							class="size-8"
							fill="none"
							stroke="currentColor"
							stroke-linejoin="round"
						>
							<path d="m24 6 15 8.6v18.8L24 42 9 33.4V14.6L24 6Z" stroke-width="3.2" />
							<path d="M9.5 15 24 23.5 38.5 15" stroke-width="3.2" stroke-linecap="round" />
							<path d="M24 23.5V41" stroke-width="3.2" stroke-linecap="round" />
						</svg>
					</div>
					<h3
						class="text-crx-black text-[clamp(2rem,3vw,2.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
					>
						Soroban lock
					</h3>
					<p class="text-crx-gray-700 mt-3 text-sm leading-6">Escrow rules execute on-chain.</p>
				</div>
			</div>

			<!-- 5. Share as a link -->
			<div
				class="border-crx-border-subtle bg-crx-orange shadow-crx-sm relative overflow-hidden rounded-4xl border p-8 md:col-span-2"
				use:reveal={{ delay: 0.26, y: 20 }}
			>
				<div
					class="absolute inset-y-0 right-0 flex w-[70%] flex-col justify-center gap-3 mask-[linear-gradient(to_right,transparent_0%,white_30%,white_100%)]"
				>
					<div class="animate-marquee-left flex w-max gap-3">
						{#each [1, 2] as _, _i (_i)}
							{#each integrations as item, _i (_i)}
								<div
									class="border-crx-border-subtle bg-crx-orange-soft text-crx-orange rounded-xl border px-3 py-2 text-sm font-medium"
								>
									{item}
								</div>
							{/each}
						{/each}
					</div>
					<div class="animate-marquee-right -ml-16 flex w-max gap-3">
						{#each [1, 2] as _, _i (_i)}
							{#each channels as item, _i (_i)}
								<div
									class="border-crx-border-subtle bg-crx-panel/80 text-crx-gray-700 rounded-xl border px-3 py-2 text-sm font-medium backdrop-blur-xl"
								>
									{item}
								</div>
							{/each}
						{/each}
					</div>
				</div>
				<div class="relative z-10 flex h-full flex-col justify-center">
					<p class="text-crx-gray-800 text-sm font-medium tracking-[0.16em] uppercase">
						SEP-7 / Pre-flight
					</p>
					<h3
						class="text-crx-black mt-3 max-w-[9ch] text-[clamp(2rem,3vw,2.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
					>
						GitHub-native.
					</h3>
				</div>
			</div>

			<!-- 6. Low-fee close -->
			<div
				class="border-crx-orange/20 bg-crx-orange-soft shadow-crx-sm relative overflow-hidden rounded-4xl border p-8 md:col-span-1"
				use:reveal={{ delay: 0.26, y: 20 }}
			>
				<div
					class="border-crx-orange/25 absolute top-6 right-6 flex size-14 items-center justify-center rounded-full border"
				>
					<div
						class="orbit-spin border-crx-orange/45 absolute inset-2 rounded-full border border-dashed"
					></div>
					<div class="bg-crx-orange size-2 rounded-full"></div>
				</div>
				<div class="relative z-10 flex h-full flex-col justify-end">
					<p class="text-crx-orange text-sm font-medium tracking-[0.16em] uppercase">Cost</p>
					<h3
						class="text-crx-black mt-3 text-[clamp(2rem,3vw,2.5rem)] leading-[0.92] font-medium tracking-[-0.06em]"
					>
						Low-fee<br />close.
					</h3>
					<p class="text-crx-gray-700 mt-3 text-sm leading-6">Micro-rewards made viable.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes slide-down-infinite {
		0% {
			transform: translateY(-50%);
		}
		100% {
			transform: translateY(0%);
		}
	}

	@keyframes draw-line {
		0% {
			stroke-dashoffset: 100;
			opacity: 0;
		}
		15% {
			opacity: 1;
		}
		85% {
			stroke-dashoffset: 0;
			opacity: 1;
		}
		100% {
			stroke-dashoffset: 0;
			opacity: 0;
		}
	}

	@keyframes scan-line {
		0% {
			transform: translateY(0);
			opacity: 0;
		}
		12% {
			opacity: 0.9;
		}
		100% {
			transform: translateY(18rem);
			opacity: 0;
		}
	}

	@keyframes marquee-left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@keyframes marquee-right {
		0% {
			transform: translateX(-50%);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes orbit-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.animate-matrix {
		animation: slide-down-infinite var(--speed) linear infinite;
	}
	.animate-draw-line {
		animation: draw-line 6s ease-in-out infinite;
	}
	.animate-draw-line-delay-1 {
		animation: draw-line 6s ease-in-out infinite 2s;
	}
	.animate-draw-line-delay-2 {
		animation: draw-line 6s ease-in-out infinite 4s;
	}
	.scan-line {
		animation: scan-line 4.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
	}
	.animate-marquee-left {
		animation: marquee-left 25s linear infinite;
	}
	.animate-marquee-right {
		animation: marquee-right 25s linear infinite;
	}
	.orbit-spin {
		animation: orbit-spin 8s linear infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-matrix,
		.animate-draw-line,
		.animate-draw-line-delay-1,
		.animate-draw-line-delay-2,
		.scan-line,
		.animate-marquee-left,
		.animate-marquee-right,
		.orbit-spin {
			animation: none;
		}
	}
</style>
