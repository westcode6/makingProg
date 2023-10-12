<script lang="ts">
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';
	import type { LayoutData } from './$types';
	import { slide } from 'svelte/transition';

	export let data: LayoutData;
	export let Title: string;
</script>

<section class="w-full px-2 mt-2 md:mt-6 ">
	<div class="flex items-center justify-between">
		<h2 class="text-lg sm:text-xl text-gray-700 custom-font-bold">{Title}</h2>

		<p class="text-[11px] text-[#0035c6]  flex items-start justify-center gap-1">
		<span class="custom-font-medium">	MORE</span>
			<span>
				<ChevronRight />
			</span>
		</p>
	</div>

	<main  class="bg-gray-50/40 p-2 rounded-xl">
        {#key data.url}
        <div transition:slide  class="no-scrollbar w-full flex items-center overflow-x-scroll" >
            <slot />
        </div>
    {/key}
	</main>
</section>
