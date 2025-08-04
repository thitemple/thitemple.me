import type { PaginatedPosts } from "./api/posts/types.js";

export async function load({ fetch }) {
	const response = await fetch("api/posts");
	const posts = (await response.json()) as PaginatedPosts;

	if (posts.data.length > 0) {
		return { post: posts.data[0] };
	}

	return { post: null };
}
