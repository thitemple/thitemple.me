import latest from "$lib/content/latest.generated.json";
import type { Latest } from "$lib/types";

export function load() {
	return { latest: latest as Latest };
}
