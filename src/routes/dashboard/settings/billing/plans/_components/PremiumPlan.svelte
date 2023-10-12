<script lang="ts">
	import { PREMIUM_PLAN } from '$lib/constants';
	import type { UpdateBillSchema } from '$lib/schemas';
	import { formatCurrency } from '$lib/utils';
	import type { SuperForm } from 'sveltekit-superforms/client';

	export let duration: string;
	export let form: SuperForm<typeof UpdateBillSchema>;

	const { enhance, submitting } = form;
</script>

<div class="bg-neutral-800 border text-white rounded-xl p-6 mb-4">
	<article>
		<h2 class="font-extrabold text-2xl mb-2">Kokolity Premium</h2>

		{#if duration === PREMIUM_PLAN.monthly.duration}
			<p class="text-lg mb-1">
				{formatCurrency(PREMIUM_PLAN.monthly.amount, PREMIUM_PLAN.monthly.currency)} / month
			</p>
		{:else if duration === PREMIUM_PLAN.six_months.duration}
			<p class="text-lg mb-2">
				{formatCurrency(PREMIUM_PLAN.six_months.amount, PREMIUM_PLAN.six_months.currency)} / 6 months
			</p>
		{:else if duration === PREMIUM_PLAN.yearly.duration}
			<p class="text-lg mb-2">
				{formatCurrency(PREMIUM_PLAN.yearly.amount, PREMIUM_PLAN.yearly.currency)} / 1 year
			</p>
		{/if}

		<p class="text-xs mb-4">Cancel any time</p>

		<ul class="list-disc list-inside mb-4 text-sm">
			<li class="mb-2 flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-5 w-5 text-green-500 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				Artist page
			</li>
			<li class="mb-2 flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-5 w-5 text-green-500 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				Create albums
			</li>
			<li class="mb-2 flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-5 w-5 text-green-500 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				Upload your songs and singles
			</li>
			<li class="mb-2 flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-5 w-5 text-green-500 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				View analytics and insights
			</li>
			<li class="mb-2 flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-5 w-5 text-green-500 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				...and many more
			</li>
		</ul>

		<form action="/dashboard/settings/billing/plans?/updateBill" method="POST" use:enhance>
			<input type="hidden" name="duration" bind:value={duration} />
			<input type="hidden" name="plan" value="premium" />

			<button type="submit" class="btn btn-warning mt-2 mb-2" disabled={$submitting}>
				{#if $submitting}
					<span class="loading" />
				{:else}
					Get Kokolity Premium
				{/if}
			</button>
		</form>
	</article>
</div>
