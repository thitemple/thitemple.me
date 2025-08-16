import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./+server";
import * as mailerliteModule from "$lib/services/mailerlite";

// Mock the mailerlite service
vi.mock("$lib/services/mailerlite");

describe("Newsletter API Endpoint", () => {
	const mockSubscribeToNewsletter = vi.mocked(mailerliteModule.subscribeToNewsletter);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("POST /api/newsletter", () => {
		it("should successfully subscribe a new user with valid email", async () => {
			mockSubscribeToNewsletter.mockResolvedValueOnce({ isNew: true });

			const mockRequest = {
				json: async () => ({ email: "test@example.com" })
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = await POST({ request: mockRequest } as any);
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data).toEqual({
				success: true,
				isNew: true,
				email: "test@example.com"
			});

			expect(mockSubscribeToNewsletter).toHaveBeenCalledWith("test@example.com");
		});

		it("should successfully handle existing subscriber", async () => {
			mockSubscribeToNewsletter.mockResolvedValueOnce({ isNew: false });

			const mockRequest = {
				json: async () => ({ email: "existing@example.com" })
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = await POST({ request: mockRequest } as any);
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data).toEqual({
				success: true,
				isNew: false,
				email: "existing@example.com"
			});
		});

		it("should return 400 for invalid email format", async () => {
			const mockRequest = {
				json: async () => ({ email: "invalid-email" })
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = await POST({ request: mockRequest } as any);
			const data = await response.json();

			expect(response.status).toBe(400);
			expect(data).toEqual({
				success: false,
				error: "Please enter a valid email address"
			});

			// Service should not be called for invalid email
			expect(mockSubscribeToNewsletter).not.toHaveBeenCalled();
		});

		it("should return 400 for missing email", async () => {
			const mockRequest = {
				json: async () => ({})
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = await POST({ request: mockRequest } as any);
			const data = await response.json();

			expect(response.status).toBe(400);
			expect(data.success).toBe(false);
			expect(data.error).toBeDefined();

			expect(mockSubscribeToNewsletter).not.toHaveBeenCalled();
		});

		it("should handle service errors gracefully", async () => {
			mockSubscribeToNewsletter.mockRejectedValueOnce(
				new Error("Failed to create subscriber: Invalid API key")
			);

			const mockRequest = {
				json: async () => ({ email: "test@example.com" })
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = await POST({ request: mockRequest } as any);
			const data = await response.json();

			expect(response.status).toBe(500);
			expect(data).toEqual({
				success: false,
				error: "Failed to subscribe. Please try again."
			});
		});

		it("should handle malformed JSON in request", async () => {
			const mockRequest = {
				json: async () => {
					throw new Error("Invalid JSON");
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = await POST({ request: mockRequest } as any);
			const data = await response.json();

			expect(response.status).toBe(500);
			expect(data.success).toBe(false);
			expect(data.error).toBeDefined();
		});

		it("should validate email with leading/trailing spaces", async () => {
			const mockRequest = {
				json: async () => ({ email: "  test@example.com  " })
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = await POST({ request: mockRequest } as any);
			const data = await response.json();

			// Zod validation should fail for email with spaces
			expect(response.status).toBe(400);
			expect(data.success).toBe(false);
			expect(data.error).toBeDefined();

			expect(mockSubscribeToNewsletter).not.toHaveBeenCalled();
		});

		it("should handle empty email string", async () => {
			const mockRequest = {
				json: async () => ({ email: "" })
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = await POST({ request: mockRequest } as any);
			const data = await response.json();

			expect(response.status).toBe(400);
			expect(data.success).toBe(false);
			expect(data.error).toBeDefined();

			expect(mockSubscribeToNewsletter).not.toHaveBeenCalled();
		});
	});
});
