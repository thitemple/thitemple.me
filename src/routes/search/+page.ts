import type { PageLoad } from "./$types";

export const prerender = false;

function getQueryValue(url: URL): string {
	return url.searchParams.get("q")?.trim() ?? "";
}

export const load: PageLoad = ({ url }): { query: string } => {
	return {
		query: getQueryValue(url)
	};
};
