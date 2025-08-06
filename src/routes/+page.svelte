<script lang="ts">
	import MailerLiteForm from "$lib/components/MailerLiteForm.svelte";
	import bggLogo from "$lib/assets/img/bgg-rankings-logo.png";
	import partyayLogo from "$lib/assets/img/partyay-logo.png";
</script>

<!-- ─── Hero ──────────────────────────────────────────────────────── -->
<section
	class="relative isolate mx-auto flex max-w-7xl flex-col-reverse items-center gap-20 px-6 py-24 lg:flex-row"
>
	<!-- Copy (kept exactly as prototype) -->
	<div class="max-w-xl flex-1 space-y-12 text-center lg:text-left">
		<p class="text-4xl leading-snug font-medium text-slate-100 lg:text-5xl">
			I help busy developers build <span class="gradient-text">meaningful solutions</span>
			efficiently.<br />
			No midnight oil required.
		</p>

		<div class="flex flex-col gap-6 sm:flex-row sm:justify-center lg:justify-start">
			<a href="/blog" class="btn-primary">Start Reading</a>
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
			"After 25+ years in development, I've learned that perfect solutions don't exist — but smart
			trade-offs do."
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
				I'm a Brazilian-Canadian full-stack developer, father of three, and Staff Developer at
				Shopify. After 25+ years in tech, I've learned that <strong class="font-semibold text-white"
					>perfect solutions don't exist</strong
				>
				— but smart trade-offs do.
			</p>

			<p class="mb-12 text-xl leading-relaxed text-slate-300">
				I share practical insights about AI-augmented development, rapid prototyping, and building
				meaningful solutions when you can't burn the midnight oil anymore.
			</p>

			<div
				class="rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8"
			>
				<h4 class="mb-4 font-mono text-2xl font-bold text-white">My Mission</h4>
				<p class="text-lg leading-relaxed text-slate-300">
					Help developers build meaningful solutions efficiently by sharing lessons learned from
					real projects with real constraints.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ─── Newsletter Section ─────────────────────────────────────────── -->
<section id="newsletter" class="py-16 md:py-28">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="gradient-text font-grotesk mb-6 text-4xl font-extrabold lg:text-5xl">
				Stay Connected
			</h2>
			<p class="mb-12 text-xl leading-relaxed text-slate-300">
				No spam, just updates and thoughts from my corner of the internet.
			</p>

			<div class="card-glass mx-auto max-w-md p-4 md:p-8">
				<!-- MailerLite embedded form -->
				<MailerLiteForm formId="N9q1vl" />
			</div>
		</div>
	</div>
</section>

<!-- ─── Projects Section ───────────────────────────────────────────── -->
<section id="work" class="py-16 md:py-28">
	<div class="mx-auto max-w-7xl px-6">
		<h2 class="gradient-text font-grotesk mb-16 text-center text-5xl font-extrabold lg:text-6xl">
			Recent Projects
		</h2>

		<div class="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
			<!-- Project Card 1 - BGG Rankings -->
			<a
				href="https://www.bggrankings.app"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative block overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-8 transition-all hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-2xl"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-fuchsia-600/8 to-violet-600/8 opacity-0 transition-opacity group-hover:opacity-100"
				></div>
				<div
					class="relative z-10 mb-6 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/40 via-pink-600/40 to-fuchsia-600/40 p-6 shadow-[0_0_30px_rgba(103,126,234,0.3)]"
				>
					<img src={bggLogo} alt="BGG Rankings logo" class="h-full w-full object-contain" />
				</div>
				<h3 class="mb-4 font-mono text-2xl font-bold text-white">BGG Rankings</h3>
				<p class="mb-6 leading-relaxed text-slate-400">
					Built in 30 days for the solo gaming community. A ranking app using SvelteKit and
					Postgres.
				</p>
				<div class="flex flex-wrap gap-2">
					<span
						class="rounded-full bg-[var(--accent)]/20 px-4 py-1.5 text-sm font-medium text-purple-300"
					>
						SvelteKit
					</span>
					<span
						class="rounded-full bg-[var(--accent)]/20 px-4 py-1.5 text-sm font-medium text-purple-300"
					>
						Postgres
					</span>
					<span class="rounded-full bg-blue-600/20 px-4 py-1.5 text-sm font-medium text-blue-300">
						Live
					</span>
				</div>
			</a>

			<!-- Project Card 2 - Partyay -->
			<a
				href="https://partyay.com"
				target="_blank"
				rel="noopener noreferrer"
				class="group relative block overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-8 transition-all hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-2xl"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-blue-600/8 to-violet-600/8 opacity-0 transition-opacity group-hover:opacity-100"
				></div>
				<div
					class="relative z-10 mb-6 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/40 via-blue-500/40 to-violet-500/40 p-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
				>
					<img src={partyayLogo} alt="Partyay logo" class="h-full w-full object-contain" />
				</div>
				<h3 class="mb-4 font-mono text-2xl font-bold text-white">Partyay</h3>
				<p class="mb-6 leading-relaxed text-slate-400">
					A fun party planning and event management platform. Making celebrations easier and more
					memorable.
				</p>
				<div class="flex flex-wrap gap-2">
					<span class="rounded-full bg-blue-600/20 px-4 py-1.5 text-sm font-medium text-blue-300">
						In Progress
					</span>
				</div>
			</a>
		</div>
	</div>
</section>
