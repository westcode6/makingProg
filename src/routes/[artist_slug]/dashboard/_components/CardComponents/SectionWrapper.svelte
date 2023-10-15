<script lang="ts">
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';
	import { slide } from 'svelte/transition';

	export let Title: string;
</script>

<section class="w-full b md:mt-6 rounded-xl p-3 custom-glass">
	<div class="flex items-center justify-between">
		<h2 class="text-lg sm:text-xl text-gray-900 font-roboto font-bold">{Title}</h2>

		<p class="text-[11px] text-gray-500 flex items-center justify-center gap-1">
			<span class="font-roboto font-semibold"> See all</span>
			<span class="text-gray-500">
				<ChevronRight />
			</span>
		</p>
	</div>

	<main class="mt-2">
		<div transition:slide class="no-scrollbar w-full flex items-center gap-4 overflow-x-scroll">
			<slot />
		</div>
	</main>
</section>
