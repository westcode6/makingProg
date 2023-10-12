<script lang="ts">
	import logoImg from '$lib/assets/logo.png';
	import { slide } from 'svelte/transition';

	export let data;
</script>

<div class="bg-main h-screen">
	<main class="px-4 pt-2 ">
		<a href="/">
			<img src={logoImg} class="w-36 mb-10" alt="Kokolity logo" />
		</a>
	</main>

	<div class="hidden lg:hidden rounded-3xl bg-neutral-50 py-16 w-full -mt-10" />

	<section class="mt-[0.3em] lg:-mt[2em]  md:py-0 px-4 ">
		<div class="max-w-sm mx-auto glass-effect shadow-xl px-4 py-6 rounded-2xl border z-50">
			{#key data.url}
				<div transition:slide>
					<slot />
				</div>
			{/key}
		</div>

		<footer class="mt-10">
			<p class="text-center text-xs  w-fit mx-auto px-4 rounded-xl text-gray-700 font-medium py-1 tracking-wide ">
				&copy; Copyright 2023. Kokolity | All rights reserved
			</p>
		</footer>
	</section>
</div>

<style>
	.bg-main {
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
			url('../../lib/assets/bg-cover.gif');
		background-size: cover;
		background-position: center;
		min-height: 45dvh;
	}
</style>
