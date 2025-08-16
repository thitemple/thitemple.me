<script lang="ts">
	import NewsletterForm from "$lib/components/NewsletterForm.svelte";
	import bggLogo from "$lib/assets/img/bgg-rankings-logo.png";
	import partyayLogo from "$lib/assets/img/partyay-logo.png";
	import { afterNavigate } from "$app/navigation";
	import { formatDate } from "$lib/utils/date-format";

	// Create a key that changes after navigation
	let componentKey = $state(Date.now());

	afterNavigate(() => {
		// Force component to remount after navigation
		componentKey = Date.now();
	});

	let { data } = $props();
</script>

<!-- ─── Hero ──────────────────────────────────────────────────────── -->
<section
	class="relative isolate mx-auto flex max-w-7xl flex-col-reverse items-center gap-20 px-6 py-24 lg:flex-row"
>
	<!-- Copy (kept exactly as prototype) -->
	<div class="max-w-xl flex-1 space-y-12 text-center lg:text-left">
		<p class="text-4xl leading-snug font-medium text-slate-100 lg:text-5xl">
			I'm figuring out how to build meaningful stuff while juggling work, family, and life. Come
			along.
		</p>

		<div class="flex flex-col gap-6 sm:flex-row sm:justify-center lg:justify-start">
			<a href="/blog" class="btn-primary">Read the blog</a>
			<a
				href="#work"
				class="inline-block rounded-xl border-2 border-[var(--accent)] px-8 py-4 text-lg
               font-semibold text-[var(--accent)]
               transition-colors hover:bg-[var(--accent)] hover:text-white"
			>
				View Projects
			</a>
		</div>
	</div>

	<!-- Profile card -->
	<aside class="card-glass w-full max-w-sm flex-1 p-10 text-center">
		<img
			src="/thiago-temple.jpeg"
			alt="Thiago Temple"
			class="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/10
             bg-[linear-gradient(135deg,var(--grad-1)_0%,var(--grad-2)_25%,var(--grad-3)_50%,#8b5cf6_75%,#ec4899_100%)]
             text-5xl font-extrabold shadow-md"
		/>

		<h3 class="font-grotesk text-2xl font-bold">Thiago Temple</h3>

		<blockquote class="mt-5 leading-relaxed text-slate-300 italic">
			"25+ years in, and I'm still learning something new every project. Turns out that's the best
			part."
		</blockquote>
	</aside>

	<!-- decorative radial blobs -->
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15)_0%,transparent_50%)]"
		></div>
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15)_0%,transparent_50%)]"
		></div>
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(102,126,234,0.10)_0%,transparent_50%)]"
		></div>
	</div>
</section>

<!-- ─── About Section ──────────────────────────────────────────────── -->
<section id="about" class="bg-black/30 py-32">
	<div class="mx-auto max-w-7xl px-6">
		<h2 class="gradient-text font-grotesk mb-16 text-center text-5xl font-extrabold lg:text-6xl">
			About Me
		</h2>

		<div class="mx-auto max-w-4xl text-center">
			<p class="mb-8 text-xl leading-relaxed text-slate-300">
				I’m a Canada‑based developer and dad of three. After 25+ years in tech, I’ve learned that <strong
					class="font-semibold text-white">perfect solutions don’t exist</strong
				> — but smart trade‑offs do.
			</p>

			<p class="mb-12 text-xl leading-relaxed text-slate-300">
				I’m learning in public: AI-assisted development, rapid prototyping, and shipping small,
				useful things in a few hours a week.
			</p>

			<div
				class="rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8"
			>
				<h4 class="mb-4 font-mono text-2xl font-bold text-white">My Mission</h4>
				<p class="text-lg leading-relaxed text-slate-300">
					Share what I’m learning from real projects with real constraints—so you can skip a
					mistake, try an idea sooner, and I can look back proud of the path.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ─── Blog Section ────────────────────────────────────────────────── -->
{#if data.post}
	<section id="blog" class="py-16 md:py-28">
		<div class="mx-auto max-w-7xl px-6">
			<h2 class="gradient-text font-grotesk mb-12 text-center text-5xl font-extrabold lg:text-6xl">
				Latest Post
			</h2>

			<!-- Blog Card - Fully Clickable -->
			<a
				href={`/blog/${data.post.slug}`}
				class="group mx-auto block max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-[var(--accent)]/30 hover:shadow-2xl"
			>
				<!-- Gradient overlay on hover -->
				<div
					class="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-[var(--accent)]/8 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
				></div>

				<!-- Post Image or Default Banner -->
				{#if data.post.cover}
					<div class="relative h-64 overflow-hidden">
						<img
							src={data.post.cover}
							alt={`Cover for ${data.post.title}`}
							class="h-full w-full object-cover transition-transform group-hover:scale-105"
						/>
					</div>
				{:else}
					<div
						class="relative flex h-64 items-center justify-center bg-gradient-to-br from-purple-600/30 via-[var(--accent)]/30 to-transparent text-6xl"
					>
						🚀
					</div>
				{/if}

				<!-- Post Content -->
				<div class="relative z-10 p-8">
					<!-- Meta Info -->
					<div class="mb-4 flex items-center justify-between gap-3 text-sm">
						<time class="font-mono text-slate-400">{formatDate(data.post.date)}</time>
						<span class="font-medium text-[var(--accent)]">{data.post.readTime} min read</span>
					</div>

					<!-- Title -->
					<h3 class="font-grotesk mb-4 text-3xl leading-tight font-bold text-white">
						{data.post.title}
					</h3>

					<!-- Excerpt -->
					<p class="mb-6 text-lg leading-relaxed text-slate-300">
						{data.post.summary}
					</p>

					<!-- Read More Link -->
					<span
						class="inline-flex items-center gap-2 text-base font-semibold text-[var(--accent)] transition-colors group-hover:text-purple-300"
					>
						Read full post
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</span>
				</div>
			</a>
		</div>
	</section>
{/if}

<!-- ─── Newsletter Section ─────────────────────────────────────────── -->
<section id="newsletter" class="py-16 md:py-28">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="gradient-text font-grotesk mb-6 text-4xl font-extrabold lg:text-5xl">
				Stay Connected
			</h2>
			<p class="mb-12 text-xl leading-relaxed text-slate-300">
				A short update every other week with the latest post and what I’m tinkering with. No spam.
			</p>

			<div class="card-glass mx-auto max-w-md p-4 md:p-8">
				<!-- MailerLite embedded form -->
				{#key componentKey}
					<NewsletterForm />
				{/key}
			</div>
		</div>
	</div>
</section>

<!-- ─── Projects Section ───────────────────────────────────────────── -->
<section id="work" class="py-16 md:py-28">
	<div class="mx-auto max-w-7xl px-6">
		<h2 class="gradient-text font-grotesk mb-16 text-center text-5xl font-extrabold lg:text-6xl">
			Projects
		</h2>

		<div class="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
			<!-- Project Card 1 - BGG Rankings -->
			<a
				href="https://www.bggrankings.app"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-1 shadow-xl transition-transform hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-2xl"
			>
				<div class="relative flex h-full flex-col overflow-hidden rounded-xl">
					<div class="relative flex aspect-[16/9] items-center justify-center bg-slate-900/50">
						<img
							src={bggLogo}
							alt="BGG Rankings"
							class="h-32 w-auto object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100"
						/>
					</div>

					<div class="flex flex-1 flex-col p-6">
						<h3 class="font-grotesk mb-2 text-2xl font-bold text-white">BGG Rankings</h3>
						<p class="mb-4 text-slate-300">
							Explore BoardGameGeek rankings with clean visuals and practical insights.
						</p>

						<div class="mt-auto flex items-center gap-3">
							<span
								class="inline-flex items-center rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-medium text-[var(--accent)]"
								>Live</span
							>
						</div>
					</div>
				</div>
			</a>

			<!-- Project Card 2 - Partyay -->
			<a
				href="https://www.partyay.app"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-1 shadow-xl transition-transform hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-2xl"
			>
				<div class="relative flex h-full flex-col overflow-hidden rounded-xl">
					<div class="relative flex aspect-[16/9] items-center justify-center bg-slate-900/50">
						<img
							src={partyayLogo}
							alt="Partyay"
							class="h-32 w-auto object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100"
						/>
					</div>

					<div class="flex flex-1 flex-col p-6">
						<h3 class="font-grotesk mb-2 text-2xl font-bold text-white">Partyay</h3>
						<p class="mb-4 text-slate-300">
							A fun party planning and event management platform. Making celebrations easier and
							more memorable.
						</p>

						<div class="mt-auto flex items-center gap-3">
							<span
								class="inline-flex items-center rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-medium text-[var(--accent)]"
								>Live</span
							>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</section>
