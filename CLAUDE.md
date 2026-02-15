# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog and portfolio site built with SvelteKit (Svelte 5), TypeScript, Tailwind CSS v4, and mdsvex for markdown processing. The site is deployed on Vercel and uses pnpm as the package manager.

**Tech Stack:**

- Framework: SvelteKit + Svelte 5 (with runes)
- Language: TypeScript (strict mode, `noUncheckedIndexedAccess` enabled)
- Styling: Tailwind CSS v4 via Vite plugin
- Content: mdsvex (markdown with frontmatter)
- Deployment: Vercel (adapter-vercel)
- Node version: >=22 <23

## Essential Commands

**Development:**

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server
pnpm build                # Production build (uses 4GB heap)
pnpm preview              # Preview production build
pnpm sync                 # Sync SvelteKit types
```

**Quality checks:**

```bash
pnpm lint                 # Run Prettier check + ESLint
pnpm format               # Auto-fix formatting with Prettier
pnpm check                # Type-check with svelte-check
pnpm validate:posts       # Validate blog post frontmatter
pnpm validate             # Full validation pipeline (lint, check, validate:posts, build)
```

## Architecture

**Directory structure:**

- `src/routes/` - SvelteKit routes (file-based routing)
  - `+page.svelte` - Page components
  - `+page.ts` - Page load functions
  - `+server.ts` - API endpoints
  - `+layout.svelte` - Layout components
- `src/lib/` - Shared code (available via `$lib` alias)
  - `components/` - Reusable Svelte components
  - `services/` - External service integrations (e.g., MailerLite)
  - `utils/` - Utility functions
  - `types.ts` - Shared TypeScript types
  - `posts.ts` - Blog post loading logic
  - `config.ts` - Site configuration
- `src/posts/` - Blog posts (markdown files with frontmatter)
- `src/archive/` - Old blog posts
- `static/` - Static assets

**Key patterns:**

1. **Post loading**: Posts are loaded using `import.meta.glob("/src/posts/**/*.md", { eager: true })` in `src/lib/posts.ts:11`. Posts must have `published: true` in frontmatter to appear.

2. **Markdown processing**: mdsvex converts `.md` files to Svelte components. Posts use frontmatter for metadata. Cover images are exported from markdown modules using `<script context="module">` blocks.

3. **Type safety**: TypeScript strict mode is enabled. Handle undefined carefully with optional chaining or guards. `noUncheckedIndexedAccess` means array/object access returns `T | undefined`.

4. **Styling**: Uses Tailwind v4 (configured in `vite.config.ts:1`). Utility classes are combined with `cn()` helper (from `clsx` + `tailwind-merge`).

5. **API endpoints**: Located in `src/routes/api/`. Use `json()` from `@sveltejs/kit` for responses. Validate input with Zod. Return `{ success: false, error: "..." }` on errors.

## Blog Post Requirements

Posts must be at `src/posts/[slug]/index.md` with the following frontmatter fields (validated by `scripts/validate-posts.js:18`):

- `title` (string)
- `description` (string)
- `categories` (array)
- `date` (YYYY-MM-DD format)
- `published` (boolean)

**Important:** YAML frontmatter must use spaces, not tabs. Validate with `pnpm validate:posts` before committing.

Example:

```markdown
---
title: My Post Title
description: A brief description
categories:
  - web-development
  - typescript
date: 2025-01-25
published: true
---

<script context="module">
export { default as cover } from "./cover.png";
</script>

Content here...
```

## Code Style

**TypeScript:**

- Use `import type { }` for type-only imports
- Prefer explicit types for function returns and complex objects
- Handle array/object access with optional chaining (`posts[0]?.title`)

**Formatting:**

- Tabs for indentation (except markdown uses 2 spaces)
- Double quotes for strings
- 100 character print width
- No trailing commas
- Run `pnpm format` to auto-fix

**Imports:**

- External packages first
- `$lib` and `@` aliases next
- Relative imports last
- Group type-only imports

**Naming:**

- Components: PascalCase (`NewsletterForm.svelte`)
- Functions/variables: camelCase
- Types/interfaces: PascalCase
- Constants: camelCase or SCREAMING_SNAKE_CASE

## Common Tasks

**Add a new blog post:**

1. Create `src/posts/[slug]/index.md` with required frontmatter
2. Run `pnpm validate:posts` to validate
3. Add cover image if needed (export in `<script context="module">`)

**Add a new API endpoint:**

1. Create `src/routes/api/[name]/+server.ts`
2. Export typed handlers: `export const POST: RequestHandler = async ({ request }) => { ... }`
3. Use `json()` for responses
4. Validate input with Zod

**Add a new component:**

1. Create in `src/lib/components/[Name].svelte`

**Before committing:**

1. Run `pnpm validate` (runs all checks)
2. Check TypeScript errors with `pnpm check`

## Important Notes

- Build requires 4GB heap (`NODE_OPTIONS='--max-old-space-size=4096'` in package.json:8)
- Posts are sorted by date descending (newest first) in `src/lib/posts.ts:27`
- Site config (title, author, description) is in `src/lib/config.ts:3-10`
- Environment-aware URLs: dev uses `http://localhost:5173`, prod uses `https://thitemple.me`
- Syntax highlighting uses Shiki with Dracula theme (configured in `svelte.config.js:18-32`)
