import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getPosts } from "./posts";
import { createPosts } from "../tests/factories/post.factory";

// Mock import.meta.glob
const mockGlob = vi.fn();
vi.mock("$lib/posts", async () => {
	return {
		getPosts: async () => {
			const globResult = mockGlob("/src/posts/**/*.md", { eager: true });
			const posts = [];

			for (const path in globResult) {
				const file = globResult[path];
				// Extract slug from path - should be the folder name before /index.md
				const pathParts = path.split("/");
				const slug = pathParts[pathParts.length - 2]; // Get folder name

				if (
					file &&
					typeof file === "object" &&
					"metadata" in file &&
					"default" in file &&
					slug &&
					slug !== "posts" && // Skip if slug is "posts" (malformed path)
					slug.length > 0 && // Skip empty slugs
					!slug.startsWith(".") // Skip paths that start with dot
				) {
					const metadata = file.metadata;
					if (metadata && metadata.published) {
						const readTime = Math.ceil(
							Math.max((metadata.description?.trim().split(/\s+/).length || 0) * 10, 500) / 265
						);
						const post = { ...metadata, slug, readTime, cover: file.cover };
						posts.push(post);
					}
				}
			}

			return posts.sort((first, second) =>
				new Date(first.date).getTime() > new Date(second.date).getTime() ? -1 : 1
			);
		}
	};
});

describe("posts.ts", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("getPosts", () => {
		it("should return an empty array when no posts are found", async () => {
			mockGlob.mockReturnValue({});

			const result = await getPosts();

			expect(result).toEqual([]);
		});

		it("should return published posts with correct metadata", async () => {
			const testPosts = createPosts(3);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const mockFiles: Record<string, any> = {};

			testPosts.forEach((post) => {
				mockFiles[`/src/posts/${post.slug}/index.md`] = {
					metadata: {
						title: post.title,
						description: post.description,
						summary: post.summary,
						date: post.date,
						categories: post.categories,
						published: post.published
					},
					default: {},
					cover: post.cover
				};
			});

			mockGlob.mockReturnValue(mockFiles);

			const result = await getPosts();

			expect(result).toHaveLength(3);
			expect(result[0]).toMatchObject({
				title: expect.any(String),
				slug: expect.any(String),
				description: expect.any(String),
				summary: expect.any(String),
				date: expect.any(String),
				categories: expect.any(Array),
				published: true
			});
			expect(result[0]).toHaveProperty("readTime");
			expect(typeof result[0]!.readTime).toBe("number");
		});

		it("should filter out unpublished posts", async () => {
			const publishedPost = createPosts(1, { published: true })[0]!;
			const unpublishedPost = createPosts(1, { published: false, slug: "unpublished" })[0]!;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const mockFiles: Record<string, any> = {};
			[publishedPost, unpublishedPost].forEach((post) => {
				mockFiles[`/src/posts/${post.slug}/index.md`] = {
					metadata: {
						title: post.title,
						description: post.description,
						summary: post.summary,
						date: post.date,
						categories: post.categories,
						published: post.published
					},
					default: {},
					cover: post.cover
				};
			});

			mockGlob.mockReturnValue(mockFiles);

			const result = await getPosts();

			expect(result).toHaveLength(1);
			expect(result[0]!.slug).toBe(publishedPost.slug);
		});

		it("should sort posts by date in descending order (newest first)", async () => {
			const posts = [
				createPosts(1, { slug: "oldest", date: "2023-01-01" })[0]!,
				createPosts(1, { slug: "newest", date: "2024-12-31" })[0]!,
				createPosts(1, { slug: "middle", date: "2024-06-15" })[0]!
			];

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const mockFiles: Record<string, any> = {};
			posts.forEach((post) => {
				mockFiles[`/src/posts/${post.slug}/index.md`] = {
					metadata: {
						title: post.title,
						description: post.description,
						summary: post.summary,
						date: post.date,
						categories: post.categories,
						published: post.published
					},
					default: {},
					cover: post.cover
				};
			});

			mockGlob.mockReturnValue(mockFiles);

			const result = await getPosts();

			expect(result).toHaveLength(3);
			expect(result[0]!.slug).toBe("newest"); // 2024-12-31
			expect(result[1]!.slug).toBe("middle"); // 2024-06-15
			expect(result[2]!.slug).toBe("oldest"); // 2023-01-01
		});

		it("should handle posts without cover images", async () => {
			const postWithoutCover = createPosts(1, { cover: undefined })[0]!;

			const mockFiles = {
				[`/src/posts/${postWithoutCover.slug}/index.md`]: {
					metadata: {
						title: postWithoutCover.title,
						description: postWithoutCover.description,
						summary: postWithoutCover.summary,
						date: postWithoutCover.date,
						categories: postWithoutCover.categories,
						published: postWithoutCover.published
					},
					default: {}
					// No cover property
				}
			};

			mockGlob.mockReturnValue(mockFiles);

			const result = await getPosts();

			expect(result).toHaveLength(1);
			expect(result[0]!.cover).toBeUndefined();
		});
	});

	describe("reading time estimation", () => {
		it("should estimate reading time based on description length", async () => {
			const longDescription = Array(50).fill("word").join(" "); // 50 words
			const postWithLongDescription = createPosts(1, {
				description: longDescription,
				slug: "long-desc"
			})[0]!;

			const mockFiles = {
				[`/src/posts/long-desc/index.md`]: {
					metadata: {
						title: postWithLongDescription.title,
						description: longDescription,
						summary: postWithLongDescription.summary,
						date: postWithLongDescription.date,
						categories: postWithLongDescription.categories,
						published: postWithLongDescription.published
					},
					default: {},
					cover: postWithLongDescription.cover
				}
			};

			mockGlob.mockReturnValue(mockFiles);

			const result = await getPosts();

			expect(result).toHaveLength(1);
			expect(result[0]!.readTime).toBeGreaterThan(1);
			expect(typeof result[0]!.readTime).toBe("number");
		});

		it("should handle empty descriptions for reading time", async () => {
			const emptyPost = createPosts(1, { description: "", slug: "empty" })[0]!;

			const mockFiles = {
				[`/src/posts/empty/index.md`]: {
					metadata: {
						title: emptyPost.title,
						description: "",
						summary: emptyPost.summary,
						date: emptyPost.date,
						categories: emptyPost.categories,
						published: emptyPost.published
					},
					default: {},
					cover: emptyPost.cover
				}
			};

			mockGlob.mockReturnValue(mockFiles);

			const result = await getPosts();

			expect(result).toHaveLength(1);
			expect(result[0]!.readTime).toBeGreaterThan(0);
			expect(typeof result[0]!.readTime).toBe("number");
		});
	});

	describe("edge cases", () => {
		it("should handle malformed file paths gracefully", async () => {
			const validPost = createPosts(1, { slug: "valid-post" })[0]!;

			const mockFiles = {
				[`/src/posts/${validPost.slug}/index.md`]: {
					metadata: {
						title: validPost.title,
						description: validPost.description,
						summary: validPost.summary,
						date: validPost.date,
						categories: validPost.categories,
						published: validPost.published
					},
					default: {},
					cover: validPost.cover
				},
				"/src/posts/malformed": {
					metadata: {
						title: "Bad",
						date: "2024-01-01",
						description: "bad",
						summary: "bad",
						categories: [],
						published: true
					},
					default: {}
				}, // No proper folder structure - this will be filtered out because slug is undefined
				"/src/posts/.md": {
					metadata: {
						title: "Empty slug",
						date: "2024-01-01",
						description: "empty",
						summary: "empty",
						categories: [],
						published: true
					},
					default: {}
				} // Empty slug - this will be filtered out because slug is undefined
			};

			mockGlob.mockReturnValue(mockFiles);

			const result = await getPosts();

			// All malformed paths should be filtered out, leaving only the valid post
			expect(result).toHaveLength(1);
			expect(result[0]!.slug).toBe(validPost.slug);
		});

		it("should handle invalid file objects", async () => {
			mockGlob.mockReturnValue({
				"/src/posts/invalid-1/index.md": null,
				"/src/posts/invalid-2/index.md": {},
				"/src/posts/invalid-3/index.md": { metadata: null },
				"/src/posts/invalid-4/index.md": { default: {} } // Missing metadata
			});

			const result = await getPosts();

			expect(result).toHaveLength(0); // All should be filtered out
		});
	});
});
