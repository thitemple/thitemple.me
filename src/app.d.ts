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
			(command: string, type: string, options?: any): void;
			fn?: {
				renderEmbeddedForm?: (data: any) => void;
				jsonpRequest?: (url: string, callback: (data: any) => void) => void;
			};
		};
	}
}

export {};
