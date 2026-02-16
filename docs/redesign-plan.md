## Goal

Redesign home page for audience building. Priority: **make my writing discoverable and compelling**.

## Design Philosophy

Study these references for the vibe:

- https://www.nibzard.com (content-first, no photo, ultra-clean)
- https://www.mattpocock.com (photo + minimal bio + social links)
- https://wesbos.com (unconventional styling, simple content structure)

**Core principles:**

- Content is the main attraction (blog posts front and center)
- No marketing copy, no hero sections, no taglines
- Scannable and fast
- Personality through color/layout, not words
- Clean but not boring

## Visual Identity

**Colors:**

- Primary: #0deff8
- Secondary: #f52ec0
- Tertiary: #8a73f8
- Background: #002642
- Neutral light: #c8c8d2
- Neutral dark: #0f172a

**Typography:**

- Kantumruy Pro (Bold/SemiBold/Medium) for headings
- Lora Regular for body text

**Assets:**

- Icon: `/static/thitemple-icon.svg` (small viewports)
- Logo: `/static/thitemple-logo.svg` (wide viewports)
- Photo: `/static/thiago-temple.jpeg` (use if it improves the design, not required)

## Content Requirements

### Navigation (Header)

- Logo/Icon (responsive: icon on mobile, logo on desktop)
- Links: Blog → `/blog`, About → `/about`
- YouTube icon/link → https://www.youtube.com/@thitemple
- Social links (in this order): BlueSky, X, LinkedIn, GitHub

### Hero/Intro Section (if any)

- Keep it minimal: 1-2 sentence bio max
- Example: "Software engineer. I write about [topics]."
- If using photo, keep it small and tasteful

### Blog Posts (Primary Content)

- Display: **4 most recent posts**
- Format: **Your choice** (cards/list/grid) - optimize for readability
- Show for each post:
  - Title (required)
  - Publish date (required)
  - Read time (optional)

### Newsletter CTA

- Newsletter name: **"From the Temple"**
- Placement: **Your choice** (inline section or footer)
- Copy: Keep it direct, no hype
- Example: "Get From the Temple in your inbox" or similar

### Footer

- Social links: BlueSky, X, LinkedIn, GitHub (in that order)
- Newsletter signup (if not placed elsewhere)
- Copyright/year

## Creative Freedom

- **Layout:** Totally up to you. Grid, single column, asymmetric - whatever works.
- **Interactions:** Static or subtle animations - your call.
- **Photo usage:** Use it or don't, but if you do, make it purposeful not decorative.
- **Unconventional is fine** as long as content remains discoverable.

**Hard constraint:** Must be fully responsive (mobile, tablet, desktop).

## Technical Output

- Create at route: `/home-v2`
- Isolate layout changes to this route only
- Do not display the root layout on the new page
- Do not delete the root layout
- Assume blog posts data structure exists (title, date, slug)

## Success Criteria

When I look at this page, I should think:

- "This person writes interesting stuff" (content is obvious)
- "I can easily read more" (clear paths to blog/newsletter)
- "This feels cohesive" (design matches the bold color palette)
- NOT: "This person is trying to sell me something"
