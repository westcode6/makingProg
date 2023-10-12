<script lang="ts">
	export let name: string;
	export let value: string = '';
	export let label: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let containerClass = '';
	export let helperText: string | null = null;
	export let error: string | null = null;
	export let maxlength: number = 3500;
</script>

<div class="form-control">
	<label for={label} class="label">
		<span class="label-text">{label}</span>
	</label>

	<textarea
		bind:value
		{name}
		id={name}
		cols="30"
		rows="5"
		class="textarea textarea-{error ? 'error' : 'bordered'} {containerClass}"
		{placeholder}
		{maxlength}
		{required}
	/>

	{#if error || helperText}
		<label for={label} class="label text-left">
			<span class="label-text text-{error && 'error'}">{error || helperText}</span>
		</label>
	{/if}
</div>
