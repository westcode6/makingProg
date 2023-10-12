<script lang="ts">
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
	import type { IUploadImage } from '$lib/interfaces';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { generateSlug } from '$lib/utils';

	export let data: PageData;

	let user = data.user;
	let artist_name = user?.artist_name;
	let bio = user?.bio || '';
	let slug = user?.slug;

	let error_message = '';
	let profile_pic: IUploadImage = {
		url: null,
		thumbnail_url: null,
		ik_file_id: null
	};

	$: {
		slug = generateSlug(`${slug}`);
	}

	const { errors, submitting, enhance } = superForm(data.form, {
		onResult: ({ result }) => {
			if (result.type === 'failure') {
				error_message = result.data?.message;
			}
			if (result.type === 'success') {
				return goto('/dashboard/profile');
			}
		},
		onError: ({ result }) => {
			error_message = result.error.message;
		}
	});
</script>

<div class="mb-2">
	<a href="/dashboard/profile" class="btn"><ArrowLeft />Back to profile</a>
</div>

<section class="flex justify-center mt-1 mb-4 relative">
	<div class="avatar w-32 mx-auto">
		<div class="w-full h-full rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
			<img src={profile_pic?.url || user?.profile_pic?.url} alt="Profile" />
		</div>
	</div>
</section>

<section class="opacity-95 px-3">
	<div class="bg-white max-w-md w-full mx-auto p-6 rounded">
		<form
			action="/dashboard/profile/edit?/editProfile"
			method="POST"
			enctype="multipart/form-data"
			class="space-y-3"
			use:enhance
		>
			<input type="hidden" name="profile_url" bind:value={profile_pic.url} />
			<input type="hidden" name="profile_thumbnail_url" bind:value={profile_pic.thumbnail_url} />
			<input type="hidden" name="profile_fileid" bind:value={profile_pic.ik_file_id} />

			<div class="form-group">
				<label for="" class="label">
					<span class="label-text">Change Profile Picture</span>
				</label>

				<UploadFile
					acceptedFileTypes="image/*"
					maxFileSize="4mb"
					folder="profile"
					onSuccess={(res) => {
						profile_pic.ik_file_id = res.fileId;
						profile_pic.thumbnail_url = res.thumbnailUrl;
						profile_pic.url = res.url;
					}}
					onRevert={() => {
						profile_pic.ik_file_id = null;
						profile_pic.thumbnail_url = null;
						profile_pic.url = null;
					}}
				/>
				{#if $errors.profile_url}
					<label for="" class="label text-error">{$errors.profile_url}</label>
				{/if}
			</div>

			<Input
				name="artist_name"
				bind:value={artist_name}
				label="Artist Name"
				placeholder="Artist name"
				error={$errors.artist_name?.toString()}
				required
			/>

			<Input
				name="slug"
				bind:value={slug}
				label="Artist Page Link"
				helperText="kokolity.com/{slug}"
				error={$errors.slug?.toString()}
				required
			/>

			<Textarea
				name="bio"
				bind:value={bio}
				label="Bio"
				placeholder="Write a short bio about yourself"
				error={$errors.bio?.toString()}
				required
			/>

			<button type="submit" class="btn btn-warning" disabled={$submitting}>
				{#if $submitting}
					<span class="loading" />
				{:else}
					Save changes
				{/if}
			</button>
		</form>
	</div>
</section>

<ErrorModal
	error={error_message}
	callback={() => {
		error_message = '';
	}}
/>
