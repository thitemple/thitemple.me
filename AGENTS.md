# Agent Guide for thitemple.me

This repo is a SvelteKit (Svelte 5) site using TypeScript, Tailwind (v4), and mdsvex.
Use bun and Node 22.x.

## Environment

- Package manager: bun (see package.json, bun.lock)
- Node: >=22 <23 (see package.json engines, .tool-versions)
- Module system: ESM ("type": "module")
- Framework: SvelteKit + Vite

## Commands

- Install deps: `bun install`
- Dev server: `bun run dev`
- Build: `bun run build`
- Preview build: `bun run preview`
- Svelte sync: `bun run sync`
- Type check: `bun run check`
- Lint (prettier + eslint): `bun run lint`
- Format (prettier write): `bun run format`
- Validate posts frontmatter: `bun run validate:posts`
- Full validation: `bun run validate`

## Repository structure

- SvelteKit routes: `src/routes/**` (use +page.svelte/+page.ts/+server.ts)
- Shared code: `src/lib/**`
- Blog posts: `src/posts/**/index.md`
- Archive posts: `src/archive/**`

## Tooling and configs

- ESLint: `eslint.config.js` (flat config)
- Prettier: `.prettierrc`
- EditorConfig: `.editorconfig`
- TS config: `tsconfig.json` (strict, checkJs, noUncheckedIndexedAccess)
- Vite: `vite.config.ts`
- SvelteKit: `svelte.config.js`

## Code style and conventions

- Use TypeScript everywhere; JS files are still type-checked (checkJs).
- Prefer `import type { Foo } from "..."` for type-only imports.
- ESM imports with explicit file extensions when needed in SvelteKit routes
  (e.g. `./types.js` in +server.ts).
- Quotes: double quotes.
- Formatting is controlled by Prettier:
  - Tabs for indentation in most files (`useTabs: true`).
  - Print width 100.
  - Trailing commas: none.
  - Markdown uses spaces (tabWidth 2) per Prettier overrides.
- EditorConfig defaults to 2 spaces, but Prettier is authoritative for code.

## SvelteKit patterns

- Use `json()` from `@sveltejs/kit` for API responses.
- Prefer typed handlers for endpoints, e.g. `export const POST: RequestHandler`.
- Use `$lib` alias for shared code. Vite also provides `@` -> `src`.
- Keep server route logic in `+server.ts` and page logic in `+page.ts`.

## Tailwind and CSS

- Tailwind is integrated via Vite (see `vite.config.ts`).
- Prettier uses `prettier-plugin-svelte` for Svelte formatting.
- Prefer utility classes and `clsx` + `tailwind-merge` via `cn()`.

## Types and validation

- TypeScript strict mode is on; handle undefined and index access carefully.
- `noUncheckedIndexedAccess` is enabled: use optional chaining, guards, or
  non-null assertions where justified.
- Use `zod` for input validation in endpoints.
- When building API responses, use explicit types (e.g. `PaginatedPosts`).

## Error handling

- Wrap endpoint logic in `try/catch` when network or JSON parsing can fail.
- Return `json({ success: false, error: "..." }, { status })` on errors.
- Log server errors with `console.error` and preserve user-friendly messages.

## Content and posts

- Blog posts live at `src/posts/**/index.md` and use frontmatter.
- Required frontmatter fields (validated by `scripts/validate-posts.js`):
  `title`, `description`, `categories`, `date`, `published`.
- Frontmatter YAML must use spaces, not tabs.

## Imports and ordering

- Prefer external imports first, then internal aliases ($lib, @), then
  relative imports.
- Group type-only imports using `import type`.
- Keep imports sorted logically; ESLint does not enforce a specific order.

## Naming

- Components: PascalCase filenames (e.g. `NewsletterForm.svelte`).
- Functions/variables: camelCase.
- Types/interfaces: PascalCase.
- Constants: camelCase or SCREAMING_SNAKE_CASE for true constants.
- Routes follow SvelteKit conventions (`+page.svelte`, `+server.ts`).

## Linting and formatting workflow

- Run `bun run lint` before PRs (runs `svelte-kit sync`, Prettier check, ESLint).
- Use `bun run format` to fix formatting.
- Run `bun run check` for type-checking via `svelte-check`.

## Agent-specific rules

- Cursor rules: none found in `.cursor/rules/` or `.cursorrules`.
- Copilot rules: none found in `.github/copilot-instructions.md`.

## Practical tips

- Run `bun run sync` after adding/removing routes or types.
- `bun run validate` is the full local gate: lint, type-check, validate posts,
  and build.
- Use `import.meta.glob("/src/posts/**/*.md", { eager: true })` for posts.
- When in doubt, follow existing patterns in `src/routes` and `src/lib`.
