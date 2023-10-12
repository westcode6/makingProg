<script lang="ts">
	import logoImg from '$lib/assets/logo.png';
	import personImg from '$lib/assets/person.png';
	import Hamburger from '$lib/components/icons/Hamburger.svelte';

	export let profile_pic: string | null | undefined;
</script>

<div class="navbar fixed w-full left-0 right-0 shadow px:4 lg:px-6 bg-base-100 z-50">
	<div class="btn btn-ghost btn-circle avatar lg:order-2">
		<div class="w-[100%] h-10 rounded-full overflow-hidden">
			<img src={profile_pic || personImg} alt="" class="object-cover " />
		</div>	
	</div>

	<div class="flex-1 ">
		<a href="/dashboard">
			<img src={logoImg} class="w-24 md:w-28" alt="Kokolity logo" />
		</a>
	</div>

	<div class="flex-none lg:hidden">
		<Hamburger htmlFor="artist_dashboard_drawer" _class="drawer-button" />
	</div>
</div>
