<script lang="ts">
	import { slide } from 'svelte/transition';
	import MiniNavbar from '../_components/MiniNavbar.svelte';
	import type { LayoutData } from './$types';
	// import { slide } from 'svelte/transition';

	export let data: LayoutData;
</script>


<!-- <MiniNavbar /> -->

<section class=" rounded-2xl">
	

<main class="">
	{#key data.url}
	<div transition:slide>
		<slot />
	</div>
{/key}
</main>
</section>