<script lang="ts">

	export let artist_cover: string;
	export let artist_name: string;
	export let artist_slug: string;
</script>

<div class="w-[160px]  sm:w-[150px]m relative">

	<div class="w-full rounded-2xl overflow-hidden ">
		<img src={artist_cover} class="w-full h-32 rounded-xl shadow-2xl object-cover object-center" alt="coverAlbum" />

		<!-- OverLay Content -->


		<div class="absolute left-0 right-4 bottom-16  flex items-center justify-end">
			<div class="w-8  h-8 flex items-center justify-center custom-glass rounded-full ">
				<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-3 h-3">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
				  </svg>
				  
			</div>
		</div>
		

        <div class="flex items-center  justify-between w-full ">
       
			<div class="py-2 px-2">
				
				<h3 class="text-gray-900 text-xs font-roboto font-bold">{artist_slug}</h3>
				<p class="text-[12px] text-gray-500 font-nunito font-semibold pt-1">{artist_name}</p>
			</div>

        </div>
		
	</div>
</div>


