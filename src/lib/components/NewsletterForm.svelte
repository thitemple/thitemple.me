<script lang="ts">
	let email = "";
	let isLoading = false;
	let isSuccess = false;
	let errorMessage = "";

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isLoading = true;
		errorMessage = "";

		try {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (data.success) {
				isSuccess = true;
				email = "";
			} else {
				errorMessage = data.error || "Failed to subscribe. Please try again.";
			}
		} catch (error) {
			errorMessage = "Failed to subscribe. Please try again.";
		} finally {
			isLoading = false;
		}
	}
</script>

<div
	class="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-gray-900/50 to-black/50 p-8 backdrop-blur"
>
	{#if isSuccess}
		<div class="space-y-2">
			<h3 class="text-3xl font-bold text-white">Welcome!</h3>
			<p class="text-gray-300">You've successfully signed up for my sporadic thoughts.</p>
		</div>
	{:else}
		<div class="space-y-4">
			<h3 class="text-2xl font-bold text-white">Newsletter</h3>
			<p class="text-gray-300">
				No spam, just updates and thoughts from my corner of the internet.
			</p>

			<form on:submit={handleSubmit} class="space-y-3">
				<input
					type="email"
					bind:value={email}
					placeholder="Email"
					required
					disabled={isLoading}
					class="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none disabled:opacity-50"
				/>

				{#if errorMessage}
					<p class="text-sm text-red-400">{errorMessage}</p>
				{/if}

				<button
					type="submit"
					disabled={isLoading}
					class="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:opacity-50"
				>
					{isLoading ? "Subscribing..." : "Subscribe"}
				</button>
			</form>
		</div>
	{/if}
</div>
