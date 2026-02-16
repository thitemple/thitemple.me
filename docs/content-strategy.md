# From the Temple — Content Strategy

## The Problem

Two content streams (blog + newsletter) create maintenance overhead that kills consistency for a solo creator. The goal is one unified content presence that collects email subscribers, surfaces all content, and is sustainable at a biweekly cadence.

## The Model: One Brand, Two Formats, One Feed

**Brand name:** From the Temple

**Website label:** Replace "Blog" with "Writing" (or "From the Temple") in navigation and throughout the site.

**One feed:** Everything lives in a single reverse-chronological feed on the website. No separate "blog" and "newsletter" sections.

### Format 1: Newsletter Issues (Biweekly)

Sent to email subscribers. Also published as full content on the website.

Every email includes a "Read on the web" link pointing to the website version of that issue.

**Structure — 3 sections:**

1. **What's on my mind** — The main value piece (300–800 words). Tech, growth, building, parenting-meets-tech — whatever is real right now. This is the hook; the reason people open the email.

2. **Worth your time** — 2–4 curated links: articles, videos, tools, threads. Each gets 1–2 sentences on why it matters. No bare URL dumps.

3. **From me lately** — Links to any articles or YouTube videos published since the last issue. This is the self-promotion section, kept honest and brief. Some issues this section is empty — that's fine, skip it.

### Format 2: Articles (No Fixed Cadence)

Long-form pieces (1,500+ words). Published on the website only — not sent as emails.

No special label. They appear in the same feed as newsletter issues, identified only by their title. Readers discover them by browsing the site, via search, or through the next newsletter's "From me lately" section.

## How the Two Formats Connect

```
You publish an article
        ↓
It appears in the website feed immediately
        ↓
The next biweekly newsletter links to it in "From me lately"
        ↓
Subscribers discover it through the newsletter
```

The newsletter is the **connective tissue** — the rhythmic heartbeat (biweekly) that keeps readers engaged between irregular articles. The articles are the substance that gives people a reason to subscribe.

## The Unified Feed (Website)

One stream, mixing both formats. Example:

```
Newsletter #5 — "What's on my mind: Why I stopped optimizing my morning routine"     Feb 28
Article — "Reliable AI Pair-Programming with Tests"                                   Feb 18
Newsletter #4 — "What's on my mind: The real cost of switching tools"                 Feb 14
Article — "What Building a Solo Rankings App Taught Me"                               Feb 3
```

Both types are full content on the site. Visitors can read everything. The feed should visually distinguish the two formats (e.g., a small tag or icon) so readers know what they're getting, but the distinction is subtle — not separate sections.

## Migrating the Existing 4 Articles

The current articles stay exactly where they are in the feed. They become the first articles in the unified stream. No renaming, no reformatting needed. They simply coexist with future newsletter issues.

## Email Subscriber Experience

- Receives a biweekly email (the newsletter issue)
- Email contains the full newsletter content
- Email includes a "Read on the web" link to the website version
- Does NOT receive separate emails for articles
- Discovers articles through the "From me lately" section of the newsletter

## Website Visitor Experience

- Sees one feed: newsletter issues + articles, reverse-chronological
- Can read everything without subscribing
- Encounters newsletter signup CTA ("From the Temple") prompting them to get issues delivered to their inbox
- Full newsletter content is on the site (not gated)

## YouTube Integration

YouTube videos get the same treatment as articles in the "From me lately" section. When you publish a video, mention it in the next newsletter. No need for a separate section — it's just another piece of content you've created.

## What NOT to Do

- Don't call anything a "blog" or "blog post"
- Don't create separate navigation items for newsletters vs. articles
- Don't gate newsletter content behind email signup — full content on the site drives SEO and gives non-subscribers a reason to sign up
- Don't force a deep-dive article into the newsletter format — tease it, link to it
- Don't stress about "From me lately" being empty — skip the section entirely when there's nothing to link

## Implementation Checklist

- [ ] Rename "Blog" to "Writing" (or "From the Temple") in site navigation
- [ ] Set up email service for newsletter delivery (e.g., Buttondown, ConvertKit, Resend)
- [ ] Create a newsletter issue content type alongside existing article content type
- [ ] Build unified feed that interleaves both content types by date
- [ ] Add visual distinction (tag/icon) between newsletter issues and articles in the feed
- [ ] Add "Read on the web" link to email template
- [ ] Wire up newsletter signup CTA on the site
- [ ] Publish first newsletter issue to establish the cadence
