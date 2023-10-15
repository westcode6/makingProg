<script lang="ts">
	import logoImg from '$lib/assets/logo.png';
	import personImg from '$lib/assets/person.png';
	import Notification from '$lib/components/icons/Notification.svelte';
	export let artist_name: string;
	// export let artist_slug: string;
	// export let profile_pic: string | null | undefined;
</script>

<nav
	class="w-full fixed px-4 py-2 top-0 right-0 z-50 custom-glass"
>	
<div class="w-full flex items-center justify-between">
	<div>
		<a href="/">
		<h1 class="text-2xl text-gray-900 font-roboto font-bold">{artist_name}</h1></a>
	</div>
	
	
	<div class="flex items-center gap-4">
		<div class="mt-3 sm:mt-0 hidden sm:block">
			<input type="text" class="w-full custom-glass shadow-sm rounded-xl text-neutral-100 px-4 py-3 placeholder:text-neutral-300" placeholder="Looking for....">
		</div> 

		<a href="./dashboard/profile/" class="rounded-full overflow-hidden shadow-xl">
			<img
				src="/src/lib/assets/goo.webp"
				class="w-10 h-10 border-2 object-cover rounded-full"
				alt=""
			/>
		</a>
	</div>
	
</div>

<div class="mt-2 sm:mt-0 block sm:hidden">
	<input type="text" class="w-full border shadow-inner rounded-xl text-neutral-500 font-medium px-4 py-2  placeholder:text-neutral-500" placeholder="Looking for....">
</div> 
</nav>




