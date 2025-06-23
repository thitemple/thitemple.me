<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<h2 class="font-heading my-2 text-xl dark:text-slate-200">
	{@render children?.()}
</h2>
