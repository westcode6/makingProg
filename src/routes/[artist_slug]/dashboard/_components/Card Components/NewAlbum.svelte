<script lang="ts">
	export let album_name: string;
	export let album_cover: string;
	export let album_type: string;

	import More from '$lib/components/icons/More.svelte';
</script>

<section class="w-full flex items-center justify-center rounded-xl">
	<div class="w-full rounded-md relative flex-col items-center justify-center">
		<div class="w-24 flex justify-center items-center relative">
			<img
				src={album_cover}
				alt={album_name}
				class="w-14 h-14 md:w-20 md:h-20 object-cover rounded-full shadow-2xl"
			/>

			<div class="w-full absolute   flex items-center justify-center">
				<span class="w-4 h-4 glass-effect rounded-full flex items-center justify-center"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="white"
						viewBox="0 0 24 24"
						stroke-width="1"
						stroke="white"
						class="w-3 h-3"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
						/>
					</svg>
				</span>
			</div>
		</div>

		<div class="flex flex-col items-center justify-center">
			<p class="text-[10px] text-gray-700 custom-font-bold mt-1">{album_name}</p>
			<p class="text-[10px] text-gray-400 tracking-wide custom-font-medium">{album_type}</p>
		</div>
	</div>
</section>
