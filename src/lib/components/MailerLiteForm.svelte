<script lang="ts">
	import { onMount } from "svelte";

	export let formId = "N9q1vl";

	onMount(() => {
		// Use the MailerLite global object to load the form
		if (typeof window !== "undefined" && (window as any).ml) {
			// Wait for MailerLite to be fully initialized
			setTimeout(() => {
				// Check if MailerLite has the necessary functions
				const ml = (window as any).ml;
				if (ml && ml.fn && ml.fn.renderEmbeddedForm) {
					// Trigger a re-scan of embedded forms
					const forms = document.querySelectorAll(".ml-embedded[data-form]");
					forms.forEach((form) => {
						const formId = form.getAttribute("data-form");
						if (formId && !form.innerHTML) {
							// Load this specific form
							const script = document.createElement("script");
							script.src = `https://assets.mailerlite.com/jsonp/1707521/forms/${formId}?callback=ml.fn.renderEmbeddedForm`;
							document.head.appendChild(script);

							// Clean up
							script.onload = () => {
								setTimeout(() => script.remove(), 100);
							};
						}
					});
				}
			}, 100);
		}
	});
</script>

<div class="ml-embedded" data-form={formId}></div>
