import type { PaginatedPosts } from "./api/posts/types.js";

export async function load({ fetch }) {
	const response = await fetch("/api/posts?page=1");
	const { data } = (await response.json()) as PaginatedPosts;
	return { posts: data.slice(0, 4) };
}
