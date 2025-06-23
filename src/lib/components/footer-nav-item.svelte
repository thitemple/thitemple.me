<script lang="ts">
	import { page } from "$app/stores";
	import type { HTMLAttributeAnchorTarget } from "svelte/elements";
	export let exact = true;
	export let href: string;
	export let target: HTMLAttributeAnchorTarget | undefined = undefined;
	$: activeUrl = exact && $page.url.pathname === href ? $page.url.pathname.startsWith(href) : false;
</script>

<li>
	{#if activeUrl}
		<span
			class="text-slate-400 hover:cursor-default hover:text-slate-400 hover:no-underline dark:text-slate-500 dark:hover:text-slate-500"
		>
			<slot />
		</span>
	{:else}
		<a
			{href}
			on:click={(e) => {
				if (activeUrl) {
					e.preventDefault();
				}
			}}
			{target}
			aria-disabled={activeUrl}
			class="text-slate-700 hover:text-violet-500 hover:underline dark:text-slate-200 dark:hover:text-pink-300"
		>
			<slot />
		</a>
	{/if}
</li>
