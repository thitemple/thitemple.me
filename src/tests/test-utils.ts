import { render as baseRender } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import type { ComponentType, SvelteComponent } from "svelte";

/**
 * Custom render function that includes common setup
 */
export function render<T extends SvelteComponent>(
	component: ComponentType<T>,
	options?: Parameters<typeof baseRender>[1]
) {
	const user = userEvent.setup();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = baseRender(component as any, options);

	return {
		...result,
		user
	};
}

/**
 * Creates a mock Response object for testing API endpoints
 */
export function createMockResponse(data: unknown, status = 200, statusText = "OK") {
	return new Response(JSON.stringify(data), {
		status,
		statusText,
		headers: {
			"Content-Type": "application/json"
		}
	});
}

/**
 * Creates a mock XML Response for testing RSS/sitemap endpoints
 */
export function createMockXMLResponse(xml: string, status = 200, statusText = "OK") {
	return new Response(xml, {
		status,
		statusText,
		headers: {
			"Content-Type": "application/xml"
		}
	});
}

/**
 * Mock fetch function for testing
 */
export function createMockFetch(response: Response) {
	return vi.fn().mockResolvedValue(response);
}

/**
 * Helper to create mock URL search params
 */
export function createMockSearchParams(params: Record<string, string> = {}) {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		searchParams.set(key, value);
	});
	return searchParams;
}

/**
 * Mock SvelteKit request object
 */
export function createMockRequest(searchParams: Record<string, string> = {}) {
	return {
		url: {
			searchParams: createMockSearchParams(searchParams)
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any; // Type assertion needed for testing - this is a partial mock
}

/**
 * Wait for DOM updates
 */
export function waitFor(fn: () => boolean | Promise<boolean>, timeout = 1000): Promise<void> {
	return new Promise((resolve, reject) => {
		const start = Date.now();
		const check = async () => {
			try {
				const result = await fn();
				if (result) {
					resolve();
				} else if (Date.now() - start > timeout) {
					reject(new Error("Timeout waiting for condition"));
				} else {
					setTimeout(check, 10);
				}
			} catch (error) {
				reject(error);
			}
		};
		check();
	});
}

/**
 * Mock localStorage for tests
 */
export function createMockLocalStorage() {
	const store: Record<string, string> = {};
	return {
		getItem: vi.fn((key: string) => store[key] || null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key];
		}),
		clear: vi.fn(() => {
			Object.keys(store).forEach((key) => delete store[key]);
		}),
		key: vi.fn((index: number) => Object.keys(store)[index] || null),
		get length() {
			return Object.keys(store).length;
		}
	};
}

export * from "@testing-library/svelte";
export { userEvent };
