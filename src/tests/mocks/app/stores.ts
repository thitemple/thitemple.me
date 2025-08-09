import { readable } from "svelte/store";
import type { Navigation, Page } from "@sveltejs/kit";

export const page = readable<Page>({
	url: new URL("http://localhost"),
	params: {},
	route: {
		id: "/"
	} as Page["route"],
	error: null,
	data: {},
	form: undefined,
	state: {}
} as Page);

export const navigating = readable<Navigation | null>(null);

export const updated = {
	subscribe: () => () => {},
	check: async () => false
};
