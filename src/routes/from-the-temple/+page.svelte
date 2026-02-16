<script lang="ts">
	import { resolve } from "$app/paths";
	import * as config from "$lib/config";
	import { formatDate } from "$lib/utils/date-format";

	let { data } = $props();
	let email = $state("");
	let isLoading = $state(false);
	let isSuccess = $state(false);
	let errorMessage = $state("");

	async function handleNewsletterSubmit(event: Event) {
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
			} else {
				errorMessage = result.error || "Failed to subscribe. Please try again.";
			}
		} catch {
			errorMessage = "Failed to subscribe. Please try again.";
		} finally {
			isLoading = false;
		}
	}

	function getReadTime(readTime: number): string {
		return `${readTime} min read`;
	}

	function getIssueLabel(issue?: number): string {
		return issue ? `Issue #${issue}` : "Newsletter";
	}
</script>

<svelte:head>
	<title>From the Temple - {config.title}</title>
	<meta
		name="description"
		content="Newsletter issues from Thiago Temple on software development, side projects, and growth."
	/>
	<meta property="og:title" content={`From the Temple - ${config.title}`} />
	<meta property="og:url" content={`${config.url}/from-the-temple`} />
	<meta
		name="og:description"
		content="Newsletter issues from Thiago Temple on software development, side projects, and growth."
	/>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content={`@${config.twitterHandle}`} />
	<meta name="twitter:title" content={`From the Temple - ${config.title}`} />
	<meta
		name="twitter:description"
		content="Newsletter issues from Thiago Temple on software development, side projects, and growth."
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
		<h1 class="gradient-text font-heading mb-6 text-5xl font-extrabold lg:text-6xl">
			From the Temple
		</h1>
		<p class="mx-auto max-w-2xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
			Newsletter issues with what I'm learning, shipping, and reading.
		</p>
	</div>
</section>

<section class="pt-8 pb-8 md:pb-32">
	<div class="mx-auto max-w-7xl px-6">
		{#if data.posts.length === 0}
			<div class="flex min-h-[400px] items-center justify-center">
				<div class="max-w-2xl text-center">
					<div class="mb-6 text-6xl">📬</div>
					<h2 class="font-heading mb-4 text-3xl font-bold text-white">First issue coming soon</h2>
					<p class="text-lg leading-relaxed text-slate-300">
						I’m preparing the next issue. Subscribe and I’ll send it straight to your inbox.
					</p>
				</div>
			</div>
		{:else}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each data.posts as post (post.slug)}
					<a href={resolve(`/from-the-temple/${post.slug}`)} class="group block">
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
									<div class="flex items-center gap-3">
										<span
											class="rounded-full bg-[var(--color-secondary)]/20 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-secondary)]"
										>
											{getIssueLabel(post.issue)}
										</span>
										<time class="font-mono text-slate-400">{formatDate(post.date)}</time>
									</div>
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

								<span
									class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors group-hover:text-purple-300"
								>
									Read this issue
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

<section class="mb-16">
	<div class="mx-auto max-w-250 px-6">
		<div
			class="relative overflow-hidden rounded-3xl border border-[var(--color-tertiary)]/25 bg-gradient-to-br from-[var(--color-tertiary)]/15 to-[var(--color-secondary)]/10 p-8 md:p-16"
		>
			<div
				class="absolute -right-[100px] -top-[100px] h-64 w-64 rounded-full bg-[var(--color-secondary)]/20 blur-[100px] transition-all duration-700 group-hover:bg-[var(--color-secondary)]/30"
			></div>

			<div class="relative z-10 max-w-lg">
				<h2 class="mb-4 font-['Kantumruy_Pro'] text-3xl font-bold text-white md:text-4xl">
					From the Temple
				</h2>
				<p class="mb-8 text-lg font-light opacity-80">
					Get my writing delivered to your inbox. No spam.
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
