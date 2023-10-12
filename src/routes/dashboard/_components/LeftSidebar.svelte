<script lang="ts">
	import Album from '$lib/components/icons/Album.svelte';
	import Analytic from '$lib/components/icons/Analytic.svelte';
	import Banknote from '$lib/components/icons/Banknote.svelte';
	import Overview from '$lib/components/icons/Overview.svelte';
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import Singles from '$lib/components/icons/Singles.svelte';

	export let isMobile: boolean = false;
	export let handleClick = () => {
		return;
	};

	let show_albums = false;
	let show_singles = false;
	let show_transactions = false;
	let show_settings = true;
	let active: 'albums' | 'sing' | 'trans' | 'sett';

	function show(albu: boolean, sing: boolean, trans: boolean, sett: boolean) {
		show_albums = albu;
		show_singles = sing;
		show_transactions = trans;
		show_settings = sett;
	}
</script>

<aside
	class="{isMobile
		? ''
		: 'hidden lg:block left-sidebar  '} w-[60vw] lg:w-[220px] h-[100dvh] fixed z-50 bg-yellow-300 top-[4.1em] pb-[5.5em] py-6 px-4 overflow-y-scroll scroll-element"
>
	<ul class="menu text-neutral-900 space-y-5">
		<li class="flex flex-row items-center">
			<a
				href="/dashboard"
				class="bg-neutral-800 gap-4 text-base text-yellow-300 hover:text-neutral-800 lg:text-sm font-bold"
				on:click={handleClick}
			>
				<span class="block">
					<Overview />
				</span> Overview</a
			>
		</li>

		<!-- albums dropdown -->
		<li>
			<button
				on:click={() => {
					show_albums = !show_albums;
				}}
				class="gap-4 text-base lg:text-sm font-bold"><span><Album /></span> Albums</button
			>
			{#if show_albums}
				<a href="/dashboard/albums/published" class="text-sm lg:text-xs ml-2" on:click={handleClick}
					>Published</a
				>
				<a href="/dashboard/albums/draft" class="text-sm lg:text-xs ml-2" on:click={handleClick}
					>Draft</a
				>
				<a href="/dashboard/albums/create" class="text-sm lg:text-xs ml-2" on:click={handleClick}>
					Create Album</a
				>
			{/if}
		</li>

		<!-- singles dropdown -->
		<li>
			<button
				on:click={() => (show_singles = !show_singles)}
				class="gap-4 text-base lg:text-sm font-bold"><span><Singles /></span> Singles</button
			>
			{#if show_singles}
				<a
					href="/dashboard/singles/published"
					class="text-sm lg:text-xs ml-2"
					on:click={handleClick}>Published</a
				>
				<a href="/dashboard/singles/draft" class="text-sm lg:text-xs ml-2" on:click={handleClick}
					>Draft</a
				>
				<a href="/dashboard/singles/upload" class="text-sm lg:text-xs ml-2" on:click={handleClick}
					>Upload Single</a
				>
			{/if}
		</li>

		<li>
			<a href="/dashboard" class="gap-4 text-base lg:text-sm font-bold" on:click={handleClick}
				><span><Analytic /></span>Analytics</a
			>
		</li>

		<!-- transactions dropdown -->
		<li>
			<button
				on:click={() => {
					show_transactions = !show_transactions;
				}}
				class="gap-4 text-base lg:text-sm font-bold"><span><Banknote /></span> Transactions</button
			>
			{#if show_transactions}
				<a href="/dashboard" class="text-sm lg:text-xs ml-2" on:click={handleClick}>Successful</a>
				<a href="/dashboard" class="text-sm lg:text-xs ml-2" on:click={handleClick}>Failed</a>
				<a href="/dashboard" class="text-sm lg:text-xs ml-2" on:click={handleClick}>Pending</a>
			{/if}
		</li>

		<!-- settings dropdown -->
		<li>
			<button
				on:click={() => {
					show_settings = !show_settings;
				}}
				class="gap-4 text-base lg:text-sm font-bold"
				><span>
					<SettingsIcon />
				</span>Settings</button
			>
			{#if show_settings}
				<a href="/dashboard/profile" class="text-sm lg:text-xs ml-2" on:click={handleClick}
					>Profile</a
				>
				<a href="/dashboard/settings/billing" class="text-sm lg:text-xs ml-2" on:click={handleClick}
					>Billing</a
				>
				<a href="/dashboard" class="text-sm lg:text-xs ml-2" on:click={handleClick}>Bank Details</a>
				<a href="/dashboard/security" class="text-sm lg:text-xs ml-2" on:click={handleClick}
					>Security</a
				>

				<form action="/dashboard/logout?/logout" method="POST">
					<button type="submit" class="text-sm lg:text-xs ml-2">Logout</button>
				</form>
			{/if}
		</li>
	</ul>
</aside>
