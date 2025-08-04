<script lang="ts">
	import * as config from "$lib/config";
	import { formatDate } from "$lib/utils/date-format";
	import me from "$lib/assets/img/me.jpg";

	let { data } = $props();

	function getReadTime(readTime: number): string {
		return `${readTime} min read`;
	}
</script>

<svelte:head>
	<title>{data.meta.title} - {config.title}</title>
	<meta property="description" content={data.meta.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:url" content={data.meta.url} />
	<meta property="og:description" content={data.meta.summary} />
	{#if data.cover}
		<meta property="og:image" content={`${config.url}${data.cover}`} />
		<meta property="twitter:image" content={`${config.url}${data.cover}`} />
		<meta property="twitter:card" content="summary_large_image" />
	{:else}
		<meta property="twitter:card" content="summary" />
	{/if}
	<meta property="twitter:title" content={data.meta.title} />
	<meta property="twitter:creator" content={config.twitterHandle} />
	<meta property="twitter:description" content={data.meta.summary} />
</svelte:head>

<!-- Breadcrumb -->
<section class="py-6">
	<div class="mx-auto max-w-3xl px-6">
		<nav class="flex items-center gap-3 font-mono text-sm text-slate-400">
			<a href="/" class="transition-colors hover:text-[var(--accent)]">Home</a>
			<span class="text-slate-500">→</span>
			<a href="/blog" class="transition-colors hover:text-[var(--accent)]">Blog</a>
			<span class="text-slate-500">→</span>
			<span class="truncate text-slate-300">{data.meta.title}</span>
		</nav>
	</div>
</section>

<!-- Article Hero -->
<section class="relative overflow-hidden pt-10 pb-16">
	<!-- Background gradients -->
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1)_0%,transparent_50%)]"
		></div>
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1)_0%,transparent_50%)]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-3xl px-6">
		<!-- Meta Information -->
		<div class="mb-8 flex flex-wrap items-center gap-6 text-sm">
			<time class="font-mono text-slate-400">{formatDate(data.meta.date)}</time>
			<span class="font-medium text-[var(--accent)]">{getReadTime(data.meta.readTime)}</span>
			{#if data.meta.categories && data.meta.categories.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each data.meta.categories as category}
						<span
							class="rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs font-medium text-purple-300"
						>
							{category}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Title -->
		<h1 class="gradient-text font-grotesk mb-6 text-4xl leading-tight font-extrabold lg:text-5xl">
			{data.meta.title}
		</h1>

		<!-- Subtitle/Summary -->
		<p class="text-xl leading-relaxed text-slate-300 lg:text-2xl">
			{data.meta.summary}
		</p>
	</div>
</section>

<!-- Article Content -->
<article class="pb-20">
	<div class="mx-auto max-w-3xl px-6">
		<!-- Cover Image -->
		{#if data.cover}
			<div class="mb-12 overflow-hidden rounded-2xl">
				<img src={data.cover} alt={`Cover for ${data.meta.title}`} class="w-full object-cover" />
			</div>
		{/if}

		<!-- Prose Content -->
		<div class="prose prose-lg prose-invert mx-auto max-w-none">
			<data.content />
		</div>
	</div>
</article>

<!-- Author Bio Section -->
<section class="mx-auto max-w-3xl px-6 pb-20">
	<div class="rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-sm">
		<div
			class="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left"
		>
			<!-- Avatar -->
			<img
				src={me}
				alt="Thiago Temple"
				class="h-20 w-20 rounded-full border-2 border-[var(--accent)]/20 shadow-xl"
			/>

			<!-- Details -->
			<div class="flex-1">
				<h4 class="font-grotesk mb-2 text-xl font-semibold text-white">Thiago Temple</h4>
				<p class="mb-4 leading-relaxed text-slate-300">
					Full-stack developer with 25+ years of experience, father of three, and builder of
					meaningful solutions. Currently working on family-oriented apps while sharing practical
					insights for busy developers who want to build side projects without sacrificing work-life
					balance.
				</p>
				<div class="flex flex-wrap justify-center gap-4 text-sm font-medium md:justify-start">
					<a href="#" class="text-[var(--accent)] transition-colors hover:text-purple-300"
						>BlueSky</a
					>
					<a href="#" class="text-[var(--accent)] transition-colors hover:text-purple-300">GitHub</a
					>
					<a href="#" class="text-[var(--accent)] transition-colors hover:text-purple-300"
						>LinkedIn</a
					>
					<a
						href="mailto:thitemple@gmail.com"
						class="text-[var(--accent)] transition-colors hover:text-purple-300">Email</a
					>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Related Posts Section -->
<section class="pb-32">
	<div class="mx-auto max-w-7xl px-6">
		<h3 class="font-grotesk mb-12 text-center text-3xl font-bold text-white">Related Posts</h3>

		<!-- For now, we'll add a placeholder. In a real implementation, you'd fetch related posts -->
		<div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
			<div
				class="rounded-xl border border-white/10 bg-black/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[var(--accent)]/30"
			>
				<time class="mb-2 font-mono text-xs text-slate-400">Coming Soon</time>
				<h4 class="font-grotesk mb-3 text-lg font-semibold">
					<a href="#" class="text-white transition-colors hover:text-[var(--accent)]">
						More articles coming soon
					</a>
				</h4>
				<p class="text-sm leading-relaxed text-slate-300">
					Stay tuned for more practical insights on development and building meaningful solutions.
				</p>
			</div>
		</div>
	</div>
</section>
