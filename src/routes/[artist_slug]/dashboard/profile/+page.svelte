<script lang="ts">
	import { DemoData } from '../DemoData/DemoData';
	import Check from '$lib/components/icons/Check.svelte';
	import Message from '$lib/components/icons/Message.svelte';
	import MusicCard2 from '../_components/MusicCard2.svelte';
	import ChevronDown from '$lib/components/icons/ChevronDown.svelte';
	import MiniNavbar from '../_components/MiniNavbar.svelte';

	let artistData = DemoData;
</script>

<!-- -->

<section class="-mt-2 custom-glass px-4 py-4 pb-12">
	<MiniNavbar />
	<!-- Header Section -->
	<header class="px-4 flex items-center justify-between mt-6">
		<div class="flex flex-col items-center gap-2">
			<h2 class="text-2xl font-roboto font-bold text-gray-900 tracking-wider">321k</h2>
			<p class="text-xs text-neutral-400 font-nunito font-bold">followers</p>
		</div>
		<div class="w-[25%] mx-auto py-2">
			<img
				src="/src/lib/assets/goo.webp"
				class="w-full h-16 rounded-2xl shadow-xl object-cover object-center"
				alt="profile"
			/>
		</div>

		<div class="flex flex-col items-center gap-2">
			<h2 class="text-2xl font-roboto font-bold text-gray-900 tracking-wider">125k</h2>
			<p class="text-xs text-neutral-400 font-nunito font-bold">following</p>
		</div>
	</header>
	<h3 class="text-base sm:text-xl text-center text-gray-900 font-roboto tracking-wide font-bold">
		Ariana Grande
	</h3>

	<div
		class="flex items-center justify-center gap-2 text-xs text-neutral-400 font-roboto font-semibold py-2"
	>
		<p class="">Artist /</p>
		<p class="">Musician /</p>
		<p class="">Writer</p>
	</div>

	<!-- CTA -->
	<section class="px-8">
		<div class="w-full flex items-center justify-center gap-6 md:w-[40%] mx-auto py-2 mt-2">
			<button
				class="bg-blue-500 hover:bg-amaber-400 rounded-2xl text-gray-50 font-roboto font-bold text-sm px-6 py-3 flex items-center space-x-2"
				><span><Check /></span> <span>Follow</span></button
			>
			<button
				class="bg-neutral-600 hover:bg-neutral-400 rounded-xl text-gray-50 font-roboto font-bold text-xs px-6 py-3 flex items-center space-x-2"
				><span><Message /></span> <span>Message</span></button
			>
		</div>
	</section>

	<!--  -->

	<!-- Show lists of Songs -->
	<header class="flex items-center justify-between mt-4">
		<h3 class="text-lg sm:text-xl text-gray-900 font-roboto font-bold">Songs</h3>

		<div class="flex items-start">
			<span class="text-blue-500 text-[10px] font-roboto font-bold uppercase"> See All </span>

			<span class="font-bold ml-1 text-blue-500">
				<ChevronDown />
			</span>
		</div>
	</header>

	<div class="flex flex-col items-start gap-2 mt-6">
		{#each artistData as artist, index}
			<div class="w-full">
				<MusicCard2
					artist_cover={artist.song_cover}
					artist_name={artist.artist_name}
					artist_slug={artist.song_title}
				/>
			</div>
		{/each}
	</div>
</section>
