<script lang="ts">
	import Library from '$lib/components/icons/Library.svelte';
	import User from '$lib/components/icons/User.svelte';
	import AlbumStack from '$lib/components/icons/AlbumStack.svelte';
	import Discover from '$lib/components/icons/discover.svelte';
	import Home from '$lib/components/icons/Home.svelte';
	import Album from '$lib/components/icons/Album.svelte';

	let active = true,
		navigating = false;

	function simulateNavigation() {
		navigating = true;
		console.log('Navigating');
		setTimeout(() => {
			// Reset
			navigating = false;
			active = true;
		}, 2000);
	}
</script>

<footer
	class="block sm:hidden fixed w-full left-0 bottom-0 right-0 shadow-xl px-6 lg:px-6 bg-white py-4 z-50"
>
	<div class="flex items-center justify-between">
		<a
			href="./"
			class="text-xs custom-font-bold flex flex-col items-center justify-center gap-2 text-neutral-800"
		>
			<span class="text-white p-1 rounded-2xl">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="w-5 h-5">
					<path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" />
				  </svg>
				  
				  
				  
			</span>
			<span class="custom-font-medium">Discover</span>
		</a>


		<a
		href="./"
		class="text-xs  flex flex-col items-center justify-center gap-2 text-neutral-500"
	>
		<span class="text-gray-700 p-1 rounded-2xl">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" class="w-5 h-5">
				<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
			  </svg>
			  
			  
		</span>
		<span class="custom-font-medium">Search</span>
	</a>
		<a class:active href="./" class="flex flex-col gap-2 items-center justify-center text-xs">
			<span class="text-white p-1 rounded-2xl bg-neutral-50"
				><Library /></span
			>
			<span class="text-gray-400 custom-font-medium">Library</span>
		</a>

		<a href="./" class={`flex flex-col gap-2 items-center justify-center"`}>
			<span class="text-white p-1 rounded-2xl bg-neutral-50"
			>
				<Album />
			</span>
			<span class="text-xs text-gray-400 custom-font-medium">Album</span>
		</a>

		
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
