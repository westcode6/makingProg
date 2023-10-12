<script lang="ts">
	import type { IUploadImage } from '$lib/interfaces';
	import authBgImg from '$lib/assets/auth-bg.jpg';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import { generateSlug } from '$lib/utils';

	export let data: PageData;

	// uploads:
	let cover_art: IUploadImage = {
		url: null,
		thumbnail_url: null,
		ik_file_id: null
	};

	const { form, errors, enhance, submitting } = superForm(data.form, {
		onResult: ({ result }) => {
			if (result.type === 'failure') {
				error_message = result.data?.message;
			}
			if (result.type === 'success') {
				return goto(`/dashboard/albums/${result.data?.album_slug}`);
			}
		},
		onError: async ({ result }) => {
			error_message = result.error.message;
		}
	});

	let title = $form.title;
	let slug = $form.slug;
	let cover_placeholder_style = '';
	let error_message = '';

	$: {
		slug = generateSlug(title);

		if (cover_art.url) {
			cover_placeholder_style = `background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
	url(${cover_art.url}); background-size: cover; background-position: top;`;
		} else {
			cover_placeholder_style = `background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
	url(${authBgImg}); background-size: cover; background-position: top;`;
		}
	}
</script>

<section
	class="bg-neutral-800 flex items-center justify-center text-white rounded-xl h-[170px] cover-placeholder"
	style={cover_placeholder_style}
>
	<article>
		<p class="font-extrabold text-lg">Create an album</p>
	</article>
</section>

<section class="-mt-8 opacity-95 px-3">
	<div class="bg-white max-w-md w-full mx-auto p-6 rounded">
		<form
			action="?/create"
			method="POST"
			enctype="multipart/form-data"
			class="space-y-2"
			use:enhance
		>
			<input type="hidden" name="cover_art_url" bind:value={cover_art.url} />
			<input type="hidden" name="cover_art_thumbnail_url" bind:value={cover_art.thumbnail_url} />
			<input type="hidden" name="cover_art_fileid" bind:value={cover_art.ik_file_id} />

			<div class="form-control">
				<label for="" class="label">Upload Cover Art</label>
				<UploadFile
					acceptedFileTypes="image/*"
					folder="covers"
					onSuccess={(res) => {
						cover_art.ik_file_id = res.fileId;
						cover_art.thumbnail_url = res.thumbnailUrl;
						cover_art.url = res.url;
					}}
					onRevert={() => {
						cover_art.ik_file_id = null;
						cover_art.thumbnail_url = null;
						cover_art.url = null;
					}}
				/>
				{#if $errors.cover_art_url}
					<label for="" class="label text-error">{$errors.cover_art_url}</label>
				{/if}
			</div>

			{#if cover_art.url}
				<div class="form-control">
					<label for="" class="label">Artist Name</label>
					<input
						type="text"
						name="artist_name"
						class="input input-{$errors.artist_name ? 'error' : 'bordered'}"
						placeholder="Artist name"
						required
					/>
					{#if $errors.artist_name}
						<label for="" class="label text-error">{$errors.artist_name}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Featured Artist (Optional)</label>
					<input
						type="text"
						name="featured_artist"
						class="input input-{$errors.featured_artist ? 'error' : 'bordered'}"
						placeholder="Featured artist"
					/>
					{#if $errors.featured_artist}
						<label for="" class="label text-error">{$errors.featured_artist}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Title</label>
					<input
						type="text"
						name="title"
						bind:value={title}
						class="input input-{$errors.title ? 'error' : 'bordered'}"
						placeholder="Title of album"
						required
					/>
					{#if $errors.title}
						<label for="" class="label text-error">{$errors.title}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Slug</label>
					<input
						type="text"
						name="slug"
						class="input input-{$errors.slug ? 'error' : 'bordered'}"
						placeholder="song-title"
						bind:value={slug}
					/>
					{#if $errors.slug}
						<label for="" class="label text-error">{$errors.slug}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Description</label>
					<textarea
						name="description"
						cols="30"
						rows="4"
						class="textarea textarea-bordered input-{$errors.description && 'error'}"
						placeholder="Describe your album"
						required
					/>
					{#if $errors.description}
						<label for="" class="label text-error">{$errors.description}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Amount (NGN)</label>
					<input
						type="number"
						name="amount"
						step=".01"
						class="input input-{$errors.amount ? 'error' : 'bordered'}"
						placeholder="0.00"
					/>
					{#if $errors.amount}
						<label for="" class="label text-error">{$errors.amount}</label>
					{/if}
				</div>

				<div class="form-control pb-4">
					<label for="publish" class="label justify-start gap-3 cursor-pointer">
						<input
							type="checkbox"
							checked={true}
							id="publish"
							name="publish"
							class="toggle toggle-warning"
						/>
						<span class="label-text">Publish this album?</span>
					</label>
				</div>

				<button type="submit" class="btn btn-warning" disabled={$submitting}>
					{#if $submitting}
						<span class="loading" />
					{:else}
						Create album
					{/if}</button
				>
			{/if}
		</form>
	</div>
</section>

<ErrorModal
	error={error_message}
	callback={() => {
		error_message = '';
	}}
/>
