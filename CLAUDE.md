# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`thitemple.me` is a single-page personal link hub for Thiago Temple, built with SvelteKit (Svelte 5), TypeScript, and Tailwind CSS v4. Mr. Food Programmer (the cooking brand) leads the page; the software-developer identity lives in a dark panel below the fold, anchored at `#developer`. The site has no blog, newsletter, or search — it's one page that routes visitors to Thiago's other properties (mrfoodprogrammer.com, YouTube, Instagram, Substack, GitHub, LinkedIn, Bluesky).

The site reuses the Mr. Food Programmer "Purple" design system verbatim (see Design Tokens below) so the two sites read as one brand. The canonical source of truth for that system is `mrfoodprogrammer/src/routes/layout.css` in the sibling `mrfoodprogrammer` repo.

**Tech Stack:**

- Framework: SvelteKit + Svelte 5 (with runes)
- Language: TypeScript (strict mode, `noUncheckedIndexedAccess` enabled)
- Styling: Tailwind CSS v4 via Vite plugin, plus a scoped `<style>` block on the homepage
- Deployment: Vercel (`adapter-vercel`), fully prerendered
- Node version: >=22 <23

## Essential Commands

**Development:**

```bash
bun install               # Install dependencies
bun run dev              # Start dev server
bun run build            # Production build (runs sync:latest, then vite build)
bun run preview          # Preview production build
bun run sync:latest      # Refresh src/lib/content/latest.generated.json
bun run sync             # Sync SvelteKit types
```

**Quality checks:**

```bash
bun run lint             # Prettier check + ESLint
bun run format           # Auto-fix formatting with Prettier
bun run check            # Type-check with svelte-check
bun run validate         # Full pipeline (lint, check, build)
```

## Architecture

**Directory structure:**

- `src/routes/+page.svelte` — the entire site: header, hero, 4 primary link cards, "Fresh out of the kitchen" (latest video/recipe/newsletter), dev panel, footer
- `src/routes/+page.ts` — loads the build-time generated `latest.generated.json`
- `src/routes/+layout.svelte` — minimal shell: global `<svelte:head>`, Vercel analytics injection
- `src/routes/sitemap.xml/+server.ts` — trivial single-URL sitemap
- `src/lib/config.ts` — site title/description/URL
- `src/lib/types.ts` — `LatestItem` / `Latest` types for the generated JSON
- `src/lib/assets/img/` — portrait, MFP hero photo, Instagram/Substack SVGs
- `src/lib/content/latest.generated.json` — build-time data, committed to git (see below)
- `scripts/sync-latest.mjs` — fetches the "latest" data (see below)
- `src/posts/`, `src/content/`, `src/archive/` — old blog/newsletter markdown content, kept in the repo but **not wired to any route**. Left in place at the user's request; not part of the live site.

**Key pattern — build-time "latest" data:**

`scripts/sync-latest.mjs` runs before `vite build` (wired into `bun run build`) and fetches three public sources over HTTP, writing `src/lib/content/latest.generated.json`:

- **Video**: YouTube channel Atom feed (`youtube.com/feeds/videos.xml?channel_id=...`) — first entry whose `<link rel="alternate">` contains `/watch?v=` (this excludes Shorts, which link to `/shorts/...`).
- **Recipe**: `mrfoodprogrammer.com/recipes` is server-rendered newest-first — the script takes the first `/recipes/<slug>` link, then reads that recipe page's `og:title`/`og:image`.
- **Newsletter**: `foodprogrammerlog.substack.com/feed`, first `<item>`.

Each fetch is wrapped in try/catch and resolves to `null` on failure rather than failing the build (`thitemple.me` and `mrfoodprogrammer` are separate repos — there's no filesystem access between them). `+page.svelte` merges `null` sources with fixed per-slot fallback copy so a missing source still renders its card with the striped placeholder tile, per the original design handoff — it never drops a card. The generated JSON is committed to git so `bun run dev` always has data without needing a live fetch.

**Type safety**: TypeScript strict mode is enabled. Handle undefined carefully with optional chaining or guards. `noUncheckedIndexedAccess` means array/object access returns `T | undefined`.

## Code Style

**TypeScript:**

- Use `import type { }` for type-only imports
- Prefer explicit types for function returns and complex objects
- Handle array/object access with optional chaining (`posts[0]?.title`)

**Formatting:**

- Tabs for indentation
- Double quotes for strings
- 100 character print width
- No trailing commas
- Run `bun run format` to auto-fix

**Naming:**

- Components: PascalCase
- Functions/variables: camelCase
- Types/interfaces: PascalCase

## Design Tokens

Source of truth: `mrfoodprogrammer/src/routes/layout.css`. Do not invent new values — pull from that file if something's missing here.

| Token              | Hex       | Used for                                   |
| ------------------ | --------- | ------------------------------------------ |
| `--bg`             | `#FBF8F4` | Page background                            |
| `--ink`            | `#2B2440` | Headings, wordmark, dark panel background  |
| `--body-text`      | `#3E3654` | Default body text                          |
| `--text-secondary` | `#544C6B` | Hero tagline                               |
| `--text-muted`     | `#7B7392` | Card subtitles, meta, footer note          |
| `--text-faint`     | `#9A8FB8` | Chevrons, placeholder labels               |
| `--purple`         | `#5C4099` | Kickers, icons, links                      |
| `--purple-hover`   | `#432D75` | Link hover                                 |
| `--lilac`          | `#EFE9F9` | Icon tile backgrounds                      |
| `--lilac-tile`     | `#E2D8F3` | Photo tile background, placeholder stripes |
| `--lilac-accent`   | `#C9B6EF` | Kicker + icons inside the dark panel       |

**Type**: Bitter 600 (Google Fonts) for headings/wordmark; Manrope 400–700 for everything else.

## Important Notes

- Build requires 4GB heap (`NODE_OPTIONS='--max-old-space-size=4096'` in `package.json`)
- Site config (title, description, URL) is in `src/lib/config.ts`
- X/Twitter is intentionally omitted from the dev panel links — do not re-add it
- Favicon/manifest art still reflects the old brand's colors in places; regenerating it is a known follow-up, not yet done
