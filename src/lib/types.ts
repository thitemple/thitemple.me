export type ContentType = "article" | "newsletter";

export type Post = {
	title: string;
	slug: string;
	description: string;
	summary: string;
	date: string;
	categories: string[];
	published: boolean;
	cover?: string;
	readTime: number;
	type: ContentType;
	issue?: number;
};

export type WritingListItem = {
	id: string;
	title: string;
	url: string;
	summary?: string | null;
	dateLabel?: string | null;
	readTimeLabel?: string | null;
	typeLabel: string;
	viewTransitionName?: string;
};
