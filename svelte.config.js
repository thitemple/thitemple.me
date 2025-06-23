import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { mdsvex } from "mdsvex";
// import { mdsvex, escapeSvelte } from "mdsvex";
// import shiki from "shiki";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import relativeImages from "mdsvex-relative-images";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
		_: resolve(__dirname, "src/mdsvex.svelte")
	},
	remarkPlugins: [[remarkToc, { tight: true }], relativeImages],
	rehypePlugins: [rehypeSlug, rehypeUnwrapImages]
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
