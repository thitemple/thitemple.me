// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		ml?: {
			(command: string, type: string, options?: Record<string, unknown>): void;
			fn?: {
				renderEmbeddedForm?: (data: Record<string, unknown>) => void;
				jsonpRequest?: (url: string, callback: (data: Record<string, unknown>) => void) => void;
			};
		};
	}
}

export {};
