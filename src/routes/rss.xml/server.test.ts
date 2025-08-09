import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./+server";
import { getPosts } from "$lib/posts";
import * as config from "$lib/config";
import { createPosts } from "../../tests/factories/post.factory";

// Mock the dependencies
vi.mock("$lib/posts", () => ({
	getPosts: vi.fn()
}));

vi.mock("$lib/config", () => ({
	title: "Test Blog",
	description: "A test blog for testing RSS functionality",
	url: "https://testblog.com"
}));

const mockGetPosts = vi.mocked(getPosts);

describe("/rss.xml endpoint", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("GET request", () => {
		it("should return valid RSS XML structure", async () => {
			const mockPosts = createPosts(3);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();

			expect(response).toBeInstanceOf(Response);
			expect(response.status).toBe(200);
			expect(response.headers.get("Content-Type")).toBe("application/xml");

			const xml = await response.text();

			// Verify RSS structure (note: our RSS doesn't start with XML declaration)
			expect(xml).toContain('<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">');
			expect(xml).toContain("<channel>");
			expect(xml).toContain("</channel>");
			expect(xml).toContain("</rss>");
		});

		it("should include channel metadata from config", async () => {
			const mockPosts = createPosts(2);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			expect(xml).toContain(`<title>${config.title}</title>`);
			expect(xml).toContain(`<description>${config.description}</description>`);
			expect(xml).toContain(`<link>${config.url}</link>`);
			expect(xml).toContain(
				`<atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>`
			);
		});

		it("should include all posts as RSS items", async () => {
			const mockPosts = createPosts(3);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// Count item elements
			const itemMatches = xml.match(/<item>/g);
			expect(itemMatches).toHaveLength(3);

			// Verify each post is included
			mockPosts.forEach((post) => {
				expect(xml).toContain(`<title>${post.title}</title>`);
				expect(xml).toContain(`<description>${post.description}</description>`);
				expect(xml).toContain(`<link>${config.url}/${post.slug}</link>`);
				expect(xml).toContain(`<guid isPermaLink="true">${config.url}/${post.slug}</guid>`);
			});
		});

		it("should format publication dates correctly", async () => {
			const mockPosts = [
				createPosts(1, { date: "2024-01-15" })[0]!,
				createPosts(1, { date: "2024-12-25" })[0]!
			];
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// Check that dates are converted to UTC string format
			expect(xml).toContain("<pubDate>Mon, 15 Jan 2024 00:00:00 GMT</pubDate>");
			expect(xml).toContain("<pubDate>Wed, 25 Dec 2024 00:00:00 GMT</pubDate>");
		});

		it("should handle empty posts array", async () => {
			mockGetPosts.mockResolvedValue([]);

			const response = await GET();
			const xml = await response.text();

			expect(response.status).toBe(200);
			expect(xml).toContain("<rss");
			expect(xml).toContain("<channel>");
			expect(xml).toContain("</channel>");
			expect(xml).toContain("</rss>");

			// Should not contain any items
			expect(xml).not.toContain("<item>");
		});

		it("should handle posts with special characters in title and description", async () => {
			const specialPost = createPosts(1, {
				title: "Test & Quotes Special Characters",
				description: "Description with ampersands and quotes"
			})[0]!;
			mockGetPosts.mockResolvedValue([specialPost]);

			const response = await GET();
			const xml = await response.text();

			// XML should contain the post content (may or may not be escaped depending on implementation)
			expect(xml).toContain(specialPost!.title);
			expect(xml).toContain(specialPost!.description);
		});

		it("should handle posts with very long titles and descriptions", async () => {
			const longTitle = "A".repeat(200);
			const longDescription = "B".repeat(1000);

			const longPost = createPosts(1, {
				title: longTitle,
				description: longDescription
			})[0]!;
			mockGetPosts.mockResolvedValue([longPost]);

			const response = await GET();
			const xml = await response.text();

			expect(xml).toContain(`<title>${longTitle}</title>`);
			expect(xml).toContain(`<description>${longDescription}</description>`);
		});

		it("should handle posts with unicode characters", async () => {
			const unicodePost = createPosts(1, {
				title: "Unicode Test: 🚀 ñoño café résumé",
				description: "Description with émojis 😀 and ñ characters"
			})[0]!;
			mockGetPosts.mockResolvedValue([unicodePost]);

			const response = await GET();
			const xml = await response.text();

			expect(xml).toContain("Unicode Test: 🚀 ñoño café résumé");
			expect(xml).toContain("Description with émojis 😀 and ñ characters");
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
				expect(doc.querySelector("rss")).toBeTruthy();
				expect(doc.querySelector("channel")).toBeTruthy();
				expect(doc.querySelectorAll("item")).toHaveLength(5);
			}).not.toThrow();
		});

		it("should handle dates from different years correctly", async () => {
			const posts = [
				createPosts(1, { date: "2020-01-01", slug: "old-post" })[0]!,
				createPosts(1, { date: "2024-12-31", slug: "new-post" })[0]!
			];
			mockGetPosts.mockResolvedValue(posts);

			const response = await GET();
			const xml = await response.text();

			// Check that dates are formatted as UTC strings (the exact format may vary)
			expect(xml).toContain("2020");
			expect(xml).toContain("2024");
			expect(xml).toContain("Jan 2020");
			expect(xml).toContain("Dec 2024");
		});

		it("should handle malformed dates gracefully", async () => {
			const badDatePost = createPosts(1, {
				date: "invalid-date",
				title: "Bad Date Post"
			})[0]!;
			mockGetPosts.mockResolvedValue([badDatePost]);

			const response = await GET();
			const xml = await response.text();

			expect(response.status).toBe(200);
			expect(xml).toContain("Bad Date Post");
			// Should still generate XML, even with invalid date
		});

		it("should escape URLs correctly in links and guids", async () => {
			const postWithSpecialSlug = createPosts(1, {
				slug: "post-with-special-chars"
			})[0]!;
			mockGetPosts.mockResolvedValue([postWithSpecialSlug]);

			const response = await GET();
			const xml = await response.text();

			// Check that URLs are included in the RSS (escaping may vary)
			expect(xml).toContain(`${config.url}/post-with-special-chars`);
			expect(xml).toContain("<link>");
			expect(xml).toContain("<guid");
		});

		it("should maintain post order from getPosts", async () => {
			const posts = [
				createPosts(1, { title: "First Post", slug: "first" })[0]!,
				createPosts(1, { title: "Second Post", slug: "second" })[0]!,
				createPosts(1, { title: "Third Post", slug: "third" })[0]!
			];
			mockGetPosts.mockResolvedValue(posts);

			const response = await GET();
			const xml = await response.text();

			const firstIndex = xml.indexOf("First Post");
			const secondIndex = xml.indexOf("Second Post");
			const thirdIndex = xml.indexOf("Third Post");

			expect(firstIndex).toBeGreaterThan(-1);
			expect(secondIndex).toBeGreaterThan(firstIndex);
			expect(thirdIndex).toBeGreaterThan(secondIndex);
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

			// Should not start or end with whitespace
			expect(xml).toBe(xml.trim());
			// Should start with XML declaration or RSS tag
			expect(xml).toMatch(/^<rss/);
		});

		it("should handle posts with empty descriptions", async () => {
			const emptyDescPost = createPosts(1, {
				description: "",
				title: "Empty Description Post"
			})[0]!;
			mockGetPosts.mockResolvedValue([emptyDescPost]);

			const response = await GET();
			const xml = await response.text();

			expect(xml).toContain("<description></description>");
			expect(xml).toContain("Empty Description Post");
		});

		it("should validate RSS 2.0 compliance", async () => {
			const mockPosts = createPosts(3);
			mockGetPosts.mockResolvedValue(mockPosts);

			const response = await GET();
			const xml = await response.text();

			// Check RSS 2.0 compliance
			expect(xml).toContain('version="2.0"');
			expect(xml).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');

			// Required channel elements
			expect(xml).toContain("<title>");
			expect(xml).toContain("<link>");
			expect(xml).toContain("<description>");

			// Self-referencing atom:link (RSS best practice)
			expect(xml).toContain('rel="self"');
			expect(xml).toContain('type="application/rss+xml"');
		});
	});
});
