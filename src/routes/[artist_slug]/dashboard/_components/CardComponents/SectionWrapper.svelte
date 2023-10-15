<script lang="ts">
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';
	import { slide } from 'svelte/transition';

	export let Title: string;
</script>




<section class="w-full  md:mt-6 px-4 custom-glass rounded-xl">
	<div class="flex items-center justify-between py-3">
		<h2 class="text-lg sm:text-xl text-gray-900 font-roboto font-bold">{Title}</h2>
	
		<p class="text-[11px] text-blue-600 flex items-center justify-center gap-1">
			<span class="font-roboto font-semibold"> See all</span>
			<span class="text-blue-500">
				<ChevronRight />
			</span>
		</p>
	</div>
	
	<main class="">
		<div transition:slide class="no-scrollbar w-full flex items-center gap-4 overflow-x-scroll pb-4">
			<slot />
		</div>
	</main>
</section>
