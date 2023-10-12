<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ErrorModal from '$lib/components/ErrorModal.svelte';

	export let data: PageData;

	let openDeleteModal = false;
	let error_message = '';

	const { submitting: deleteFormSubmitting, enhance: deleteFormEnhance } = superForm(
		data.deleteSongForm,
		{
			onResult: ({ result }) => {
				if (result.type === 'failure') {
					error_message = result.data?.message;
				}
				if (result.type === 'success') {
					if (data.song?.album_slug) {
						return goto(`/dashboard/albums/${data.song?.album_slug}`);
					}
					return goto('/dashboard/singles/published');
				}
			},
			onError: ({ result }) => {
				error_message = result.error?.message;
			}
		}
	);
</script>

<div class="mb-2">
	{#if data.song?.album_slug}
		<a href="/dashboard/albums/{data.song?.album_slug}" class="btn">Back</a>
	{:else}
		<a href="/dashboard/singles/published" class="btn">Back</a>
	{/if}
</div>

<section
	class="bg-neutral-800 flex items-center justify-center text-white rounded-xl h-[170px] cover-placeholder"
	style="background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
	url({data.song?.cover_art.url}); background-size: cover; background-position: top;"
>
	<article class="text-center">
		<p class="font-extrabold text-lg mb-1">
			{data.song?.title}
		</p>

		<p class="text-xs">total views: {data.song?.total_views}</p>
	</article>
</section>

<section class="-mt-8 opacity-95 px-3">
	<div class="bg-white shadow max-w-md w-full mx-auto p-6 rounded">
		<audio controls class="w-full mb-7">
			<source src={data.song?.song_upload.url} type="audio/mpeg" />
			Your browser does not support audio.
		</audio>

		<article class="flex flex-col lg:flex-row items-center gap-4 justify-center">
			<a href="/dashboard/songs/{data.song?.slug}/edit" class="btn btn-neutral w-full lg:w-auto">
				Edit song
			</a>

			<button
				on:click={() => {
					openDeleteModal = true;
				}}
				class="btn btn-error w-full lg:w-auto"
				>Delete song
			</button>
		</article>
	</div>
</section>

<section class="pt-16 px-5 pb-8 bg-white rounded-xl -mt-8">
	<ul class="space-y-3 text-sm mx-auto max-w-lg">
		{#if data.song?.song_type === 'album'}
			<li>
				<p class="font-semibold">Album link:</p>
				<p class="text-warning font-semibold">
					<a
						href="https://www.kokolity.com/{data.user.slug}/albums/{data.song?.album_slug}"
						target="_blank"
						rel="noreferrer"
						>kokolity.com/{data.user.slug}/albums/{data.song?.album_slug}
					</a>
				</p>
			</li>
		{/if}

		<li>
			<p class="font-semibold">Song link:</p>
			<p class="text-warning font-semibold">
				<a
					href="https://www.kokolity.com/{data.user.slug}/songs/{data.song?.slug}"
					target="_blank"
					rel="noreferrer"
					>kokolity.com/{data.user.slug}/songs/{data.song?.slug}
				</a>
			</p>
		</li>

		{#if data.song?.song_type === 'single'}
			<li>
				<p>
					<span class="font-semibold">Amount:</span>
					{formatCurrency(data.song?.amount, data.song?.currency)}
				</p>
			</li>
		{/if}

		<li>
			<p class="font-semibold">Description:</p>
			<p>{data.song?.description}</p>
		</li>
	</ul>
</section>

<!-- Delete song modal -->
<section class="modal modal-{openDeleteModal && 'open'}">
	<div class="modal-box text-center relative">
		<p class="text-lg font-bold mb-1">Delete '{data.song?.title}' song</p>
		<p class="text-sm mb-8">This song will be permanently deleted from Kokolity</p>

		<form
			action="/dashboard/songs/{data.song?.slug}/edit?/delete"
			method="POST"
			class="space-y-6 max-w-sm mx-auto"
			use:deleteFormEnhance
		>
			<div class="form-control">
				<label for="" class="label text-center block">
					<span class="label-text">For Security Reasons, Enter Your Password</span>
				</label>
				<input
					type="password"
					name="password"
					placeholder="******"
					class="input input-bordered"
					required
				/>
			</div>

			<div class="flex items-center gap-4 justify-center">
				<button type="submit" class="btn btn-error" disabled={$deleteFormSubmitting}>
					{#if $deleteFormSubmitting}
						<span class="loading" />
					{:else}
						Delete song
					{/if}
				</button>

				<button
					on:click={() => {
						openDeleteModal = false;
					}}
					type="button"
					class="btn btn-neutral">Close</button
				>
			</div>
		</form>
	</div>
</section>

<ErrorModal
	error={error_message}
	callback={() => {
		error_message = '';
	}}
/>
