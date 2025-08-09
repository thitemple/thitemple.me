<script lang="ts">
	import * as config from "$lib/config";
	import { formatDate } from "$lib/utils/date-format";

	let { data } = $props();

	// Array of emojis to use as fallbacks when no cover image exists
	const postEmojis = ["🚀", "⚡", "🎲", "⚙️", "👨‍👩‍👧‍👦", "🧠", "💡", "🔧", "📱", "🎯"];

	function getPostEmoji(index: number): string {
		return postEmojis[index % postEmojis.length];
	}

	function getReadTime(readTime: number): string {
		return `${readTime} min read`;
	}
</script>

<svelte:head>
	<title>Blog - {config.title}</title>
	<meta name="description" content={config.description} />
	<meta property="og:title" content={`Blog - ${config.title}`} />
	<meta property="og:url" content={`${config.url}/blog`} />
	<meta name="og:description" content={config.ogDescription} />
	<meta property="twitter:title" content={`Blog - ${config.title}`} />
	<meta property="twitter:description" content={config.description} />
	<meta property="twitter:card" content="summary" />
</svelte:head>

<!-- Blog Hero Section -->
<section class="relative overflow-hidden py-20 lg:py-24">
	<!-- Background gradients -->
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15)_0%,transparent_50%)]"
		></div>
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15)_0%,transparent_50%)]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 text-center">
		<h1 class="gradient-text font-grotesk mb-6 text-5xl font-extrabold lg:text-6xl">Blog</h1>
		<p class="mx-auto max-w-2xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
			Things I'm learning, problems I'm solving, and mistakes I'm making along the way.
		</p>
	</div>
</section>

<!-- Blog Posts Section -->
<section class="pb-32">
	<div class="mx-auto max-w-7xl px-6">
		{#if data.posts.length === 0}
			<!-- No Posts Message -->
			<div class="flex min-h-[400px] items-center justify-center">
				<div class="max-w-2xl text-center">
					<div class="mb-6 text-6xl">📝</div>
					<h2 class="font-grotesk mb-4 text-3xl font-bold text-white">Working on it</h2>
					<p class="text-lg leading-relaxed text-slate-300">
						Getting ready to share what I'm learning as I build stuff. First post coming soon.
					</p>
				</div>
			</div>
		{:else}
			<!-- Posts Grid -->
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each data.posts as post, idx}
					<article
						class="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-[var(--accent)]/30 hover:shadow-2xl"
					>
						<!-- Gradient overlay on hover -->
						<div
							class="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-[var(--accent)]/8 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
						></div>

						<!-- Post Image or Emoji -->
						{#if post.cover}
							<div class="relative h-48 overflow-hidden">
								<img
									src={post.cover}
									alt={`Cover for ${post.title}`}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
								/>
							</div>
						{:else}
							<div
								class="relative flex h-48 items-center justify-center bg-gradient-to-br from-purple-600/30 via-[var(--accent)]/30 to-transparent text-6xl"
							>
								{getPostEmoji(idx)}
							</div>
						{/if}

						<!-- Post Content -->
						<div class="relative z-10 p-6">
							<!-- Meta Info -->
							<div class="mb-4 flex items-center justify-between gap-3 text-sm">
								<time class="font-mono text-slate-400">{formatDate(post.date)}</time>
								<span class="font-medium text-[var(--accent)]">{getReadTime(post.readTime)}</span>
							</div>

							<!-- Title -->
							<h2 class="font-grotesk mb-3 text-2xl leading-tight font-bold text-white">
								<a href={`/blog/${post.slug}`} class="transition-colors hover:text-[var(--accent)]">
									{post.title}
								</a>
							</h2>

							<!-- Excerpt -->
							<p class="mb-5 line-clamp-3 text-base leading-relaxed text-slate-300">
								{post.summary}
							</p>

							<!-- Tags -->
							{#if post.categories && post.categories.length > 0}
								<div class="mb-5 flex flex-wrap gap-2">
									{#each post.categories.slice(0, 3) as category}
										<span
											class="rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-medium text-purple-300"
										>
											{category}
										</span>
									{/each}
								</div>
							{/if}

							<!-- Read More Link -->
							<a
								href={`/blog/${post.slug}`}
								class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-purple-300"
							>
								Read full post
								<span class="transition-transform group-hover:translate-x-1">→</span>
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}

		<!-- Pagination -->
		{#if data.posts.length > 0}
			<nav class="mt-20 flex items-center justify-center gap-3">
				<!-- Previous Button -->
				<a
					href={data.pageInfo.previousPage ? `/blog?page=${data.pageInfo.previousPage}` : "#"}
					class={`rounded-xl border px-5 py-3 font-medium backdrop-blur-sm transition-all ${
						data.pageInfo.previousPage
							? "border-white/20 bg-black/60 text-slate-300 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/20 hover:text-[var(--accent)]"
							: "cursor-not-allowed border-white/10 bg-black/30 text-slate-500"
					}`}
					aria-disabled={!data.pageInfo.previousPage}
				>
					« Previous
				</a>

				<!-- Page Numbers -->
				<div class="hidden items-center gap-2 md:flex">
					{#each Array(data.pageInfo.totalPages) as _, i}
						{#if i + 1 === data.pageInfo.currentPage}
							<span
								class="rounded-xl bg-gradient-to-r from-[var(--accent)] to-pink-500 px-5 py-3 font-medium text-white"
							>
								{i + 1}
							</span>
						{:else if Math.abs(i + 1 - data.pageInfo.currentPage) <= 2}
							<a
								href={`/blog?page=${i + 1}`}
								class="rounded-xl border border-white/20 bg-black/60 px-5 py-3 font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/20 hover:text-[var(--accent)]"
							>
								{i + 1}
							</a>
						{/if}
					{/each}
				</div>

				<!-- Page Info -->
				<span class="px-4 font-mono text-sm text-slate-400">
					Page {data.pageInfo.currentPage} of {data.pageInfo.totalPages}
				</span>

				<!-- Next Button -->
				<a
					href={data.pageInfo.nextPage ? `/blog?page=${data.pageInfo.nextPage}` : "#"}
					class={`rounded-xl border px-5 py-3 font-medium backdrop-blur-sm transition-all ${
						data.pageInfo.nextPage
							? "border-white/20 bg-black/60 text-slate-300 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/20 hover:text-[var(--accent)]"
							: "cursor-not-allowed border-white/10 bg-black/30 text-slate-500"
					}`}
					aria-disabled={!data.pageInfo.nextPage}
				>
					Next »
				</a>
			</nav>
		{/if}
	</div>
</section>
