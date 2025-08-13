<script lang="ts">
	import { page } from "$app/state";
	import { House, Coffee } from "lucide-svelte";
</script>

<div class="flex min-h-[calc(100vh-400px)] flex-col justify-center sm:min-h-[calc(100vh-320px)]">
	<section class="flex flex-1 items-center py-8 sm:py-16">
		<div class="mx-auto max-w-4xl px-6 text-center">
			<h1 class="gradient-text font-grotesk mb-8 text-6xl font-extrabold lg:text-8xl">
				{page.status}
			</h1>

			<p class="mb-6 text-2xl leading-relaxed font-medium text-slate-100 lg:text-3xl">
				Looks like this page took a wrong turn at the last commit.
			</p>

			<p class="mb-12 text-lg text-slate-300">
				Maybe I deleted it, renamed it, or it's still brewing in my local environment. Either way,
				let's get you back on track.
			</p>

			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<a href="/" class="btn-primary !flex items-center justify-center gap-2">
					<House size={20} aria-hidden="true" />
					<span>Go Home</span>
				</a>
				<a
					href="/blog"
					class="flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] px-8 py-4 text-lg font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
				>
					<Coffee size={20} aria-hidden="true" />
					<span>Read the Blog</span>
				</a>
			</div>

			<div class="mt-16 rounded-2xl border border-white/10 bg-black/30 p-8">
				<p class="text-lg text-slate-300">
					<span class="font-mono text-[var(--accent)]">Pro tip:</span> If you were looking for something
					specific and it's gone, it probably wasn't that important anyway. But if it was, try the blog—that's
					where the good stuff lives.
				</p>
			</div>
		</div>
	</section>
</div>
