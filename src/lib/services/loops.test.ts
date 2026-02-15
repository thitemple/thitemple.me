import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
	const updateContact = vi.fn();
	const loopsClient = vi.fn(() => ({ updateContact }));

	class MockAPIError extends Error {
		statusCode: number;
		json: { message?: string } | null;

		constructor(statusCode: number, json: { message?: string } | null) {
			super("API Error");
			this.statusCode = statusCode;
			this.json = json;
		}
	}

	return {
		updateContact,
		loopsClient,
		MockAPIError
	};
});

vi.mock("loops", () => ({
	LoopsClient: mocks.loopsClient,
	APIError: mocks.MockAPIError
}));

describe("Loops Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.resetModules();
	});

	it("successfully updates a contact in loops", async () => {
		vi.doMock("$env/static/private", () => ({
			LOOPS_API_KEY: "test-loops-api-key"
		}));

		mocks.updateContact.mockResolvedValueOnce({ success: true, id: "contact-123" });

		const { subscribeToNewsletter } = await import("./loops");

		await expect(subscribeToNewsletter("test@example.com")).resolves.toBeUndefined();

		expect(mocks.loopsClient).toHaveBeenCalledWith("test-loops-api-key");
		expect(mocks.updateContact).toHaveBeenCalledWith({ email: "test@example.com" });
	});

	it("throws when LOOPS_API_KEY is missing", async () => {
		vi.doMock("$env/static/private", () => ({
			LOOPS_API_KEY: undefined
		}));

		const { subscribeToNewsletter } = await import("./loops");

		await expect(subscribeToNewsletter("test@example.com")).rejects.toThrow(
			"Missing required environment variable: LOOPS_API_KEY"
		);
		expect(mocks.loopsClient).not.toHaveBeenCalled();
	});

	it("normalizes SDK API errors", async () => {
		vi.doMock("$env/static/private", () => ({
			LOOPS_API_KEY: "test-loops-api-key"
		}));

		const { APIError } = await import("loops");
		mocks.updateContact.mockRejectedValueOnce(
			new APIError(400, { success: false, message: "Invalid email address" })
		);

		const { subscribeToNewsletter } = await import("./loops");

		await expect(subscribeToNewsletter("invalid")).rejects.toThrow(
			"Failed to update contact: Invalid email address (status 400)"
		);
	});

	it("normalizes unknown provider errors", async () => {
		vi.doMock("$env/static/private", () => ({
			LOOPS_API_KEY: "test-loops-api-key"
		}));

		mocks.updateContact.mockRejectedValueOnce(new Error("Network error"));

		const { subscribeToNewsletter } = await import("./loops");

		await expect(subscribeToNewsletter("test@example.com")).rejects.toThrow(
			"Failed to update contact: Network error"
		);
	});
});
