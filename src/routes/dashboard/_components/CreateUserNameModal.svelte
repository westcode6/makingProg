<script lang="ts">
	import { goto } from '$app/navigation';
	import lottieAnim from '$lib/assets/lotties/confetti-lottie.json';
	import lottieSucAnim from '$lib/assets/lotties/success-lottie.json';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import Lottie from '$lib/components/Lottie.svelte';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import type { IUploadImage } from '$lib/interfaces';
	import { superForm } from 'sveltekit-superforms/client';

	export let form;

	let error_message = '';
	let profile_pic: IUploadImage = {
		url: null,
		thumbnail_url: null,
		ik_file_id: null
	};

	const {
		form: _form,
		errors,
		enhance,
		submitting
	} = superForm(form, {
		onResult: ({ result }) => {
			if (result.type === 'failure') {
				error_message = result.data?.message;
			}
			if (result.type === 'success') {
				return goto('/dashboard');
			}
		},
		onError: ({ result }) => {
			error_message = result.error.message;
		}
	});
</script>

<section class="modal modal-open">
	<div class="modal-box text-center relative scroll-element">
		<Lottie animationData={lottieSucAnim} _class="w-24" />
		<Lottie animationData={lottieAnim} _class="absolute right-0 left-0 -z-1" loop={false} />

		<p class="text-xl font-bold mb-1">Welcome to Kokolity!</p>
		<p class="text-sm mb-7 text-gray-500">Let's get your Artist profile created...</p>

		<form
			action="/dashboard/settings/profile?/createArtistProfile"
			method="POST"
			class="max-w-sm mx-auto space-y-2 relative z-50"
			enctype="multipart/form-data"
			use:enhance
		>
			<input type="hidden" name="profile_url" bind:value={profile_pic.url} />
			<input type="hidden" name="profile_thumbnail_url" bind:value={profile_pic.thumbnail_url} />
			<input type="hidden" name="profile_fileid" bind:value={profile_pic.ik_file_id} />

			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Upload your profile picture</span>
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
				label="Create Username"
				error={$errors.artist_name?.toString()}
				placeholder="Artist name"
				required
			/>

			<Textarea
				name="bio"
				label="Artist Bio"
				placeholder="Write a short bio about yourself"
				required
			/>

			<div class="py-4">
				<button type="submit" class="btn btn-warning" disabled={$submitting}>
					{#if $submitting}
						<span class="loading" />
					{:else}
						Create profile
					{/if}
				</button>
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
