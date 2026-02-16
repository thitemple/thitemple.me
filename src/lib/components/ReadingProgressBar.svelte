<script lang="ts">
	import { onMount } from "svelte";

	let { enabled = false }: { enabled?: boolean } = $props();
	let progress = $state(0);

	interface ScrollMetrics {
		scrollHeight: number;
		scrollTop: number;
	}

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}

	function calculateProgress(scrollTop: number, scrollHeight: number): number {
		if (scrollHeight <= 0) {
			return 100;
		}

		return clamp((scrollTop / scrollHeight) * 100, 0, 100);
	}

	function getScrollMetrics(): ScrollMetrics {
		const { documentElement } = document;
		const scrollTop = documentElement.scrollTop || document.body.scrollTop;
		const scrollHeight = documentElement.scrollHeight - documentElement.clientHeight;

		return {
			scrollHeight,
			scrollTop
		};
	}

	function updateProgress(): void {
		const { scrollHeight, scrollTop } = getScrollMetrics();
		progress = calculateProgress(scrollTop, scrollHeight);
	}

	function handleWindowChange(): void {
		if (!enabled) {
			progress = 0;
			return;
		}

		updateProgress();
	}

	onMount((): (() => void) => {
		window.addEventListener("scroll", handleWindowChange, { passive: true });
		window.addEventListener("resize", handleWindowChange);
		handleWindowChange();

		return (): void => {
			window.removeEventListener("scroll", handleWindowChange);
			window.removeEventListener("resize", handleWindowChange);
		};
	});
</script>

<div
	class="h-[2px] w-full bg-white/8 opacity-0 transition-opacity duration-200"
	class:opacity-100={enabled}
	aria-hidden={!enabled}
>
	<div
		class="h-full w-full origin-left transition-transform duration-100 ease-linear [background:var(--nav-link-hover-gradient)]"
		style={`transform: scaleX(${progress / 100})`}
	></div>
</div>
