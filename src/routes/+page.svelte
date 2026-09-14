<script lang="ts">
	import * as config from "$lib/config";
	import type { Latest, LatestItem } from "$lib/types";
	import ThiagoPortrait from "$lib/assets/img/thiago-portrait.jpg?enhanced";
	import ThiagoPortraitRaw from "$lib/assets/img/thiago-portrait.jpg";
	import MfpHero from "$lib/assets/img/mfp-hero-thiago.jpeg?enhanced";
	import InstagramIcon from "$lib/assets/img/instagram-purple.svg";
	import SubstackIcon from "$lib/assets/img/substack-purple.svg";

	let { data }: { data: { latest: Latest } } = $props();

	const currentYear = new Date().getFullYear();

	// A source failing to sync at build time still gets a card — the placeholder tile
	// stands in until the next successful sync, per the design handoff's "fail soft" rule.
	const FALLBACKS = {
		video: {
			kicker: "Newest video",
			title: "New video coming soon",
			meta: "YouTube",
			url: "https://www.youtube.com/@Mr.FoodProgrammer",
			slot: "VIDEO THUMBNAIL"
		},
		recipe: {
			kicker: "Latest recipe",
			title: "New recipe coming soon",
			meta: "mrfoodprogrammer.com",
			url: "https://mrfoodprogrammer.com",
			slot: "RECIPE PHOTO"
		},
		newsletter: {
			kicker: "From the newsletter",
			title: "First issue coming soon",
			meta: "Substack",
			url: "https://foodprogrammerlog.substack.com",
			slot: "POST IMAGE"
		}
	} as const;

	function withFallback(
		item: LatestItem | null,
		fallback: (typeof FALLBACKS)[keyof typeof FALLBACKS]
	) {
		return { ...fallback, ...item, image: item?.image ?? null };
	}

	const latestCards = $derived([
		withFallback(data.latest.video, FALLBACKS.video),
		withFallback(data.latest.recipe, FALLBACKS.recipe),
		withFallback(data.latest.newsletter, FALLBACKS.newsletter)
	] satisfies (LatestItem & { slot: string })[]);

	const pageTitle = "Thiago Temple — Mr. Food Programmer";
	const pageDescription =
		"Practical family recipes, meal prep and kitchen notes from a software engineer's home kitchen. Also a staff developer shipping software on the web.";
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:url" content={config.url} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={ThiagoPortraitRaw} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={ThiagoPortraitRaw} />
</svelte:head>

<div class="shell">
	<header class="header">
		<span class="wordmark-group">
			<span class="logo-tile">
				<enhanced:img src={ThiagoPortrait} alt="" sizes="30px" />
			</span>
			<span class="wordmark">thitemple.me</span>
		</span>
		<a href="#developer" class="dev-link">Developer stuff ↓</a>
	</header>

	<section class="hero">
		<enhanced:img src={ThiagoPortrait} alt="Thiago Temple" class="hero-portrait" sizes="440px" />
		<div>
			<p class="kicker">Mr. Food Programmer</p>
			<h1 class="hero-title">Thiago Temple</h1>
			<p class="hero-tagline">
				Practical family recipes, meal prep and kitchen notes — from a software engineer's home
				kitchen. Everything I cook and write lives behind these four links.
			</p>
		</div>
	</section>

	<section class="links-section">
		<div class="links-grid">
			<a href="https://mrfoodprogrammer.com" target="_blank" rel="noreferrer" class="link-card">
				<span class="icon-tile icon-tile-photo">
					<enhanced:img src={MfpHero} alt="" sizes="48px" />
				</span>
				<span class="link-copy">
					<span class="link-title">mrfoodprogrammer.com</span>
					<span class="link-subtitle">Every recipe, scaled to your table</span>
				</span>
				<span class="chevron">→</span>
			</a>

			<a
				href="https://www.youtube.com/@Mr.FoodProgrammer"
				target="_blank"
				rel="noreferrer"
				class="link-card"
			>
				<span class="icon-tile">
					<svg viewBox="0 0 24 24" class="icon-glyph">
						<path
							d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.67 31.67 0 0 0 0 12a31.67 31.67 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.67 31.67 0 0 0 24 12a31.67 31.67 0 0 0-.5-5.81zM9.54 15.57V8.43L15.82 12l-6.28 3.57z"
						/>
					</svg>
				</span>
				<span class="link-copy">
					<span class="link-title">YouTube</span>
					<span class="link-subtitle">@Mr.FoodProgrammer · cook-alongs</span>
				</span>
				<span class="chevron">→</span>
			</a>

			<a
				href="https://www.instagram.com/mr.foodprogrammer/"
				target="_blank"
				rel="noreferrer"
				class="link-card"
			>
				<span class="icon-tile">
					<img src={InstagramIcon} alt="" width="23" height="23" />
				</span>
				<span class="link-copy">
					<span class="link-title">Instagram</span>
					<span class="link-subtitle">@mr.foodprogrammer · daily plates</span>
				</span>
				<span class="chevron">→</span>
			</a>

			<a
				href="https://foodprogrammerlog.substack.com"
				target="_blank"
				rel="noreferrer"
				class="link-card"
			>
				<span class="icon-tile">
					<img src={SubstackIcon} alt="" width="21" height="21" />
				</span>
				<span class="link-copy">
					<span class="link-title">Substack</span>
					<span class="link-subtitle">The newsletter · weekly kitchen notes</span>
				</span>
				<span class="chevron">→</span>
			</a>
		</div>
	</section>

	<section class="latest-section">
		<div class="latest-heading">
			<h2 class="latest-title">Fresh out of the kitchen</h2>
			<p class="latest-subtitle">The newest thing from each place — video, recipe, newsletter.</p>
		</div>
		<div class="latest-grid">
			{#each latestCards as card (card.slot)}
				<a href={card.url} target="_blank" rel="noreferrer" class="latest-card">
					{#if card.image}
						<img src={card.image} alt="" class="latest-thumb" loading="lazy" />
					{:else}
						<span class="latest-thumb latest-thumb-placeholder">{card.slot}</span>
					{/if}
					<span class="latest-body">
						<span class="latest-kicker">{card.kicker}</span>
						<span class="latest-card-title">{card.title}</span>
						<span class="latest-meta">{card.meta}</span>
					</span>
				</a>
			{/each}
		</div>
	</section>

	<section id="developer" class="dev-section">
		<div class="dev-panel">
			<div>
				<p class="dev-kicker">Also a software developer</p>
				<h2 class="dev-title">Twenty-odd years of shipping software, mostly on the web</h2>
				<p class="dev-body">
					Staff developer by day — TypeScript, Svelte, and a long habit of automating the boring
					parts. The recipe site, its serving scaler and the video sync behind it are all my own
					code.
				</p>
			</div>
			<div class="dev-links">
				<a href="https://github.com/thitemple" target="_blank" rel="noreferrer" class="dev-row">
					<svg viewBox="0 0 24 24" class="dev-icon">
						<path
							d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
						/>
					</svg>
					<span class="dev-row-label">GitHub</span>
					<span class="dev-row-handle">@thitemple</span>
				</a>
				<a
					href="https://www.linkedin.com/in/thitemple/"
					target="_blank"
					rel="noreferrer"
					class="dev-row"
				>
					<svg viewBox="0 0 24 24" class="dev-icon">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
					<span class="dev-row-label">LinkedIn</span>
					<span class="dev-row-handle">in/thitemple</span>
				</a>
				<a
					href="https://bsky.app/profile/thitemple.me"
					target="_blank"
					rel="noreferrer"
					class="dev-row"
				>
					<svg viewBox="0 0 24 24" class="dev-icon">
						<path
							d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
						/>
					</svg>
					<span class="dev-row-label">Bluesky</span>
					<span class="dev-row-handle">@thitemple.me</span>
				</a>
			</div>
		</div>
	</section>

	<footer class="footer">
		<div class="footer-inner">
			<p class="footer-wordmark">thitemple.me</p>
			<p class="footer-note">
				Cooking, writing and code by Thiago Temple.<br />© {currentYear} Thiago Temple.
			</p>
		</div>
	</footer>
</div>

<style>
	.shell {
		width: 100%;
		max-width: 1120px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: clamp(20px, 3vw, 30px) clamp(18px, 4vw, 32px);
	}

	.wordmark-group {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.logo-tile {
		flex: none;
		display: block;
		width: 30px;
		height: 30px;
		border-radius: 10px;
		overflow: hidden;
		background: var(--lilac-tile);
	}

	.logo-tile :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 30%;
		display: block;
	}

	.wordmark {
		font-family: var(--display);
		font-weight: 600;
		font-size: 16px;
		letter-spacing: -0.01em;
		color: var(--ink);
	}

	.dev-link {
		padding: 8px 16px;
		border-radius: 999px;
		border: 1px solid var(--border);
		font-size: 13px;
		font-weight: 700;
		color: var(--ink);
		transition:
			border-color 0.2s ease,
			color 0.2s ease;
	}
	.dev-link:hover,
	.dev-link:focus-visible {
		border-color: var(--purple);
		color: var(--purple);
	}

	.hero {
		padding: clamp(8px, 2vw, 24px) clamp(18px, 4vw, 32px) clamp(36px, 5vw, 56px);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: clamp(24px, 4vw, 52px);
		align-items: center;
	}

	.hero :global(.hero-portrait) {
		width: 100%;
		max-width: 440px;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		object-position: center 22%;
		border-radius: 28px;
		display: block;
		box-shadow: 0 18px 44px rgba(43, 36, 64, 0.14);
	}

	.kicker {
		margin: 0 0 14px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--purple);
	}

	.hero-title {
		font-size: clamp(34px, 6vw, 58px);
		line-height: 1.05;
		letter-spacing: -0.035em;
	}

	.hero-tagline {
		margin: 18px 0 0;
		font-size: clamp(16px, 1.5vw, 19px);
		line-height: 1.65;
		color: var(--text-secondary);
		max-width: 38ch;
		text-wrap: pretty;
	}

	.links-section {
		padding: 0 clamp(18px, 4vw, 32px) clamp(40px, 6vw, 72px);
	}

	.links-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
		gap: clamp(12px, 1.6vw, 16px);
		max-width: 900px;
		margin: 0 auto;
	}

	.link-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: clamp(16px, 2vw, 20px);
		background: var(--white);
		border-radius: 22px;
		color: var(--ink);
		box-shadow: var(--shadow-rest);
		transition:
			transform 0.22s ease,
			box-shadow 0.22s ease;
	}
	.link-card:hover,
	.link-card:focus-visible {
		transform: translateY(-4px);
		box-shadow: var(--shadow-hover);
		color: var(--ink);
	}

	.icon-tile {
		flex: none;
		width: 48px;
		height: 48px;
		border-radius: 15px;
		background: var(--lilac);
		display: grid;
		place-items: center;
		overflow: hidden;
	}

	.icon-tile-photo {
		background: var(--lilac-tile);
	}

	.icon-tile :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 28%;
		display: block;
	}

	.icon-glyph {
		width: 24px;
		height: 24px;
		fill: var(--purple);
	}

	.link-copy {
		flex: 1;
		min-width: 0;
	}

	.link-title {
		display: block;
		font-family: var(--display);
		font-weight: 600;
		font-size: clamp(17px, 1.6vw, 19px);
		color: var(--ink);
	}

	.link-subtitle {
		display: block;
		margin-top: 4px;
		font-size: 14px;
		line-height: 1.45;
		color: var(--text-muted);
	}

	.chevron {
		flex: none;
		font-size: 18px;
		color: var(--text-faint);
	}

	.latest-section {
		padding: 0 clamp(18px, 4vw, 32px) clamp(48px, 7vw, 88px);
	}

	.latest-heading {
		margin-bottom: 22px;
	}

	.latest-title {
		font-size: clamp(22px, 2.6vw, 30px);
		letter-spacing: -0.025em;
	}

	.latest-subtitle {
		margin: 8px 0 0;
		font-size: 15px;
		color: var(--text-muted);
	}

	.latest-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		gap: clamp(14px, 2vw, 20px);
	}

	.latest-card {
		display: block;
		background: var(--white);
		border-radius: 22px;
		padding: 12px;
		box-shadow: var(--shadow-rest);
		color: var(--ink);
		transition:
			transform 0.26s ease,
			box-shadow 0.26s ease;
	}
	.latest-card:hover,
	.latest-card:focus-visible {
		transform: translateY(-4px);
		box-shadow: var(--shadow-hover);
		color: var(--ink);
	}

	.latest-thumb {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 10;
		border-radius: 14px;
		object-fit: cover;
	}

	.latest-thumb-placeholder {
		display: grid;
		place-items: center;
		background: repeating-linear-gradient(135deg, var(--lilac-tile) 0 7px, var(--lilac) 7px 14px);
		font-family: ui-monospace, SFMono-Regular, monospace;
		font-size: 11px;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		text-align: center;
		padding: 8px;
	}

	.latest-body {
		display: block;
		padding: 14px 8px 8px;
	}

	.latest-kicker {
		display: block;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--purple);
	}

	.latest-card-title {
		display: block;
		margin-top: 7px;
		font-family: var(--display);
		font-weight: 600;
		font-size: 18px;
		line-height: 1.28;
		color: var(--ink);
		text-wrap: pretty;
	}

	.latest-meta {
		display: block;
		margin-top: 7px;
		font-size: 13px;
		color: var(--text-muted);
	}

	.dev-section {
		padding: 0 clamp(18px, 4vw, 32px) clamp(48px, 7vw, 88px);
	}

	.dev-panel {
		background: var(--ink);
		border-radius: 30px;
		padding: clamp(24px, 3.6vw, 48px);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: clamp(26px, 4vw, 56px);
		align-items: center;
	}

	.dev-kicker {
		margin: 0 0 14px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--lilac-accent);
	}

	.dev-title {
		font-size: clamp(24px, 3vw, 36px);
		line-height: 1.15;
		letter-spacing: -0.028em;
		color: var(--bg);
	}

	.dev-body {
		margin: 18px 0 0;
		font-size: 17px;
		line-height: 1.7;
		color: rgba(251, 248, 244, 0.8);
		max-width: 46ch;
		text-wrap: pretty;
	}

	.dev-links {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-width: 0;
	}

	.dev-row {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 16px;
		border-radius: 18px;
		background: rgba(251, 248, 244, 0.07);
		color: var(--bg);
		transition: background 0.2s ease;
	}
	.dev-row:hover,
	.dev-row:focus-visible {
		background: rgba(251, 248, 244, 0.14);
		color: var(--bg);
		outline-color: var(--lilac-accent);
	}

	.dev-icon {
		flex: none;
		width: 21px;
		height: 21px;
		fill: var(--lilac-accent);
	}

	.dev-row-label {
		flex: 1;
		min-width: 0;
		font-size: 15px;
		font-weight: 600;
	}

	.dev-row-handle {
		flex: none;
		font-size: 13px;
		color: rgba(251, 248, 244, 0.55);
	}

	.footer {
		padding: 0 clamp(18px, 4vw, 32px);
	}

	.footer-inner {
		border-top: 1px solid var(--hairline);
		padding: 28px 0 clamp(48px, 8vw, 96px);
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		align-items: baseline;
		justify-content: space-between;
	}

	.footer-wordmark {
		margin: 0;
		font-family: var(--display);
		font-weight: 600;
		font-size: 18px;
		color: var(--ink);
	}

	.footer-note {
		margin: 0;
		font-size: 14px;
		line-height: 1.7;
		color: var(--text-muted);
	}

	:global(a:focus-visible),
	:global(button:focus-visible) {
		outline: 2px solid var(--purple);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.link-card:hover,
		.latest-card:hover {
			transform: none;
		}
	}
</style>
