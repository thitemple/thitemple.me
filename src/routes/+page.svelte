<script lang="ts">
	import type { Post } from "$lib/types";
	import { formatDate } from "$lib/utils/date-format";

	let { data } = $props();
	const posts: Post[] = data.posts;

	// Newsletter form state
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
</script>

<main class="mx-auto max-w-[1000px] px-6 py-12 md:py-16">
	<!-- Latest Writing Section -->
	<section class="mb-24 md:mb-32">
		<div class="mb-10 flex items-center gap-4">
			<h2
				class="font-['Kantumruy_Pro'] text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]"
			>
				Latest Writing
			</h2>
			<div class="h-[1px] max-w-[100px] flex-grow bg-[var(--color-primary)]/30"></div>
		</div>

		<div class="grid gap-12 sm:gap-16">
			{#each posts as post}
				<article class="group relative items-baseline md:grid md:grid-cols-[1fr_auto] md:gap-8">
					<a
						href="/writing/{post.slug}"
						class="block transition-transform duration-300 group-hover:translate-x-2"
					>
					<h3
						class="mb-3 font-['Kantumruy_Pro'] text-3xl font-bold leading-tight text-white transition-colors group-hover:text-[var(--color-primary)] md:text-5xl"
						style={`view-transition-name: post-title-${post.slug}`}
					>
						{post.title}
					</h3>
					</a>

					<!-- Date Line -->
					<div
						class="mt-2 flex items-center gap-3 whitespace-nowrap font-['Kantumruy_Pro'] text-sm font-medium text-[var(--color-tertiary)] md:mt-0"
					>
						<time>{formatDate(post.date)}</time>
						{#if post.readTime}
							<span class="opacity-50">•</span>
							<span>{post.readTime} min</span>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		<div class="mt-16">
			<a
				href="/writing"
				class="group inline-flex items-center gap-2 font-['Kantumruy_Pro'] font-bold text-white transition-colors hover:text-[var(--color-secondary)]"
			>
				View all posts
				<span class="transition-transform group-hover:translate-x-1">→</span>
			</a>
		</div>
	</section>

	<!-- Newsletter Section -->
	<section class="mb-16">
		<div
			class="relative overflow-hidden rounded-3xl border border-[var(--color-tertiary)]/25 bg-gradient-to-br from-[var(--color-tertiary)]/15 to-[var(--color-secondary)]/10 p-8 md:p-16"
		>
			<!-- Decorative Glow -->
			<div
				class="absolute -right-[100px] -top-[100px] h-64 w-64 rounded-full bg-[var(--color-secondary)]/20 blur-[100px] transition-all duration-700 group-hover:bg-[var(--color-secondary)]/30"
			></div>

			<div class="relative z-10 max-w-lg">
				<h2 class="mb-4 font-['Kantumruy_Pro'] text-3xl font-bold text-white md:text-4xl">
					Words From the Temple
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
	</section>
</main>
