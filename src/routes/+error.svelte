<script lang="ts">
	import { page } from '$app/stores';
	import Lottie from '$lib/components/Lottie.svelte';
	import animationData from '$lib/assets/lotties/empty-lottie.json';
</script>

<section class="min-h-[100dvh] p-4 w-full flex items-center justify-center">
	<div class="text-center max-w-sm mx-auto bg-white border rounded-xl p-4">
		<Lottie {animationData} _class="w-48 mb-8" />
		<p class="font-extrabold text-2xl mb-1">Error {$page.status}</p>
		<p class="text-sm">{$page.error?.message}</p>

		<article class="mt-8 text-sm">
			<p class="text-gray-500 mb-6">Here's what you can do:</p>

			<div class="space-y-4">
				<a href="/signup" class="btn btn-neutral btn-md">Create your artist page</a>
				<a href="/" class="btn btn-neutral btn-md btn-outline">Go back to home page</a>
			</div>
		</article>
	</div>
</section>
