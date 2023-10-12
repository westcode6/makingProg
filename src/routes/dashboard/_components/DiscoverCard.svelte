<script lang="ts">
	import BellAlert from "$lib/components/icons/BellAlert.svelte";

export let albumCover = "./src/lib/assets/goo.webp"
export let artistName = "artist"
</script>


<div
	class="w-full h-16 px-2 border rounded-xl glass-effect-2 shadow-sm hover:shadow-xl flex items-center  mb-2"
>
	<div class="w-16 ">
		<img src={albumCover} class="w-full object-cover rounded-md shadow-xl" alt="banner" />
	</div>
	<div class="px-3">
		<h3 class="text-xs text-neutral-900 font-semibold">{artistName}</h3>
		
		<p class="text-[11px] text-neutral-500 font-medium mt-1">Lorem ipsum dolor  et.</p>

	</div>
	
    <!-- <BellAlert _class="text-yellow-400" /> -->
</div>
