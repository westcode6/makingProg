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


<!-- <nav class="h-20 w-full bg-black px-4 fixed flex items-center text-neutral-400 justify-between">
	<div class="sm:ml-[200px]">
		<h1 class="text-xl text-white font-nunito font-extrabold">God See's</h1>
	</div>

	<div>
		<ul class="flex items-center space-x-2">
	
			<li>Amen</li>
		</ul>
	</div>
</nav> -->

<Navbar artist_name={data.artist?.artist_name} />


<main class="h-full w-full">	
	<section class="bg-indigo-500 p-10 fixed w-[200px] hidden sm:block text-white text-xs">
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nihil error, nam aperiam in deleniti minus numquam asperiores tempora cumque laudantium dignissimos quam quis vel nemo sunt. Et nobis cum expedita. Reiciendis odit, in corporis veniam mollitia libero tempore adipisci nemo! Consectetur, repellat! Repellat, sequi. Dolor veniam id fugit deserunt, non repellendus accusantium, veritatis, quod et voluptas voluptatem optio perferendis excepturi harum nesciunt illo eaque atque labore. Quod quo impedit aspernatur temporibus! Debitis ullam harum rerum doloremque odio minima perferendis corrupti magni quos deserunt, iusto voluptas at perspiciatis enim nemo illo nisi! Ad nihil natus qui laboriosam eligendi, sint autem facilis animi cupiditate sed pariatur? Consequuntur, quia impedit officiis quasi cum voluptates vel quaerat sint magni exercitationem odit rerum repellat aspernatur dignissimos repellendus possimus nulla eos quibusdam. Sunt rem obcaecati fugit tempore facilis, odio commodi ipsa iusto cupiditate dolorem qui quaerat officia quis porro repellat quibusdam voluptas magni tempora, necessitatibus provident, temporibus numquam. Sapiente laborum facere dolore, asperiores beatae officiis vitae! Deleniti voluptate quos saepe magnam, possimus dolores eligendi commodi inventore iusto numquam sequi accusamus velit fugit non delectus fugiat adipisci. Numquam quidem perferendis libero error repellat corporis aperiam ut non nobis tempora quisquam repudiandae recusandae nostrum perspiciatis nihil quos, quo molestiae labore et? Odio, sit magnam dolor fugiat maiores sapiente nemo rerum alias reiciendis ipsam voluptates saepe? Molestias dolores adipisci illum ab dolor expedita exercitationem commodi. Quia, quam dicta. Non beatae, quam debitis, vitae aliquam voluptatum laboriosam est dolores sed libero accusamus explicabo vero! Corrupti, quibusdam. Sit, culpa. Ex dolor illo tempora consequuntur quibusdam possimus sapiente necessitatibus, cumque alias impedit, aspernatur qui quaerat assumenda. Quod assumenda sed perferendis, facere illum, provident amet quibusdam harum commodi totam facilis laboriosam enim aut exercitationem molestias est aspernatur dolorum quo quam ipsum. Esse sint beatae fuga, quia distinctio obcaecati vero sapiente qui iure.
	</section>
	<section class="w-full sm:w-[87%] sm:ml-[200px] py-24 sm:py-16 sm:px-12 text-xs">
	
<section class="w-full  md:py-0 sm:px-4 ">
	

	<main class="pb-10">
		
		<!-- dashboard main content -->
		<div
			class="w-full"
		>
			{#key data}
				<div transition:slide>
					<slot />
				</div>
			{/key}
		</div>
	</main>

		

	<!-- mobile-only sidebar drawer -->
	<div class="drawer-side z-50 hidden">
		<label for="artist_dashboard_drawer" class="drawer-overlay" />
		<LeftSidebar  />
	</div>



</section>
	</section>
</main>



<BottomNav />

