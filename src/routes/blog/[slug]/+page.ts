import type { Post } from "$lib/types";
import { error } from "@sveltejs/kit";
import * as config from "$lib/config";

export async function load({ params }) {
	// Since all posts have been moved/removed, always return 404
	error(404, `Post "${params.slug}" not found. The blog is currently being updated with new content.`);
}
