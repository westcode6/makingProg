<script lang="ts">
	import Lottie from './Lottie.svelte';
	import errorLottie from '$lib/assets/lotties/error-lottie.json';

	export let error: string | null = null;
	export let callback: () => void;
</script>

<section class="modal modal-{Boolean(error) && 'open'}">
	<div class="modal-box text-center">
		<Lottie animationData={errorLottie} _class="w-28" />

		<p class="text-xl font-bold text-error">Error</p>
		<p class="text-sm mb-5">
			{error}
		</p>

		<button on:click={callback} class="btn px-6 btn-error btn-outline">Okay</button>
	</div>
</section>
