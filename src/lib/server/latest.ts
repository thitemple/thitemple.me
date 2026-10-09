import type { Latest, LatestItem } from "$lib/types";

const YOUTUBE_CHANNEL_ID = "UCqU1CiWNrRJhTSIcZFPhqRA";
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const RECIPES_URL = "https://mrfoodprogrammer.com/recipes";
const SUBSTACK_FEED_URL = "https://foodprogrammerlog.substack.com/feed";
const USER_AGENT = "Mozilla/5.0 (compatible; thitemple-me/1.0)";
const TIMEOUT_MS = 5000;

type Fetch = typeof fetch;

async function fetchText(fetcher: Fetch, url: string): Promise<string> {
	const response = await fetcher(url, {
		headers: { "user-agent": USER_AGENT },
		signal: AbortSignal.timeout(TIMEOUT_MS)
	});
	if (!response.ok) throw new Error(`${url} responded with ${response.status}`);
	return response.text();
}

function decodeEntities(value: string): string {
	return value
		.replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&");
}

function metaTagContent(html: string, property: string): string | undefined {
	const match = new RegExp(`<meta property="${property}" content="([^"]*)"`).exec(html);
	return match?.[1] ? decodeEntities(match[1]) : undefined;
}

async function fetchLatestVideo(fetcher: Fetch): Promise<LatestItem | null> {
	const feedXml = await fetchText(fetcher, YOUTUBE_FEED_URL);
	const entries = [...feedXml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1] ?? "");

	for (const entry of entries) {
		const url = /<link rel="alternate" href="([^"]+)"/.exec(entry)?.[1];
		// Shorts link to /shorts/..., so this skips them.
		if (!url?.includes("/watch?v=")) continue;

		const title = /<media:title>([^<]+)<\/media:title>/.exec(entry)?.[1];
		const image = /<media:thumbnail url="([^"]+)"/.exec(entry)?.[1];
		if (!title || !image) continue;

		return {
			kicker: "Newest video",
			title: decodeEntities(title).replace(/\s+/g, " ").trim(),
			meta: "YouTube",
			url,
			image
		};
	}

	return null;
}

async function fetchLatestRecipe(fetcher: Fetch): Promise<LatestItem | null> {
	const listingHtml = await fetchText(fetcher, RECIPES_URL);
	const slug = /href="https:\/\/mrfoodprogrammer\.com\/recipes\/([a-z0-9-]+)"/.exec(
		listingHtml
	)?.[1];
	if (!slug) throw new Error("Could not find a recipe link on the recipes listing page");

	const url = `https://mrfoodprogrammer.com/recipes/${slug}`;
	const recipeHtml = await fetchText(fetcher, url);
	const title = metaTagContent(recipeHtml, "og:title");
	if (!title) throw new Error(`No og:title found on ${url}`);

	return {
		kicker: "Latest recipe",
		title,
		meta: "mrfoodprogrammer.com",
		url,
		image: metaTagContent(recipeHtml, "og:image") ?? null
	};
}

async function fetchLatestNewsletterPost(fetcher: Fetch): Promise<LatestItem | null> {
	const feedXml = await fetchText(fetcher, SUBSTACK_FEED_URL);
	const itemXml = /<item>([\s\S]*?)<\/item>/.exec(feedXml)?.[1];
	if (!itemXml) return null;

	const title = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/.exec(itemXml)?.[1];
	const url = /<link>\s*([^<\s]+)\s*<\/link>/.exec(itemXml)?.[1];
	if (!title || !url) return null;

	return {
		kicker: "From the newsletter",
		title: decodeEntities(title).trim(),
		meta: "Substack",
		url,
		image: /<enclosure[^>]*url="([^"]+)"/.exec(itemXml)?.[1] ?? null
	};
}

async function settle(
	name: string,
	task: Promise<LatestItem | null>,
	fallback: LatestItem | null
): Promise<LatestItem | null> {
	try {
		return (await task) ?? fallback;
	} catch (error) {
		console.warn(`[latest] ${name} unavailable, using fallback:`, error);
		return fallback;
	}
}

/**
 * Fetches the newest video, recipe, and newsletter post. A source that fails keeps the
 * value from `fallback` (the committed snapshot) so one outage never blanks a card.
 */
export async function fetchLatest(fetcher: Fetch, fallback: Latest): Promise<Latest> {
	const [video, recipe, newsletter] = await Promise.all([
		settle("video", fetchLatestVideo(fetcher), fallback.video),
		settle("recipe", fetchLatestRecipe(fetcher), fallback.recipe),
		settle("newsletter", fetchLatestNewsletterPost(fetcher), fallback.newsletter)
	]);

	return { video, recipe, newsletter };
}
