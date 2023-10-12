<script lang="ts">
	import { goto } from '$app/navigation';
	import Lottie from '$lib/components/Lottie.svelte';
	import type { IAlbum } from '$lib/interfaces';
	import { dateFromNow, formatCurrency } from '$lib/utils';
	import emptyLottie from '$lib/assets/lotties/empty-lottie.json';

	export let albums: IAlbum[];
</script>

<div class="overflow-x-auto mb-4">
	<table class="table table-zebra-zebra">
		<thead>
			<tr class="text-sm bg-neutral-800 rounded text-white">
				<th />
				<th>Cover</th>
				<th>Title</th>
				<th>Featured Artist</th>
				<th>Amount</th>
				<th>Total Songs</th>
				<th>Total Views</th>
				<th>Created</th>
			</tr>
		</thead>

		<tbody>
			{#each albums as album}
				<tr class="cursor-pointer" on:click={() => goto(`/dashboard/albums/${album.slug}`)}>
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					<td>
						<img
							src={album.cover_art.thumbnail_url}
							class="w-12 h-12 object-cover"
							alt={album.slug}
							loading="lazy"
						/>
					</td>
					<td>{album.title}</td>
					<td>{album.featured_artist || ''}</td>
					<td>{formatCurrency(album.amount, album.currency)}</td>
					<td>{album.songs.length}</td>
					<td>{album.total_views}</td>
					<td>{dateFromNow(album.created_at)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if albums.length === 0}
	<div class="px-6 py-12 rounded-xl bg-white">
		<article class="text-center">
			<Lottie animationData={emptyLottie} _class="w-32 mb-4" />
			<p class="mb-5">You've not created any album, yet</p>
			<p>
				<a href="/dashboard/albums/create" class="btn btn-warning">Create your first album</a>
			</p>
		</article>
	</div>
{/if}
