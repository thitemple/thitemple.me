<script lang="ts">
	import { fly } from "svelte/transition";
	import { Moon, Sun } from "lucide-svelte";
	import { theme, toggleTheme } from "$lib/stores/theme";
</script>

<button onclick={toggleTheme} aria-label="Toggle theme" class="text-slate-700 dark:text-slate-300">
	{#if $theme === "dark"}
		<div in:fly={{ y: 10 }} class="flex gap-2">
			<Sun />
			<span>Light</span>
		</div>
	{:else}
		<div in:fly={{ y: -10 }} class="flex gap-2">
			<Moon />
			<span>Dark</span>
		</div>
	{/if}
</button>
