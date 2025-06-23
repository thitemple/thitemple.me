<script lang="ts">
	import "$lib/assets/app.css";
	import { author } from "$lib/config";

	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";
	import PageTransition from "$lib/components/transition.svelte";

	let { data, children } = $props();
</script>

<svelte:head>
	<meta name="author" content={author} />
</svelte:head>

<div
	class="mx-auto grid h-full max-w-5xl grid-rows-[auto_1fr_auto] overflow-hidden bg-white px-4 lg:px-8 dark:bg-violet-900"
>
	<Header />
	<main class="my-2 lg:my-16">
		<PageTransition url={data.url}>
			{@render children?.()}
		</PageTransition>
	</main>
	<Footer />
</div>
