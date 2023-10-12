<script>
	import Lottie from '$lib/components/Lottie.svelte';
	import emptyLottie from '$lib/assets/lotties/empty-lottie.json';
</script>

<article class="mb-4">
	<h2 class="text-2xl font-bold">Billing</h2>
</article>

<div class="border-2 bg-white py-8 px-4 rounded-xl mb-8">
	<section class="mb-8 opacity-95 rounded-xl shadow p-4 max-w-md mx-auto">
		<ul class="space-y-3 text-sm">
			<li class="flex items-center justify-between text-sm">
				<span class="text-xs">CURRENT PLAN</span>
				<span class="font-bold">Kokolity Free</span>
			</li>
			<div class="border-t" />
			<li class="flex items-center justify-between">
				<span class="text-xs">NEXT RENEWAL DATE</span>
				<span class="font-bold">Free Forever</span>
			</li>
		</ul>
	</section>

	<section class="text-center">
		<a href="/dashboard/settings/billing/plans" class="btn btn-warning">Upgrade your account</a>
	</section>
</div>

<section>
	<h2 class="text-lg font-bold mb-4">Billing History</h2>

	<div class="overflow-x-auto mb-4">
		<table class="table table-zebra-zebra">
			<thead>
				<tr class="bg-neutral-800 text-white">
					<th>S/N</th>
					<th>Amount</th>
					<th>Plan</th>
					<th>Duration</th>
					<th>Date</th>
				</tr>
			</thead>
		</table>
	</div>

	<div class="px-6 py-12 rounded-xl bg-white">
		<article class="text-center">
			<Lottie animationData={emptyLottie} _class="w-32 mb-4" />
			<p class="mb-5">You don't have any billing history</p>
		</article>
	</div>
</section>
