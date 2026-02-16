# Structure Guide — Articles and Newsletter Issues

Detailed structural guidance for each content type when writing in ASSIST mode.

---

## Articles

### Opening (first 2-3 paragraphs)

Start with energy. Three options that work:

1. **Personal story hook** — Drop into a specific moment. "I was worrying about cloud bills before I even had a single client." The story should set up the tension the article resolves.

2. **Sharp observation** — Name something everyone does but nobody talks about. "Where most people stumble is chasing what looks cool instead of what's useful."

3. **Direct statement** — Lead with the thesis. **"Cool tools won't ship your project."** Then expand on why.

What NOT to do:

- "In today's fast-paced world of software development..."
- "As developers, we all know that..."
- "Have you ever wondered why..."
- Any opening that could start a thousand different articles

### The lesson (paragraphs 2-4)

Front-load the value. By paragraph 3, the reader should know:

- What the article is about
- Why it matters to them specifically
- What they'll walk away with

### The traps (before solutions)

Name 2-4 specific traps or mistakes the reader might be making. Use concrete examples:

- "Trying to be the hacker who sets up their own VPS and knows every config file."
- "Switching to a shiny new project management tool because everyone raves about its UX."

This section builds trust. The reader thinks "he gets it" before you offer solutions.

### Solution sections

Each solution gets its own `##` section with a clear heading. Structure each section as:

1. **The principle** (1 sentence, often bold)
2. **The example** (your specific experience — what you did, what tool you used, what happened)
3. **The takeaway** (what the reader can do with this)

Keep sections independent — the reader should be able to read any section in isolation and get value.

### Closing

Options that work:

- **Return to the opening story** with new meaning — the reader sees it differently now
- **One-sentence actionable takeaway** — "Next time you reach for a new tool, ask: is this core to moving my project forward?"
- **Permission to deviate** — "If you're genuinely curious, explore. Just be honest that it's a detour."

Avoid:

- Summarizing everything you just said
- "In conclusion..."
- Generic motivational closing

### Formatting

- `##` for main sections, `###` sparingly for subsections
- Bold thesis statements as anchors
- Bullet lists for scannable items (steps, options, traps)
- Prose for explanations and stories
- 2-4 sentence paragraphs
- One idea per paragraph
- Descriptive link text (not "click here")

---

## Newsletter Issues (From the Temple)

### Overall Tone

Slightly more casual than articles. Think "smart friend sending you a quick update" vs "teaching through a structured piece." More fragments are okay. Can open with "Hey" or a casual greeting.

### Section 1: What's on my mind

**Length:** 150-400 words (2-4 short paragraphs)

This is a compressed insight — one idea explored briefly. It should deliver value (a reframe or actionable insight) but in a more speculative, conversational way than a full article.

Good patterns:

- "I've been thinking about X and realized Y"
- "Something happened this week that made me question Z"
- A lesson from building/shipping that's too small for a full article but too good to lose

Bad patterns:

- A mini-article that should be its own post
- Pure diary entry with no transferable insight
- Abstract philosophizing without grounding

### Section 2: Worth your time

**Structure:** 2-4 external links, each with:

- The link (title + URL)
- 1-2 sentences on why it matters

The "why" sentence is critical. It answers: "Why should I click this instead of the other 50 things in my feed?"

Good context:

- "Changed how I think about X — specifically the section on Y"
- "Practical guide to Z that I wish existed when I was doing W"

Bad context:

- "Interesting article about X" (says nothing)
- "Great thread" (great how? about what?)

### Section 3: From me lately

**Structure:** 1-3 links to own content (articles, videos, projects) with brief context.

Keep it honest and low-pressure. This is the self-promotion section — acknowledge it implicitly through tone. Don't oversell.

Good framing:

- "Wrote about why I stopped using X and what I switched to"
- "New video on building Y — covers the part that tripped me up for weeks"

Bad framing:

- "Check out my amazing new article!!!"
- Just a link with no context

### Newsletter Frontmatter

```yaml
---
title: "From the Temple #[number]"
description: "[One sentence summary of the main 'What's on my mind' topic]"
categories:
  - newsletter
date: YYYY-MM-DD
published: true
type: newsletter
issue: [number]
---
```
