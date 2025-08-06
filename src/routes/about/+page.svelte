<script lang="ts">
	import * as config from "$lib/config";
	import me from "$lib/assets/img/me.jpg";
	import { Github, Linkedin, Instagram, Rss } from "lucide-svelte";
</script>

<svelte:head>
	<title>About - {config.title}</title>
	<meta name="description" content={config.description} />
	<meta property="og:title" content={config.title} />
	<meta property="og:url" content={config.url} />
	<meta property="og:image" content={`${config.url}${me}`} />
	<meta name="og:description" content={config.ogDescription} />
	<meta property="twitter:title" content={config.title} />
	<meta property="twitter:image" content={`${config.url}${me}`} />
	<meta property="twitter:description" content={config.description} />
	<meta property="twitter:card" content="summary" />
</svelte:head>

<!-- About Page Hero -->
<section class="relative isolate py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="gradient-text font-grotesk mb-8 text-5xl font-extrabold lg:text-6xl">About Me</h1>
			<p class="text-xl leading-relaxed text-slate-300">
				Learn more about my journey, what drives me, and what I do beyond code.
			</p>
		</div>
	</div>
</section>

<!-- Main Content -->
<section class="pb-32">
	<div class="mx-auto max-w-4xl px-6">
		<!-- Profile Section -->
		<div class="mb-16 text-center">
			<img
				src="/thiago-temple.jpeg"
				alt="Thiago Temple"
				class="mx-auto mb-8 h-48 w-48 rounded-full border-4 border-[var(--accent)]/20 shadow-2xl"
			/>
			<h2 class="font-grotesk mb-4 text-3xl font-bold text-white">Hi, I'm Thiago Temple</h2>
			<p class="text-lg text-slate-300">
				A Brazilian currently residing and working in Ottawa, Canada. You can reach me on
				<a href="https://twitter.com/ThiagoTemple" class="text-[var(--accent)] hover:underline"
					>Twitter</a
				>
				or via
				<a href="mailto:thitemple@gmail.com" class="text-[var(--accent)] hover:underline">email</a>.
			</p>
		</div>

		<!-- Content Sections -->
		<div class="space-y-12">
			<!-- What I do -->
			<div class="rounded-2xl border border-white/10 bg-black/30 p-8">
				<h3 class="mb-4 font-mono text-2xl font-bold text-white">What I do?</h3>
				<p class="text-lg leading-relaxed text-slate-300">
					I am a staff developer at <a
						href="http://shopify.com"
						class="text-[var(--accent)] hover:underline">Shopify</a
					>, primarily focused on programming with web-related technologies.
				</p>
			</div>

			<!-- Why I do it -->
			<div class="rounded-2xl border border-white/10 bg-black/30 p-8">
				<h3 class="mb-4 font-mono text-2xl font-bold text-white">Why I do it?</h3>
				<p class="text-lg leading-relaxed text-slate-300">
					My fascination with computers dates back to the 90s, even before my family purchased our
					first computer. At the age of 13, I would utilize my neighbor's computer. Today, I am
					passionate about the art of software development and thrive on the challenge of staying
					updated with the latest technologies. The constant evolution of technology is a major
					driving force for me, along with the knowledge that the software I help build contributes
					to enhancing people's productivity.
				</p>
			</div>

			<!-- Why this blog -->
			<div class="rounded-2xl border border-white/10 bg-black/30 p-8">
				<h3 class="mb-4 font-mono text-2xl font-bold text-white">Why this blog?</h3>
				<p class="text-lg leading-relaxed text-slate-300">
					This blog serves as an opportunity for me to practice and reinforce what I am learning. As
					the saying goes, teaching others is one of the most effective ways to solidify one's
					understanding. Or even if I am not teaching anyone, I am documenting for my future self.
					Additionally, I am eager to share the new things I learn and contribute to the community
					by sharing my experiences.
				</p>
			</div>

			<!-- What I do for fun -->
			<div class="rounded-2xl border border-white/10 bg-black/30 p-8">
				<h3 class="mb-4 font-mono text-2xl font-bold text-white">What I do for fun?</h3>
				<div class="space-y-4 text-lg leading-relaxed text-slate-300">
					<p>
						Living in Canada, I have discovered a new passion due to its harsh winters: board games.
						I now thoroughly enjoy them and have been steadily growing my collection.
					</p>

					<div class="my-6">
						<a href="https://boardgamegeek.com/user/vintem" class="inline-block">
							<img
								alt="Board games collection"
								src="https://boardgamegeek.com/jswidget.php?username=vintem&numitems=5&header=1&text=title&images=medium&show=recentplays&imagesonly=1&imagepos=center&inline=1&domains%5B%5D=boardgame&imagewidget=1"
								class="rounded-lg shadow-lg"
							/>
						</a>
					</div>

					<p>
						Additionally, I indulge in watching a few
						<a
							href="https://www.tvtime.com/en/user/13947508/profile"
							class="text-[var(--accent)] hover:underline"
						>
							TV shows
						</a>
						and always have at least one book on the go.
					</p>

					<p>
						However, one thing I cherish the most is spending quality time with my family. I am
						married and a proud father of three kids, as well as the owner of two cuddly greyhounds.
					</p>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div
			class="mt-16 rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 text-center"
		>
			<h3 class="mb-4 font-mono text-2xl font-bold text-white">Let's Connect!</h3>
			<p class="mb-6 text-lg text-slate-300">
				I'm always happy to connect with fellow developers and tech enthusiasts.
			</p>

			<!-- Social Links -->
			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="/blog"
					aria-label="Blog"
					class="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
				>
					<Rss size={20} class="transition-transform group-hover:scale-110" />
					<span>Blog</span>
				</a>
				<a
					href="https://bsky.app/profile/thitemple.me"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="BlueSky Profile"
					class="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium transition-all hover:border-[#00A8E8] hover:bg-[#00A8E8]/10 hover:text-[#00A8E8]"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-5 w-5 fill-current transition-transform group-hover:scale-110"
					>
						<path
							d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
						/>
					</svg>
					<span>BlueSky</span>
				</a>
				<a
					href="http://github.com/thitemple"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub Profile"
					class="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium transition-all hover:border-white hover:bg-white/10 hover:text-white"
				>
					<Github size={20} class="transition-transform group-hover:scale-110" />
					<span>GitHub</span>
				</a>
				<a
					href="https://www.linkedin.com/in/thitemple/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn Profile"
					class="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium transition-all hover:border-[#0077b5] hover:bg-[#0077b5]/10 hover:text-[#0077b5]"
				>
					<Linkedin size={20} class="transition-transform group-hover:scale-110" />
					<span>LinkedIn</span>
				</a>
				<a
					href="https://x.com/thi_temple"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="X (Twitter) Profile"
					class="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium transition-all hover:border-white hover:bg-white/10 hover:text-white"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-5 w-5 fill-current transition-transform group-hover:scale-110"
					>
						<path
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
					<span>X</span>
				</a>
				<a
					href="https://www.instagram.com/thitemple/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Instagram Profile"
					class="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base font-medium transition-all hover:border-[#E4405F] hover:bg-[#E4405F]/10 hover:text-[#E4405F]"
				>
					<Instagram size={20} class="transition-transform group-hover:scale-110" />
					<span>Instagram</span>
				</a>
			</div>
		</div>
	</div>
</section>
