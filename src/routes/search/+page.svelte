<script lang="ts">
	import { base } from "$app/paths";
	import WritingList from "$lib/components/WritingList.svelte";
	import * as config from "$lib/config";
	import type { WritingListItem } from "$lib/types";
	import { formatDate } from "$lib/utils/date-format";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	type PagefindResultData = {
		url?: string;
		excerpt?: string;
		meta?: Record<string, string | undefined>;
	};

	type PagefindResult = {
		score: number;
		data: () => Promise<PagefindResultData>;
	};

	type PagefindSearchResponse = {
		results: PagefindResult[];
	};

	type PagefindModule = {
		search: (term: string) => Promise<PagefindSearchResponse>;
	};

	type SearchResult = WritingListItem & {
		score: number;
	};

	let isLoading = $state(false);
	let searchError = $state<string | null>(null);
	let searchResults = $state<SearchResult[]>([]);
	let lastCompletedQuery = $state<string | null>(null);
	let pagefindSearch = $state<((term: string) => Promise<PagefindSearchResponse>) | null>(null);
	const query = $derived(data.query);

	const pagefindModuleUrl = `${base}/pagefind/pagefind.js`;
	const pageTitle = $derived(
		query ? `Results for "${query}" - ${config.title}` : `Search - ${config.title}`
	);

	function decodeSlug(slug: string) {
		return decodeURIComponent(slug)
			.replace(/-/g, " ")
			.replace(/\b\w/g, (char) => char.toUpperCase());
	}

	function normalizeResultUrl(url: string) {
		const withoutHtml = url.replace(/\.html$/, "");
		if (withoutHtml.endsWith("/index")) {
			return withoutHtml.slice(0, -6) || "/";
		}
		return withoutHtml || "/";
	}

	function deriveTypeLabel(url: string, type?: string) {
		if (type && type.trim().length > 0) {
			if (type === "From the Temple") {
				return "Newsletter";
			}
			return type;
		}
		if (url.includes("/from-the-temple/")) {
			return "Newsletter";
		}
		return "Blog";
	}

	function deriveTitle(url: string, title?: string) {
		if (title && title.trim().length > 0) {
			return title;
		}

		const slug = url.split("/").filter(Boolean).at(-1) ?? "";
		return decodeSlug(slug);
	}

	function deriveDateLabel(rawDate?: string) {
		if (!rawDate) {
			return null;
		}

		try {
			return formatDate(rawDate);
		} catch {
			return rawDate;
		}
	}

	function deriveReadTimeLabel(rawReadTime?: string) {
		if (!rawReadTime) {
			return null;
		}

		const minutes = Number(rawReadTime);
		if (Number.isFinite(minutes) && minutes > 0) {
			return `${Math.round(minutes)} min`;
		}

		return rawReadTime;
	}

	function stripHtml(value: string) {
		return value
			.replace(/<[^>]*>/g, " ")
			.replace(/\s+/g, " ")
			.trim();
	}

	function deriveSummary(summary?: string) {
		const normalizedSummary = stripHtml(summary ?? "");
		if (normalizedSummary.length > 0) {
			return normalizedSummary;
		}
		return null;
	}

	function deriveViewTransitionName(url: string) {
		const slug = url.split("/").filter(Boolean).at(-1);
		return slug ? `post-title-${slug}` : undefined;
	}

	async function loadPagefindSearch() {
		const module = (await import(/* @vite-ignore */ pagefindModuleUrl)) as Partial<PagefindModule>;
		if (!module.search) {
			throw new Error("Pagefind search module did not expose a search function.");
		}
		return module.search;
	}

	async function buildResults(
		search: (term: string) => Promise<PagefindSearchResponse>,
		searchTerm: string
	) {
		const searchResponse = await search(searchTerm);
		const results = await Promise.all(
			searchResponse.results.map(async (result) => {
				const resultData = await result.data();
				const normalizedUrl = normalizeResultUrl(resultData.url ?? "/");
				const meta = resultData.meta ?? {};

				return {
					id: normalizedUrl,
					url: normalizedUrl,
					title: deriveTitle(normalizedUrl, meta.title),
					summary: deriveSummary(meta.summary),
					typeLabel: deriveTypeLabel(normalizedUrl, meta.content_type),
					dateLabel: deriveDateLabel(meta.date),
					readTimeLabel: deriveReadTimeLabel(meta.read_time),
					viewTransitionName: deriveViewTransitionName(normalizedUrl),
					score: result.score
				} satisfies SearchResult;
			})
		);

		return results.sort((left, right) => right.score - left.score);
	}

	onMount(() => {
		let active = true;

		void (async () => {
			try {
				const search = await loadPagefindSearch();
				if (!active) {
					return;
				}

				pagefindSearch = search;
			} catch (error) {
				console.error("Failed to load search index", error);
				searchError = "Search is temporarily unavailable.";
				isLoading = false;
			}
		})();

		return () => {
			active = false;
		};
	});

	$effect(() => {
		const search = pagefindSearch;
		const currentQuery = query;

		if (!search) {
			isLoading = currentQuery.length > 0 && searchError === null;
			return;
		}

		if (!currentQuery) {
			searchResults = [];
			searchError = null;
			isLoading = false;
			lastCompletedQuery = null;
			return;
		}

		let cancelled = false;
		isLoading = true;
		searchError = null;

		void buildResults(search, currentQuery)
			.then((results) => {
				if (cancelled) {
					return;
				}

				searchResults = results;
				lastCompletedQuery = currentQuery;
			})
			.catch((error) => {
				console.error("Search failed", error);
				if (!cancelled) {
					searchError = "Search failed. Please try again.";
					lastCompletedQuery = currentQuery;
				}
			})
			.finally(() => {
				if (!cancelled) {
					isLoading = false;
				}
			});

		return () => {
			cancelled = true;
		};
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta
		name="description"
		content="Search all blog posts and From the Temple newsletter content."
	/>
	<meta property="og:title" content={pageTitle} />
	<meta property="og:url" content={`${config.url}/search`} />
	<meta
		property="og:description"
		content="Search all blog posts and From the Temple newsletter content."
	/>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content={`@${config.twitterHandle}`} />
	<meta name="twitter:title" content={pageTitle} />
	<meta
		name="twitter:description"
		content="Search all blog posts and From the Temple newsletter content."
	/>
</svelte:head>

<section class="relative overflow-hidden py-14 md:py-20">
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15)_0%,transparent_55%)]"
		></div>
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,119,198,0.15)_0%,transparent_55%)]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-250 px-6">
		<h1 class="gradient-text font-heading mb-5 text-center text-5xl font-extrabold lg:text-6xl">
			Search Results
		</h1>
		{#if query}
			<p class="mx-auto mb-12 max-w-2xl text-center text-lg text-slate-200">
				Showing results for
				<span class="rounded-full bg-white/10 px-3 py-1 font-semibold text-white">"{query}"</span>
			</p>
		{:else}
			<p class="mx-auto mb-12 max-w-2xl text-center text-lg text-slate-300">
				Open the search dialog from the magnifying glass icon in the navigation.
			</p>
		{/if}

		{#if searchError}
			<div
				class="rounded-2xl border border-[var(--color-secondary)]/35 bg-[var(--color-secondary)]/10 p-6"
			>
				<p class="font-semibold text-[var(--color-secondary)]">{searchError}</p>
				{#if import.meta.env.DEV}
					<p class="mt-3 text-sm text-slate-200/90">
						Run <code class="rounded bg-black/30 px-1.5 py-0.5">bun run dev:search</code> to generate
						local search assets.
					</p>
				{/if}
			</div>
		{:else if query.length > 0 && (isLoading || lastCompletedQuery !== query)}
			<div
				role="status"
				aria-live="polite"
				aria-label="Searching posts"
				class="mx-auto max-w-3xl rounded-2xl border border-white/12 bg-white/5 p-6 md:p-8"
			>
				<div class="mb-4 flex items-center justify-center gap-2.5" aria-hidden="true">
					<span
						class="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--color-primary)] [animation-delay:0ms]"
					></span>
					<span
						class="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--color-secondary)] [animation-delay:150ms]"
					></span>
					<span
						class="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--color-tertiary)] [animation-delay:300ms]"
					></span>
				</div>
				<p class="text-center text-lg font-medium text-slate-200">Searching...</p>
				<div class="mt-6 space-y-4" aria-hidden="true">
					<div class="space-y-2 rounded-xl border border-white/10 bg-black/10 p-4">
						<div class="h-4 w-2/3 animate-pulse rounded bg-white/20"></div>
						<div class="h-3 w-1/3 animate-pulse rounded bg-white/12"></div>
						<div class="h-3 w-full animate-pulse rounded bg-white/10"></div>
					</div>
					<div class="space-y-2 rounded-xl border border-white/10 bg-black/10 p-4">
						<div class="h-4 w-1/2 animate-pulse rounded bg-white/20"></div>
						<div class="h-3 w-1/4 animate-pulse rounded bg-white/12"></div>
						<div class="h-3 w-11/12 animate-pulse rounded bg-white/10"></div>
					</div>
				</div>
			</div>
		{:else if query.length === 0}
			<p class="text-center text-slate-300/90">
				Use the search icon in the header to run a search.
			</p>
		{:else if searchResults.length === 0 && lastCompletedQuery === query}
			<p class="text-center text-slate-300/90">
				No results found. Try different terms or fewer words.
			</p>
		{:else}
			<div class="mb-6 text-sm text-slate-300">{searchResults.length} results</div>
			<WritingList items={searchResults} />
		{/if}
	</div>
</section>
