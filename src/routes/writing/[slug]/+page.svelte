<script lang="ts">
	import * as config from "$lib/config";
	import { formatDate } from "$lib/utils/date-format";
	import { onMount } from "svelte";
	import mediumZoom from "medium-zoom";

	let { data } = $props();
	let email = $state("");
	let isLoading = $state(false);
	let isSuccess = $state(false);
	let errorMessage = $state("");

	function getReadTime(readTime: number): string {
		return `${readTime} min read`;
	}

	function getTypeBadge(meta: { type: string; issue?: number }): string {
		if (meta.type === "newsletter") {
			return meta.issue ? `Newsletter #${meta.issue}` : "Newsletter";
		}
		return "Article";
	}

	function isNewsletterEdition(meta: { type?: string; categories?: string[] }): boolean {
		const hasNewsletterType = meta.type === "newsletter";
		const hasNewsletterCategory =
			meta.categories?.some((category) => category.toLowerCase() === "newsletter") ?? false;

		return hasNewsletterType || hasNewsletterCategory;
	}

	async function handleNewsletterSubmit(event: Event): Promise<void> {
		event.preventDefault();
		isLoading = true;
		errorMessage = "";

		try {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email })
			});

			const result = await response.json();

			if (result.success) {
				isSuccess = true;
				email = "";
				return;
			}

			errorMessage = result.error || "Failed to subscribe. Please try again.";
		} catch {
			errorMessage = "Failed to subscribe. Please try again.";
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		// Initialize medium-zoom for all images with data-zoomable attribute
		const zoom = mediumZoom("[data-zoomable]", {
			margin: 24,
			background: "rgba(0, 0, 0, 0.9)",
			scrollOffset: 0
		});

		// Cleanup on component destroy
		return () => {
			zoom.detach();
		};
	});
</script>

<svelte:head>
	<title>{data.meta.title} - {config.title}</title>
	<meta name="description" content={data.meta.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:url" content={`${config.url}${data.url}`} />
	<meta property="og:description" content={data.meta.summary} />
	{#if data.cover}
		<meta property="og:image" content={`${config.url}${data.cover}`} />
		<meta name="twitter:image" content={`${config.url}${data.cover}`} />
		<meta name="twitter:card" content="summary_large_image" />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
	<meta name="twitter:site" content={`@${config.twitterHandle}`} />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:creator" content={`@${config.twitterHandle}`} />
	<meta name="twitter:description" content={data.meta.summary} />
</svelte:head>

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
		<div class="mb-8 flex flex-wrap items-center gap-4 text-sm">
			<span
				class="rounded-full px-3 py-1 text-xs font-semibold {data.meta.type === 'newsletter'
					? 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]'
					: 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]'}"
			>
				{getTypeBadge(data.meta)}
			</span>
			<time class="font-mono text-slate-400">{formatDate(data.meta.date)}</time>
			<span class="font-medium text-[var(--accent)]">{getReadTime(data.meta.readTime)}</span>
			{#if data.meta.categories && data.meta.categories.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each data.meta.categories as category (category)}
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
		<h1
			class="gradient-text font-heading mb-6 text-4xl leading-tight font-extrabold lg:text-5xl"
			style={`view-transition-name: post-title-${data.meta.slug}`}
		>
			{data.meta.title}
		</h1>

		<!-- Cover Image in Hero -->
		{#if data.cover}
			<div class="mt-8 overflow-hidden rounded-2xl shadow-2xl">
				<img src={data.cover} alt={`Cover for ${data.meta.title}`} class="w-full object-cover" />
			</div>
		{/if}
	</div>
</section>

<!-- Article Content -->
<article class="pt-8 pb-20">
	<div class="mx-auto max-w-3xl px-6">
		<!-- Prose Content -->
		<div class="mx-auto prose prose-lg max-w-none prose-invert">
			<data.content />
		</div>
	</div>
</article>

{#if isNewsletterEdition(data.meta)}
	<section class="pb-32">
		<div class="mx-auto max-w-3xl px-6">
			<div
				class="relative overflow-hidden rounded-3xl border border-[var(--color-tertiary)]/25 bg-gradient-to-br from-[var(--color-tertiary)]/15 to-[var(--color-secondary)]/10 p-8 md:p-16"
			>
				<div
					class="absolute -right-[100px] -top-[100px] h-64 w-64 rounded-full bg-[var(--color-secondary)]/20 blur-[100px]"
				></div>

				<div class="relative z-10 max-w-lg">
					<h3 class="mb-4 font-['Kantumruy_Pro'] text-3xl font-bold text-white md:text-4xl">
						Get the next issue in your inbox
					</h3>
					<p class="mb-8 text-lg font-light opacity-80">
						Subscribe and receive future newsletter editions directly by email.
					</p>

					{#if isSuccess}
						<div
							class="flex items-center gap-3 rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-6 py-4 text-[var(--color-primary)]"
						>
							<p class="font-bold">You're in. Thanks for subscribing.</p>
						</div>
					{:else}
						<form onsubmit={handleNewsletterSubmit} class="flex flex-col gap-4 sm:flex-row">
							<input
								type="email"
								bind:value={email}
								placeholder="your@email.com"
								required
								disabled={isLoading}
								class="flex-grow rounded-xl border border-[var(--color-text)]/20 bg-[var(--color-bg)] px-6 py-4 font-sans text-white transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] disabled:opacity-50"
							/>
							<button
								type="submit"
								disabled={isLoading}
								class="rounded-xl bg-[var(--color-secondary)] px-8 py-4 font-['Kantumruy_Pro'] text-lg font-bold text-white shadow-[0_4px_20px_rgba(245,46,192,0.3)] transition-all hover:scale-105 hover:bg-[#d41da0] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
							>
								{isLoading ? "..." : "Subscribe"}
							</button>
						</form>
						{#if errorMessage}
							<p class="mt-3 text-sm text-[var(--color-secondary)]">{errorMessage}</p>
						{/if}
					{/if}
				</div>
			</div>
		</div>
	</section>
{:else}
	<!-- Related Posts Section -->
	<section class="pb-32">
		<div class="mx-auto max-w-7xl px-6">
			<h3 class="font-heading mb-12 text-center text-3xl font-bold text-white">Related Posts</h3>

			<!-- For now, we'll add a placeholder. In a real implementation, you'd fetch related posts -->
			<div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
				<div
					class="rounded-xl border border-white/10 bg-black/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[var(--accent)]/30"
				>
					<time class="mb-2 font-mono text-xs text-slate-400">Coming Soon</time>
					<h4 class="font-heading mb-3 text-lg font-semibold">
						<a href="/writing" class="text-white transition-colors hover:text-[var(--accent)]">
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
{/if}
