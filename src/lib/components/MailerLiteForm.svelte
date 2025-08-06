<script lang="ts">
	import { onMount } from 'svelte';

	export let formId = 'N9q1vl';

	onMount(() => {
		// Force a fresh initialization of the MailerLite form
		const loadMailerLiteForm = () => {
			// Check if ml is already loaded
			if (typeof window !== 'undefined' && (window as any).ml) {
				// Create a unique callback name
				const callbackName = `ml_callback_${Date.now()}`;
				
				// Set up the callback
				(window as any)[callbackName] = (data: any) => {
					const container = document.querySelector(`.ml-embedded[data-form="${formId}"]`);
					if (container && data?.html) {
						container.innerHTML = data.html;
						
						// Initialize any scripts in the form
						const scripts = container.querySelectorAll('script');
						scripts.forEach(oldScript => {
							const newScript = document.createElement('script');
							if (oldScript.src) {
								newScript.src = oldScript.src;
							} else {
								newScript.textContent = oldScript.textContent;
							}
							oldScript.parentNode?.replaceChild(newScript, oldScript);
						});
					}
					
					// Clean up
					delete (window as any)[callbackName];
				};
				
				// Load the form data
				const script = document.createElement('script');
				script.src = `https://assets.mailerlite.com/jsonp/1707521/forms/${formId}/takel?callback=${callbackName}`;
				document.head.appendChild(script);
				
				// Clean up script after load
				script.onload = () => {
					setTimeout(() => script.remove(), 100);
				};
			}
		};
		
		// Delay to ensure DOM is ready
		const timeoutId = setTimeout(loadMailerLiteForm, 100);
		
		// Cleanup
		return () => {
			clearTimeout(timeoutId);
		};
	});
</script>

<div class="ml-embedded" data-form={formId}></div>