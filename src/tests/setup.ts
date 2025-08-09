import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";
import { readable } from "svelte/store";
import type { Navigation, Page } from "@sveltejs/kit";

// Mock SvelteKit stores
vi.mock("$app/stores", () => ({
	page: readable({
		url: new URL("http://localhost"),
		params: {},
		route: {
			id: "/"
		},
		error: null,
		data: {},
		form: undefined,
		state: {}
	} as Page),
	navigating: readable(null as Navigation | null),
	updated: {
		subscribe: vi.fn(),
		check: vi.fn()
	}
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem(key: string) {
			return store[key] || null;
		},
		setItem(key: string, value: string) {
			store[key] = value.toString();
		},
		removeItem(key: string) {
			delete store[key];
		},
		clear() {
			store = {};
		}
	};
})();

Object.defineProperty(window, "localStorage", {
	value: localStorageMock
});

// Clean up after each test
afterEach(() => {
	localStorageMock.clear();
	document.body.innerHTML = "";
	vi.clearAllMocks();
});
