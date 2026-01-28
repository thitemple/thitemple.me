# Agent Guide for thitemple.me

This repo is a SvelteKit (Svelte 5) site using TypeScript, Tailwind (v4), mdsvex,
and Vitest. Use pnpm and Node 22.x.

## Environment

- Package manager: pnpm (see package.json, pnpm-lock.yaml)
- Node: >=22 <23 (see package.json engines, .tool-versions)
- Module system: ESM ("type": "module")
- Framework: SvelteKit + Vite

## Commands

- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Preview build: `pnpm preview`
- Svelte sync: `pnpm sync`
- Type check: `pnpm check`
- Lint (prettier + eslint): `pnpm lint`
- Format (prettier write): `pnpm format`
- Unit tests (watch): `pnpm test`
- Unit tests (run once): `pnpm test:run`
- Test UI: `pnpm test:ui`
- Coverage: `pnpm test:coverage`
- Validate posts frontmatter: `pnpm validate:posts`
- Full validation: `pnpm validate`

### Single test runs (Vitest)

- Single file: `pnpm vitest --run src/lib/utils.test.ts`
- By name pattern: `pnpm vitest --run -t "formatDate"`
- Only integration tests (default config excludes them):
  `pnpm vitest --run --include "src/**/*.integration.{test,spec}.{js,ts}"`
- Integration tests with MSW setup (when needed):
  `pnpm vitest --run --include "src/**/*.integration.{test,spec}.{js,ts}" --setupFiles ./src/tests/setup.integration.ts`

## Repository structure

- SvelteKit routes: `src/routes/**` (use +page.svelte/+page.ts/+server.ts)
- Shared code: `src/lib/**`
- Blog posts: `src/posts/**/index.md`
- Archive posts: `src/archive/**`
- Tests: `src/**/*.test.ts` and `src/**/*.spec.ts`
- Integration tests: `src/**/*.integration.test.ts` (excluded by default)

## Tooling and configs

- ESLint: `eslint.config.js` (flat config)
- Prettier: `.prettierrc`
- EditorConfig: `.editorconfig`
- Vitest: `vitest.config.ts` (happy-dom, globals, setupFiles)
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
- Use `$lib` alias for shared code. Vite/Vitest also provides `@` -> `src`.
- Keep server route logic in `+server.ts` and page logic in `+page.ts`.

## Tailwind and CSS

- Tailwind is integrated via Vite and PostCSS (see `vite.config.ts`,
  `postcss.config.cjs`).
- Prettier uses `prettier-plugin-tailwindcss` with `src/app.css`.
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

## Testing conventions

- Test files live in `src/**` with `.test.ts` or `.spec.ts` suffixes.
- Vitest environment is `happy-dom`; `globals: true`.
- Default test setup: `src/tests/setup.ts` (jest-dom, mocks).
- Integration setup (MSW): `src/tests/setup.integration.ts`.
- Integration tests are excluded by default (see `vitest.config.ts`).
- Use `@testing-library/svelte` for component tests.
- Prefer descriptive test names; use `describe` blocks for scenarios.

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

- Run `pnpm lint` before PRs (runs `svelte-kit sync`, Prettier check, ESLint).
- Use `pnpm format` to fix formatting.
- Run `pnpm check` for type-checking via `svelte-check`.

## Agent-specific rules

- Cursor rules: none found in `.cursor/rules/` or `.cursorrules`.
- Copilot rules: none found in `.github/copilot-instructions.md`.

## Practical tips

- Run `pnpm sync` after adding/removing routes or types.
- `pnpm validate` is the full local gate: lint, type-check, validate posts,
  tests, and build.
- Use `import.meta.glob("/src/posts/**/*.md", { eager: true })` for posts.
- When in doubt, follow existing patterns in `src/routes` and `src/lib`.
