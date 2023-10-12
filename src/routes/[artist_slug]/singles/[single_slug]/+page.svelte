<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import Navbar from '../../_components/Navbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let single = data.single;
</script>

<Navbar artist_name={data?.artist?.artist_name} artist_slug={data?.artist?.slug} />

<main class="w-full min-h-[100dvh] bg-dark text-white -mt-16">
	<!-- page banner -->
	<section class="h-auto xl:max-w-7xl mx-auto relative grid grid-cols-12">
		<!-- row-1 -->
		<div
			class="order-2 lg:order-1 pt-36 col-span-12 lg:col-span-5 relative lg:-mr-20 pl-4 pr-4 lg:pr-0 lg:pl-12 -mt-[34rem] lg:mt-0"
		>
			<article class="mb-12">
				<p class="text-sm text-blue-200">SINGLE</p>
				<p class="text-5xl extrabold mb-3">{single?.title}</p>

				{#if single?.featured_artist}
					<p class="text-sm text-gray-300 mb-2">Featured: {single?.featured_artist}</p>
				{/if}

				<p class="text-sm mb-7 text-gray-100">
					{single?.description}
				</p>

				<button class="btn btn-warning"
					>Buy single ({formatCurrency(single?.amount, single?.currency)})</button
				>
			</article>

			<!-- singles -->
			<!-- <div>
				<h2 class="text-lg font-bold text-gray-100 mb-4">Singles</h2>

				<ul class="overflow-y-scroll scroll-element max-h-72 lg:max-h-48 bg-black px-4">
					{#await getSinglesFromAPI()}
						<LoadingIndicator />
					{:then data}
						{#each data.data as single, index}
							<li class="flex items-center justify-between gap-4 border-b border-b-gray-900 py-4">
								<div class="flex items-center gap-4">
									<span class="text-sm text-gray-300">{index + 1}</span>
									<img
										src={single?.cover_art?.thumbnail_url}
										class="w-12 h-12 object-cover rounded"
										alt="Single"
										loading="lazy"
									/>
									<article class="text-sm">
										<p class="text-gray-400 truncate max-w-[110px] lg:max-w-[290px]">
											{single?.title}
										</p>
										<p class="text-sm text-gray-300">
											{formatCurrency(single?.amount, single?.currency)}
										</p>
									</article>
								</div>

								<a href="/singles/{single?.slug}" class="btn btn-sm mr-2">View</a>
							</li>
						{/each}
					{/await}
				</ul>

				<div class="py-4">
					<a href="/singles" class="btn btn-warning btn-outline btn-sm">View more</a>
				</div>
			</div> -->
		</div>

		<!-- row-2 -->
		<picture
			class="col-span-12 lg:col-span-7 order-1 lg:order-2 h-[39rem] items-center rounded-lg -ml-1"
			style="background: linear-gradient(to left, rgba(0,0,0,0) 25%, 75%, #1A1A23), linear-gradient(to bottom, rgba(0,0,0,0) 25%, 75%, #1A1A23), url('{single
				?.cover_art?.url}'); background-position: top; background-size: cover;"
		/>
	</section>
</main>
