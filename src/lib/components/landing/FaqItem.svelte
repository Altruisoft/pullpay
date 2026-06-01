<script lang="ts">
	import type { FaqItem as FaqItemType } from './types';

	const { item } = $props<{ item: FaqItemType }>();
</script>

<div class="rounded-lg border border-white/15 bg-[#24242f] p-5">
	<p class="font-semibold">{item.question}</p>
	{#if item.answer}
		<p class="mt-2 text-sm text-white/75">{item.answer}</p>
	{/if}
</div>
