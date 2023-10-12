<script lang="ts">
	import { formatCurrency } from '$lib/utils';
</script>

<div class="bg-white border rounded-xl p-6 mb-4">
	<article>
		<h2 class="font-extrabold text-2xl mb-2">Kokolity Free</h2>

		<p class="text-lg mb-1">{formatCurrency(0, 'NGN')} / forever</p>

		<p class="text-xs mb-4">Upgrade any time</p>

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
				Upload 3 songs
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
						class="h-5 w-5 text-red-500 mr-2"
						d="M6 18L18 6M6 6l12 12"
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
						class="h-5 w-5 text-red-500 mr-2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
				View analytics and insights
			</li>
		</ul>

		<button class="btn btn-warning btn-outline mt-2 mb-2">Get Kokolity Free</button>
	</article>
</div>
