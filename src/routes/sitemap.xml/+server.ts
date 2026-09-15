import * as config from "$lib/config";

export const prerender = true;

export function GET(): Response {
	const lastmod = new Date().toISOString().slice(0, 10);

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${config.url}/</loc><lastmod>${lastmod}</lastmod></url>
</urlset>`,
		{ headers: { "Content-Type": "application/xml" } }
	);
}
