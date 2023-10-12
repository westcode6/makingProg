<script lang="ts">
	export let name: string;
	export let checked: boolean = false;
	export let label: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let containerClass = '';
</script>

<div class="form-control {containerClass}">
	<label for={name} class="label cursor-pointer justify-start gap-4">
		<input
			type="checkbox"
			id={name}
			class="checkbox checkbox-warning"
			bind:checked
			{placeholder}
			{required}
		/>
		<span class="label-text">{label}</span>
	</label>
</div>
