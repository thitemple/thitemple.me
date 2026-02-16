<script lang="ts">
	import { resolve } from "$app/paths";
	import * as config from "$lib/config";
	import { formatDate } from "$lib/utils/date-format";

	let { data } = $props();

	function getReadTime(readTime: number): string {
		return `${readTime} min read`;
	}
</script>

<svelte:head>
	<title>Blog - {config.title}</title>
	<meta
		name="description"
		content="Articles and insights from Thiago Temple on software development, side projects, and growth."
	/>
	<meta property="og:title" content={`Blog - ${config.title}`} />
	<meta property="og:url" content={`${config.url}/blog`} />
	<meta
		name="og:description"
		content="Articles and insights from Thiago Temple on software development, side projects, and growth."
	/>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content={`@${config.twitterHandle}`} />
	<meta name="twitter:title" content={`Blog - ${config.title}`} />
	<meta
		name="twitter:description"
		content="Articles and insights from Thiago Temple on software development, side projects, and growth."
	/>
</svelte:head>

<section class="relative overflow-hidden py-12 md:py-20 lg:py-24">
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15)_0%,transparent_50%)]"
		></div>
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15)_0%,transparent_50%)]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 text-center">
		<h1 class="gradient-text font-heading mb-6 text-5xl font-extrabold lg:text-6xl">Blog</h1>
		<p class="mx-auto max-w-2xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
			Articles and practical notes from building software.
		</p>
	</div>
</section>

<section class="pt-8 pb-8 md:pb-32">
	<div class="mx-auto max-w-7xl px-6">
		{#if data.posts.length === 0}
			<div class="flex min-h-[400px] items-center justify-center">
				<div class="max-w-2xl text-center">
					<div class="mb-6 text-6xl">📝</div>
					<h2 class="font-heading mb-4 text-3xl font-bold text-white">Working on it</h2>
					<p class="text-lg leading-relaxed text-slate-300">
						Getting ready to share what I'm learning as I build stuff. First post coming soon.
					</p>
				</div>
			</div>
		{:else}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each data.posts as post (post.slug)}
					<a href={resolve(`/blog/${post.slug}`)} class="group block">
						<article
							class="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-[var(--accent)]/30 hover:shadow-2xl {post.cover
								? ''
								: 'mx-auto max-w-md'}"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-[var(--accent)]/8 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
							></div>

							{#if post.cover}
								<div class="relative h-48 overflow-hidden">
									<img
										src={post.cover}
										alt={`Cover for ${post.title}`}
										class="h-full w-full object-cover transition-transform group-hover:scale-105"
									/>
								</div>
							{/if}

							<div class="relative z-10 {post.cover ? 'p-6' : 'px-6 py-8'}">
								<div class="mb-4 flex items-center justify-between gap-3 text-sm">
									<time class="font-mono text-slate-400">{formatDate(post.date)}</time>
									<span class="font-medium text-[var(--accent)]">{getReadTime(post.readTime)}</span>
								</div>

								<h2
									class="font-heading mb-3 text-2xl leading-tight font-bold text-white transition-colors group-hover:text-[var(--accent)]"
									style={`view-transition-name: post-title-${post.slug}`}
								>
									{post.title}
								</h2>

								<p class="mb-5 line-clamp-3 text-base leading-relaxed text-slate-300">
									{post.summary}
								</p>

								{#if post.categories && post.categories.length > 0}
									<div class="mb-5 flex flex-wrap gap-2">
										{#each post.categories.slice(0, 3) as category (category)}
											<span
												class="rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-medium text-purple-300"
											>
												{category}
											</span>
										{/each}
									</div>
								{/if}

								<span
									class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors group-hover:text-purple-300"
								>
									Read full post
									<span class="transition-transform group-hover:translate-x-1">→</span>
								</span>
							</div>
						</article>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
