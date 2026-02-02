import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";
import type { LayoutLoad } from "./$types";

injectAnalytics({ mode: dev ? "development" : "production" });

export const load: LayoutLoad = async ({ url }) => {
	return {
		url: url.pathname
	};
};
