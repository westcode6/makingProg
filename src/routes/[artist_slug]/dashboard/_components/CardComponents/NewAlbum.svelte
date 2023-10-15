<script lang="ts">
	export let album_name: string;
	export let album_cover: string;
	export let album_type: string;

	import More from '$lib/components/icons/More.svelte';
</script>

<section class="w-full custom-glass  rounded-xl">
	<div class="w-full rounded-md relative flex flex-col items-center justify-center p-2">
		<div class="w-20 sm:w-24 flex justify-center items-center relative">
			<img
				src={album_cover}
				alt={album_name}
				class="w-full h-20 sm:h-24 object-cover rounded-full shadow-2xl"
			/>

			<div class="w-24 absolute   flex items-center justify-center">
				<span class="p-2 glass-effect rounded-full"
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
<span />
		<div class="flex flex-col items-center justify-center">
			<p class="text-[11px] text-gray-900 font-roboto font-bold mt-1">{album_name}</p>
			<p class="text-[10px] text-gray-500 tracking-wide font-nunito font-bold">{album_type}</p>
		</div>
	</div>
</section>
