import type { Post } from "$lib/types";
import { error } from "@sveltejs/kit";
import * as config from "$lib/config";

export async function load({ params }) {
	try {
		const post = await import(`../../../posts/${params.slug}/index.md`);

		if (!post.metadata) {
			error(404, `Could not find post: ${params.slug}`);
		}

		const url = `${config.url}/blog/${params.slug}`;

		return {
			content: post.default,
			meta: { ...post.metadata, url },
			cover: post.cover
		} as {
			content: ConstructorOfATypedSvelteComponent;
			meta: Post & { url: string };
			cover?: string;
		};
	} catch (e) {
		console.error("Error getting the post", e);
		error(404, `Could not find post ${params.slug}`);
	}
}
