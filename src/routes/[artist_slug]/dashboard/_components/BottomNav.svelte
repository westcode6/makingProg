<script lang="ts">
	import Library from '$lib/components/icons/Library.svelte';
	import Album from '$lib/components/icons/Album.svelte';
	import Home from '$lib/components/icons/Home.svelte';
</script>

<footer
	class="block sm:hidden bg-white fixed w-full left-0 bottom-0 right-0 shadow-2xl rounded-t-2xl px-6 lg:px-6  py-4 z-50"
>
	<div class="flex items-center justify-between">
		<a href="./" class="text-xs flex flex-col items-center justify-center gap-2 text-neutral-500">
			<span class="text-blue-500 rounded-2xl">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
				  </svg>
				  
				  
			</span>
			<!-- <span class="custom-font-medium">Search</span> -->
		</a>

		
		<a href="./" class="text-xs flex flex-col items-center justify-center gap-2 text-neutral-500">
			<span class="text-gray-500 rounded-2xl">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
				  </svg>
				  
			</span>
			<!-- <span class="custom-font-medium">Search</span> -->
		</a>

		<a
			href="./"
			class="text-xs hidden custom-font-bold md:flex flex-col items-center justify-center gap-2 text-gray-500"
		>
			<span class=" shadow-inner rounded-2xl">
				<span class="text-blue-600"><Home /></span>
			</span>
			<!-- <span class="text-xs font-roboto font-bold">Home</span> -->
		</a>

		<a href="./" class="flex flex-col gap-2 items-center justify-center text-xs">
			<span class="text-gray-500 p-1 rounded-2x"><Library /></span>
			<!-- <span class="text-gray-400 custom-font-medium">Library</span> -->
		</a>

		<a href="./" class={`flex flex-col gap-2 items-center justify-center"`}>
			<span class="text-gray-500 p-1 rounded-2xl">
				<Album />
			</span>
			<!-- <span class="text-xs text-gray-400 custom-font-medium">Album</span> -->
		</a>
	</div>

<!-- Center Button -->
	<div class="absolute top-o right-0 bottom-12 hidden left-0 flex items-center justify-center">
		<div class="w-10 h-10 flex items-center justify-center bg-white shadow-2xl rounded-full">
			<span class="text-blue-500 rounded-2xl">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
				  </svg>
				  
			</span>
		</div>
	</div>



</footer>

<style>
	.bg-footer {
		background: linear-gradient(315deg, transparent 75%, #000000 0)-16px 0,
			linear-gradient(45deg, transparent 75%, #000000 0) 16px 0,
			linear-gradient(135deg, #333 50%, transparent 0) 0 0,
			linear-gradient(45deg, #4d4d4d 50%, #666 0) 0 0 #666;
		background-size: 32px 32px;
	}

	.custom-shadow {
		-webkit-box-shadow: 3px -7.5px 10px 3px #201d1d;
		-moz-box-shadow: 3px -7.5px 10px 3px #242323;
		box-shadow: 3px -7.5px 10px 3px #000000;
	}
</style>
