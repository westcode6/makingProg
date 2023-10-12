<script lang="ts">
	export let name: string;
	export let value: string = '';
	export let type: 'text' | 'email' | 'tel' | 'number' | 'password' = 'text';
	export let label: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let containerClass = '';
	export let error: string | null = null;
	export let helperText: string | null = null;

	const inputProperties = { type, placeholder };
</script>

<div class="form-control {containerClass}">
	<label for={name} class="label">
		<span class="label-text">{label}</span>
	</label>

	<select
		{name}
		bind:value
		id={name}
		class="select select-{error ? 'error' : 'bordered'}"
		{...inputProperties}
		{required}
	>
		<slot />
	</select>

	{#if error || helperText}
		<label for={name} class="label text-left">
			<span class="label-text text-{error && 'error'}}">{error || helperText}</span>
		</label>
	{/if}
</div>
