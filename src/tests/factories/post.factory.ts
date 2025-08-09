import type { Post } from "$lib/types";

export function createPost(overrides?: Partial<Post>): Post {
	return {
		title: "Test Post Title",
		slug: "test-post-slug",
		description: "This is a test post description that provides a brief overview of the content.",
		summary: "A brief summary of the test post",
		date: "2024-01-15",
		categories: ["testing", "development"],
		published: true,
		readTime: 5,
		cover: "/images/test-cover.jpg",
		...overrides
	};
}

export function createPosts(count = 5, overrides?: Partial<Post>): Post[] {
	return Array.from({ length: count }, (_, i) =>
		createPost({
			title: `Test Post ${i + 1}`,
			slug: `test-post-${i + 1}`,
			date: new Date(2024, 0, i + 1).toISOString().split("T")[0],
			...overrides
		})
	);
}

export function createUnpublishedPost(overrides?: Partial<Post>): Post {
	return createPost({
		published: false,
		title: "Unpublished Post",
		slug: "unpublished-post",
		...overrides
	});
}
