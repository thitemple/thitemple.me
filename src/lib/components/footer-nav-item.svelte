<script lang="ts">
	import { page } from "$app/stores";
	import type { HTMLAttributeAnchorTarget } from "svelte/elements";
	interface Props {
		exact?: boolean;
		href: string;
		target?: HTMLAttributeAnchorTarget | undefined;
		children?: import("svelte").Snippet;
	}

	let { exact = true, href, target = undefined, children }: Props = $props();
	let activeUrl = $derived(
		exact && $page.url.pathname === href ? $page.url.pathname.startsWith(href) : false
	);
</script>

<li>
	{#if activeUrl}
		<span
			class="text-slate-400 hover:cursor-default hover:text-slate-400 hover:no-underline dark:text-slate-500 dark:hover:text-slate-500"
		>
			{@render children?.()}
		</span>
	{:else}
		<a
			{href}
			onclick={(e) => {
				if (activeUrl) {
					e.preventDefault();
				}
			}}
			{target}
			aria-disabled={activeUrl}
			class="text-slate-700 hover:text-violet-500 hover:underline dark:text-slate-200 dark:hover:text-pink-300"
		>
			{@render children?.()}
		</a>
	{/if}
</li>
