import { json } from "@sveltejs/kit";
import type { PaginatedPosts } from "./types.js";
import type { Paginated } from "../types.js";
import { getBlogPosts } from "$lib/posts.js";
import { z } from "zod";

const paramsSchema = z.object({
	page: z
		.string()
		.optional()
		.transform((value = "") => (isNaN(parseInt(value)) ? 1 : parseInt(value))),
	pageSize: z
		.string()
		.optional()
		.transform((value = "") => (isNaN(parseInt(value)) ? 5 : parseInt(value)))
});

export async function GET({ url: { searchParams } }) {
	const { page, pageSize } = paramsSchema.parse(Object.fromEntries(searchParams));

	const posts = await getBlogPosts();
	const hasNextPage = posts.length > page * pageSize;
	const hasPreviousPage = page > 1;
	const pageInfo: Paginated<unknown>["pageInfo"] = {
		currentPage: page,
		total: posts.length,
		totalPages: Math.ceil(posts.length / pageSize),
		nextPage: hasNextPage ? page + 1 : undefined,
		previousPage: hasPreviousPage ? page - 1 : undefined
	};

	const paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

	const response: PaginatedPosts = {
		data: paginatedPosts,
		pageInfo
	};

	return json(response);
}
