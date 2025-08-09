# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# Or with browser auto-open
pnpm dev -- --open

# Build for production (uses increased memory allocation)
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm check
# Type checking with watch mode
pnpm check:watch

# Linting and formatting
pnpm lint          # Check code style with Prettier and ESLint
pnpm format        # Auto-format code with Prettier
```

## High-Level Architecture

This is a **SvelteKit personal blog/portfolio site** with the following architecture:

### Tech Stack
- **Framework**: SvelteKit with Svelte 5
- **Styling**: Tailwind CSS v4 with Vite integration
- **Content**: MDsveX for Markdown processing with syntax highlighting (Shiki)
- **Type Safety**: TypeScript with strict mode enabled
- **Deployment**: Vercel adapter with Node.js 20.x runtime
- **Analytics**: Vercel Analytics integration

### Project Structure

#### Content Management
- **Blog posts** are stored as Markdown files in `/src/posts/` directory
- Posts are processed by MDsveX with custom layout at `src/mdsvex.svelte`
- Dynamic post loading via `src/lib/posts.ts` using Vite's glob imports
- Archived posts in `/src/archive/old-posts/` (not actively displayed)

#### Routing Structure
- `/` - Homepage with latest post preview
- `/about` - About page
- `/blog` - Blog listing with pagination
- `/blog/[slug]` - Individual blog post pages
- `/api/posts` - JSON API endpoint for posts with pagination
- `/rss.xml` - RSS feed generation
- `/sitemap.xml` - Sitemap generation

#### Key Components
- **Layout**: Main layout in `src/routes/+layout.svelte` handles theme switching and analytics
- **Theme System**: Dark/light mode toggle stored in localStorage via `src/lib/stores/theme.ts`
- **Navigation**: Header with desktop nav and mobile menu component
- **Post Processing**: Custom MDsveX configuration with TOC generation, slug creation, and image optimization

#### API Design
- Posts API (`/api/posts`) returns paginated results with Zod validation
- RSS and Sitemap endpoints generate XML responses server-side
- Type-safe API responses using TypeScript interfaces

### Configuration Notes
- Vite config uses Tailwind CSS v4 as a Vite plugin
- SvelteKit configured for Vercel deployment
- MDsveX handles `.md` files with custom highlighting and plugins:
  - `remark-toc` for table of contents
  - `rehype-slug` for heading anchors
  - `rehype-unwrap-images` for image handling
  - `mdsvex-relative-images` for relative image paths