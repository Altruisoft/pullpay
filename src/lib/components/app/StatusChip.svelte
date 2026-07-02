<script lang="ts">
	import type { UiStatus } from '$lib/chain/types';
	import ShieldCheck from 'lucide-svelte/icons/shield-check';
	import Timer from 'lucide-svelte/icons/timer';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';
	import Undo2 from 'lucide-svelte/icons/undo-2';
	import Clock from 'lucide-svelte/icons/clock';

	let { status, releasableAt }: { status: UiStatus; releasableAt?: number | null } = $props();

	const MAP = {
		active: { label: 'Active', cls: 'bg-crx-info-soft text-crx-info', icon: ShieldCheck },
		releasing: { label: 'Releasing', cls: 'bg-crx-warning-soft text-amber-700', icon: Timer },
		'awaiting-trustline': {
			label: 'Awaiting trustline',
			cls: 'bg-crx-warning-soft text-amber-700',
			icon: AlertCircle
		},
		settled: { label: 'Settled', cls: 'bg-crx-success-soft text-crx-success', icon: CheckCircle2 },
		refunded: { label: 'Refunded', cls: 'bg-crx-muted text-crx-gray-500', icon: Undo2 },
		expired: { label: 'Expired', cls: 'bg-crx-danger-soft text-crx-danger', icon: Clock }
	} as const;

	let entry = $derived(MAP[status]);
	let suffix = $derived.by(() => {
		if (status !== 'releasing' || !releasableAt) return '';
		const hrs = Math.max(0, Math.ceil((releasableAt * 1000 - Date.now()) / 3_600_000));
		return ` · ${hrs}h left`;
	});
</script>

<span
	class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors duration-300 {entry.cls}"
>
	<entry.icon class="h-3.5 w-3.5" strokeWidth={1.5} />
	{entry.label}{suffix}
</span>
