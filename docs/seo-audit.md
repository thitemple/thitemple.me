# SEO Audit Report — thitemple.me

**The Coding Temple — Personal Blog & Newsletter**
Prepared: February 2026 | Audit Type: Full Site

| Active Blog Posts | Critical/High Issues | Keyword Opportunities |
| :---------------: | :------------------: | :-------------------: |
|         4         |          6           |          20+          |

---

## Executive Summary

thitemple.me has a clean, fast technical foundation — SvelteKit on Vercel is an excellent setup, and the editorial voice is distinctive: an honest, practitioner-first perspective on AI-assisted development, side projects, and shipping under real constraints. That niche has genuine search demand and low-to-medium competition among personal developer blogs.

That said, the site is at a critical early stage. With only 4 active posts, organic search is nearly impossible to build from — Google needs content volume to index, rank, and trust a domain. Compounding this is a set of technical SEO gaps (the homepage has no meta description or OG tags, the sitemap is incomplete, and structured data is entirely absent) that need to be fixed before more content goes up.

The good news: this is all fixable fast. Fix the technical issues in one coding session. Then commit to a publishing cadence. The keyword opportunities are real — especially around AI coding workflows, testing strategy with AI, and developer productivity for solo builders.

**Top 3 Priorities**

- Fix homepage meta tags and sitemap gaps (one hour of work, immediate indexation impact)
- Add JSON-LD structured data for article pages to unlock rich results in Google
- Build content volume — 4 posts cannot rank; target 2 posts/month for 6 months to reach critical mass

**Biggest Strength**

Distinctive editorial angle: AI coding + side projects + parenting-under-constraints is an underserved niche with a growing audience. That's rare. Protect it.

---

## Keyword Opportunity Table

Based on site content, editorial angle, and search landscape analysis. Sorted by opportunity score. Volume and difficulty are relative assessments (no SEO tool connected — connect Ahrefs or Semrush for precise data). Current ranking is 'None' for all terms as the site lacks sufficient authority and content to rank yet.

| Keyword                               | Difficulty  | Opportunity | Current Rank | Intent        | Recommended Content         |
| ------------------------------------- | ----------- | ----------- | ------------ | ------------- | --------------------------- |
| how to use AI for testing             | Easy–Medium | **High**    | None         | Informational | Deep-dive blog post         |
| AI pair programming best practices    | Medium      | **High**    | None         | Informational | Guide / listicle            |
| reliable AI-generated tests           | Easy        | **High**    | None         | Informational | Blog post (expand existing) |
| shipping side projects as a parent    | Easy        | **High**    | None         | Informational | Blog post                   |
| developer productivity side projects  | Medium      | **High**    | None         | Informational | Guide / blog post           |
| vibe coding best practices            | Easy        | **High**    | None         | Informational | Blog post / opinion         |
| SvelteKit blog tutorial 2025          | Medium      | **High**    | None         | Informational | Tutorial with code          |
| solo developer productivity tips      | Medium      | **High**    | None         | Informational | Guide / listicle            |
| AI coding workflow Claude Cursor      | Easy        | **High**    | None         | Informational | Comparison / workflow post  |
| build side projects working full time | Easy        | **High**    | None         | Informational | Blog post                   |
| TypeScript strict mode tips           | Medium      | Medium      | None         | Informational | Tutorial / tips post        |
| learning in public developer          | Medium      | Medium      | None         | Informational | Essay / blog post           |
| staff engineer writing online         | Easy        | Medium      | None         | Informational | Essay / personal post       |
| SvelteKit vs Next.js 2025             | High        | Medium      | None         | Commercial    | Comparison article          |
| board game app SvelteKit              | Easy        | Medium      | None         | Informational | Case study                  |
| Claude Code tips developer            | Easy        | Medium      | None         | Informational | Blog post / tips            |
| developer side project retrospective  | Easy        | Medium      | None         | Informational | Case study                  |
| AI tools solo developer 2025          | Medium      | Medium      | None         | Commercial    | Roundup / review            |
| future of software engineering career | High        | Low         | None         | Informational | Opinion / newsletter        |
| how to ship community tools developer | Easy        | Low         | None         | Informational | Case study                  |

---

## On-Page SEO Issues

Issues identified by reviewing the codebase directly (src/routes, src/lib/config.ts, sitemap generation, layout components). No SEO crawl tool was connected — a Screaming Frog or Ahrefs crawl would surface additional issues.

| Page                    | Issue                                                                                                  | Severity     | Recommended Fix                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage (/)            | No `<svelte:head>` — zero meta description, no OG title, no OG description, no Twitter card            | **Critical** | Add `<svelte:head>` to +page.svelte with title, meta description, og:title, og:description, og:image, og:url, twitter:card, twitter:title, twitter:description |
| Sitemap (/sitemap.xml)  | Homepage (/) is not included. Neither is /from-the-temple, /search, or /rss.xml                        | **Critical** | Add '/' and '/from-the-temple' to the navbar array in the sitemap server. Add newsletter posts. Consider /search.                                              |
| All pages               | No structured data (JSON-LD) anywhere — no Article, Person, Blog, or BreadcrumbList schema             | **High**     | Add JSON-LD in blog post `<svelte:head>`: Article schema (headline, author, datePublished, description, image). Add Person schema to /about.                   |
| About (/about)          | Meta description is config.description (~540 chars) — 3× the 160-char limit, gets truncated by Google  | **High**     | Write a dedicated 140–155 char meta description for /about.                                                                                                    |
| All pages               | No canonical tags — if the site ever has paginated pages or query params, duplicate content risk rises | **High**     | Add `<link rel="canonical" href={pageUrl}>` in `<svelte:head>` on all pages                                                                                    |
| Sitemap (/sitemap.xml)  | No `<lastmod>` dates on any URLs — reduces crawl prioritization signals                                | Medium       | Add post.date as `<lastmod>` for blog/newsletter URLs. Use static dates for static pages.                                                                      |
| Layout (+layout.svelte) | RSS feed not advertised — no `<link rel="alternate" type="application/rss+xml">` in `<head>`           | Medium       | Add RSS auto-discovery link in +layout.svelte `<svelte:head>`                                                                                                  |
| Blog posts              | OG description uses summary field, not description field — inconsistency in metadata intent            | Medium       | Standardize: use description for meta description / OG, summary for card UI previews. Update +page.svelte to use data.meta.description                         |
| Categories              | Categories exist in frontmatter but no browsable category index pages (no /blog/category/[slug])       | Medium       | Create /blog/category/[slug] route. This creates more indexable pages and internal linking opportunities.                                                      |
| All posts               | No internal cross-linking between posts — each post is an island with no links to related content      | Low          | Add a 'Related posts' section at the end of each article. Even 1–2 manual links per post compounds quickly.                                                    |
| About (/about)          | Profile image alt text is just 'Thiago Temple' — misses a keyword opportunity                          | Low          | Update to: 'Thiago Temple — Staff Developer at Shopify and creator of The Coding Temple blog'                                                                  |

---

## Content Gap Analysis

The most pressing gap is sheer volume. Four published posts is below the threshold needed to establish domain credibility with Google. Competitors in this niche have 50–200+ posts. Beyond volume, the gaps below represent the highest-leverage topics given search demand, your existing angle, and competitor blind spots.

| Topic / Keyword                                       | Why It Matters                                                                                                           | Recommended Format                                         | Priority | Est. Effort                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| How to use AI to write tests (the right way)          | High search demand; your existing post on this is a natural expansion. AI testing is a top concern for devs in 2025.     | Deep-dive blog post (2,000–3,000 words) with code examples | **High** | Quick win — expand existing 'Reliable AI Pair-Programming' post or write a sequel        |
| My Claude / Cursor AI coding workflow                 | Developers are actively searching for real practitioner workflows, not vendor marketing. High informational demand.      | Workflow blog post with screenshots/examples               | **High** | Moderate (half day) — document what you already do                                       |
| SvelteKit tutorial from scratch (2025/2026)           | Josh Collinsworth's guide is aging (pre-Svelte 5). Gap for up-to-date Svelte 5 + SvelteKit content.                      | Tutorial with code (2,000–4,000 words)                     | **High** | Substantial — high effort but high SEO return; potential for significant organic traffic |
| Build side projects working full time as a parent     | Underserved niche. Your experience is genuine. 'Developer + parent + side projects' is a growing search cluster.         | Personal essay / guide (1,500–2,000 words)                 | **High** | Quick win — expand existing posts into a standalone guide                                |
| AI tool comparison (Claude Code vs Cursor vs Copilot) | Very high search volume; most comparisons are shallow. Practitioner perspective has strong SEO differentiation.          | Comparison article (2,000+ words) with personal experience | **High** | Moderate — requires using all three tools and documenting tradeoffs                      |
| TypeScript strict mode: patterns I actually use       | Evergreen, high-volume topic. Your CLAUDE.md shows you use strict + noUncheckedIndexedAccess — uncommon and searchable.  | Tutorial / tips post with code examples                    | Medium   | Moderate — requires code examples but topic is very familiar                             |
| Side project retrospective with real numbers          | Posts with specific numbers (1,700 users, X hours/week) consistently outperform vague posts in engagement and sharing.   | Case study / retrospective (1,500 words)                   | Medium   | Quick win — PartYay and BGG app are ready material                                       |
| 'Start here' or 'best of' page                        | Helps new visitors self-navigate. Competitors like swyx and Kent use this to retain and convert visitors to subscribers. | Curated landing page (not a blog post)                     | Medium   | Quick win (1–2 hours) — no writing required, just curation                               |
| Future of software engineering (deeper cut)           | Newsletter issue 001 touches this. Expanding into a long-form blog post captures informational search traffic.           | Opinion / analysis blog post (2,000+ words)                | Medium   | Moderate — expand existing newsletter content                                            |
| Vibe coding: what works and what's a trap             | Trending search term in 2025–2026. Authentic practitioner take is rare. High share potential on X/HN.                    | Blog post / opinion (1,500 words)                          | Medium   | Quick win — topic is timely and your angle is clear                                      |

---

## Technical SEO Checklist

Based on direct codebase analysis of the SvelteKit project. Page speed and Core Web Vitals are estimated based on the framework characteristics; run Google PageSpeed Insights and Lighthouse for precise measurements.

| Check                       | Status     | Details                                                                                                                                             |
| --------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTPS                       | ✅ Pass    | Vercel auto-provisions and renews SSL certificates. No mixed content expected.                                                                      |
| robots.txt                  | ✅ Pass    | Present at /robots.txt. Allows all crawlers. References sitemap correctly.                                                                          |
| Sitemap present             | ✅ Pass    | Sitemap.xml is generated and prerendered at /sitemap.xml. Referenced in robots.txt.                                                                 |
| Sitemap completeness        | ❌ Fail    | Homepage (/) is missing. /from-the-temple is missing. No `<lastmod>` dates on any URLs.                                                             |
| Homepage title tag          | ⚠️ Warning | Set only in +layout.svelte as global default: 'Thiago Temple — Full-Stack Developer'. Homepage has no own `<svelte:head>` to override or enrich it. |
| Homepage meta description   | ❌ Fail    | Completely absent. +page.svelte has no `<svelte:head>`. Google will auto-generate a snippet, which is unreliable.                                   |
| Homepage OG / Twitter cards | ❌ Fail    | No og:title, og:description, og:image, og:url on the homepage. Social sharing will look broken.                                                     |
| About page meta description | ❌ Fail    | Uses config.description (~540 chars). Google truncates at ~160 chars. Message is lost.                                                              |
| Blog/post title tags        | ✅ Pass    | Pattern: '{Post Title} - The Coding Temple' is clean and keyword-friendly.                                                                          |
| Blog/post meta descriptions | ⚠️ Warning | Uses summary field (125–135 chars — within limits). But summary ≠ description in frontmatter; inconsistent intent.                                  |
| Canonical tags              | ❌ Fail    | Not implemented anywhere. Low risk now (no duplicates), but should be added proactively.                                                            |
| Structured data (JSON-LD)   | ❌ Fail    | No Article, Person, Blog, BreadcrumbList, or any other schema markup. Missing rich snippet opportunities.                                           |
| RSS auto-discovery          | ⚠️ Warning | RSS route exists (/rss.xml) but no `<link rel="alternate">` in layout `<head>`. Feedreaders won't auto-detect it.                                   |
| Mobile responsive           | ✅ Pass    | Tailwind responsive classes used throughout. Mobile nav implemented. Viewport meta in layout.                                                       |
| Page speed (estimated)      | ✅ Pass    | SvelteKit compiles to minimal JS. Vercel CDN with edge caching. Expected strong LCP and FID. Verify with PageSpeed Insights.                        |
| Core Web Vitals (estimated) | ✅ Pass    | Svelte's compiled output eliminates virtual DOM overhead. Cover images may affect LCP — add loading='lazy' and explicit width/height.               |
| Internal linking            | ⚠️ Warning | Very sparse. 4 posts with no cross-links. No 'related posts' section. No 'start here' page.                                                         |
| Image alt text              | ⚠️ Warning | Basic alt text present. Not keyword-optimized. Profile image alt is just 'Thiago Temple'.                                                           |
| URL structure               | ✅ Pass    | Clean, readable URLs. /blog/[slug] and /from-the-temple/[slug]. Slugs are descriptive and keyword-inclusive.                                        |
| Heading hierarchy           | ✅ Pass    | H1 present on all page types. Blog posts and pages use H2/H3 logically via mdsvex and Svelte components.                                            |
| Content depth               | ❌ Fail    | 4 active posts. This is the single biggest SEO limitation. Below minimum viable content mass for domain authority.                                  |
| Old content indexation      | ⚠️ Warning | src/archive contains 40+ old posts that are NOT loaded by the post system. Verify they are not accidentally indexed via old URLs.                   |

---

## Competitor SEO Comparison

Benchmarked against three developer bloggers with similar audiences: Scott Spence (SvelteKit-focused, developer relations), Josh Collinsworth (frontend CSS/JS educator), and swyx (AI/DevRel, author of Latent Space). All are established personal developer blogs with strong audiences. Assessment based on web research and public signals — no backlink data tool connected.

| Dimension            | thitemple.me                           | scottspence.com     | joshcollinsworth.com      | swyx.io                      |
| -------------------- | -------------------------------------- | ------------------- | ------------------------- | ---------------------------- |
| Published posts      | **4 active**                           | 200+                | 50+                       | 200+                         |
| Publishing frequency | **Low (new site)**                     | Regular (weekly)    | Occasional                | High (2–3/week)              |
| Content depth        | **Medium (800–1,500 words)**           | Medium–High         | Very High (5,000+)        | Very High                    |
| Niche clarity        | **AI + side projects + parenting dev** | SvelteKit + web dev | Frontend CSS/JS           | AI + DevRel                  |
| Newsletter           | **Yes (1 issue)**                      | No                  | No                        | Yes (Latent Space — massive) |
| Structured data      | **None**                               | Likely (Sanity CMS) | Likely                    | Likely                       |
| Domain authority     | **Low (new/relaunch)**                 | Medium              | Medium–High               | High                         |
| SERP features        | **None currently**                     | Some snippets       | Featured snippets         | Many (PAA, snippets)         |
| Monetization         | **Newsletter (early)**                 | Consulting/speaking | Courses (CSS for JS Devs) | Book + community             |
| AI content angle     | **Practitioner (strong)**              | Tooling (moderate)  | Minimal                   | Research/analysis (deep)     |

### Competitive Insight

Your niche (AI coding + side projects + honest parenting developer voice) is actually the least crowded of these four blogs. Scott covers SvelteKit well but not AI workflow. Josh is CSS-focused. swyx is AI-heavy but research-oriented, not practitioner. Your 'here's what it's like to ship in 90 minutes while the kids sleep' angle is genuinely differentiated — no one in this space owns it yet.

The gap is content volume and authority. You're 6–12 months of consistent publishing behind these peers. The good news: the niche has room, and a focused keyword strategy means you don't need 200 posts to rank — you need 20 really well-targeted ones.

---

## Prioritized Action Plan

### Quick Wins — Do This Week

Each of these takes under 2 hours and has immediate indexation and presentation impact.

| Action                                                                                             | Impact | Effort | Implementation Notes                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------- | ------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add `<svelte:head>` to homepage (+page.svelte) with title, meta description, OG tags, Twitter card | High   | 30 min | Write a 140–155 char description targeting 'AI coding + side projects'. Use the hero text as inspiration. Add og:image pointing to your profile photo.                     |
| Fix sitemap — add homepage (/), /from-the-temple, and lastmod dates                                | High   | 20 min | Edit src/routes/sitemap.xml/+server.ts. Add '/' to paths, add /from-the-temple. Map post.date to `<lastmod>`.                                                              |
| Fix About page meta description — replace config.description with a 155-char custom string         | Medium | 10 min | Write once and hardcode in about/+page.svelte. Target: 'Staff dev at Shopify writing about AI coding, side projects, and shipping as a working parent. Join 500+ readers.' |
| Add RSS auto-discovery link in +layout.svelte                                                      | Medium | 5 min  | Add `<link rel="alternate" type="application/rss+xml" title="The Coding Temple" href="/rss.xml">` in `<svelte:head>` of +layout.svelte                                     |
| Add canonical tags to all page types                                                               | Medium | 30 min | Add `<link rel="canonical" href={fullUrl}>` in each page's `<svelte:head>`. Create a utility function that builds the canonical URL from $page.url.                        |
| Verify old /archive posts are not accidentally indexed via old URLs                                | Medium | 20 min | Check Google Search Console for any indexed archive URLs. If indexed, add redirects to /blog or return 410 Gone.                                                           |

### Strategic Investments — Plan for This Quarter

These require more effort but drive compounding organic growth. Prioritized by impact-to-effort ratio.

| Action                                                                   | Impact | Effort      | Why / Dependencies                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------ | ------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add Article JSON-LD schema to blog post pages                            | High   | 2–3 hrs     | Unlocks rich results (publish date, author, article type in SERPs). Add to blog/[slug]/+page.svelte and from-the-temple/[slug]/+page.svelte. Include: headline, description, author, datePublished, dateModified, image, publisher. |
| Write 2 posts/month targeting keyword opportunities (6-month commitment) | High   | Ongoing     | Priority order: (1) AI pair programming + tests deep-dive, (2) SvelteKit blog tutorial (Svelte 5), (3) AI coding workflow, (4) parent developer guide. 12 posts minimum to see meaningful organic traction.                         |
| Create a 'Start Here' page curating best content by topic                | High   | 2 hrs       | Reduces bounce rate for new visitors. Builds internal link equity. Creates a clear entry point for newsletter conversion. Model after swyx.io/ideas or kentcdodds.com/reading-list.                                                 |
| Build category index pages (/blog/category/[slug])                       | Medium | 3–4 hrs     | Creates indexable topic pages and improves internal linking structure. Especially valuable as content grows. Target: /blog/category/ai-coding, /blog/category/side-projects, /blog/category/productivity.                           |
| Add 'Related Posts' section to each blog post                            | Medium | 2–3 hrs     | Reduces exit rate, increases pages per session, and builds internal link equity. Can be automated via shared category tags. Dependency: needs at least 6–8 posts to show meaningful recommendations.                                |
| Submit sitemap to Google Search Console and Bing Webmaster Tools         | Medium | 30 min      | Critical if not already done. Accelerates discovery of new posts. Monitor Search Console weekly for crawl errors and keyword impressions. Dependency: fix sitemap first.                                                            |
| Add Person JSON-LD schema to About page                                  | Medium | 1 hr        | Helps Google build a knowledge panel for your name. Include: name, jobTitle, worksFor (Shopify), url, sameAs (Twitter, GitHub, LinkedIn). Supports author rich results on blog posts.                                               |
| Cross-promote posts in newsletter and vice versa                         | Medium | Low ongoing | Each newsletter issue should link to 1–2 blog posts (drives crawlable traffic). Each blog post should include a newsletter CTA. Creates a compounding subscriber + search loop.                                                     |

---

## Follow-Up Options

- Draft optimized title tags and meta descriptions for all current pages?
- Write Article JSON-LD structured data snippets ready to paste into your Svelte components?
- Create content briefs for the top 3 keyword opportunities (AI testing, SvelteKit tutorial, parent developer guide)?
- Fix the homepage `<svelte:head>` and sitemap directly in your codebase?
- Build a 6-month content calendar based on the gap analysis?
