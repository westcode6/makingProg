<script lang="ts">

	export let artist_cover: string;
	export let artist_name: string;
	export let artist_slug: string;
</script>

<div class="w-[220px]  sm:w-[150px]m relative">

	<div class="w-full rounded-2xl overflow-hidden ">
		<img src={artist_cover} class="w-full h-44 rounded-xl shadow-2xl object-cover object-center" alt="coverAlbum" />

		<!-- OverLay Content -->

        <div class="absolute  bottom-0 custom-glass rounded-2xl flex items-center  justify-between right-0 left-0 w-full ">
       
			<div class="py-2 px-2">
				
				<h3 class="text-white text-xs font-nunito font-bold">{artist_slug}</h3>
				<p class="text-[10px] text-neutral-50 font-nunito font-bold pt-1">{artist_name}</p>
			</div>

			<div class="flex items-center justify-center custom-glass p-2 rounded-full mr-2">
				<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-3 h-3">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
				  </svg>
				  
			</div>
        </div>
		
	</div>
</div>


