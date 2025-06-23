<script lang="ts">
	import { createBubbler } from "svelte/legacy";

	const bubble = createBubbler();
	interface Props {
		to: string;
		children?: import("svelte").Snippet;
	}

	let { to, children }: Props = $props();
</script>

<li
	class="border-b border-slate-200 py-4 last:border-0 focus:bg-slate-300 dark:focus:bg-violet-500"
>
	<a href={to} onclick={bubble("click")}>
		{@render children?.()}
	</a>
</li>
