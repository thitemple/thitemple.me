import { redirect } from "@sveltejs/kit";

export async function load({ url }) {
	const page = url.searchParams.get("page");
	const target = page ? `/writing?page=${page}` : "/writing";
	redirect(301, target);
}
