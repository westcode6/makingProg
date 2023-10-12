<script lang="ts">
import CreditCard from '$lib/components/icons/CreditCard.svelte';
	import Share from '$lib/components/icons/Share.svelte';
	import Visit from '$lib/components/icons/Visit.svelte';
import type { PageData } from './$types';
	import Report from '$lib/components/icons/Report.svelte';

	export let data: PageData;
</script>

<section class="flex gap-4 justify-between mb-6 lg:mb-8">
	<article>
		<h1 class="text-xl font-bold">Hello, {data.user?.artist_name ?? 'Artist'}</h1>
		<p class="text-xs md:text-sm mt-1 text-neutral-600">You are awesome 🔥🔥</p>
	</article>

	<article class="text-sm text-right">
		<p class="text-warning font-semibold mb-1">kokolity.com/{data.user?.slug}</p>
		<p class="flex items-center justify-end">
			<a
				href="http://localhost:5173/{data.user?.slug}/dashboard"
				target="_blank"
				rel="noreferrer"
				class="btn btn-xs text-[11px] btn-outline btn-neutral mr-2"><span class=""><Share /></span> Share</a
			>
			<a
				href="https://kokolity.com/{data.user?.slug}"
				target="_blank"
				rel="noreferrer"
				class="btn btn-xs px-4 btn-warning text-[11px]  text-neutral-900 hover:underline">Visit <span><Visit /></span></a
			>
		</p>
	</article>
</section>

<!-- wallet balances -->
<section class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
	<figure
		class="order-2 lg:order-1 p-6 shadow-2xl rounded-xl bg-neutral-800 text-neutral-100 flex flex-col justify-between items-start"
	>
		<article>
			<p class="text-xs mb-1">Total earnings</p>
			<p class="text-xl font-bold mb-3">NGN 0.00</p>
		</article>

		<a href="/" class="btn btn-sm btn-warning btn-outline"><span><Report /></span> View reports</a>
	</figure>

	<figure
		class="order-1 lg:order-2 p-6 shadow-2xl rounded-xl bg-amber-300 text-neutral-700 flex flex-col justify-between items-start"
	>
		<article>
			<p class="text-xs mb-1">Wallet balance</p>
			<p class="text-xl font-bold mb-3">NGN 0.00</p>
		</article>

		<a href="/" class="btn btn-sm"> <span><CreditCard /></span>Withdraw</a>
	</figure>
</section>

<!-- pending todos -->
<section class="mb-6 px-2">
	<h2 class="text-base font-bold mb-4">Pending Todos</h2>

	<ul class="steps steps-vertical glass-effect-2 w-full rounded-xl shadow p-4 space-y-3">
		<li class="step step-success">
			<article class="text-left space-y-1">
				<p class="text-xs font-bold">Upload a song</p>
				<p class="text-xs">Add your first single song to your artist profile</p>
				<p class="text-xs">
					<a href="/dashboard/singles/upload" class="text-warning font-semibold">+ Upload single</a>
				</p>
			</article>
		</li>

		<li class="step">
			<article class="text-left space-y-1">
				<p class="text-xs font-bold">Create album</p>
				<p class="text-xs">Create album and upload songs to it</p>
				<p class="text-xs">
					<a href="/dashboard/albums/create" class="text-warning font-semibold">+ Create album</a>
				</p>
			</article>
		</li>

		<li class="step">
			<article class="text-left space-y-1">
				<p class="text-xs font-bold">Add bank details</p>
				<p class="text-xs">Cashout your earnings to your local bank account</p>
				<p class="text-xs"><a href="/" class="text-warning font-semibold">+ Add bank details</a></p>
			</article>
		</li>
	</ul>
</section>

<!-- music reports -->
<section class="px-2">
	<h2 class="text-base font-bold mb-4">Your Music Report</h2>

	<div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
		<article class="bg-neutral-50 shadow-inner border-2 space-y-3 text-center rounded-xl p-4">
			<p class="text-xl font-bold">0</p>
			<p class="text-xs font-normal">Uploaded singles</p>
			<p>
				<a href="/dashboard/singles" class="btn btn-warning  btn-outline btn-sm text-[10px] w-full"
					>View singles</a
				>
			</p>
		</article>

		<article class=" bg-neutral-800 shadow space-y-3 text-center rounded-xl p-4">
			<p class="text-xl font-bold text-white">0</p>
			<p class="text-xs text-white">Uploaded albums</p>
			<p>
				<a href="/dashboard/albums" class="btn btn-warning btn-outline btn-sm text-[10px] w-full">View albums</a
				>
			</p>
		</article>

		<article class="bg-neutral-50 shadow-inner border-2 space-y-3 text-center rounded-xl p-4">
			<p class="text-xl font-bold">0</p>
			<p class="text-xs">Total sales</p>
			<p>
				<a href="/dashboard" class="btn btn-warning btn-outline btn-sm text-[10px] w-full">View reports</a>
			</p>
		</article>
	</div>
</section>
