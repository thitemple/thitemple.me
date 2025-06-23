<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "$lib/utils";
	import type { HTMLAttributeAnchorTarget } from "svelte/elements";
	export let href: string;
	export let target: HTMLAttributeAnchorTarget | undefined = undefined;
	$: activeUrl = $page.url.pathname.startsWith(href);
</script>

<li class="group flex flex-col">
	<a
		{href}
		{target}
		class={cn("transition-colors duration-300 ", {
			"dark:group-hover:text-slate-400": !activeUrl
		})}
	>
		<slot />
	</a>
	<div
		class={cn("h-[2px] w-full bg-transparent transition-colors duration-300 ", {
			"bg-violet-700 dark:bg-pink-100": activeUrl,
			"group-hover:bg-violet-300 dark:group-hover:bg-pink-400": !activeUrl
		})}
	></div>
</li>
