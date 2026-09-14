export type LatestItem = {
	kicker: string;
	title: string;
	meta: string;
	url: string;
	image: string | null;
};

export type Latest = {
	video: LatestItem | null;
	recipe: LatestItem | null;
	newsletter: LatestItem | null;
};
