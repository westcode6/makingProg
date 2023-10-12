<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import ErrorModal from '$lib/components/ErrorModal.svelte';
	import { LoginSchema } from '$lib/schemas';

	export let data: PageData;

	let error_message = '';

	const { form, errors, submitting, enhance } = superForm(data.loginForm, {
		validators: LoginSchema,
		taintedMessage: false,
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

<section class="glass-effect px-2 md:px-4 shadow-xl py-6 ">
	<article class="text-center mb-7">
		<h1 class="text-2xl font-bold">Welcome back</h1>
		<p class="text-base">Login to your Kokolity account</p>
	</article>

	<form action="?/login" method="POST" use:enhance>
		<div class="space-y-2 mb-5">
			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Email</span>
				</label>
				<input
					type="email"
					name="email"
					class="input input-bordered input-{$errors.email && 'error'}"
					placeholder="Your email"
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<label for="" class="label input-error">{$errors.email}</label>
				{/if}
			</div>

			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					name="password"
					class="input input-bordered input-{$errors.password && 'error'}"
					placeholder="*****"
					bind:value={$form.password}
				/>
			</div>

			<p class="text-right">
				<a href="/password-reset" class="text-warning font-semibold">Forgot password?</a>
			</p>
		</div>

		<button type="submit" class="btn btn-warning w-full" disabled={$submitting}>
			{#if $submitting}
				<span class="loading" />
			{:else}
				Log in
			{/if}
		</button>
	</form>

	<p class="text-center mt-8">
		Don't have an account? <a href="/signup" class="text-warning font-semibold">Register</a>
	</p>
</section>

<ErrorModal
	error={error_message}
	callback={() => {
		error_message = '';
	}}
/>
