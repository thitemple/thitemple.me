<script lang="ts">
	import { cn } from "$lib/utils";

	export let classes = "";
</script>

<h1
	class={cn("font-heading w-full text-2xl text-slate-700 lg:text-3xl dark:text-slate-100", classes)}
>
	<slot />
</h1>
