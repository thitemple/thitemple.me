import { render as baseRender } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

/**
 * Custom render function that includes common setup
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function render(component: any, options?: any) {
	const user = userEvent.setup();
	const result = baseRender(component, options);

	return {
		...result,
		user
	};
}

export * from "@testing-library/svelte";
export { userEvent };
