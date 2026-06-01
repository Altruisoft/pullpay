<script lang="ts">
	import { walletStore } from '$lib/stores/wallet.svelte';
	import { formatAddress } from '$lib/utils/stellar';
	import { Button } from '$lib/components/ui/button';
	import { Wallet } from 'lucide-svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		walletStore.checkConnection();
	});
</script>

{#if walletStore.isConnected}
	<Button variant="secondary" class="gap-2 rounded-xl border border-crx-border-subtle bg-white px-5 py-2.5 text-base font-medium text-crx-black shadow-sm transition-all hover:shadow-md active:scale-95" onclick={() => walletStore.disconnect()}>
		<Wallet class="h-4 w-4 text-crx-gray-500" />
		{formatAddress(walletStore.address)}
	</Button>
{:else}
	<Button 
		variant="secondary" 
		class="gap-2 rounded-xl border border-crx-border-subtle bg-white px-5 py-2.5 text-base font-medium text-crx-black shadow-sm transition-all hover:shadow-md active:scale-95" 
		disabled={walletStore.isConnecting}
		onclick={() => walletStore.connect()}
	>
		<Wallet class="h-4 w-4" />
		{walletStore.isConnecting ? 'Connecting...' : 'Connect Wallet'}
	</Button>
{/if}
