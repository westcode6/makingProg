<script lang="ts">
	import type { IBill } from '$lib/interfaces';

	export let openReviewModal: boolean;
	export let bill: IBill | null;

	$: console.log(bill);
</script>

<section class={`modal modal-${openReviewModal ? 'open' : ''}`}>
	<div class="modal-box bg-white rounded-lg shadow-lg overflow-hidden">
		<div class="flex justify-between items-center bg-gray-100 p-4">
			<h2 class="text-lg font-semibold">Review your plan</h2>
			<button
				on:click={() => {
					openReviewModal = false;
				}}
				class="text-red-500 hover:text-red-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<div class="p-4">
			<div class="flex justify-between items-center border-b pb-4">
				<h3 class="font-semibold text-lg">Kokolity Premium</h3>
				<div>
					<span class="block">NGN 5,000</span>
					<small class="text-gray-500">every month</small>
				</div>
			</div>

			<div class="py-4 space-y-1 text-sm">
				<p class="flex justify-between">
					<span>1 premium account</span>
					<span>For 1 month</span>
				</p>
				<p class="flex justify-between">
					<span>Next renewal date</span>
					<span>9 Dec 2023</span>
				</p>
			</div>

			<div class="border-t pt-4 text-sm">
				<p class="flex justify-between py-2">
					<span>Plan</span>
					<span>NGN 5,000</span>
				</p>
				<p class="flex justify-between py-2">
					<span>V.A.T</span>
					<span>NGN 25</span>
				</p>
				<p class="flex justify-between py-2 font-semibold">
					<span>Total</span>
					<span>NGN 5,025</span>
				</p>
			</div>
		</div>

		<div class="p-4 bg-gray-100">
			<button class="btn btn-warning w-full mb-2">Proceed to pay</button>

			<button
				on:click={() => {
					openReviewModal = false;
				}}
				class="btn btn-ghost w-full"
			>
				Change plan
			</button>
		</div>
	</div>
</section>
