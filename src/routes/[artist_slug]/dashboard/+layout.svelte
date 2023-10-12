<script lang="ts">
	import type { LayoutData } from './$types';
	import { slide } from 'svelte/transition';
	import LeftSidebar from './_components/LeftSidebar.svelte';
	import BottomNav from './_components/BottomNav.svelte';
	import Navbar from '../dashboard/_components/Navbar.svelte';

	export let data: LayoutData;
	// hide away mobile sidebar drawer:
	let checked = false;

	function handleClick() {
		checked = false;
		return;
	}
</script>


<section class="w-full pt-16 lg:-mt[2em] lg:ml-[220px]  md:py-0 sm:px-4 ">
	<div class="max-w-6xl  rounded-2xl">

	

		<main class="pl-2 pb-10">
			
			<!-- dashboard main content -->
			<div
				class="w-full text-neutral-700"
			>
				{#key data.url}
					<div transition:slide>
						<slot />
					</div>
				{/key}
			</div>
		</main>

			

		<!-- mobile-only sidebar drawer -->
		<div class="drawer-side z-50">
			<label for="artist_dashboard_drawer" class="drawer-overlay" />
			<LeftSidebar  />
		</div>
	</div>

<BottomNav />


</section>

