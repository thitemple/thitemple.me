<script lang="ts">
	import * as config from "$lib/config";
	import me from "$lib/assets/img/me.jpg";
	import Title from "$lib/components/title.svelte";
	import articles from "$lib/assets/img/articles.png";
	import ArticleCard from "./article-card.svelte";
	import { cn } from "$lib/utils";

	let { data } = $props();
</script>

<svelte:head>
	<title>{config.title}</title>
	<meta name="description" content={config.description} />
	<meta property="og:title" content={config.title} />
	<meta property="og:url" content={config.url} />
	<meta property="og:image" content={`${config.url}${me}`} />
	<meta name="og:description" content={config.ogDescription} />
	<meta property="twitter:title" content={config.title} />
	<meta property="twitter:image" content={`${config.url}${me}`} />
	<meta property="twitter:description" content={config.description} />
	<meta property="twitter:card" content="summary" />
</svelte:head>

<section class="grid gap-4 px-4 md:px-6 lg:px-8">
	<header class="hidden gap-x-4 lg:flex lg:py-4">
		<Title classes="flex flex-1 items-center">My latest articles, what's on my mind lately</Title>
		<img
			src={articles}
			alt="Blog articles cover"
			class="hidden max-w-xs flex-1 self-end rounded-full lg:block"
		/>
	</header>
	<div class="grid md:gap-6 lg:grid-cols-2 lg:grid-rows-3">
		{#each data.posts as post, idx}
			<ArticleCard {post} featured={data.pageInfo.currentPage === 1 && idx === 0} />
		{/each}
	</div>
	<div class="flex justify-center gap-6">
		<div class="flex flex-1 justify-end">
			<a
				aria-disabled={!data.pageInfo.previousPage}
				href={data.pageInfo.previousPage ? `/blog?page=${data.pageInfo.previousPage}` : ""}
				class={cn("flex items-center text-fuchsia-500 hover:underline dark:text-slate-300", {
					"cursor-not-allowed text-slate-500  hover:no-underline dark:text-slate-500":
						!data.pageInfo.previousPage
				})}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width={1.5}
					stroke="currentColor"
					class="mr-3 h-auto w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					/>
				</svg>
				Previous
			</a>
		</div>
		<div class="flex flex-1">
			<a
				aria-disabled={!data.pageInfo.nextPage}
				href={data.pageInfo.nextPage ? `/blog?page=${data.pageInfo.nextPage}` : ""}
				class={cn("flex items-center text-fuchsia-500 hover:underline dark:text-slate-300", {
					"cursor-not-allowed text-slate-500  hover:no-underline dark:text-slate-500":
						!data.pageInfo.nextPage
				})}
			>
				Next
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="ml-3 h-auto w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>
