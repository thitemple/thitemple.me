import { getNewsletterPosts } from "$lib/posts";
import type { Post } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";
import type { Component } from "svelte";

interface PostModule {
	metadata: Omit<Post, "slug" | "type"> & { readTime?: number };
	default: Component;
	cover?: string;
}

const newsletterModules = import.meta.glob("/src/content/newsletter/**/*.md");

export const entries: EntryGenerator = async () => {
	const posts = await getNewsletterPosts();
	return posts.map(({ slug }) => ({ slug }));
};

export const load: PageLoad = async ({ params, url }) => {
	try {
		const matchedPost = await getPostBySlug(params.slug);
		if (!matchedPost || !matchedPost.metadata) {
			error(404, `Post "${params.slug}" not found`);
		}

		const meta: Post = {
			...matchedPost.metadata,
			slug: params.slug,
			readTime: matchedPost.metadata.readTime || 5,
			type: "newsletter"
		};

		return {
			content: matchedPost.default,
			meta,
			cover: matchedPost.cover,
			url: url.pathname
		};
	} catch {
		error(404, `Post "${params.slug}" not found`);
	}
};

async function getPostBySlug(slug: string): Promise<PostModule | null> {
	for (const [path, module] of Object.entries(newsletterModules)) {
		const postSlug = path.split("/").at(-2)?.replace(/\.md$/, "");
		if (postSlug === slug) {
			return (await module()) as PostModule;
		}
	}

	return null;
}
