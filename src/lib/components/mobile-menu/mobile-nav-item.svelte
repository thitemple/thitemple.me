<script lang="ts">
	interface Props {
		to: string;
		onclick?: () => void;
		children?: import("svelte").Snippet;
	}

	let { to, onclick, children }: Props = $props();
</script>

<li
	class="border-b border-slate-200 py-4 last:border-0 focus:bg-slate-300 dark:focus:bg-violet-500"
>
	<a href={to} {onclick}>
		{@render children?.()}
	</a>
</li>
