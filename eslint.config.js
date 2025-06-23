import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
	// Global ignores (must be first)
	{
		ignores: [
			".DS_Store",
			"node_modules/",
			"build/",
			".svelte-kit/",
			".vercel/",
			"package/",
			".env",
			".env.*",
			"!.env.example",
			"old_src/",
			"pnpm-lock.yaml",
			"package-lock.json",
			"yarn.lock",
			"dist/",
			"coverage/",
			"**/*.timestamp-*.mjs" // Vite temp files
		]
	},
	// Base configuration for JavaScript files (config files, etc.)
	{
		files: ["**/*.{js,mjs,cjs}"],
		...js.configs.recommended,
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	// TypeScript config files (without project reference)
	{
		files: ["*.config.ts", "*.config.js", "playwright.config.ts", "vite.config.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				sourceType: "module",
				ecmaVersion: 2020
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		plugins: {
			"@typescript-eslint": ts
		},
		rules: {
			...ts.configs.recommended.rules,
			"@typescript-eslint/no-unused-expressions": "off"
		}
	},
	// TypeScript files in src/ (with project reference)
	{
		files: ["src/**/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
				sourceType: "module",
				ecmaVersion: 2020
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		plugins: {
			"@typescript-eslint": ts
		},
		rules: {
			...ts.configs.recommended.rules,
			"@typescript-eslint/no-unused-expressions": "off" // Allow import() expressions
		}
	},
	// Svelte files
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: [".svelte"]
			},
			globals: {
				...globals.browser,
				ConstructorOfATypedSvelteComponent: "readonly"
			}
		},
		plugins: {
			svelte
		},
		rules: {
			...svelte.configs.recommended.rules
		}
	},
	// Apply prettier config last to override conflicting rules
	prettier
];
