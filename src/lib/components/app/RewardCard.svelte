<script lang="ts">
	import { formatUSDC } from '$lib/utils/stellar';
	import Github from '$lib/components/ui/GithubIcon.svelte';
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';
	import Clock from 'lucide-svelte/icons/clock';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';

	let { 
		repo = '', 
		issueTitle = '', 
		issueNumber = 0, 
		amount = 0, 
		status = 'active', // 'active' | 'completed' | 'disputed'
		date = ''
	} = $props<{
		repo: string;
		issueTitle: string;
		issueNumber: number;
		amount: number;
		status: 'active' | 'completed' | 'disputed';
		date: string;
	}>();

	let statusColors = $derived(
		status === 'completed' 
			? 'bg-green-50 text-green-700 border-green-200' 
			: status === 'disputed' 
			? 'bg-red-50 text-red-700 border-red-200'
			: 'bg-blue-50 text-blue-700 border-blue-200'
	);

	let StatusIcon = $derived(
		status === 'completed' ? CheckCircle2 : status === 'disputed' ? AlertCircle : Clock
	);
</script>

<div class="group relative overflow-hidden rounded-2xl border border-crx-border-subtle bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-crx-black/5">
	<div class="flex items-start justify-between gap-4">
		<div class="flex-1 space-y-1">
			<div class="flex items-center gap-2 text-sm text-crx-gray-500">
				<Github class="h-4 w-4" />
				<span class="font-medium">{repo}</span>
				<span class="text-crx-gray-400">&bull;</span>
				<span>{date}</span>
			</div>
			<h3 class="text-lg font-semibold text-crx-black leading-tight line-clamp-2">
				{issueTitle} <span class="text-crx-gray-400">#{issueNumber}</span>
			</h3>
		</div>
		<div class="text-right">
			<div class="text-2xl font-bold tracking-tight text-crx-black">
				{formatUSDC(amount)}
			</div>
			<div class="text-sm font-medium uppercase tracking-wider text-crx-gray-500 mt-1">
				USDC
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-between border-t border-crx-border-subtle pt-4">
		<div class="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-medium {statusColors}">
			<StatusIcon class="h-3.5 w-3.5" />
			<span class="capitalize">{status}</span>
		</div>
		
		{#if status === 'active'}
			<button class="text-sm font-medium text-crx-gray-500 hover:text-crx-black transition-colors">
				View Details &rarr;
			</button>
		{/if}
	</div>
</div>
