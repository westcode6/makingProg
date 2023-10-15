<script lang="ts">
	import type { LayoutData } from './$types';
	import { slide } from 'svelte/transition';
	import CreateUserNameModal from './_components/CreateUserNameModal.svelte';
	import LeftSidebar from './_components/LeftSidebar.svelte';
	import Navbar from './_components/Navbar.svelte';
	import RightSidebar from './_components/RightSidebar.svelte';

	export let data: LayoutData;

	// hide away mobile sidebar drawer:
	let checked = false;

	function handleClick() {
		checked = false;
		return;
	}
</script>

<!-- <div class="bg-main"> -->

		<!-- top navbar -->
		<Navbar profile_pic={data.user.profile_pic?.thumbnail_url} />
		<LeftSidebar />

	<div class="glass-effect-2">
		<!-- desktop-only left sidebar -->

	<div class="drawer-content">
		<input id="artist_dashboard_drawer" type="checkbox" class="drawer-toggle" bind:checked />

		<main class="ml-0 lg:ml-[220px] shadow-xl  relative  mt-12">
		
			<!-- dashboard main content -->
			<div
				class="px-4 lg:px-20 pb-[5.5em] bg-white shadow-xl min-h-[100dvh] mr-0 lg:mr-[270px] pt-[2.5em] text-neutral-700"
			>
				{#key data.url}
					<div transition:slide>
						<slot />
					</div>
				{/key}

				<!-- create artist profile: -->
				{#if !data.user?.artist_name}
					<CreateUserNameModal form={data.createUsernameForm} />
				{/if}
			</div>

			
		</main>
<div>
	<!-- right side-bar -->
<RightSidebar />
</div>
		<!-- mobile-only sidebar drawer -->
		<div class="drawer-side z-50">
			<label for="artist_dashboard_drawer" class="drawer-overlay" />
			<LeftSidebar isMobile {handleClick} />
		</div>
	</div>
	</div>
<!-- </div> -->


