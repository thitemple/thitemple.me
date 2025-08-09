import type { Post } from "$lib/types";

type PaginatedPosts = {
	data: Post[];
	pageInfo: {
		currentPage: number;
		total: number;
		totalPages: number;
		nextPage?: number;
		previousPage?: number;
	};
};

export function createPost(overrides?: Partial<Post>): Post {
	return {
		title: "Test Post Title",
		slug: "test-post-slug",
		description:
			"This is a test post description that provides a brief overview of the content for reading time estimation.",
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

export function createPostsWithDifferentDates(): Post[] {
	return [
		createPost({
			title: "Oldest Post",
			slug: "oldest-post",
			date: "2023-01-01"
		}),
		createPost({
			title: "Newest Post",
			slug: "newest-post",
			date: "2024-12-31"
		}),
		createPost({
			title: "Middle Post",
			slug: "middle-post",
			date: "2024-06-15"
		})
	];
}

export function createLongDescriptionPost(): Post {
	const longDescription = Array(100).fill("word").join(" "); // 100 words
	return createPost({
		title: "Long Description Post",
		slug: "long-description-post",
		description: longDescription
	});
}

export function createEmptyDescriptionPost(): Post {
	return createPost({
		title: "Empty Description Post",
		slug: "empty-description-post",
		description: ""
	});
}

export function createPaginatedPosts(posts: Post[], currentPage = 1, pageSize = 5): PaginatedPosts {
	const total = posts.length;
	const totalPages = Math.ceil(total / pageSize);
	const hasNextPage = currentPage < totalPages;
	const hasPreviousPage = currentPage > 1;

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, total);
	const paginatedData = posts.slice(startIndex, endIndex);

	return {
		data: paginatedData,
		pageInfo: {
			currentPage,
			total,
			totalPages,
			nextPage: hasNextPage ? currentPage + 1 : undefined,
			previousPage: hasPreviousPage ? currentPage - 1 : undefined
		}
	};
}

// Mock file structure for testing getPosts()
export type MockFile = {
	metadata: Omit<Post, "slug" | "readTime" | "cover">;
	default: { [key: string]: unknown };
	cover?: string;
};

export function createMockFile(post: Post): MockFile {
	const { cover, ...metadata } = post;
	// Remove slug and readTime as they're not in metadata
	delete (metadata as Partial<Post>).slug;
	delete (metadata as Partial<Post>).readTime;
	return {
		metadata: metadata as Omit<Post, "slug" | "readTime" | "cover">,
		default: {},
		cover
	};
}

export function createMockFilePaths(posts: Post[]): Record<string, MockFile> {
	return posts.reduce(
		(acc, post) => {
			acc[`/src/posts/${post.slug}/index.md`] = createMockFile(post);
			return acc;
		},
		{} as Record<string, MockFile>
	);
}
