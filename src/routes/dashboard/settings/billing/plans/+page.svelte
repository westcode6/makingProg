<script lang="ts">
	import { PREMIUM_PLAN } from '$lib/constants';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import type { IBill } from '$lib/interfaces';
	import PremiumPlan from './_components/PremiumPlan.svelte';
	import FreePlan from './_components/FreePlan.svelte';
	import ReviewPlanModal from './_components/ReviewPlanModal.svelte';
	import ErrorModal from '$lib/components/ErrorModal.svelte';

	export let data: PageData;

	let openReviewModal: boolean = false;
	let bill: IBill | null = null;
	let error_message = '';

	let duration = PREMIUM_PLAN.monthly.duration;

	const onRadioInputChange = (e: any) => {
		duration = e.currentTarget.value;
	};

	// update bill and show proceed modal:
	const form = superForm(data.updateBillForm, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				bill = result.data?.bill;
				openReviewModal = true;
			}
			if (result.type === 'failure') {
				error_message = result.data?.message;
			}
			if (result.type === 'error') {
				error_message = result.error?.message;
			}
		}
	});
</script>

<article class="mb-4">
	<a href="/dashboard/settings/billing" class="btn">Back to billing</a>
</article>

<section class="text-center bg-white rounded-xl py-6 px-4 mb-8">
	<p class="text-xl font-bold">Pick the right plan</p>
	<p class="text-3xl font-extrabold mb-6">for you</p>

	<div class="flex items-center gap-1 lg:gap-4 justify-center">
		{#each Object.values(PREMIUM_PLAN) as plan}
			<label class="label cursor-pointer gap-2">
				<input
					checked={duration === plan.duration}
					on:change={onRadioInputChange}
					type="radio"
					name="duration"
					value={plan.duration}
					class="radio radio-warning"
				/>
				<span class="label-text">{plan.label}</span>
			</label>
		{/each}
	</div>
</section>

<!-- plans -->
<section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
	<PremiumPlan {form} {duration} />
	<FreePlan />
</section>

<p class="text-sm text-center my-10 max-w-md mx-auto">
	Note: free plans have wallet withdrawal charges of 15 percent (15%) while premium accounts is 5
	percent (5%).
</p>

<!-- Review plan modal -->
<ReviewPlanModal {openReviewModal} {bill} />

<ErrorModal
	error={error_message}
	callback={() => {
		error_message = '';
	}}
/>
