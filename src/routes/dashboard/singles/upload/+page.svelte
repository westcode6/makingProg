<script lang="ts">
	import UploadFile from '$lib/components/UploadFile.svelte';
	import authBgImg from '$lib/assets/auth-bg.jpg';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import { generateSlug } from '$lib/utils';
	import type { IUploadImage, IUploadSong } from '$lib/interfaces';

	export let data: PageData;

	// uploads:
	let cover_art: IUploadImage = {
		url: null,
		thumbnail_url: null,
		ik_file_id: null
	};

	let song: IUploadSong = {
		url: null,
		ik_file_id: null
	};

	// cover placeholder image:
	let cover_placeholder_style = '';

	$: if (cover_art.url) {
		cover_placeholder_style = `background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
	url(${cover_art.url}); background-size: cover; background-position: top;`;
	} else {
		cover_placeholder_style = `background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
	url(${authBgImg}); background-size: cover; background-position: top;`;
	}

	let error_message = '';

	const { form, errors, submitting, enhance } = superForm(data.form, {
		onResult: ({ result }) => {
			if (result.type === 'failure') {
				error_message = result.data?.message;
			}
			if (result.type === 'success') {
				return goto(`/dashboard/songs/${result.data?.song_slug}`);
			}
		},
		onError: ({ result }) => {
			error_message = result.error.message;
		}
	});

	// generate slug from title:
	let title = $form.title;
	let slug = $form.slug;

	$: slug = generateSlug(title);
</script>

<section
	class="bg-neutral-800 flex items-center justify-center text-white rounded-xl h-[170px] cover-placeholder"
	style={cover_placeholder_style}
>
	<article>
		<p class="font-extrabold text-lg">+ Upload a single</p>
	</article>
</section>

<section class="-mt-8 opacity-95 px-3">
	<div class="bg-white max-w-md w-full mx-auto p-6 rounded">
		<form
			action="?/upload"
			method="POST"
			enctype="multipart/form-data"
			class="space-y-2 mb-3"
			use:enhance
		>
			<input type="hidden" name="cover_art_url" bind:value={cover_art.url} />
			<input type="hidden" name="cover_art_thumbnail_url" bind:value={cover_art.thumbnail_url} />
			<input type="hidden" name="cover_art_fileid" bind:value={cover_art.ik_file_id} />

			<input type="hidden" name="song_url" bind:value={song.url} />
			<input type="hidden" name="song_fileid" bind:value={song.ik_file_id} />

			<div class="form-control">
				<label for="" class="label">Upload Cover Art</label>
				<UploadFile
					acceptedFileTypes="image/*"
					folder="covers"
					onSuccess={(res) => {
						cover_art.url = res.url;
						cover_art.thumbnail_url = res.thumbnailUrl;
						cover_art.ik_file_id = res.fileId;
					}}
					onRevert={() => {
						cover_art.url = null;
						cover_art.thumbnail_url = null;
						cover_art.ik_file_id = null;
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
						bind:value={$form.artist_name}
					/>
					{#if $errors.artist_name}
						<label for="" class="label text-error">{$errors.artist_name}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Title</label>
					<input
						type="text"
						name="title"
						placeholder="Title of song"
						class="input input-{$errors.title ? 'error' : 'bordered'}"
						bind:value={title}
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
					<label for="" class="label">Featured Artist (Optional)</label>
					<input
						type="text"
						name="featured_artist"
						class="input input-{$errors.featured_artist ? 'error' : 'bordered'}"
						placeholder="Featured artist name"
						bind:value={$form.featured_artist}
					/>
					{#if $errors.featured_artist}
						<label for="" class="label text-error">{$errors.featured_artist}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Genre</label>
					<input
						type="text"
						name="genre"
						class="input input-{$errors.genre ? 'error' : 'bordered'}"
						placeholder="E.g. Afrobeat"
						bind:value={$form.genre}
					/>
					{#if $errors.genre}
						<label for="" class="label text-error">{$errors.genre}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Description</label>
					<textarea
						name="description"
						cols="30"
						rows="4"
						class="textarea textarea-bordered input-{$errors.description && 'error'}"
						placeholder="Describe your song"
						bind:value={$form.description}
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
						bind:value={$form.amount}
					/>
					{#if $errors.amount}
						<label for="" class="label text-error">{$errors.amount}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="" class="label">Upload Song</label>
					<UploadFile
						acceptedFileTypes="audio/*"
						folder="singles"
						onSuccess={(res) => {
							song.url = res.url;
							song.ik_file_id = res.fileId;
						}}
						onRevert={() => {
							song.ik_file_id = null;
							song.url = null;
						}}
					/>
					{#if $errors.song_url}
						<label for="" class="label text-error">{$errors.song_url}</label>
					{/if}
				</div>

				<div class="form-control">
					<label for="publish" class="label justify-start gap-3 cursor-pointer">
						<input
							type="checkbox"
							name="publish"
							id="publish"
							checked={true}
							class="toggle toggle-warning"
						/>
						<span class="label-text">Publish this single</span>
					</label>
				</div>

				<button type="submit" class="btn btn-warning" disabled={$submitting}>
					{#if $submitting}
						<span class="loading" />
					{:else}
						Upload single
					{/if}
				</button>
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
