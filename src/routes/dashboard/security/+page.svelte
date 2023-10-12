<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	import LockClosed from '$lib/components/icons/LockClosed.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Lottie from '$lib/components/Lottie.svelte';
	import successLottie from '$lib/assets/lotties/success-lottie.json';

	export let data: PageData;

	let error_message = '';
	let success_message = '';

	const { errors, submitting, enhance } = superForm(data.form, {
		onResult: ({ result }) => {
			if (result.type === 'failure') {
				error_message = result.data?.message;
			}

			if (result.type === 'success') {
				success_message = result.data?.message;
			}
		},
		onError: ({ result }) => {
			error_message = result.error?.message;
		}
	});
</script>

<article class="mb-4">
	<h2 class="text-2xl font-bold">Security</h2>
</article>

<section>
	<div class="card">
		<div class="card-body bg-white">
			<p class="text-lg font-bold flex items-center gap-3">
				<LockClosed _class="text-white bg-red-500 rounded-full p-1 w-8 h-8" />Change Account
				Password
			</p>

			<form
				action="/dashboard/security?/changePassword"
				method="POST"
				class="space-y-3 max-w-xs mx-auto mt-8"
				use:enhance
			>
				<Input
					name="current_password"
					type="password"
					label="Current Password"
					placeholder="*******"
					error={$errors.current_password?.toString()}
					required
				/>

				<Input
					name="new_password"
					type="password"
					label="New Password"
					placeholder="*******"
					error={$errors.new_password?.toString()}
					required
				/>

				<Input
					name="confirm_new_password"
					type="password"
					label="Confirm New Password"
					placeholder="*******"
					error={$errors.confirm_new_password?.toString()}
					required
				/>

				<p class="label">
					<span class="label-text"
						>You will be logged out so you can login with your new password</span
					>
				</p>

				<button type="submit" class="btn btn-warning" disabled={$submitting}>
					{#if $submitting}
						<span class="loading" />
					{:else}
						Change password
					{/if}
				</button>
			</form>
		</div>
	</div>
</section>

<!-- success -->
<Modal open={Boolean(success_message)}>
	<div class="text-center">
		<Lottie animationData={successLottie} _class="w-28 mb-2" />

		<p class="text-lg font-bold text-success mb-1">Success</p>

		<p class="text-sm mb-6">
			{success_message}
		</p>

		<form action="/dashboard/logout?/logout" method="POST">
			<button type="submit" class="btn btn-warning">Okay</button>
		</form>
	</div>
</Modal>

<!-- error -->
<ErrorModal
	error={error_message}
	callback={() => {
		error_message = '';
	}}
/>
