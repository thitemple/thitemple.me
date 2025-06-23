<script lang="ts">
	import { cn } from "$lib/utils";

	interface Props {
		classes?: string;
		children?: import("svelte").Snippet;
	}

	let { classes = "", children }: Props = $props();
</script>

<h1
	class={cn("font-heading w-full text-2xl text-slate-700 lg:text-3xl dark:text-slate-100", classes)}
>
	{@render children?.()}
</h1>
