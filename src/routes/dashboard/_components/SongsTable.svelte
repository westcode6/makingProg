<script lang="ts">
	import { goto } from '$app/navigation';
	import Lottie from '$lib/components/Lottie.svelte';
	import type { ISong } from '$lib/interfaces';
	import { dateFromNow, formatCurrency } from '$lib/utils';
	import emptyLottie from '$lib/assets/lotties/empty-lottie.json';

	export let songs: ISong[];
</script>

<div class="overflow-x-auto mb-4">
	<table class="table table-zebra-zebra">
		<thead>
			<tr class="text-sm bg-neutral-800 rounded text-white">
				<th />
				<th>Cover</th>
				<th>Title</th>
				<th>Genre</th>
				<th>Featured Artist</th>
				{#if songs[0]?.song_type === 'single'}
					<th>Amount</th>
				{/if}
				<th>Created</th>
			</tr>
		</thead>

		<tbody>
			{#each songs as song}
				<tr class="cursor-pointer" on:click={() => goto(`/dashboard/songs/${song?.slug}`)}>
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					<td>
						<img
							src={song.cover_art.thumbnail_url}
							alt={song.title}
							loading="lazy"
							class="w-12 h-12 object-cover"
						/>
					</td>
					<td>{song.title}</td>
					<td>{song.genre}</td>
					<td>{song?.featured_artist || ''}</td>
					{#if song?.song_type === 'single'}
						<td>{formatCurrency(song.amount, song.currency)}</td>
					{/if}
					<td>{dateFromNow(song.created_at)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if songs?.length === 0}
	<div class="px-6 py-12 rounded-xl bg-white">
		<article class="text-center">
			<Lottie animationData={emptyLottie} _class="w-32 mb-4" />
			<p>No song uploaded here, yet</p>
		</article>
	</div>
{/if}
