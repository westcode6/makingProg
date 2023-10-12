<script lang="ts">
	import Close from './icons/Close.svelte';

	export let open: boolean = false;
	export let position: 'top' | 'bottom' | 'middle' = 'middle';
	export let title: string = '';
	export let preventClose: boolean = false;
</script>

<section class="modal modal-{open ? 'open' : ''} modal-{position}">
	<div class="modal-box scroll-element">
		<div class="flex items-center gap-4 justify-between mb-4">
			<h2 class="text-xl font-bold">{title}</h2>

			<button
				on:click={() => {
					if (preventClose) return;
					open = false;
				}}
			>
				<Close _class="cursor-pointer text-error" />
			</button>
		</div>

		<slot />
	</div>
</section>
