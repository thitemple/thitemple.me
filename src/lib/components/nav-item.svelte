<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "$lib/utils";
	import type { HTMLAttributeAnchorTarget } from "svelte/elements";
	interface Props {
		href: string;
		target?: HTMLAttributeAnchorTarget | undefined;
		children?: import('svelte').Snippet;
	}

	let { href, target = undefined, children }: Props = $props();
	let activeUrl = $derived($page.url.pathname.startsWith(href));
</script>

<li class="group flex flex-col">
	<a
		{href}
		{target}
		class={cn("transition-colors duration-300 ", {
			"dark:group-hover:text-slate-400": !activeUrl
		})}
	>
		{@render children?.()}
	</a>
	<div
		class={cn("h-[2px] w-full bg-transparent transition-colors duration-300 ", {
			"bg-violet-700 dark:bg-pink-100": activeUrl,
			"group-hover:bg-violet-300 dark:group-hover:bg-pink-400": !activeUrl
		})}
	></div>
</li>
