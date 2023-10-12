<script lang="ts">
	import SongsTable from '../../_components/SongsTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col lg:flex-row justify-between items-start gap-5 mb-8">
	<article>
		<h2 class="text-xl font-bold mb-1">Published singles</h2>
		<p class="text-sm">Total: {data.songs.length}</p>
	</article>

	<a href="/dashboard/singles/upload" class="btn btn-warning">Upload single</a>
</section>

<SongsTable songs={data.songs} />
