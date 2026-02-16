import { getBlogPosts } from "$lib/posts";

export async function load() {
	const posts = await getBlogPosts();
	return { posts };
}
