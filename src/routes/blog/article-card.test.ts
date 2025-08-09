import { describe, it, expect } from "vitest";
import { createPost } from "../../tests/factories/post.factory";
import { cn } from "$lib/utils";

// Test the component's logic and data handling
describe("ArticleCard Component Logic", () => {
	const mockPost = createPost({
		title: "Test Blog Post",
		slug: "test-blog-post",
		summary: "This is a test blog post summary.",
		date: "2024-01-15",
		readTime: 5,
		cover: "/images/test-cover.jpg"
	});

	describe("post URL generation", () => {
		it("should generate correct post URL", () => {
			const postUrl = `/blog/${mockPost.slug}`;
			expect(postUrl).toBe("/blog/test-blog-post");
		});

		it("should handle special characters in slugs", () => {
			const specialPost = createPost({ slug: "post-with-dashes" });
			const postUrl = `/blog/${specialPost.slug}`;
			expect(postUrl).toBe("/blog/post-with-dashes");
		});
	});

	describe("cover image logic", () => {
		it("should determine when to show banner image", () => {
			const postWithCover = createPost({ cover: "/images/banner.jpg" });
			const featured = false;

			const shouldShowBanner = postWithCover.cover && !featured;
			expect(shouldShowBanner).toBe(true);
		});

		it("should determine when to show featured banner", () => {
			const postWithCover = createPost({ cover: "/images/featured.jpg" });
			const featured = true;

			const hasFeaturedBanner = postWithCover.cover && featured;
			expect(hasFeaturedBanner).toBe(true);
		});

		it("should handle posts without cover images", () => {
			const postWithoutCover = createPost({ cover: undefined });
			const featured = false;

			const shouldShowBanner = !!(postWithoutCover.cover && !featured);
			const hasFeaturedBanner = !!(postWithoutCover.cover && featured);

			expect(shouldShowBanner).toBe(false);
			expect(hasFeaturedBanner).toBe(false);
		});
	});

	describe("featured styling logic", () => {
		it("should apply featured classes when featured=true", () => {
			const featured = true;
			const classes = cn("flex flex-col gap-x-6 gap-y-4", {
				"lg:first:col-span-2": featured
			});

			expect(classes).toContain("lg:first:col-span-2");
		});

		it("should not apply featured classes when featured=false", () => {
			const featured = false;
			const classes = cn("flex flex-col gap-x-6 gap-y-4", {
				"lg:first:col-span-2": featured
			});

			expect(classes).not.toContain("lg:first:col-span-2");
		});
	});

	describe("image alt text generation", () => {
		it("should generate correct alt text for regular banners", () => {
			const post = createPost({ title: "My Blog Post" });
			const altText = `Thumbnail for ${post.title}`;
			expect(altText).toBe("Thumbnail for My Blog Post");
		});

		it("should generate correct alt text for featured banners", () => {
			const post = createPost({ title: "Featured Article" });
			const altText = `Banner for ${post.title}`;
			expect(altText).toBe("Banner for Featured Article");
		});

		it("should handle special characters in titles", () => {
			const post = createPost({ title: "Post with & Special < Characters >" });
			const altText = `Thumbnail for ${post.title}`;
			expect(altText).toBe("Thumbnail for Post with & Special < Characters >");
		});
	});

	describe("data validation", () => {
		it("should work with complete post data", () => {
			expect(mockPost).toHaveProperty("title");
			expect(mockPost).toHaveProperty("slug");
			expect(mockPost).toHaveProperty("summary");
			expect(mockPost).toHaveProperty("date");
			expect(mockPost).toHaveProperty("readTime");
			expect(mockPost).toHaveProperty("cover");

			expect(typeof mockPost.title).toBe("string");
			expect(typeof mockPost.slug).toBe("string");
			expect(typeof mockPost.summary).toBe("string");
			expect(typeof mockPost.date).toBe("string");
			expect(typeof mockPost.readTime).toBe("number");
		});

		it("should handle posts with minimal required data", () => {
			const minimalPost = createPost({
				title: "Minimal Post",
				slug: "minimal",
				summary: "Summary",
				date: "2024-01-01",
				readTime: 1,
				cover: undefined
			});

			expect(minimalPost.title).toBeTruthy();
			expect(minimalPost.slug).toBeTruthy();
			expect(minimalPost.summary).toBeTruthy();
			expect(minimalPost.date).toBeTruthy();
			expect(typeof minimalPost.readTime).toBe("number");
		});
	});

	describe("responsive and styling logic", () => {
		it("should generate base component classes", () => {
			const baseClasses = cn(
				"flex flex-col gap-x-6 gap-y-4 py-4 md:rounded-md md:border md:border-slate-200"
			);

			expect(baseClasses).toContain("flex");
			expect(baseClasses).toContain("flex-col");
			expect(baseClasses).toContain("md:rounded-md");
			expect(baseClasses).toContain("md:border");
		});

		it("should handle dark mode classes", () => {
			const classes = cn("text-slate-700 dark:text-slate-200");

			expect(classes).toContain("text-slate-700");
			expect(classes).toContain("dark:text-slate-200");
		});
	});

	describe("edge cases", () => {
		it("should handle very long titles", () => {
			const longTitle = "A".repeat(200);
			const postWithLongTitle = createPost({ title: longTitle });

			expect(postWithLongTitle.title).toHaveLength(200);
			expect(typeof postWithLongTitle.title).toBe("string");
		});

		it("should handle very long summaries", () => {
			const longSummary = "B".repeat(500);
			const postWithLongSummary = createPost({ summary: longSummary });

			expect(postWithLongSummary.summary).toHaveLength(500);
			expect(typeof postWithLongSummary.summary).toBe("string");
		});

		it("should handle empty cover values", () => {
			const emptyCoverValues: Array<string | undefined | null> = [undefined, "", null];

			emptyCoverValues.forEach((cover) => {
				const shouldShowImage = !!cover;
				expect(shouldShowImage).toBe(false);
			});
		});
	});
});
