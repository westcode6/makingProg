<script lang="ts">
	import PlayIcon from '$lib/components/icons/PlayIcon.svelte';
	import More from '$lib/components/icons/More.svelte';

	export let artist_name: string;
	export let artist_slug: string;
	export let artist_cover: string;
</script>

<div
	class="w-[240px] md:w-72 bg-white shadow cursor-pointer mb-2 mr-4 rounded-xl flex items-center justify-between hover:shadow-sm transform transition hover:-translate-x-0.5 ease-linear"
>
	<div class="flex items-center justify-start">
	<div class="w-12 h-12 rounded-md overflow-hidden">
        <img src={artist_cover} alt={artist_name} class="w-full h-full object-cover shadow-xl rounded-xl">
    </div>
<span />
			<div class="flex flex-col items-start pl-4">
				<h3 class="text-xs custom-font-bold text-gray-700">
					{artist_name}
				</h3>
				<p class="text-[10px] custom-font-medium  text-gray-400 mt-1">
					{artist_slug}
				</p>
			</div>
	</div>

	<div class=" px-2 flex  items-center justify-end gap-4">
		<p class="text-[10px] text-neutral-400 custom-font-thin">
			<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.2" stroke="black" class="w-4 h-4">
				<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
			  </svg>
			  
			  
		</p>

	</div>
</div>
<style>
	.co {
		color: rgb(31, 31, 31);
	}
</style>