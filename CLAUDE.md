# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`thitemple.me` is a single-page personal link hub for Thiago Temple, built with SvelteKit (Svelte 5), TypeScript, and Tailwind CSS v4. Mr. Food Programmer (the cooking brand) leads the page; the software-developer identity lives in a dark panel below the fold, anchored at `#developer`. The site has no blog, newsletter, or search — it's one page that routes visitors to Thiago's other properties (mrfoodprogrammer.com, YouTube, Instagram, Substack, GitHub, LinkedIn, Bluesky).

The site reuses the Mr. Food Programmer "Purple" design system verbatim (see Design Tokens below) so the two sites read as one brand. The canonical source of truth for that system is `mrfoodprogrammer/src/routes/layout.css` in the sibling `mrfoodprogrammer` repo.

**Tech Stack:**

- Framework: SvelteKit + Svelte 5 (with runes)
- Language: TypeScript (strict mode, `noUncheckedIndexedAccess` enabled)
- Styling: Tailwind CSS v4 via Vite plugin, plus a scoped `<style>` block on the homepage
- Deployment: Vercel (`adapter-vercel`); the homepage uses ISR (1h), everything else is prerendered
- Node version: >=24 <25

## Essential Commands

**Development:**

```bash
bun install               # Install dependencies
bun run dev              # Start dev server
bun run build            # Production build
bun run preview          # Preview production build
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
- `src/routes/+page.server.ts` — server load (`prerender = false`, ISR 1h) that fetches the latest items live
- `src/lib/server/latest.ts` — the YouTube / mrfoodprogrammer / Substack fetchers
- `src/routes/+layout.svelte` — minimal shell: global `<svelte:head>`, Vercel analytics injection
- `src/routes/sitemap.xml/+server.ts` — trivial single-URL sitemap
- `src/lib/config.ts` — site title/description/URL
- `src/lib/types.ts` — `LatestItem` / `Latest` types for the generated JSON
- `src/lib/assets/img/` — portrait, MFP hero photo, Instagram/Substack SVGs
- `src/lib/content/latest.generated.json` — committed fallback snapshot, used only when a live fetch fails
- `src/posts/`, `src/content/`, `src/archive/` — old blog/newsletter markdown content, kept in the repo but **not wired to any route**. Left in place at the user's request; not part of the live site.

**Key pattern — live "latest" data with ISR:**

`+page.server.ts` opts out of the layout's `prerender = true` and sets `config = { isr: { expiration: 3600 } }`, so Vercel serves cached HTML and regenerates it in the background at most hourly. `fetchLatest()` in `src/lib/server/latest.ts` fetches three public sources (5s timeout each):

- **Video**: YouTube channel Atom feed — first entry whose `<link rel="alternate">` contains `/watch?v=` (excludes Shorts, which link to `/shorts/...`).
- **Recipe**: `mrfoodprogrammer.com/recipes` is server-rendered newest-first — take the first `/recipes/<slug>` link, then read that page's `og:title`/`og:image`.
- **Newsletter**: `foodprogrammerlog.substack.com/feed`, first `<item>`.

A failed source falls back to the matching entry in `latest.generated.json`, and if that is `null` too, `+page.svelte` renders fixed placeholder copy with the striped tile — a card is never dropped. Update the snapshot by hand occasionally; it only matters during outages.

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
