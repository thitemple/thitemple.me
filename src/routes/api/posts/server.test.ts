import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./+server";
import { getPosts } from "$lib/posts";
import { createPosts } from "../../../tests/factories/post.factory";
import { createMockRequest } from "../../../tests/test-utils";
import type { Post } from "$lib/types";

// Mock the getPosts function
vi.mock("$lib/posts", () => ({
	getPosts: vi.fn()
}));

const mockGetPosts = vi.mocked(getPosts);

describe("/api/posts endpoint", () => {
	let mockPosts: Post[];

	beforeEach(() => {
		vi.clearAllMocks();
		mockPosts = createPosts(12); // Create 12 posts for pagination testing
		mockGetPosts.mockResolvedValue(mockPosts);
	});

	describe("GET request", () => {
		it("should return first page with default pagination", async () => {
			const request = createMockRequest();
			const response = await GET(request);

			expect(response).toBeInstanceOf(Response);
			expect(response.status).toBe(200);

			const data = await response.json();

			expect(data).toHaveProperty("data");
			expect(data).toHaveProperty("pageInfo");
			expect(data.data).toHaveLength(5); // Default page size
			expect(data.pageInfo).toEqual({
				currentPage: 1,
				total: 12,
				totalPages: 3,
				nextPage: 2,
				previousPage: undefined
			});
		});

		it("should handle custom page parameter", async () => {
			const request = createMockRequest({ page: "2" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(5);
			expect(data.pageInfo).toEqual({
				currentPage: 2,
				total: 12,
				totalPages: 3,
				nextPage: 3,
				previousPage: 1
			});

			// Should return posts 6-10 (0-indexed: 5-9)
			expect(data.data[0]).toEqual(mockPosts[5]);
			expect(data.data[4]).toEqual(mockPosts[9]);
		});

		it("should handle custom pageSize parameter", async () => {
			const request = createMockRequest({ pageSize: "3" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(3);
			expect(data.pageInfo).toEqual({
				currentPage: 1,
				total: 12,
				totalPages: 4, // 12 posts / 3 per page = 4 pages
				nextPage: 2,
				previousPage: undefined
			});
		});

		it("should handle both page and pageSize parameters", async () => {
			const request = createMockRequest({ page: "2", pageSize: "4" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(4);
			expect(data.pageInfo).toEqual({
				currentPage: 2,
				total: 12,
				totalPages: 3, // 12 posts / 4 per page = 3 pages
				nextPage: 3,
				previousPage: 1
			});

			// Should return posts 5-8 (0-indexed: 4-7)
			expect(data.data[0]).toEqual(mockPosts[4]);
			expect(data.data[3]).toEqual(mockPosts[7]);
		});

		it("should handle last page correctly", async () => {
			const request = createMockRequest({ page: "3", pageSize: "5" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(2); // Last page has 2 remaining posts
			expect(data.pageInfo).toEqual({
				currentPage: 3,
				total: 12,
				totalPages: 3,
				nextPage: undefined, // No next page
				previousPage: 2
			});
		});

		it("should handle page beyond available content", async () => {
			const request = createMockRequest({ page: "10" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(0);
			expect(data.pageInfo).toEqual({
				currentPage: 10,
				total: 12,
				totalPages: 3,
				nextPage: undefined,
				previousPage: 9
			});
		});

		it("should handle empty posts array", async () => {
			mockGetPosts.mockResolvedValue([]);

			const request = createMockRequest();
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(0);
			expect(data.pageInfo).toEqual({
				currentPage: 1,
				total: 0,
				totalPages: 0,
				nextPage: undefined,
				previousPage: undefined
			});
		});

		it("should validate and transform invalid page parameter", async () => {
			const request = createMockRequest({ page: "invalid" });
			const response = await GET(request);
			const data = await response.json();

			// Zod transforms invalid values to 1, and with 12 mock posts we should get results
			expect(data.pageInfo.currentPage).toBe(1);
			expect(data.data.length).toBeGreaterThan(0);
		});

		it("should validate and transform invalid pageSize parameter", async () => {
			const request = createMockRequest({ pageSize: "invalid" });
			const response = await GET(request);
			const data = await response.json();

			// Zod transforms invalid pageSize to 5 (default), and with 12 mock posts we should get results
			expect(data.data.length).toBe(5); // First page with 5 items
			expect(data.pageInfo.totalPages).toBe(3); // 12 posts / 5 per page = 3 pages (rounded up)
		});

		it("should handle float page numbers", async () => {
			const request = createMockRequest({ page: "2.7", pageSize: "3.9" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.pageInfo.currentPage).toBe(2); // Should parse as integer
			expect(data.data.length).toBeLessThanOrEqual(3); // Should parse as integer
		});

		it("should handle very large page numbers", async () => {
			const request = createMockRequest({ page: "999999" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(0);
			expect(data.pageInfo.currentPage).toBe(999999);
			expect(data.pageInfo.nextPage).toBeUndefined();
		});

		it("should handle very large page sizes", async () => {
			const request = createMockRequest({ pageSize: "1000" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(mockPosts.length); // All posts
			expect(data.pageInfo.totalPages).toBe(1);
			expect(data.pageInfo.nextPage).toBeUndefined();
		});

		it("should maintain post order from getPosts", async () => {
			const request = createMockRequest();
			const response = await GET(request);

			const data = await response.json();

			// First 5 posts should match the first 5 from mockPosts
			for (let i = 0; i < 5; i++) {
				expect(data.data[i]).toEqual(mockPosts[i]);
			}
		});

		it("should include all required post properties", async () => {
			const request = createMockRequest();
			const response = await GET(request);

			const data = await response.json();
			const firstPost = data.data[0];

			expect(firstPost).toHaveProperty("title");
			expect(firstPost).toHaveProperty("slug");
			expect(firstPost).toHaveProperty("description");
			expect(firstPost).toHaveProperty("summary");
			expect(firstPost).toHaveProperty("date");
			expect(firstPost).toHaveProperty("categories");
			expect(firstPost).toHaveProperty("published");
			expect(firstPost).toHaveProperty("readTime");
			expect(firstPost).toHaveProperty("cover");

			expect(typeof firstPost.title).toBe("string");
			expect(typeof firstPost.slug).toBe("string");
			expect(typeof firstPost.description).toBe("string");
			expect(typeof firstPost.summary).toBe("string");
			expect(typeof firstPost.date).toBe("string");
			expect(Array.isArray(firstPost.categories)).toBe(true);
			expect(typeof firstPost.published).toBe("boolean");
			expect(typeof firstPost.readTime).toBe("number");
		});

		it("should handle getPosts throwing an error", async () => {
			mockGetPosts.mockRejectedValue(new Error("Database error"));

			const request = createMockRequest();

			await expect(GET(request)).rejects.toThrow("Database error");
		});

		it("should handle single post scenario", async () => {
			mockGetPosts.mockResolvedValue([mockPosts[0]!]);

			const request = createMockRequest();
			const response = await GET(request);

			const data = await response.json();

			expect(data.data).toHaveLength(1);
			expect(data.pageInfo).toEqual({
				currentPage: 1,
				total: 1,
				totalPages: 1,
				nextPage: undefined,
				previousPage: undefined
			});
		});

		it("should handle exact page size match", async () => {
			// 10 posts with page size 5 = exactly 2 pages
			const exactPosts = createPosts(10);
			mockGetPosts.mockResolvedValue(exactPosts);

			const request = createMockRequest({ pageSize: "5" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.pageInfo).toEqual({
				currentPage: 1,
				total: 10,
				totalPages: 2,
				nextPage: 2,
				previousPage: undefined
			});
		});

		it("should set correct response headers", async () => {
			const request = createMockRequest();
			const response = await GET(request);

			expect(response.headers.get("content-type")).toContain("application/json");
		});

		it("should handle missing search params gracefully", async () => {
			const request = {
				url: {
					searchParams: new URLSearchParams() // Empty search params
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			const response = await GET(request);
			const data = await response.json();

			expect(data.pageInfo.currentPage).toBe(1);
			expect(data.data).toHaveLength(Math.min(5, mockPosts.length));
		});
	});

	describe("Zod validation edge cases", () => {
		it("should handle string numbers correctly", async () => {
			const request = createMockRequest({ page: "3", pageSize: "7" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.pageInfo.currentPage).toBe(3);
			expect(data.data.length).toBeLessThanOrEqual(7);
		});

		it("should handle empty string parameters", async () => {
			const request = createMockRequest({ page: "", pageSize: "" });
			const response = await GET(request);

			const data = await response.json();

			expect(data.pageInfo.currentPage).toBe(1);
			expect(data.data.length).toBeLessThanOrEqual(5);
		});

		it("should handle undefined parameters", async () => {
			const request = {
				url: {
					searchParams: new URLSearchParams()
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			const response = await GET(request);

			expect(response).toBeInstanceOf(Response);
			expect(response.status).toBe(200);
		});
	});
});
