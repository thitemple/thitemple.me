<script lang="ts">
	import "../app.css";
	import { onNavigate } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import ReadingProgressBar from "$lib/components/ReadingProgressBar.svelte";
	import { Search, X } from "lucide-svelte";
	import { cubicOut } from "svelte/easing";
	import { scale, fade } from "svelte/transition";
	import { tick } from "svelte";

	let { children } = $props();
	let navOpen = $state(false);
	let searchDialogOpen = $state(false);
	let searchDialogQuery = $state("");
	let searchInput = $state<HTMLInputElement | null>(null);

	const currentYear = new Date().getFullYear();

	function isReadingRoute(routeId: string | null): boolean {
		return routeId === "/blog/[slug]" || routeId === "/from-the-temple/[slug]";
	}

	function buildSearchUrl(query: string) {
		const trimmedQuery = query.trim();
		const searchBasePath = resolve("/search");

		if (!trimmedQuery) {
			return searchBasePath;
		}

		const params = new URLSearchParams({ q: trimmedQuery });
		return `${searchBasePath}?${params.toString()}`;
	}

	async function openSearchDialog() {
		navOpen = false;
		searchDialogOpen = true;
		await tick();
		searchInput?.focus();
	}

	function closeSearchDialog() {
		searchDialogOpen = false;
	}

	async function handleSearchSubmit(event: SubmitEvent) {
		event.preventDefault();
		const destination = buildSearchUrl(searchDialogQuery);
		closeSearchDialog();
		window.location.assign(destination);
	}

	function handleSearchDialogKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			closeSearchDialog();
		}
	}

	onNavigate((navigation) => {
		searchDialogOpen = false;

		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Thiago Temple — Full-Stack Developer</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg)] font-['Lora'] text-[var(--color-text)]">
	<!-- Header -->
	<header
		class="sticky top-0 z-50 bg-gradient-to-b from-[var(--color-bg)] from-60% to-transparent pb-8 pt-4"
	>
		<nav class="mx-auto flex max-w-[72rem] items-center justify-between gap-6 px-6">
			<!-- Logo -->
			<a href={resolve("/")} class="flex items-center">
				<img src="/thitemple-icon.svg" alt="Thiago Temple" class="block h-10 w-auto md:hidden" />
				<img src="/thitemple-logo.svg" alt="Thiago Temple" class="hidden h-8 w-auto md:block" />
			</a>

			<!-- Desktop nav links -->
			<ul
				class="hidden items-center gap-6 font-['Kantumruy_Pro'] font-semibold tracking-wide md:flex"
			>
				<li>
					<a
						class="nav-link-gradient text-(--color-text) transition-colors hover:text-white"
						href={resolve("/from-the-temple")}>From the Temple</a
					>
				</li>
				<li>
					<a
						class="nav-link-gradient text-(--color-text) transition-colors hover:text-white"
						href={resolve("/blog")}>Blog</a
					>
				</li>
				<li>
					<a
						class="nav-link-gradient text-[var(--color-text)] transition-colors hover:text-white"
						href={resolve("/about")}>About</a
					>
				</li>
				<li>
					<button
						type="button"
						onclick={openSearchDialog}
						aria-label="Open search"
						class="flex items-center p-1.5 text-[var(--color-text)] opacity-70 transition-all hover:-translate-y-0.5 hover:text-[var(--color-primary)] hover:opacity-100"
					>
						<Search class="h-[18px] w-[18px]" />
					</button>
				</li>
				<li>
					<a
						href="https://www.youtube.com/@thitemple"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="YouTube"
						class="flex items-center text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:text-[var(--color-primary)]"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
							<path
								d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.67 31.67 0 0 0 0 12a31.67 31.67 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.67 31.67 0 0 0 24 12a31.67 31.67 0 0 0-.5-5.81zM9.54 15.57V8.43L15.82 12l-6.28 3.57z"
							/>
						</svg>
					</a>
				</li>
			</ul>

			<!-- Desktop social links -->
			<div class="hidden items-center gap-3 md:flex">
				<a
					href="https://bsky.app/profile/thitemple.me"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="BlueSky"
					class="flex items-center p-1.5 text-[var(--color-text)] opacity-70 transition-all hover:-translate-y-0.5 hover:text-[var(--color-primary)] hover:opacity-100"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-[18px] w-[18px]">
						<path
							d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
						/>
					</svg>
				</a>
				<a
					href="https://x.com/thi_temple"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="X (Twitter)"
					class="flex items-center p-1.5 text-[var(--color-text)] opacity-70 transition-all hover:-translate-y-0.5 hover:text-[var(--color-primary)] hover:opacity-100"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-[18px] w-[18px]">
						<path
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
				</a>
				<a
					href="https://www.linkedin.com/in/thitemple/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					class="flex items-center p-1.5 text-[var(--color-text)] opacity-70 transition-all hover:-translate-y-0.5 hover:text-[var(--color-primary)] hover:opacity-100"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-[18px] w-[18px]">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
				</a>
				<a
					href="http://github.com/thitemple"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					class="flex items-center p-1.5 text-[var(--color-text)] opacity-70 transition-all hover:-translate-y-0.5 hover:text-[var(--color-primary)] hover:opacity-100"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-[18px] w-[18px]">
						<path
							d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
						/>
					</svg>
				</a>
			</div>

			<!-- Mobile toggle -->
			<button
				class="rounded border border-white/20 p-2 md:hidden"
				aria-label="Toggle navigation"
				onclick={() => (navOpen = !navOpen)}
			>
				{#if navOpen}✕{:else}☰{/if}
			</button>
		</nav>

		{#key page.route.id}
			<ReadingProgressBar enabled={isReadingRoute(page.route.id)} />
		{/key}

		<!-- Mobile menu -->
		<div
			class="grid transition-all duration-300 ease-in-out md:hidden"
			style="grid-template-rows: {navOpen ? '1fr' : '0fr'}"
		>
			<ul class="overflow-hidden">
				<div class="flex flex-col gap-6 px-8 pb-6 pt-4 font-['Kantumruy_Pro'] text-lg font-medium">
					<li>
						<a onclick={() => (navOpen = false)} href={resolve("/from-the-temple")}
							>From the Temple</a
						>
					</li>
					<li><a onclick={() => (navOpen = false)} href={resolve("/blog")}>Blog</a></li>
					<li><a onclick={() => (navOpen = false)} href={resolve("/about")}>About</a></li>
					<li>
						<button
							type="button"
							onclick={openSearchDialog}
							aria-label="Open search"
							class="text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
						>
							Search
						</button>
					</li>
					<li>
						<a
							onclick={() => (navOpen = false)}
							href="https://www.youtube.com/@thitemple"
							target="_blank"
							rel="noopener noreferrer"
						>
							YouTube
						</a>
					</li>
					<li class="flex gap-4 border-t border-white/10 pt-4">
						<a
							href="https://bsky.app/profile/thitemple.me"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="BlueSky"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
								<path
									d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
								/>
							</svg>
						</a>
						<a
							href="https://x.com/thi_temple"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="X (Twitter)"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
								<path
									d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
								/>
							</svg>
						</a>
						<a
							href="https://www.linkedin.com/in/thitemple/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
						</a>
						<a
							href="http://github.com/thitemple"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
								<path
									d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
								/>
							</svg>
						</a>
					</li>
				</div>
			</ul>
		</div>
	</header>

	{#if searchDialogOpen}
		<dialog
			open
			aria-label="Search site content"
			class="fixed inset-0 z-[80] m-0 h-full w-full max-h-none max-w-none border-0 bg-transparent p-0"
			onkeydown={handleSearchDialogKeydown}
			transition:fade={{ duration: 160 }}
		>
			<button
				type="button"
				aria-label="Close search"
				class="fixed inset-0 bg-[var(--color-bg)]/75 backdrop-blur-sm"
				onclick={closeSearchDialog}
			></button>
			<div class="fixed inset-x-0 top-24 flex justify-center px-6 md:top-28">
				<div
					class="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#061b31]/95 p-6 shadow-2xl"
					transition:scale={{ duration: 220, start: 0.96, easing: cubicOut }}
				>
					<div class="mb-5 flex items-center justify-between gap-4">
						<h2 class="font-heading text-2xl font-bold text-white">Search</h2>
						<button
							type="button"
							aria-label="Close search"
							class="rounded-lg border border-white/20 p-2 text-slate-300 transition-colors hover:border-white/35 hover:text-white"
							onclick={closeSearchDialog}
						>
							<X class="h-5 w-5" />
						</button>
					</div>

					<form onsubmit={handleSearchSubmit} class="space-y-4">
						<input
							bind:this={searchInput}
							bind:value={searchDialogQuery}
							type="search"
							name="q"
							autocomplete="off"
							placeholder="Search blog posts and newsletter issues"
							class="w-full rounded-xl border border-white/20 bg-slate-950/60 px-5 py-3.5 text-white outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--accent)]"
						/>
						<div class="flex items-center justify-end gap-3">
							<button
								type="button"
								class="font-heading rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-white/35 hover:text-white"
								onclick={closeSearchDialog}
							>
								Cancel
							</button>
							<button
								type="submit"
								class="font-heading rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
							>
								Show Results
							</button>
						</div>
					</form>
				</div>
			</div>
		</dialog>
	{/if}

	{@render children()}

	<!-- Footer -->
	<footer class="border-t border-[var(--color-text)]/10 py-10">
		<div
			class="mx-auto flex max-w-[1000px] flex-col items-center justify-between gap-6 px-6 md:flex-row"
		>
			<div class="flex items-center gap-6">
				<a
					href="https://bsky.app/profile/thitemple.me"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="BlueSky"
					class="text-[var(--color-text)] transition-all hover:-translate-y-1 hover:text-[var(--color-primary)]"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
						<path
							d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
						/>
					</svg>
				</a>
				<a
					href="https://x.com/thi_temple"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="X (Twitter)"
					class="text-[var(--color-text)] transition-all hover:-translate-y-1 hover:text-[var(--color-primary)]"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
						<path
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
				</a>
				<a
					href="https://www.linkedin.com/in/thitemple/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					class="text-[var(--color-text)] transition-all hover:-translate-y-1 hover:text-[var(--color-primary)]"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-[22px] w-[22px]">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
				</a>
				<a
					href="http://github.com/thitemple"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					class="text-[var(--color-text)] transition-all hover:-translate-y-1 hover:text-[var(--color-primary)]"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-[22px] w-[22px]">
						<path
							d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
						/>
					</svg>
				</a>
			</div>
			<p class="font-['Kantumruy_Pro'] text-sm opacity-40">© {currentYear} Thiago Temple.</p>
		</div>
	</footer>
</div>
