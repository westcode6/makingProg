<script lang="ts">
	import { slide } from 'svelte/transition';

	export let data;
</script>

{#key data.url}
	<div transition:slide>
		<slot />
	</div>
{/key}


<style>
		.custom-font {
		font-family: 'Rubik', sans-serif;
	}
	
		
	@font-face {
		font-family: 'Rubik', sans-serif;
			src: url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap');

			font-style: medium;
		}
</style>