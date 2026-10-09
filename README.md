# thitemple.me

A single-page link hub for Thiago Temple. Mr. Food Programmer (the cooking brand) leads;
the software-developer identity lives in a dark panel below the fold, anchored at `#developer`.

---

## Visual Identity

The page reuses the Mr. Food Programmer "Purple" identity verbatim — a light, warm, calm
identity built around a single purple accent on a warm off-white ground — so the two sites
read as one brand. The canonical source of truth is `mrfoodprogrammer/src/routes/layout.css`
in the sibling `mrfoodprogrammer` repo; don't invent new values here.

| Role                   | Typeface    | Weights | Used for                     |
| ---------------------- | ----------- | ------- | ---------------------------- |
| **Display / headings** | **Bitter**  | 600–700 | H1/H2, card titles, wordmark |
| **Body / UI**          | **Manrope** | 400–700 | Everything else              |

| Role            | Hex       | Where it lives                           |
| --------------- | --------- | ---------------------------------------- |
| Page background | `#FBF8F4` | The whole site                           |
| Ink             | `#2B2440` | Headings, wordmark, dark developer panel |
| Purple          | `#5C4099` | Links, kickers, icons                    |
| Lilac           | `#EFE9F9` | Icon tile backgrounds                    |

## What's on the page

1. Header — small portrait logo tile + `thitemple.me` wordmark, anchor to the developer section
2. Hero — portrait + name + tagline
3. Four primary Mr. Food Programmer links (site, YouTube, Instagram, Substack)
4. "Fresh out of the kitchen" — the newest item from each of those three sources
5. Developer section — dark panel, short bio, GitHub / LinkedIn / Bluesky
6. Footer

The "Fresh out of the kitchen" data is fetched live by `src/routes/+page.server.ts` (logic in
`src/lib/server/latest.ts`). Vercel ISR caches the page and regenerates it in the background at
most once an hour, so new videos, recipes, and posts appear without a redeploy.
`src/lib/content/latest.generated.json` is a committed snapshot used only when a source is down.

## Developing

Install dependencies with `bun install`, then start a dev server:

```bash
bun run dev
```

## Building

```bash
bun run build
```

Preview the production build with `bun run preview`.

## Other useful commands

```bash
bun run lint          # Prettier check + ESLint
bun run format        # Auto-fix formatting
bun run check         # Type-check with svelte-check
bun run validate      # Full gate: lint, check, build
```

Deployed on Vercel via `@sveltejs/adapter-vercel`, fully prerendered.
