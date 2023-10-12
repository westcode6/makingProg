<script lang="ts">
	import AlbumStack from '$lib/components/icons/AlbumStack.svelte';

	import Home from '$lib/components/icons/Home.svelte';


	export let isMobile: boolean = false;

</script>

<aside
	class="{isMobile
		? ''
		: 'hidden lg:block left-sidebar  '}  w-[60vw] lg:w-[220px] h-[100dvh] fixed z-50 glass-effect-4 top-[0.1em] pb-[5.5em] py-6 px-4 overflow-y-scroll scroll-element"
>
	<h3 class="text-white text-sm font-semibold">Browse Music</h3>
	<ul class="mt-8 menu space-y-5">
		<li class="w-full mb-2">
			<a href="/" class="active-link px-4 py-2 flex items-center gap-4 text-sm text-neutral-400">
				<span class="text-yellow-400"><Home /></span>
			<span>	Home</span>
			</a>
		</li>

		<li class="nav-link w-full mb-2">
			<a href="/" class="px-4 py-2 flex items-center space-3 text-sm text-neutral-500">
				<span class="text-yellow-400"><AlbumStack /></span>
				Albums
			</a>
		</li>

		<li class="nav-link w-full mb-2">
			<a href="/" class="px-4 py-2 flex items-center space-3 text-sm text-neutral-500">
				<span><Home /></span>
				Tracks
			</a>
		</li>

		<li class="nav-link w-full mb-2">
			<a href="/" class="px-4 py-2 flex items-center space-3 text-sm text-neutral-500">
				<span><Home /></span>
				Genres
			</a>
		</li>
	</ul>
</aside>

<style>
	.active-link {
		background: radial-gradient(circle at -11.9% 51.2%, rgb(27, 24, 22) 17%, rgb(40, 40, 39) 5.9%, rgb(58, 58, 57) 10.9%, rgb(42, 42, 41) 32.4%, rgb(0, 0, 0) 20.5%, rgb(18, 20, 20) 50%);
		border: none;
	}
	.nav-link:hover {
		background: radial-gradient(circle at -10.9% 51.2%, rgb(27, 24, 22) 17%, rgb(40, 40, 39) 5.9%, rgb(58, 58, 57) 10.9%, rgb(42, 42, 41) 29.4%, rgb(0, 0, 0) 20.5%, rgb(18, 20, 20) 50%);
		border: none;
	}
</style>
