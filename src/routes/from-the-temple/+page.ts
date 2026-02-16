import { getNewsletterPosts } from "$lib/posts";

export async function load() {
	const posts = await getNewsletterPosts();
	return { posts };
}
