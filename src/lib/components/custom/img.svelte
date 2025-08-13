<script lang="ts">
	interface Props {
		src?: string;
		alt?: string;
	}

	let { src = "", alt = "" }: Props = $props();
</script>

<div
	class="relative mx-auto max-h-[300px] w-[50%] overflow-hidden rounded-lg md:max-h-[400px] lg:max-h-[500px]"
>
	<img
		{src}
		{alt}
		loading="lazy"
		data-zoomable
		class="h-full w-full cursor-pointer object-cover object-center"
	/>
</div>
