<script lang="ts">
	import { page } from "$app/state";
</script>

<div class="wrap">
	<p class="kicker">{page.status}</p>
	<h1>This page wandered off.</h1>
	<p class="body">Whatever you were looking for isn't here anymore. Head back to the links.</p>
	<a href="/" class="home-link">← Back to thitemple.me</a>
</div>

<style>
	.wrap {
		min-height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: clamp(24px, 6vw, 64px) clamp(18px, 4vw, 32px);
	}

	.kicker {
		margin: 0 0 12px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--purple);
	}

	h1 {
		font-size: clamp(28px, 4vw, 40px);
		letter-spacing: -0.03em;
	}

	.body {
		margin-top: 14px;
		font-size: 17px;
		color: var(--text-secondary);
		max-width: 40ch;
	}

	.home-link {
		margin-top: 24px;
		font-weight: 700;
		color: var(--purple);
	}
	.home-link:hover {
		color: var(--purple-hover);
	}
</style>
