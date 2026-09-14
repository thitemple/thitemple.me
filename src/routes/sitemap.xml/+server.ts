import * as config from "$lib/config";

export const prerender = true;

export function GET(): Response {
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${config.url}/</loc></url>
</urlset>`,
		{ headers: { "Content-Type": "application/xml" } }
	);
}
