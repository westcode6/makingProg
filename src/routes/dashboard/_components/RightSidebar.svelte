<script>
	import DiscoverCard from "./DiscoverCard.svelte";
	
</script>

<div
	class="w-full lg:w-[290px] hidden sm:block lg:fixed right-0 top-[3.1em] h-full bg-white shadow-2xl rounded-[32px] lg:rounded-none py-8 lg:py-9 px-4 overflow-scroll scroll-element pb-[5.5em]"
>
	<section class="space-y-3 mb-4 text-sm">
		<h2 class="text-base font-semibold">Discover</h2>

		<div class="rounded-xl">
			<DiscoverCard artistName="Alica keys" />
			<DiscoverCard artistName="Young John" albumCover={"./src/lib/assets/artist2.jpg"} />

			<DiscoverCard artistName="Wild West" albumCover={"./src/lib/assets/artist5.jpg"} />
			<DiscoverCard artistName="Young John" albumCover={"./src/lib/assets/artist2.jpg"} />


		
		</div>
	</section>

	<section class="space-y-4 mb-4 text-sm">
		<h2 class="text-base font-semibold mt-8">Most Viewed Single</h2>

		<div class="flex  flex-col-reverse">
			<DiscoverCard artistName="Alica keys" />
			<DiscoverCard artistName="Young John" albumCover={"./src/lib/assets/artist2.jpg"} />

			<DiscoverCard artistName="Wild West" albumCover={"./src/lib/assets/artist5.jpg"} />
			<DiscoverCard artistName="Young John" albumCover={"./src/lib/assets/artist2.jpg"} />
		</div>
	</section>

	<section class="space-y-3 mb-4 text-sm">
		<h2 class="text-sm font-semibold">Most Viewed Album</h2>

		<div class="border rounded-xl p-6">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore animi, mollitia id quod a
			quia facilis, illum voluptate obcaecati repudiandae hic
		</div>
	</section>
</div>
