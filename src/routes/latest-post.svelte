<script lang="ts">
	import { ArrowRight } from "lucide-svelte";
	import PostMeta from "$lib/components/post-meta.svelte";
	import type { Post } from "$lib/types";
	import OutlineLink from "$lib/components/outline-link.svelte";

	export let post: Post;

	let postLink = `/blog/${post.slug}`;
</script>

<section
	class="grid gap-6 overflow-hidden lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr_auto_auto] lg:gap-0"
>
	<a href={postLink} class="lg:col-start-2">
		<h2 class="font-heading text-2xl text-slate-700 dark:text-slate-200">{post.title}</h2>
	</a>
	{#if post.cover}
		<img
			src={post.cover}
			alt={`Thumbnail for ${post.title}`}
			class="aspect-video w-full opacity-90 lg:col-start-1 lg:row-span-5 lg:row-start-1 lg:pr-4"
		/>
	{/if}
	<p class="text-slate-600 lg:col-start-2 lg:row-span-2 lg:row-start-3 lg:mt-4 dark:text-slate-300">
		{post.summary}
	</p>
	<p class="text-sm text-slate-600 lg:col-start-2 lg:mt-2 dark:text-slate-300">
		<PostMeta date={post.date} readTime={post.readTime} />
	</p>
	<OutlineLink href={postLink}>
		Read more
		<ArrowRight slot="icon" />
	</OutlineLink>
</section>
