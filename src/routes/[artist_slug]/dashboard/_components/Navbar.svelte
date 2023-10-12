<script lang="ts">
	import logoImg from '$lib/assets/logo.png';
	import personImg from '$lib/assets/person.png';
	import Notification from '$lib/components/icons/Notification.svelte';

	// export let profile_pic: string | null | undefined;
</script>

<nav
	class="w-full bg-white shadow-inner fixed px-2 py-4 top-0 z-50 "
>	
<div class="w-full flex items-center justify-between">
	<div>
		<a href="/">
		<h1 class="text-2xl text-gray-900 custom-font-bold">My Music</h1></a>
	</div>
	
	
	<div class="w-16">
		<a href="./dashboard/profile/" class="rounded-full overflow-hidden shadow-xl">
			<img
				src="/src/lib/assets/goo.webp"
				class="w-10 h-10 border-2 object-cover rounded-full"
				alt=""
			/>
		</a>
	</div>
	
</div>
</nav>


<style>
.bg-nav {
	background-image: url('.src//lib/assets/music2.jpg');
	background-size: cover;
	background-position: top center;
	min-height: 5vh; 
}

</style>
