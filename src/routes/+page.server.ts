import snapshot from "$lib/content/latest.generated.json";
import { fetchLatest } from "$lib/server/latest";
import type { Latest } from "$lib/types";
import type { PageServerLoad } from "./$types";

// The layout prerenders everything; this page opts out so "Fresh out of the kitchen" can
// refresh. Vercel ISR serves the cached HTML and regenerates it in the background.
export const prerender = false;

export const config = {
	isr: { expiration: 3600 }
};

export const load: PageServerLoad = async ({ fetch }) => {
	return { latest: await fetchLatest(fetch, snapshot as Latest) };
};
