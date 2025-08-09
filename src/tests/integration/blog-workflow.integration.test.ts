import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPosts } from "$lib/posts";
import { GET as postsAPI } from "../../routes/api/posts/+server";
import { GET as rssEndpoint } from "../../routes/rss.xml/+server";
import { GET as sitemapEndpoint } from "../../routes/sitemap.xml/+server";
import { createPosts } from "../factories/post.factory";
import { createMockRequest } from "../test-utils";
import type { Post } from "$lib/types";

// Mock the posts data at the module level
const mockPosts = createPosts(15, {
	published: true
});

// Mock the import.meta.glob for posts
vi.mock("$lib/posts", async (importOriginal) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const original = (await importOriginal()) as any;
	return {
		...original,
		getPosts: vi.fn().mockResolvedValue(mockPosts)
	};
});

describe("Blog Workflow Integration Tests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Full blog post workflow", () => {
		it("should provide consistent post data across all endpoints", async () => {
			// Test that getPosts returns the expected data
			const posts = await getPosts();
			expect(posts).toHaveLength(15);
			expect(posts[0]).toHaveProperty("slug");
			expect(posts[0]).toHaveProperty("title");
			expect(posts[0]).toHaveProperty("published", true);

			// Test that the API endpoint uses the same data
			const apiResponse = await postsAPI(createMockRequest());
			const apiData = await apiResponse.json();

			expect(apiData.data).toHaveLength(5); // First page, default page size
			expect(apiData.data[0].slug).toBe(posts[0]!.slug);
			expect(apiData.data[0].title).toBe(posts[0]!.title);

			// Test that RSS endpoint includes the same posts
			const rssResponse = await rssEndpoint();
			const rssXml = await rssResponse.text();

			posts.forEach((post) => {
				expect(rssXml).toContain(post.title);
				expect(rssXml).toContain(post.slug);
			});

			// Test that sitemap includes all post URLs
			const sitemapResponse = await sitemapEndpoint();
			const sitemapXml = await sitemapResponse.text();

			posts.forEach((post) => {
				expect(sitemapXml).toContain(`/blog/${post.slug}`);
			});
		});

		it("should handle pagination correctly across multiple API calls", async () => {
			// Test first page
			const page1Response = await postsAPI(createMockRequest({ page: "1", pageSize: "5" }));
			const page1Data = await page1Response.json();

			expect(page1Data.data).toHaveLength(5);
			expect(page1Data.pageInfo.currentPage).toBe(1);
			expect(page1Data.pageInfo.totalPages).toBe(3);
			expect(page1Data.pageInfo.nextPage).toBe(2);

			// Test second page
			const page2Response = await postsAPI(createMockRequest({ page: "2", pageSize: "5" }));
			const page2Data = await page2Response.json();

			expect(page2Data.data).toHaveLength(5);
			expect(page2Data.pageInfo.currentPage).toBe(2);
			expect(page2Data.pageInfo.previousPage).toBe(1);
			expect(page2Data.pageInfo.nextPage).toBe(3);

			// Test last page
			const page3Response = await postsAPI(createMockRequest({ page: "3", pageSize: "5" }));
			const page3Data = await page3Response.json();

			expect(page3Data.data).toHaveLength(5); // 15 total posts, 5 per page = 5 on last page
			expect(page3Data.pageInfo.currentPage).toBe(3);
			expect(page3Data.pageInfo.previousPage).toBe(2);
			expect(page3Data.pageInfo.nextPage).toBeUndefined();

			// Verify no duplicate posts across pages
			const allSlugs = [
				...page1Data.data.map((p: Post) => p.slug),
				...page2Data.data.map((p: Post) => p.slug),
				...page3Data.data.map((p: Post) => p.slug)
			];
			const uniqueSlugs = new Set(allSlugs);
			expect(uniqueSlugs.size).toBe(allSlugs.length); // No duplicates
		});

		it("should maintain consistent post sorting across all endpoints", async () => {
			const posts = await getPosts();

			// Verify posts are sorted by date (newest first)
			for (let i = 0; i < posts.length - 1; i++) {
				const currentDate = new Date(posts[i]!.date).getTime();
				const nextDate = new Date(posts[i + 1]!.date).getTime();
				expect(currentDate).toBeGreaterThanOrEqual(nextDate);
			}

			// Verify API maintains the same order
			const apiResponse = await postsAPI(createMockRequest({ pageSize: "15" }));
			const apiData = await apiResponse.json();

			for (let i = 0; i < apiData.data.length - 1; i++) {
				const currentDate = new Date(apiData.data[i].date).getTime();
				const nextDate = new Date(apiData.data[i + 1].date).getTime();
				expect(currentDate).toBeGreaterThanOrEqual(nextDate);
			}

			// RSS should maintain chronological order
			const rssResponse = await rssEndpoint();
			const rssXml = await rssResponse.text();

			const firstPostIndex = rssXml.indexOf(posts[0]!.title);
			const lastPostIndex = rssXml.indexOf(posts[posts.length - 1]!.title);
			expect(firstPostIndex).toBeLessThan(lastPostIndex);
		});
	});

	describe("Error handling and edge cases", () => {
		it("should handle empty post collection gracefully", async () => {
			vi.mocked(getPosts).mockResolvedValueOnce([]);

			// API should return empty results
			const apiResponse = await postsAPI(createMockRequest());
			const apiData = await apiResponse.json();
			expect(apiData.data).toHaveLength(0);
			expect(apiData.pageInfo.total).toBe(0);

			// RSS should still be valid XML
			const rssResponse = await rssEndpoint();
			const rssXml = await rssResponse.text();
			expect(rssResponse.status).toBe(200);
			expect(rssXml).toContain("<rss");
			expect(rssXml).not.toContain("<item>");

			// Sitemap should still include nav pages
			const sitemapResponse = await sitemapEndpoint();
			const sitemapXml = await sitemapResponse.text();
			expect(sitemapResponse.status).toBe(200);
			expect(sitemapXml).toContain("/blog");
			expect(sitemapXml).toContain("/about");
		});

		it("should handle getPosts errors consistently", async () => {
			const testError = new Error("Database connection failed");
			vi.mocked(getPosts).mockRejectedValue(testError);

			// All endpoints should propagate the error
			await expect(postsAPI(createMockRequest())).rejects.toThrow("Database connection failed");
			await expect(rssEndpoint()).rejects.toThrow("Database connection failed");
			await expect(sitemapEndpoint()).rejects.toThrow("Database connection failed");
		});
	});

	describe("Performance and scalability", () => {
		it("should handle large numbers of posts efficiently", async () => {
			const largeBatch = createPosts(100);
			vi.mocked(getPosts).mockResolvedValueOnce(largeBatch);

			const startTime = performance.now();

			// Test API response time
			const apiResponse = await postsAPI(createMockRequest({ pageSize: "10" }));
			const apiData = await apiResponse.json();

			expect(apiData.data).toHaveLength(10);
			expect(apiData.pageInfo.total).toBe(100);

			// Test RSS generation time
			const rssResponse = await rssEndpoint();
			const rssXml = await rssResponse.text();
			expect(rssXml).toContain("<rss");

			// Test sitemap generation time
			const sitemapResponse = await sitemapEndpoint();
			const sitemapXml = await sitemapResponse.text();
			expect(sitemapXml).toContain("<urlset");

			const endTime = performance.now();

			// All operations should complete relatively quickly
			expect(endTime - startTime).toBeLessThan(1000); // Under 1 second
		});

		it("should handle concurrent requests correctly", async () => {
			// Simulate multiple concurrent API requests
			const requests = Array.from({ length: 10 }, (_, i) =>
				postsAPI(createMockRequest({ page: String(i + 1), pageSize: "2" }))
			);

			const responses = await Promise.all(requests);
			const dataPromises = responses.map((r: Response) => r.json());
			const allData = await Promise.all(dataPromises);

			// All requests should succeed
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			allData.forEach((data: any) => {
				expect(data).toHaveProperty("data");
				expect(data).toHaveProperty("pageInfo");
				expect(Array.isArray(data.data)).toBe(true);
			});

			// Verify pagination integrity
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			allData.forEach((data: any, index: number) => {
				expect(data.pageInfo.currentPage).toBe(index + 1);
			});
		});
	});

	describe("Data consistency validation", () => {
		it("should ensure all posts have required fields", async () => {
			const posts = await getPosts();

			posts.forEach((post) => {
				expect(post).toHaveProperty("title");
				expect(post).toHaveProperty("slug");
				expect(post).toHaveProperty("description");
				expect(post).toHaveProperty("summary");
				expect(post).toHaveProperty("date");
				expect(post).toHaveProperty("categories");
				expect(post).toHaveProperty("published");
				expect(post).toHaveProperty("readTime");

				expect(typeof post.title).toBe("string");
				expect(typeof post.slug).toBe("string");
				expect(typeof post.description).toBe("string");
				expect(typeof post.summary).toBe("string");
				expect(typeof post.date).toBe("string");
				expect(Array.isArray(post.categories)).toBe(true);
				expect(typeof post.published).toBe("boolean");
				expect(typeof post.readTime).toBe("number");
			});
		});

		it("should validate API response schema", async () => {
			const response = await postsAPI(createMockRequest());
			const data = await response.json();

			// Validate response structure
			expect(data).toMatchObject({
				data: expect.any(Array),
				pageInfo: {
					currentPage: expect.any(Number),
					total: expect.any(Number),
					totalPages: expect.any(Number)
				}
			});

			// Validate individual post structure in API response
			if (data.data.length > 0) {
				const firstPost = data.data[0];
				expect(firstPost).toHaveProperty("title");
				expect(firstPost).toHaveProperty("slug");
				expect(firstPost).toHaveProperty("readTime");
			}
		});

		it("should validate RSS XML structure", async () => {
			const response = await rssEndpoint();
			const xml = await response.text();

			// Parse XML to validate structure
			const parser = new DOMParser();
			const doc = parser.parseFromString(xml, "application/xml");

			// Check for parsing errors
			const parseError = doc.querySelector("parsererror");
			expect(parseError).toBeNull();

			// Validate RSS structure
			expect(doc.querySelector("rss")).toBeTruthy();
			expect(doc.querySelector("channel")).toBeTruthy();
			expect(doc.querySelector("channel title")).toBeTruthy();
			expect(doc.querySelector("channel description")).toBeTruthy();
			expect(doc.querySelector("channel link")).toBeTruthy();
		});

		it("should validate sitemap XML structure", async () => {
			const response = await sitemapEndpoint();
			const xml = await response.text();

			// Parse XML to validate structure
			const parser = new DOMParser();
			const doc = parser.parseFromString(xml, "application/xml");

			// Check for parsing errors
			const parseError = doc.querySelector("parsererror");
			expect(parseError).toBeNull();

			// Validate sitemap structure
			expect(doc.querySelector("urlset")).toBeTruthy();
			const urls = doc.querySelectorAll("url");
			expect(urls.length).toBeGreaterThan(0);

			// Each URL should have a loc element
			urls.forEach((url) => {
				expect(url.querySelector("loc")).toBeTruthy();
			});
		});
	});

	describe("Content validation", () => {
		it("should ensure all content is properly escaped in XML", async () => {
			const postWithSpecialChars = createPosts(1, {
				title: "Post with & < > \" ' characters",
				description: 'Description with & ampersands and "quotes"',
				slug: "special-chars-post"
			});

			vi.mocked(getPosts).mockResolvedValueOnce(postWithSpecialChars);

			// RSS should escape special characters
			const rssResponse = await rssEndpoint();
			const rssXml = await rssResponse.text();

			expect(rssXml).toContain("&amp;");
			expect(rssXml).toContain("&lt;");
			expect(rssXml).toContain("&gt;");
			expect(rssXml).toContain("&quot;");

			// Sitemap should escape URLs
			const sitemapResponse = await sitemapEndpoint();
			const sitemapXml = await sitemapResponse.text();

			expect(sitemapXml).toContain("special-chars-post");
		});

		it("should handle unicode content correctly", async () => {
			const unicodePost = createPosts(1, {
				title: "Unicode Post: 🚀 café résumé",
				description: "Content with émojis 😀 and ñoño",
				slug: "unicode-post"
			});

			vi.mocked(getPosts).mockResolvedValueOnce(unicodePost);

			// All endpoints should handle unicode
			const apiResponse = await postsAPI(createMockRequest());
			const apiData = await apiResponse.json();
			expect(apiData.data[0].title).toContain("🚀");

			const rssResponse = await rssEndpoint();
			const rssXml = await rssResponse.text();
			expect(rssXml).toContain("🚀");
			expect(rssXml).toContain("émojis");

			const sitemapResponse = await sitemapEndpoint();
			expect(sitemapResponse.status).toBe(200);
		});
	});
});
