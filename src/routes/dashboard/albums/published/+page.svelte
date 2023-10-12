<script lang="ts">
	import AlbumsTable from '../../_components/AlbumsTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col lg:flex-row justify-between items-start gap-5 mb-8">
	<article>
		<h2 class="text-xl font-bold mb-1">Published albums</h2>
		<p class="text-sm">Total: {data.albums.length}</p>
	</article>

	<a href="/dashboard/albums/create" class="btn btn-warning">Create album</a>
</section>

<AlbumsTable albums={data.albums} />
