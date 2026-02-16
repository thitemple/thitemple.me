import type { ContentType, Post } from "./types";

type File = {
	metadata: Omit<Post, "slug" | "readTime" | "cover" | "type"> & { type?: ContentType };
	default: { [key: string]: unknown }; // Svelte 5 component
	cover?: string; // Cover image exported from the markdown module
};

const contentModules = import.meta.glob("/src/content/{blog,newsletter}/**/*.md", { eager: true });

export async function getPosts() {
	return buildPosts();
}

export async function getBlogPosts() {
	return getPostsByType("article");
}

export async function getNewsletterPosts() {
	return getPostsByType("newsletter");
}

function isFile(file: unknown): file is File {
	return !!file && typeof file === "object" && "metadata" in file && "default" in file;
}

function getPostsByType(type: ContentType) {
	return buildPosts().filter((post) => post.type === type);
}

function buildPosts() {
	return Object.entries(contentModules)
		.map(([path, file]) => parsePost(path, file))
		.filter((post): post is Post => post !== null)
		.sort((first, second) =>
			new Date(first.date).getTime() > new Date(second.date).getTime() ? -1 : 1
		);
}

function parsePost(path: string, file: unknown): Post | null {
	const slug = path.split("/").at(-2)?.replace(".md", "");
	if (!isFile(file) || !slug) {
		return null;
	}

	const metadata = file.metadata as Omit<Post, "slug" | "readTime" | "type"> & {
		type?: ContentType;
	};
	const readTime = estimateReadingTime(metadata.description || "");
	const type = resolveContentType(path, metadata.type);
	const post = { ...metadata, slug, readTime, cover: file.cover, type } satisfies Post;

	return post.published ? post : null;
}

function resolveContentType(path: string, type?: ContentType): ContentType {
	if (type) {
		return type;
	}

	return path.includes("/content/newsletter/") ? "newsletter" : "article";
}

function estimateReadingTime(description: string) {
	// Fallback estimation based on description
	// In a real migration, you might want to preprocess content differently
	const wpm = 265;
	const words = Math.max(description.trim().split(/\s+/).length * 10, 500); // Estimate based on description
	return Math.ceil(words / wpm);
}
