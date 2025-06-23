import type { Post } from "./types";

type File = {
	metadata: Omit<Post, "slug" | "readTime" | "cover">;
	default: { [key: string]: unknown }; // Svelte 5 component
	cover?: string;
};

export async function getPosts() {
	let posts: Post[] = [];
	const paths = import.meta.glob("/src/posts/**/*.md", { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-2)?.replace(".md", "");

		if (isFile(file) && slug) {
			const metadata = file.metadata as Omit<Post, "slug" | "readTime">;
			// For Svelte 5, we'll use a different approach to get content
			// Since render() is not available in the same way, we'll estimate based on metadata
			const readTime = estimateReadingTime(metadata.description || "");
			const post = { ...metadata, slug, readTime, cover: file.cover } satisfies Post;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort((first, second) =>
		new Date(first.date).getTime() > new Date(second.date).getTime() ? -1 : 1
	);

	return posts;
}

function isFile(file: unknown): file is File {
	return !!file && typeof file === "object" && "metadata" in file && "default" in file;
}

function estimateReadingTime(description: string) {
	// Fallback estimation based on description
	// In a real migration, you might want to preprocess content differently
	const wpm = 265;
	const words = Math.max(description.trim().split(/\s+/).length * 10, 500); // Estimate based on description
	return Math.ceil(words / wpm);
}
