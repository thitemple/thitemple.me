import type { Post } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Component } from "svelte";

interface PostModule {
	metadata: Omit<Post, "slug"> & { readTime?: number };
	default: Component;
}

export const load: PageLoad = async ({ params, url }) => {
	try {
		const modules = import.meta.glob("/src/posts/**/*.md");

		let matchedPost: PostModule | null = null;
		for (const path in modules) {
			if (path.includes(`/${params.slug}/`) || path.endsWith(`/${params.slug}.md`)) {
				const module = modules[path];
				if (module) {
					matchedPost = (await module()) as PostModule;
					break;
				}
			}
		}

		if (!matchedPost || !matchedPost.metadata) {
			error(404, `Post "${params.slug}" not found`);
		}

		const meta: Post = {
			...matchedPost.metadata,
			slug: params.slug,
			readTime: matchedPost.metadata.readTime || 5
		};

		return {
			content: matchedPost.default,
			meta,
			cover: matchedPost.metadata.cover,
			url: url.pathname
		};
	} catch {
		error(404, `Post "${params.slug}" not found`);
	}
};
