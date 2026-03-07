<script lang="ts">
	interface Props {
		src?: string;
		alt?: string;
	}

	let { src = "", alt = "" }: Props = $props();
</script>

<div class="relative mx-auto max-h-75 w-[50%] overflow-hidden rounded-lg md:max-h-100 lg:max-h-125">
	<img
		{src}
		{alt}
		loading="lazy"
		data-zoomable
		class="h-full w-full cursor-pointer object-cover object-center"
	/>
</div>
