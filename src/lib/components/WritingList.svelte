<script lang="ts">
	import { base } from "$app/paths";
	import type { WritingListItem } from "$lib/types";

	interface Props {
		items: WritingListItem[];
	}

	let { items }: Props = $props();

	function getBadgeClasses(typeLabel: string): string {
		return typeLabel.toLowerCase() === "newsletter"
			? "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]"
			: "bg-[var(--color-primary)]/20 text-[var(--color-primary)]";
	}

	function withBase(path: string): string {
		return `${base}${path}`;
	}
</script>

<div class="grid gap-12 sm:gap-16">
	{#each items as item (item.id)}
		<article class="group relative items-baseline md:grid md:grid-cols-[1fr_auto] md:gap-8">
			<a
				href={withBase(item.url)}
				class="block transition-transform duration-300 group-hover:translate-x-2"
			>
				<h3
					class="mb-3 font-['Kantumruy_Pro'] text-3xl leading-tight font-bold text-white transition-colors group-hover:text-[var(--color-primary)] md:text-5xl"
					style={item.viewTransitionName ? `view-transition-name: ${item.viewTransitionName}` : ""}
				>
					{item.title}
				</h3>
			</a>

			<div
				class="mt-2 flex flex-col items-start gap-2 font-['Kantumruy_Pro'] text-sm font-medium text-[var(--color-tertiary)] md:mt-0 md:items-end"
			>
				<div class="flex items-center gap-3 whitespace-nowrap">
					{#if item.dateLabel}
						<time>{item.dateLabel}</time>
					{/if}
					{#if item.readTimeLabel}
						{#if item.dateLabel}
							<span class="opacity-50">•</span>
						{/if}
						<span>{item.readTimeLabel}</span>
					{/if}
				</div>
				<span
					class={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getBadgeClasses(item.typeLabel)}`}
				>
					{item.typeLabel}
				</span>
			</div>

			{#if item.summary}
				<p class="max-w-4xl text-lg font-light leading-relaxed text-slate-200 md:col-span-2">
					{item.summary}
				</p>
			{/if}
		</article>
	{/each}
</div>
