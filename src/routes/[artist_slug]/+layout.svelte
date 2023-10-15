<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

</script>

<div>	

	{#key data.url}
	<div transition:slide>
		<slot />
	</div>
{/key}
</div>


