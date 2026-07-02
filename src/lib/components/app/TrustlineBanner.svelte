<script lang="ts">
	import { establishTrustline, hasTrustline } from '$lib/chain/contract';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import Loader2 from 'lucide-svelte/icons/loader-2';

	let {
		address,
		onresolved
	}: { address: string; onresolved?: () => void } = $props();

	let busy = $state(false);
	let error = $state<string | null>(null);

	async function fix() {
		busy = true;
		error = null;
		try {
			await establishTrustline(address);
			if (await hasTrustline(address)) onresolved?.();
		} catch (e) {
			error = (e as Error).message;
		} finally {
			busy = false;
		}
	}
</script>

<div
	class="flex flex-col gap-3 rounded-xl border border-crx-border-subtle bg-crx-warning-soft p-4 sm:flex-row sm:items-center sm:justify-between"
	role="alert"
>
	<div class="flex items-start gap-2.5">
		<AlertCircle class="mt-0.5 h-4 w-4 shrink-0 text-amber-700" strokeWidth={1.5} />
		<div class="text-sm text-crx-charcoal">
			<p class="font-medium">Your account needs a USDC trustline to receive funds</p>
			{#if error}<p class="mt-1 text-crx-danger">{error}</p>{/if}
		</div>
	</div>
	<button
		type="button"
		onclick={fix}
		disabled={busy}
		class="inline-flex shrink-0 items-center gap-2 rounded-lg bg-crx-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-crx-charcoal disabled:opacity-60"
	>
		{#if busy}<Loader2 class="h-4 w-4 animate-spin" />{/if}
		Add trustline
	</button>
</div>
