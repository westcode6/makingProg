<script lang="ts">
	import More from "$lib/components/icons/More.svelte";
	import PlayIcon from "$lib/components/icons/PlayIcon.svelte";

	export let artist_name: string;
	export let artist_slug: string;
	export let artist_cover: string;
</script>

<div
	class="w-full md:w-80 custom-glass shadow-sm cursor-pointer rounded-xl p-1 flex items-center justify-between hover:shadow-inner transform transition hover:-translate-x-0.5 ease-linear"
>
	<div class="flex items-start md:items-start justify-start">
		<div class="w-12 h-12 rounded-md overflow-hidden">
			<img
				src={artist_cover}
				alt={artist_name}
				class="w-full h-full object-cover rounded-xl shadow-md"
			/>
		</div>
		<span />
		<div class="flex items-center justify-between mt-1">
			<div class="flex flex-col items-start pl-4">
				<h3 class="text-xs sm:text-sm font-nunito font-bold text-gray-900">
					{artist_slug}

				</h3>
				<p class="text-[10px] text-neutral-400 font-roboto font-medium mt-1">
					{artist_name}

				</p>
			</div>
		</div>
	</div>

	<div class="px-2 flex items-center md:items-center gap-4">
		
			<p class="w-5 h-5 rounded-full text-neutral-400 flex items-center justify-center">
		<More />
			</p>

	</div>
</div>
