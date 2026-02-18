import { getBlogPosts, getNewsletterPosts } from "$lib/posts";

export const prerender = true;

const BASE_URL = "https://thitemple.me";

interface SitemapEntry {
	to: string;
	lastmod?: string;
}

const staticPages: SitemapEntry[] = [
	{ to: "/" },
	{ to: "/blog" },
	{ to: "/from-the-temple" },
	{ to: "/about" },
	{ to: "/search" },
	{ to: "/rss.xml" }
];

function buildUrl({ to, lastmod }: SitemapEntry): string {
	const loc = `<loc>${BASE_URL}${to}</loc>`;
	const mod = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
	return `<url>${loc}${mod}</url>`;
}

export async function GET(): Promise<Response> {
	const [blogPosts, newsletterPosts] = await Promise.all([getBlogPosts(), getNewsletterPosts()]);

	const allEntries: SitemapEntry[] = [
		...staticPages,
		...blogPosts.map((post) => ({ to: `/blog/${post.slug}`, lastmod: post.date })),
		...newsletterPosts.map((post) => ({
			to: `/from-the-temple/${post.slug}`,
			lastmod: post.date
		}))
	];

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${allEntries.map(buildUrl).join("\n  ")}
</urlset>`,
		{
			headers: {
				"Content-Type": "application/xml"
			}
		}
	);
}
