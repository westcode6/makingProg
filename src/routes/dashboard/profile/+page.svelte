<script lang="ts">
	import Check from '$lib/components/icons/Check.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let user = data.user;
</script>

<article class="mb-4">
	<h2 class="text-2xl font-bold">Profile</h2>
</article>

<section class="card">
	<div class="card-body bg-white rounded">
		<div class="avatar w-28 mx-auto">
			<div class="w-full h-full rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
				<img src={user?.profile_pic?.url} alt="Profile" />
			</div>
		</div>

		<article class="text-center mb-5">
			<p class="text-lg font-bold">{user?.artist_name}</p>
			<p class="text-sm text-success flex items-center justify-center gap-1">
				VERIFIED ARTIST<Check />
			</p>
		</article>

		<div class="flex items-center gap-4 justify-center">
			<a
				href="https://www.kokolity.com/{user?.slug}"
				target="_blank"
				rel="noreferrer"
				class="btn btn-warning">Artist page</a
			>
			<a href="/dashboard/profile/edit" class="btn btn-neutral">Edit profile</a>
		</div>
	</div>

	<div class="card-body bg-neutral text-gray-50">
		<article class="max-w-sm mx-auto w-full space-y-2">
			<p class="py-2 border-b border-b-gray-600">
				<span class="font-semibold">Artist Name:</span>
				{user?.artist_name}
			</p>

			<p class="py-2 border-b border-b-gray-600">
				<span class="font-semibold">Artist Page Link:</span><br />
				<a href="https://www.kokolity.com/{user?.slug}" target="_blank" rel="noreferrer"
					>https://www.kokolity.com/{user?.slug}</a
				>
			</p>

			<p class="py-2 border-b border-b-gray-600">
				<span class="font-semibold">Email:</span><br />
				{user?.email}
			</p>

			<p class="pt-2 font-semibold">Bio:</p>
			<p class="pb-2 border-b border-b-gray-600">{user?.bio || 'No bio'}</p>
		</article>
	</div>
</section>
