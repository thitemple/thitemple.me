import { getPosts } from "$lib/posts";
import type { ContentType, Post } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";
import type { Component } from "svelte";

interface PostModule {
	metadata: Omit<Post, "slug"> & { readTime?: number; type?: ContentType };
	default: Component;
	cover?: string;
}

export const entries: EntryGenerator = async () => {
	const posts = await getPosts();
	return posts.map(({ slug }) => ({ slug }));
};

export const load: PageLoad = async ({ params, url }) => {
	try {
		const modules = import.meta.glob("/src/posts/**/*.md");

		let matchedPost: PostModule | null = null;
		for (const path in modules) {
			const postSlug = path.split("/").at(-2)?.replace(/\.md$/, "");
			const matchesSlug =
				postSlug === params.slug ||
				path.endsWith(`/${params.slug}.md`) ||
				path.endsWith(`/${params.slug}/index.md`);
			if (matchesSlug) {
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
			readTime: matchedPost.metadata.readTime || 5,
			type: matchedPost.metadata.type || "article"
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
