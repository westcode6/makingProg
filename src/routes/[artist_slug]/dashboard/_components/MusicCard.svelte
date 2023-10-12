<script lang="ts">
	export let album_name: string;
	export let album_cover: string;
	export let album_type: string;

	import More from '$lib/components/icons/More.svelte';

	let active = false,
		navigating = false;

	function simulateNavigation() {
		navigating = true;
		console.log('clicked', navigating);
		setTimeout(() => {
			// Reset
			navigating = false;
			active = false;
		}, 2000);
	}
</script>

<section class="bg-effect">
	
<div
class:active
on:mouseenter={() => {
	console.log('enter', navigating);
	if (!navigating) {
		active = true;
	}
}}
on:mouseleave={() => {
	if (!navigating) {
		active = false;
	}
}}
on:click={simulateNavigation}
class="w-[120px] md:w-[200px] rounded-md mt-4 relative flex flex-col items-center justify-center"
>
{#if active}
	<div id="hoverState" class="w-full h-24 sm:h-28 top-0">
		<div class="flex flex-col items-end justify-end">
			<p
				on:click={ () => {
					alert('Desse, Please Help out with this part😥');
				}}
				class="w-6 h-6 mr-4 mt-2 rounded-full glass-effect"
			>
				<More />
			</p>
		</div>
	</div>
{:else}
	<img
		src={album_cover}
		alt={album_name}
		class="w-20 h-20  object-cover rounded-full shadow-2xl"
	/>
{/if}

<div class="p-1 flex flex-col items-center justify-center">
		<p class="text-[10px] text-neutral-700 font-bold mt-1">{album_name}</p>
		<p class="text-[10px] text-neutral-800 font-medium mt-1">{album_type}</p>
</div>
</div>
</section>

<style>


	.active {
		/* background: rgb(255, 183, 48); */
		height: 70px;
	}

</style>
