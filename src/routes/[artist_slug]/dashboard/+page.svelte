<script lang="ts">
	import type { PageData } from './$types';
	import { DemoData, TrendingContents } from './DemoData/DemoData.js';
	import { AlbumData } from './DemoData/AlbumData.js';
	let artistData = DemoData;
	let albumData = AlbumData;
	let trendingContents = TrendingContents;

	export let data: PageData;

	// Card Components
	import SectionWrapper from './_components/Card Components/SectionWrapper.svelte';
	import NewAlbum from './_components/Card Components/NewAlbum.svelte';
	import TrendingPlaylist from './_components/Card Components/TrendingPlaylist.svelte';
	import TrendingCard from './_components/TrendingCard.svelte';

	import Navbar from '../dashboard/_components/Navbar.svelte';

	// let artist_slug = data?.artist?.slug;

	let getSinglesFromAPI = async () => {
		const res = await fetch(`/${data.artist?.slug}/api/singles?size=5`);
		return await res.json();
	};

	let getAlbumsFromAPI = async () => {
		const res = await fetch(`/${data.artist?.slug}/api/albums?size=6`);
		return await res.json();
	};
</script>

<!-- top navbar -->
<Navbar />

<main class="w-full rounded-2xl">
	<SectionWrapper Title={'Trending playlist'} data>
		<main class="w-full">
			<div class="no-scrollbar w-full flex gap-4 items-start overflow-x-scroll">
				{#each artistData as artist, index}
					<div class="w-full">
						<TrendingPlaylist
							artist_cover={artist.song_cover}
							artist_name={artist.artist_name}
							artist_slug={artist.song_title}
						/>
					</div>
				{/each}
			</div>
		</main>
	</SectionWrapper>

	<SectionWrapper Title={'New albums'} data>
		
			{#each albumData as album, index}
				<NewAlbum
					album_name="{album.album_name};"
					album_cover={album.album_cover}
					album_type={album.album_type}
				/>
			{/each}
	
	</SectionWrapper>

	<!-- Banner Segment -->
	<section class="w-full hidden my-4 rounded-xl glass-effect">
		<img
			src="/src/lib/assets/music1.jpg"
			class="w-full h-32 object-cover object-center shadow-2xl rounded-xl"
			alt="banner"
		/>
	</section>

	<SectionWrapper Title={'Top artist'} data>
		<!-- Main Content Container -->
		<main class="w-full mt-2">
			<div class="no-scrollbar w-full flex-col gap-2 items-start overflow-x-scroll">
				<div class="w-full flex gap-2 items-start">
					{#each trendingContents as artist, index}
						<div class="w-full">
							<TrendingCard
								artist_cover={artist.artist_cover}
								artist_name={artist.artist_name}
								artist_slug={artist.artist_slug}
							/>
						</div>
					{/each}
				</div>

				<div class="w-full flex gap-2 items-start">
					{#each trendingContents as artist, index}
						<div class="w-full">
							<TrendingCard
								artist_cover={artist.artist_cover}
								artist_name={artist.artist_name}
								artist_slug={artist.artist_slug}
							/>
						</div>
					{/each}
				</div>

				<div class="w-full flex gap-2 items-start">
					{#each trendingContents as artist, index}
						<div class="w-full">
							<TrendingCard
								artist_cover={artist.artist_cover}
								artist_name={artist.artist_name}
								artist_slug={artist.artist_slug}
							/>
						</div>
					{/each}
				</div>

				<div class="w-full flex gap-2 items-start">
					{#each trendingContents as artist, index}
						<div class="w-full">
							<TrendingCard
								artist_cover={artist.artist_cover}
								artist_name={artist.artist_name}
								artist_slug={artist.artist_slug}
							/>
						</div>
					{/each}
				</div>
			</div>
		</main>
	</SectionWrapper>

	<div class="pb-10" />
</main>
