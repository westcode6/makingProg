<script lang="ts">
	import lottie from 'lottie-web';
	import { onMount } from 'svelte';

	export let animationData: any;
	export let _class: string | null = null;
	export let loop = true;

	let animationContainer: HTMLElement;

	onMount(() => {
		lottie.loadAnimation({
			container: animationContainer,
			animationData,
			loop
		});
	});
</script>

<div bind:this={animationContainer} class="{_class} max-w-[30rem] mx-auto" />
