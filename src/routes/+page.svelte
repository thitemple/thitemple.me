<script lang="ts">
	import * as config from "$lib/config";
	import me from "$lib/assets/img/me.jpg";
	import Experience from "./experience.svelte";
	import Hero from "./hero.svelte";
	import LatestPost from "./latest-post.svelte";
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

<div class="grid gap-8">
	<Hero />
	{#if data.post}
		<LatestPost post={data.post} />
	{/if}
	<Experience />
	<section class="lg-grid-rows-[auto_1fr] grid lg:grid-cols-2">
		<h2 class="font-heading text-2xl text-slate-700 lg:col-start-2 dark:text-slate-200">About</h2>
		<img
			src="https://res.cloudinary.com/duacbnsfa/image/upload/f_auto,q_auto/nfhbzkqa7by6n6znan0s"
			alt="Thiago Temple"
			class="mt-6 h-32 w-32 content-center place-self-center rounded-full lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-64 lg:w-64"
		/>
		<p class="mt-6 text-slate-600 lg:col-start-2 dark:text-slate-300">
			As a software engineer based in Ottawa, Canada, I'm passionate about web and mobile
			technologies. I've always been captivated by the ever-evolving world of tech, and I love
			sharing my learning journey on my blog. When I'm not immersed in code, you'll find me enjoying
			board games, diving into a good book, or spending quality time with my family. It's all about
			balance!
		</p>
	</section>
	<section class="grid lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
		<h2 class="font-heading text-2xl text-slate-700 lg:col-start-1 dark:text-slate-200">
			Passions
		</h2>
		<img
			src="https://res.cloudinary.com/duacbnsfa/image/upload/f_auto,q_auto/qj7mhjhxvw8uedb0jfni"
			alt="Board game collection"
			class="mt-6 self-start lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0"
		/>
		<p class="mt-6 text-slate-600 lg:col-start-1 lg:pr-6 dark:text-slate-300">
			Outside of the tech world, I have a deep love for board games and have been building a growing
			collection. I'm also a fan of various TV shows and always have at least one book on the go.
			But above all, spending time with my family is my favorite pastime. Life's all about enjoying
			these simple pleasures!
		</p>
	</section>
</div>
