<script lang="ts">
	import { ArrowRight } from "lucide-svelte";
	import OutlineLink from "$lib/components/outline-link.svelte";
	interface Props {
		image: string;
		title: string;
		description: string;
		url: string;
	}

	let { image, title, description, url }: Props = $props();
</script>

<div
	class="mt-6 flex flex-col gap-4 overflow-hidden md:rounded-md md:border md:border-slate-200 md:p-6 dark:md:border-pink-300/40"
>
	<h3 class="font-heading text-xl">{title}</h3>
	<img src={image} alt={title} class="mx-auto block w-full max-w-lg" />
	<p class="flex-1">{description}</p>
	<OutlineLink href={url}>
		Enroll
		{#snippet icon()}
			<ArrowRight />
		{/snippet}
	</OutlineLink>
</div>
