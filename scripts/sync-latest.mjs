import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const outputPath = resolve(repoRoot, "src/lib/content/latest.generated.json");

const USER_AGENT = "Mozilla/5.0 (compatible; thitemple-build/1.0)";
const YOUTUBE_CHANNEL_ID = "UCqU1CiWNrRJhTSIcZFPhqRA";
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const RECIPES_URL = "https://mrfoodprogrammer.com/recipes";
const SUBSTACK_FEED_URL = "https://foodprogrammerlog.substack.com/feed";

async function fetchText(url) {
	const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
	if (!response.ok) throw new Error(`${url} responded with ${response.status}`);
	return response.text();
}

function metaTagContent(html, property) {
	const match = new RegExp(`<meta property="${property}" content="([^"]*)"`).exec(html);
	return match?.[1];
}

async function fetchLatestVideo() {
	const feedXml = await fetchText(YOUTUBE_FEED_URL);
	const entries = [...feedXml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);

	for (const entry of entries) {
		const linkHref = /<link rel="alternate" href="([^"]+)"/.exec(entry)?.[1];
		if (!linkHref?.includes("/watch?v=")) continue;

		const title = /<media:title>([^<]+)<\/media:title>/.exec(entry)?.[1];
		const thumbnail = /<media:thumbnail url="([^"]+)"/.exec(entry)?.[1];
		if (!title || !thumbnail) continue;

		return {
			kicker: "Newest video",
			title,
			meta: "YouTube",
			url: linkHref,
			image: thumbnail
		};
	}

	return null;
}

async function fetchLatestRecipe() {
	const listingHtml = await fetchText(RECIPES_URL);
	const slugMatch = /href="https:\/\/mrfoodprogrammer\.com\/recipes\/([a-z0-9-]+)"/.exec(
		listingHtml
	);
	if (!slugMatch) throw new Error("Could not find a recipe link on the recipes listing page");

	const url = `https://mrfoodprogrammer.com/recipes/${slugMatch[1]}`;
	const recipeHtml = await fetchText(url);
	const title = metaTagContent(recipeHtml, "og:title");
	const image = metaTagContent(recipeHtml, "og:image");
	if (!title) throw new Error(`No og:title found on ${url}`);

	return {
		kicker: "Latest recipe",
		title,
		meta: "mrfoodprogrammer.com",
		url,
		image: image ?? null
	};
}

async function fetchLatestNewsletterPost() {
	const feedXml = await fetchText(SUBSTACK_FEED_URL);
	const itemXml = /<item>([\s\S]*?)<\/item>/.exec(feedXml)?.[1];
	if (!itemXml) return null;

	const title = /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/.exec(itemXml)?.[1];
	const url = /<link>([^<]+)<\/link>/.exec(itemXml)?.[1];
	if (!title || !url) return null;

	const image = /<enclosure url="([^"]+)"/.exec(itemXml)?.[1] ?? null;

	return {
		kicker: "From the newsletter",
		title,
		meta: "Substack",
		url,
		image
	};
}

async function fetchSource(name, fetcher) {
	try {
		return await fetcher();
	} catch (error) {
		console.warn(`[sync-latest] ${name} unavailable: ${error.message}`);
		return null;
	}
}

async function main() {
	const [video, recipe, newsletter] = await Promise.all([
		fetchSource("video", fetchLatestVideo),
		fetchSource("recipe", fetchLatestRecipe),
		fetchSource("newsletter", fetchLatestNewsletterPost)
	]);

	const latest = { video, recipe, newsletter };

	mkdirSync(dirname(outputPath), { recursive: true });
	writeFileSync(outputPath, JSON.stringify(latest, null, "\t") + "\n");
	console.info(`[sync-latest] Wrote ${outputPath}`);
}

main();
