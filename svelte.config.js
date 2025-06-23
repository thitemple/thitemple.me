import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { mdsvex } from "mdsvex";
// import { mdsvex, escapeSvelte } from "mdsvex";
// import shiki from "shiki";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import relativeImages from "mdsvex-relative-images";

/** @type {import('mdsvex').MdsvexCompileOptions} */
const mdsxvexOptions = {
	extensions: [".md"],
	// highlight: {
	// 	highlighter: async (code, lang = "text") => {
	// 		const highlighter = await shiki.getHighlighter({ theme: "dracula" });
	// 		const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));
	// 		return `{@html \`${html}\`}`;
	// 	}
	// },
	layout: {
		_: "./src/mdsvex.svelte"
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }], relativeImages],
	rehypePlugins: [rehypeSlug]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess({}), mdsvex(mdsxvexOptions)],

	kit: {
		adapter: adapter({
			runtime: "nodejs20.x"
		})
	}
};

export default config;
