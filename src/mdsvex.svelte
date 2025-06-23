<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<script lang="ts" module>
	import { img } from "$lib/components/custom";

	export { img };
</script>

{@render children?.()}
