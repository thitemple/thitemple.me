import { getPosts } from "$lib/posts";
import { redirect } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = async () => {
	const posts = await getPosts();
	return posts.map(({ slug }) => ({ slug }));
};

export const load: PageLoad = async ({ params }) => {
	redirect(301, `/writing/${params.slug}`);
};
