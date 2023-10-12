<script lang="ts">
	import logoImg from '$lib/assets/logo.png';
</script>

<section class="banner w-full h-[100vh] bg-main flex justify-center">
<div class="w-full h-[100vh] glass-effect px-4 flex items-center justify-center">
	<div class="rounded-xl -mt-44 shadow-2xl py-16 px-6 max-w-lg w-full">
		<img src={logoImg} class="w-32 mx-auto mb-8" alt="" />

		<h1 class="text-5xl font-extrabold text-center mb-12">Experience. <br />Music.</h1>

		<div class="flex items-center gap-4 justify-center">
			<a href="/login" class="btn btn-neutral px-8">Login</a>
			<a href="/signup" class="btn btn-outline btn-neutral">Create account</a>
		</div>
	</div>
</div>
</section>

<style>
	.banner {
		background: url('../lib/assets/landing-bg.jpg');
		background-position: center;
		background-size: cover;
	}

	.bg-main {
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
			url('../../lib/assets/music2.jpg');
		background-size: cover;
		background-position: top center;
		min-height: 55vh;
	}
</style>
