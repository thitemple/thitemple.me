<script lang="ts">
	import "../app.css";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import { dev } from "$app/environment";
	import { page } from "$app/state";
	import * as config from "$lib/config";

	injectAnalytics({ mode: dev ? "development" : "production" });

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="canonical" href={`${config.url}${page.url.pathname}`} />
</svelte:head>

{@render children()}
