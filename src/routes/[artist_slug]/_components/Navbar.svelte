<script lang="ts">
	import logoImg from '$lib/assets/logo.png';

	export let artist_name: string;
	export let artist_slug: string;
</script>

<nav class="bg-transparent px-4 lg:px-12 pt-3 z-50 relative ">
	<div class="flex items-center justify-between max-w-7xl mx-auto">
		<a href="/{artist_slug}">
			<img src={logoImg} class="w-14" alt="Kokolity" />
		</a>

		<div class="hidden lg:block pr-4">
			<input
				type="search"
				class="input input-bordered input-sm"
				placeholder="Search {artist_name}'s page"
			/>
			<button class="btn btn-sm btn-neutral">Search</button>
		</div>
	</div>
</nav>
