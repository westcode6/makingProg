<script lang="ts">

	export let artist_cover: string;
	export let artist_name: string;
	export let artist_slug: string;
</script>

<div class="w-[130px]  sm:w-[140px]">

	<div class="w-full rounded-xl overflow-hidden relative bg-white">
		<img src={artist_cover} class="w-full h-40 rounded-xl shadow-2xl object-cover object-center overflow-hidden" alt="coverAlbum" />

		<!-- OverLay Content -->

        <div class="absolute top-0 w-full h-40 flex items-center justify-center">
            <span class="w-8 h-8 flex items-center justify-center rounded-full glass-effect">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                  
            </span>
        </div>
			<div class="mt-2 px-2">
				<h3 class="text-gray-700 text-xs custom-font-bold">{artist_slug}</h3>
				<p class="text-[10px] text-neutral-400 custom-font-medium pt-1">{artist_name}</p>
			</div>
	</div>
</div>


<style>
    .custom-border {
        border-radius: 41% 10% 23% 20% / 40% 25% 31% 20%;
    }
	.custom-shadow {
		-webkit-box-shadow: 3px -7.5px 10px 3px #131313;
		-moz-box-shadow: 3px -7.5px 10px 3px #242323;
		box-shadow: 3px 2.5px 2px 1px #161515;
	}
</style>