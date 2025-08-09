import { beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// Setup MSW server for API mocking in integration tests
export const server = setupServer();

beforeAll(() => {
	server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

// Helper to add test handlers
export function mockApiEndpoint(path: string, response: unknown, status = 200) {
	server.use(
		http.get(path, () => {
			return HttpResponse.json(response as Record<string, unknown>, { status });
		})
	);
}
