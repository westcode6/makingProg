<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { SignupSchema } from '$lib/schemas';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let open_verify_modal = false;
	let uuid = '';
	let error_message = '';

	const {
		form: signupForm,
		enhance: signupEnhance,
		submitting: signupSubmitting,
		errors: signupErrors
	} = superForm(data.signupForm, {
		taintedMessage: false,
		validators: SignupSchema,
		onResult: async ({ result }) => {
			if (result.type === 'failure') {
				error_message = result.data?.message;
			}
			if (result.type === 'success') {
				uuid = result.data?.verify_uuid;
				open_verify_modal = true;
			}
		}
	});

	const {
		form: verifyEmailForm,
		enhance: verifyEmailFormEnhance,
		submitting: verifyEmailSubmitting,
		errors: verifyEmailErrors
	} = superForm(data.verifyEmailForm, {
		onResult: async ({ result }) => {
			if (result.type === 'failure') {
				error_message = result.data?.message;
			}
			if (result.type === 'success') {
				return goto('/dashboard');
			}
		}
	});
</script>

<!-- sign up form -->
<section>
	<article class="text-center mb-7">
		<h1 class="text-2xl font-bold">Get started</h1>
		<p class="text-base">Start selling your songs on Kokolity</p>
	</article>

	<form action="?/signup" method="POST" use:signupEnhance>
		<div class="space-y-1 mb-5">
			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Email</span>
				</label>
				<input
					type="email"
					name="email"
					class="input input-bordered input-{$signupErrors.email && 'error'}"
					placeholder="Your email"
					bind:value={$signupForm.email}
				/>
				{#if $signupErrors.email}
					<label for="" class="label text-error">{$signupErrors.email}</label>
				{/if}
			</div>

			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					name="password"
					class="input input-bordered input-{$signupErrors.password && 'error'}"
					placeholder="******"
					bind:value={$signupForm.password}
				/>
				{#if $signupErrors.password}
					<label for="" class="label text-error">{$signupErrors.password}</label>
				{/if}
			</div>

			<div class="form-control py-3">
				<p class="text-sm">By signing up, you agree to our Terms & Conditions</p>
			</div>
		</div>

		<button type="submit" class="btn btn-warning w-full" disabled={$signupSubmitting}>
			{#if $signupSubmitting}
				<span class="loading" />
			{:else}
				Create account
			{/if}
		</button>
	</form>

	<p class="text-center mt-8">
		Already have an account? <a href="/login" class="text-warning font-semibold">Login</a>
	</p>
</section>

<!-- verify otp modal -->
<section class="modal modal-bottom lg:modal-middle modal-{open_verify_modal && 'open'}">
	<div class="modal-box">
		<article class="text-center mb-10">
			<h2 class="text-xl font-bold mb-2">Verify your email</h2>
			<p class="text-sm">
				We've just sent an OTP to <span class="font-semibold">{$signupForm.email}</span>.
				<br />Check your email and enter the OTP below.
			</p>
		</article>

		<form action="?/verifyEmail" method="POST" use:verifyEmailFormEnhance>
			<input type="hidden" name="uuid" bind:value={uuid} />

			<div class="form-control mb-8 max-w-xs mx-auto">
				<label for="" class="label text-center block">
					<span class="label-text">Enter OTP</span>
				</label>
				<input
					type="text"
					name="otp"
					class="input input-bordered text-center input-{$verifyEmailErrors.otp && 'error'}"
					placeholder="******"
					bind:value={$verifyEmailForm.otp}
				/>
				{#if $verifyEmailErrors.otp}
					<label for="" class="label input-error">{$verifyEmailErrors.otp}</label>
				{/if}
			</div>

			<div class="text-center">
				<button class="btn btn-warning" disabled={$verifyEmailSubmitting}>
					{#if $verifyEmailSubmitting}
						<span class="loading" />
					{:else}
						Proceed to dashboard
					{/if}
				</button>
			</div>
		</form>

		<p class="text-center text-sm mt-10">
			Didn't get OTP? <button class="btn btn-sm btn-outline btn-warning">Resend OTP</button>
		</p>
	</div>
</section>

<ErrorModal
	error={error_message}
	callback={() => {
		error_message = '';
	}}
/>

<style>
	/** Pincode */
	:global([data-pincode]) {
		display: inline-flex;
		border: none !important;
	}

	/** PincodeInput */
	:global([data-pincode] input) {
		width: 3rem;
		padding: 0.8rem 1rem !important;
		margin: 2px !important;
		border: 0;
		border-radius: 0;
		text-align: center;
		background-color: rgb(235, 235, 235);
	}
</style>
