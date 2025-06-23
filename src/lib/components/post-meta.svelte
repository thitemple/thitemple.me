<script lang="ts">
	import { formatDate } from "$lib/utils";

	interface Props {
		date: string;
		readTime: number;
	}

	let { date, readTime }: Props = $props();
</script>

<span>
	{formatDate(date)} •
	{#if readTime > 1}
		{readTime} mins read
	{/if}
	{#if readTime === 0}
		&lt; 1 min read
	{/if}
</span>
