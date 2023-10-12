<script lang="ts">
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import { formatCurrency } from '$lib/utils';
	import SongsTable from '../../_components/SongsTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const getAlbumSongsFromAPI = async () => {
		const res = await fetch(`/dashboard/api/albums/${data.album.slug}`);
		return await res.json();
	};
</script>

<div class="mb-2">
	{#if data.album.status === 'published'}
		<a href="/dashboard/albums/published" class="btn">Back to published albums</a>
	{:else}
		<a href="/dashboard/albums/draft" class="btn">Back to draft albums</a>
	{/if}
</div>

<section
	class="bg-neutral-800 flex items-center justify-center text-white rounded-xl h-[170px] cover-placeholder"
	style="background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
	url({data.album.cover_art.url}); background-size: cover; background-position: top;"
>
	<article class="text-center">
		<p class="font-extrabold text-lg mb-1">
			{data.album.title}
		</p>

		<p class="text-xs">total views: {data.album.total_views}</p>
	</article>
</section>

<section class="-mt-8 opacity-95 px-3">
	<div
		class="bg-white shadow max-w-md w-full mx-auto p-6 rounded flex flex-col lg:flex-row items-center gap-4 justify-center"
	>
		<a href="/dashboard/albums/{data.album.slug}/edit" class="btn btn-neutral w-full lg:w-auto">
			Edit album
		</a>

		<a href="/dashboard/albums/{data.album.slug}/add-song" class="btn btn-warning w-full lg:w-auto">
			Add a song
		</a>
	</div>
</section>

<section class="pt-16 px-5 pb-8 bg-white rounded-xl -mt-8">
	<ul class="space-y-3 text-sm mx-auto max-w-lg">
		<li>
			<p class="font-semibold">Album link:</p>
			<p class="text-warning font-semibold">
				<a
					href="https://www.kokolity.com/{data.user.slug}/albums/{data.album.slug}"
					target="_blank"
					rel="noreferrer"
					>kokolity.com/{data.user.slug}/albums/{data.album.slug}
				</a>
			</p>
		</li>

		<li>
			<p>
				<span class="font-semibold">Amount:</span>
				{formatCurrency(data.album.amount, data.album.currency)}
			</p>
		</li>

		<li>
			<p class="font-semibold">Description:</p>
			<p>{data.album.description}</p>
		</li>
	</ul>
</section>

<section class="py-8">
	<h2 class="text-lg font-bold">Album songs</h2>
	<p class="text-sm text-gray-500 mb-6">total songs: {data.album.songs.length}</p>

	{#await getAlbumSongsFromAPI()}
		<LoadingIndicator />
	{:then data}
		<SongsTable songs={data.songs} />
	{/await}
</section>
