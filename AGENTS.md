# Agent Guide for thitemple.me

This repo is a SvelteKit (Svelte 5) single-page link hub using TypeScript and Tailwind (v4).
No markdown/CMS pipeline — the entire site is `src/routes/+page.svelte` plus build-time
generated data. Use bun and Node 24.x.

## Environment

- Package manager: bun (see package.json, bun.lock)
- Node: >=24 <25 (see package.json engines, .tool-versions)
- Module system: ESM ("type": "module")
- Framework: SvelteKit + Vite, `@sveltejs/adapter-vercel`, fully prerendered

## Commands

- Install deps: `bun install`
- Dev server: `bun run dev`
- Build: `bun run build` (runs `sync:latest`, then `vite build`)
- Preview build: `bun run preview`
- Refresh "latest" data only: `bun run sync:latest`
- Svelte sync: `bun run sync`
- Type check: `bun run check`
- Lint (prettier + eslint): `bun run lint`
- Format (prettier write): `bun run format`
- Full validation: `bun run validate`

## Repository structure

- `src/routes/+page.svelte` — the entire site (header, hero, link cards, "Fresh out of the
  kitchen", dev panel, footer)
- `src/routes/+page.ts` — loads `src/lib/content/latest.generated.json`
- `src/routes/+layout.svelte` — minimal shell: global `<svelte:head>`, Vercel analytics
- `src/routes/sitemap.xml/+server.ts` — trivial single-URL sitemap
- `src/lib/config.ts` — site title/description/URL
- `src/lib/types.ts` — `LatestItem` / `Latest` types
- `src/lib/assets/img/` — portrait, MFP hero photo, Instagram/Substack SVGs
- `scripts/sync-latest.mjs` — build-time data fetch (see below)
- `src/posts/`, `src/content/`, `src/archive/` — old blog/newsletter markdown, **not wired to
  any route**. Left in the repo but dead; don't build on top of it without checking with the
  user first.

## Build-time "latest" data — read this before touching `scripts/sync-latest.mjs`

`bun run build` runs `scripts/sync-latest.mjs` before `vite build`. It fetches three public
sources over plain HTTP (there's no filesystem access to the sibling `mrfoodprogrammer` repo —
they're separate git repos) and writes `src/lib/content/latest.generated.json`:

- **Video** — YouTube channel Atom feed. Takes the first `<entry>` whose
  `<link rel="alternate">` contains `/watch?v=` (Shorts link to `/shorts/...` instead, so this
  alone filters them — no extra logic needed).
- **Recipe** — `mrfoodprogrammer.com/recipes` is server-rendered newest-first; takes the first
  `/recipes/<slug>` link, then reads that recipe page's `og:title`/`og:image`.
- **Newsletter** — `foodprogrammerlog.substack.com/feed`, first `<item>`.

Every fetch is wrapped in try/catch and resolves to `null` on failure — it must never fail the
build. `+page.svelte` merges a `null` source with fixed per-slot fallback copy (see
`FALLBACKS` in that file) so a missing source still renders its card with the striped
placeholder tile instead of disappearing. The generated JSON is committed to git, not
gitignored, so `bun run dev` always has data without a live fetch.

## Tooling and configs

- ESLint: `eslint.config.js` (flat config)
- Prettier: `.prettierrc`
- TS config: `tsconfig.json` (strict, checkJs, noUncheckedIndexedAccess)
- Vite: `vite.config.ts` (Tailwind v4 plugin, `@sveltejs/enhanced-img`)
- SvelteKit: `svelte.config.js` — no preprocessor beyond `vitePreprocess`; there is no mdsvex
  or markdown pipeline anymore

## Code style and conventions

- Use TypeScript everywhere; JS files are still type-checked (checkJs).
- Prefer `import type { Foo } from "..."` for type-only imports.
- Quotes: double quotes.
- Formatting is controlled by Prettier:
  - Tabs for indentation in most files (`useTabs: true`).
  - Print width 100.
  - Trailing commas: none.
  - Markdown uses spaces (tabWidth 2) per Prettier overrides.

## Images

- Local images (portrait, MFP hero photo) go through `enhanced:img` (`@sveltejs/enhanced-img`)
  for responsive sizes — see the imports at the top of `+page.svelte`.
- The three "latest" images (video thumbnail, recipe photo, newsletter image) are external
  absolute URLs resolved at build time by `sync-latest.mjs`, not local files — they render as
  plain `<img loading="lazy">`, not `enhanced:img`.

## Types and validation

- TypeScript strict mode is on; handle undefined and index access carefully.
- `noUncheckedIndexedAccess` is enabled: use optional chaining, guards, or non-null assertions
  where justified.
- `LatestItem` / `Latest` in `src/lib/types.ts` are the only content types left in the app.

## Naming

- Components: PascalCase filenames.
- Functions/variables: camelCase.
- Types/interfaces: PascalCase.
- Routes follow SvelteKit conventions (`+page.svelte`, `+server.ts`).

## Linting and formatting workflow

- Run `bun run lint` before PRs (runs `svelte-kit sync`, Prettier check, ESLint).
- Use `bun run format` to fix formatting.
- Run `bun run check` for type-checking via `svelte-check`.
- **Known pre-existing issue**: `bun run check` and `eslint` both currently fail because
  `typescript@^7.0.2` isn't yet supported by `svelte-check`/`typescript-eslint` (needs the
  `--tsgo` flag with a co-installed TS 6). This predates the link-hub rewrite — don't try to
  "fix" it as a side effect of an unrelated change. `bun run build` and Prettier are unaffected
  and both pass.

## Agent-specific rules

- Cursor rules: none found in `.cursor/rules/` or `.cursorrules`.
- Copilot rules: none found in `.github/copilot-instructions.md`.

## Practical tips

- Run `bun run sync` after adding/removing routes or types.
- Design values (colors, spacing, radii) are final and sourced from
  `mrfoodprogrammer/src/routes/layout.css` — don't invent new ones; pull from that file if
  something's missing from `+page.svelte`'s `<style>` block.
- X/Twitter is intentionally omitted from the dev panel links — do not re-add it.
- When in doubt, follow existing patterns in `src/routes/+page.svelte` — it's the only
  substantial file in the app.
