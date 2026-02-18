<script lang="ts">
	import { resolve } from "$app/paths";
	import OutlineLink from "$lib/components/outline-link.svelte";
	import PostMeta from "$lib/components/post-meta.svelte";
	import type { Post } from "$lib/types";
	import { cn } from "$lib/utils";
	import { ArrowRight } from "lucide-svelte";

	interface Props {
		post: Post;
		featured?: boolean;
	}

	let { post, featured = false }: Props = $props();

	const shouldShowBanner = $derived(Boolean(post.cover) && !featured);
	const hasFeaturedBanner = $derived(Boolean(post.cover) && featured);
</script>

<div
	class={cn(
		"flex flex-col gap-x-6 gap-y-4 py-4 md:rounded-md md:border md:border-slate-200 md:p-6 md:py-8 lg:px-8 dark:md:border-pink-300/40",
		{
			"lg:first:col-span-2": featured
		}
	)}
>
	<div>
		<a href={resolve(`/blog/${post.slug}`)} class=" lg:mt-4">
			<h2 class="font-heading text-2xl text-slate-700 dark:text-slate-200">
				{post.title}
			</h2>
		</a>
		<p class="text-sm text-slate-500 lg:mt-2 dark:text-slate-400">
			<PostMeta date={post.date} readTime={post.readTime} />
		</p>
	</div>
	{#if hasFeaturedBanner}
		<img
			src={post.cover}
			alt={`Banner for ${post.title}`}
			class="max-h-60 w-full object-none object-center"
		/>
	{/if}
	{#if shouldShowBanner}
		<img
			src={post.cover}
			alt={`Thumbnail for ${post.title}`}
			class="aspect-auto object-cover opacity-90 lg:pr-4"
		/>
	{/if}
	<p class="flex-1 text-slate-600 lg:mt-4 dark:text-slate-300">
		{post.summary}
	</p>
	<p class="md:self-center lg:self-start">
		<OutlineLink href={resolve(`/blog/${post.slug}`)}>
			Read more
			{#snippet icon()}
				<ArrowRight />
			{/snippet}
		</OutlineLink>
	</p>
</div>
