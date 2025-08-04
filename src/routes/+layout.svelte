<script lang="ts">
	import "../app.css";
	import { Github, Linkedin, Instagram, Rss, Link } from "lucide-svelte";

	let navOpen = false;
</script>

<svelte:head>
	<title>Thiago Temple — Full-Stack Developer</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<!-- Deep-navy backdrop that matches prototype -->
<div
	class="min-h-screen scroll-smooth bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_25%,#2d1b69_50%,var(--bg-deep)_75%,#16213e_100%)]
            text-slate-100"
>
	<!-- Header -->
	<header class="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
		<nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="/" class="gradient-text font-grotesk text-xl font-bold">Thiago Temple</a>

			<!-- desktop links -->
			<ul class="hidden gap-10 font-medium md:flex">
				<li><a class="hover:text-[var(--accent)]" href="/blog">Blog</a></li>
				<li><a class="hover:text-[var(--accent)]" href="/about">About</a></li>
			</ul>

			<!-- mobile toggle -->
			<button
				class="rounded border border-white/20 p-2 md:hidden"
				aria-label="Toggle navigation"
				on:click={() => (navOpen = !navOpen)}
			>
				{#if navOpen}✕{:else}☰{/if}
			</button>
		</nav>

		{#if navOpen}
			<ul class="flex flex-col gap-6 px-8 pb-6 text-lg font-medium md:hidden">
				<li><a on:click={() => (navOpen = false)} href="/blog">Blog</a></li>
				<li><a on:click={() => (navOpen = false)} href="/about">About</a></li>
				<li><a on:click={() => (navOpen = false)} href="/#work">Work</a></li>
				<li><a on:click={() => (navOpen = false)} href="#contact">Contact</a></li>
			</ul>
		{/if}
	</header>

	<slot />

	<!-- Footer -->
	<footer id="contact" class="border-t border-white/10 bg-[var(--bg-deep)] py-20">
		<div class="mx-auto max-w-7xl px-6">
			<div
				class="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left"
			>
				<div>
					<h3
						class="mb-3 bg-gradient-to-r from-[var(--grad-1)] via-[var(--grad-2)] via-[var(--grad-3)] to-[var(--accent)] bg-clip-text font-mono text-3xl font-bold text-transparent"
					>
						Thiago Temple
					</h3>
					<p class="text-lg text-slate-400">Building meaningful solutions efficiently</p>
				</div>

				<div class="flex flex-wrap justify-center gap-4 md:justify-start">
					<a
						href="/blog"
						aria-label="Blog"
						class="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
					>
						<Rss size={18} class="transition-transform group-hover:scale-110" />
						<span>Blog</span>
					</a>
					<a
						href="https://bsky.app/profile/thitemple.me"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="BlueSky Profile"
						class="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all hover:border-[#00A8E8] hover:bg-[#00A8E8]/10 hover:text-[#00A8E8]"
					>
						<svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-current transition-transform group-hover:scale-110">
							<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
						</svg>
						<span>BlueSky</span>
					</a>
					<a
						href="http://github.com/thitemple"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub Profile"
						class="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all hover:border-white hover:bg-white/10 hover:text-white"
					>
						<Github size={18} class="transition-transform group-hover:scale-110" />
						<span>GitHub</span>
					</a>
					<a
						href="https://www.linkedin.com/in/thitemple/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn Profile"
						class="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all hover:border-[#0077b5] hover:bg-[#0077b5]/10 hover:text-[#0077b5]"
					>
						<Linkedin size={18} class="transition-transform group-hover:scale-110" />
						<span>LinkedIn</span>
					</a>
					<a
						href="https://x.com/thi_temple"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="X (Twitter) Profile"
						class="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all hover:border-white hover:bg-white/10 hover:text-white"
					>
						<svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-current transition-transform group-hover:scale-110">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
						<span>X</span>
					</a>
					<a
						href="https://www.instagram.com/thitemple/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram Profile"
						class="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all hover:border-[#E4405F] hover:bg-[#E4405F]/10 hover:text-[#E4405F]"
					>
						<Instagram size={18} class="transition-transform group-hover:scale-110" />
						<span>Instagram</span>
					</a>
				</div>
			</div>

			<div class="mt-12 border-t border-white/10 pt-8 text-center text-slate-500">
				<p class="text-base">© 2025 Thiago Temple. Built with SvelteKit and lots of coffee ☕</p>
			</div>
		</div>
	</footer>
</div>
