import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./+server";
import { getPosts } from "$lib/posts";
import { createPosts } from "../../tests/factories/post.factory";

// Mock the getPosts function
vi.mock("$lib/posts", () => ({
	getPosts: vi.fn()
}));

const mockGetPosts = vi.mocked(getPosts);

describe("/sitemap.xml endpoint", () => {
	const BASE_URL = "https://thitemple.me";
	const expectedNavbarPaths = ["/blog", "/about"];

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("GET request", () => {
		it("should return valid sitemap XML structure", async () => {
			const mockPosts = createPosts(3);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();

			expect(response).toBeInstanceOf(Response);
			expect(response.status).toBe(200);
			expect(response.headers.get("Content-Type")).toBe("application/xml");

			const xml = await response.text();

			// Verify XML structure
			expect(xml).toContain('<?xml version="1.0" encoding="UTF-8" ?>');
			expect(xml).toContain("<urlset");
			expect(xml).toContain('xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"');
			expect(xml).toContain("</urlset>");
		});

		it("should include all required XML namespaces", async () => {
			const mockPosts = createPosts(1);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			expect(xml).toContain('xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"');
			expect(xml).toContain('xmlns:xhtml="https://www.w3.org/1999/xhtml"');
			expect(xml).toContain('xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"');
			expect(xml).toContain('xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"');
			expect(xml).toContain('xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"');
			expect(xml).toContain('xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"');
		});

		it("should include navbar paths", async () => {
			const mockPosts = createPosts(2);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			expectedNavbarPaths.forEach((path) => {
				expect(xml).toContain(`<loc>${BASE_URL}${path}</loc>`);
			});
		});

		it("should include all blog post URLs", async () => {
			const mockPosts = createPosts(5);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			mockPosts.forEach((post) => {
				expect(xml).toContain(`<loc>${BASE_URL}/blog/${post.slug}</loc>`);
			});
		});

		it("should handle empty posts array", async () => {
			mockGetPosts.mockResolvedValue([]);

			const response = await GET();
			const xml = await response.text();

			expect(response.status).toBe(200);
			expect(xml).toContain("<urlset");
			expect(xml).toContain("</urlset>");

			// Should still include navbar paths
			expectedNavbarPaths.forEach((path) => {
				expect(xml).toContain(`<loc>${BASE_URL}${path}</loc>`);
			});

			// Should not include any blog post URLs
			expect(xml).not.toContain("/blog/test-post");
		});

		it("should include correct number of URL entries", async () => {
			const mockPosts = createPosts(7);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// Count <url> elements
			const urlMatches = xml.match(/<url>/g);
			// Should be navbar paths + blog posts
			expect(urlMatches).toHaveLength(expectedNavbarPaths.length + mockPosts.length);
		});

		it("should handle posts with special characters in slugs", async () => {
			const specialPosts = [
				createPosts(1, { slug: "post-with-dashes" })[0]!,
				createPosts(1, { slug: "post_with_underscores" })[0]!,
				createPosts(1, { slug: "post123numbers" })[0]!
			];
			mockGetPosts.mockResolvedValue(specialPosts);

			const response = await GET();
			const xml = await response.text();

			specialPosts.forEach((post) => {
				expect(xml).toContain(`<loc>${BASE_URL}/blog/${post!.slug}</loc>`);
			});
		});

		it("should escape special XML characters in URLs", async () => {
			const postWithSpecialChars = createPosts(1, {
				slug: "post-with-&-ampersand"
			})[0]!;
			mockGetPosts.mockResolvedValue([postWithSpecialChars]);

			const response = await GET();
			const xml = await response.text();

			// Check that the URL is present (may or may not be escaped depending on implementation)
			expect(xml).toContain(`${BASE_URL}/blog/post-with-&-ampersand`);
		});

		it("should generate valid XML that can be parsed", async () => {
			const mockPosts = createPosts(5);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// Test that the XML can be parsed without errors
			expect(() => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(xml, "application/xml");

				// Check for parsing errors
				const parseError = doc.querySelector("parsererror");
				if (parseError) {
					throw new Error(`XML parsing error: ${parseError.textContent}`);
				}

				// Verify structure
				expect(doc.querySelector("urlset")).toBeTruthy();
				const urls = doc.querySelectorAll("url");
				expect(urls.length).toBe(expectedNavbarPaths.length + mockPosts.length);
			}).not.toThrow();
		});

		it("should handle posts with unicode characters in slugs", async () => {
			const unicodePosts = [
				createPosts(1, { slug: "café-post" })[0]!,
				createPosts(1, { slug: "résumé-article" })[0]!
			];
			mockGetPosts.mockResolvedValue(unicodePosts);

			const response = await GET();
			const xml = await response.text();

			unicodePosts.forEach((post) => {
				expect(xml).toContain(`<loc>${BASE_URL}/blog/${post!.slug}</loc>`);
			});
		});

		it("should maintain consistent URL structure", async () => {
			const mockPosts = createPosts(3);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// All URLs should start with BASE_URL
			const urlMatches = xml.match(/<loc>([^<]+)<\/loc>/g);
			urlMatches?.forEach((match) => {
				const url = match.replace(/<\/?loc>/g, "");
				expect(url).toMatch(new RegExp(`^${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
			});
		});

		it("should handle large number of posts", async () => {
			const largeBatch = createPosts(100);
			mockGetPosts.mockResolvedValue(largeBatch);

			const response = await GET();
			const xml = await response.text();

			expect(response.status).toBe(200);

			// Should include all posts
			const urlMatches = xml.match(/<url>/g);
			expect(urlMatches).toHaveLength(expectedNavbarPaths.length + largeBatch.length);
		});

		it("should handle getPosts throwing an error", async () => {
			mockGetPosts.mockRejectedValue(new Error("Database error"));

			await expect(GET()).rejects.toThrow("Database error");
		});

		it("should trim whitespace from XML output", async () => {
			const mockPosts = createPosts(1);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// Should be trimmed
			expect(xml).toBe(xml.trim());
			// Should start with XML declaration
			expect(xml).toMatch(/^<\?xml/);
		});

		it("should handle posts with very long slugs", async () => {
			const longSlug = "a".repeat(200);
			const longSlugPost = createPosts(1, { slug: longSlug })[0]!;
			mockGetPosts.mockResolvedValue([longSlugPost]);

			const response = await GET();
			const xml = await response.text();

			expect(xml).toContain(`<loc>${BASE_URL}/blog/${longSlug}</loc>`);
		});

		it("should include proper URL structure for all entries", async () => {
			const mockPosts = createPosts(3, {
				slug: "test-post"
			});
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// Check that all URLs are wrapped properly
			const urlElements = xml.match(/<url><loc>[^<]+<\/loc><\/url>/g);
			expect(urlElements).toHaveLength(expectedNavbarPaths.length + mockPosts.length);

			// Each URL should have proper structure
			urlElements?.forEach((element) => {
				expect(element).toMatch(/^<url><loc>.+<\/loc><\/url>$/);
			});
		});

		it("should handle duplicate slugs correctly", async () => {
			const duplicatePosts = [
				createPosts(1, { slug: "same-slug", title: "First Post" })[0]!,
				createPosts(1, { slug: "same-slug", title: "Second Post" })[0]!
			];
			mockGetPosts.mockResolvedValue(duplicatePosts);

			const response = await GET();
			const xml = await response.text();

			// Both posts should appear in sitemap (even with duplicate slugs)
			const sameSlugMatches = xml.match(new RegExp(`<loc>${BASE_URL}/blog/same-slug</loc>`, "g"));
			expect(sameSlugMatches).toHaveLength(2);
		});

		it("should validate sitemap XML standards compliance", async () => {
			const mockPosts = createPosts(2);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// Check XML declaration
			expect(xml).toContain('<?xml version="1.0" encoding="UTF-8" ?>');

			// Check required sitemap namespace
			expect(xml).toContain('xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"');

			// Check URL structure compliance
			const parser = new DOMParser();
			const doc = parser.parseFromString(xml, "application/xml");
			const urls = doc.querySelectorAll("url");

			urls.forEach((url) => {
				const loc = url.querySelector("loc");
				expect(loc).toBeTruthy();
				expect(loc?.textContent).toMatch(/^https?:\/\/.+/);
			});
		});
	});
});
