# Content Guidelines — From the Temple

These guidelines define how Thiago Temple writes. Use them to evaluate content quality, assist with drafts, and ensure consistency across articles and newsletter issues.

This document is designed for both human editors and LLM agents.

---

## The Reader

Every piece targets **"me, two years ago"** — a developer who:

- Has real experience but is hitting new problems (side projects, shipping solo, working in the margins)
- Doesn't need basics explained, but benefits from someone who's been through it sharing what they learned
- Values their time and will bounce if the content feels generic or self-serving

Write as if you're talking to a peer who's slightly earlier on the same path. Not down to them. Alongside them.

---

## Voice Principles

### 1. Conversational but precise

Write like you talk to a smart friend — no jargon for its own sake, no formality for its own sake. But don't be sloppy. Every sentence should mean what it says.

**Yes:** "I was worrying about cloud bills before I even had a single client."
**No:** "It is important to consider cost optimization strategies early in the development lifecycle."

### 2. Personal when it serves the lesson

Share your experience when it makes the point land harder. Never share for the sake of sharing. The story is the vehicle, not the destination.

**Test:** If you remove the personal detail, does the lesson get weaker? If yes, keep it. If no, cut it.

### 3. Opinionated with receipts

Take a position. Don't hedge behind "it depends" when you have an actual opinion. But back it up — with experience, reasoning, or evidence.

**Yes:** "GitHub Issues and Projects were plenty for me as a solo builder."
**No:** "There are many project management tools available, and the best choice depends on your needs."

### 4. Friendly, never condescending

Channel the Wes Bos / Josh Comeau energy — teaching-oriented, warm, assumes intelligence. The reader is smart; they just haven't hit this particular wall yet.

**Never:** explain what a function is, define "deploy," or treat the reader like they're Googling their first tutorial.

### 5. Direct over diplomatic

Say the thing. If something is a waste of time, call it a waste of time. Kindly, but clearly.

**Yes:** "Cool tools won't ship your project."
**No:** "While exploring new tools can be valuable, it's worth considering whether they align with your current priorities."

---

## Anti-Patterns — What This Voice Is NOT

These are hard filters. If the writing sounds like any of these, it's wrong.

| Anti-pattern                 | Example                                                      | Why it fails                                                                              |
| ---------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **Hustle/grind culture**     | "Rise and grind, ship fast"                                  | Reader is building in the margins of life. Hustle rhetoric is tone-deaf to their reality. |
| **Corporate marketing copy** | "Leverage synergies to unlock value"                         | Empty calories. Says nothing. Reader bounces.                                             |
| **Clickbait/hype**           | "This ONE trick will 10x your productivity!!!"               | Erodes trust instantly. Reader is allergic to this.                                       |
| **Academic/over-formal**     | "This paper examines the implications of..."                 | Creates distance. The whole point is closeness.                                           |
| **Too generic**              | "Here are 5 tips for better productivity"                    | Could be written by anyone. Fails the "me, two years ago" test.                           |
| **Too self-indulgent**       | Three paragraphs about your morning routine before the point | The reader didn't come for your diary.                                                    |

---

## Content Structure

### Articles

Articles have followed a natural pattern: personal story, lesson up front, name the traps, then structured sections with solutions. That pattern works but is not a rigid formula — evolve it as new pieces call for different structures.

**Non-negotiable structural rules:**

1. **Front-load the value.** The reader should know what they'll get within the first 2-3 paragraphs. Don't make them scroll to find out why they should care.
2. **Name the traps before the solutions.** Show the reader you understand the problem they're in before telling them how to get out. This builds trust.
3. **Every section must earn its space.** If a paragraph doesn't teach something, reframe something, or move the reader forward — cut it.
4. **Bold your thesis.** One-line thesis statements work as anchors. Use bold to make them scannable. (e.g., **"Cool tools won't ship your project."**)

**Flexible elements:**

- Opening hook style (personal story, observation, question — varies by piece)
- Number and depth of sections
- Whether code examples are included
- Closing style (call to action, reflection, open question)

### Newsletter Issues (From the Temple)

Newsletters are biweekly and have three sections:

1. **What's on my mind** — A short reflection, observation, or lesson. Voice is slightly more casual than articles — like texting a smart friend. Still needs to deliver value (reframe or actionable insight), just in a more compressed format.

2. **Worth your time** — 2-4 curated external links with a sentence on why each matters. Not just "here's a link" — explain what the reader gets from clicking.

3. **From me lately** — Links to recent articles, videos, or projects. Brief context on each. This is the self-promotion section — keep it honest and low-pressure.

---

## Code Examples

Code inclusion depends on the piece. There is no fixed rule — some pieces are code-heavy, some are pure narrative.

**When including code:**

- Code supports the story, not the other way around. The article is about the lesson; the code is evidence.
- Keep examples minimal and focused. Show the relevant 5-10 lines, not the full file.
- Prefer real code from actual projects over contrived examples.
- Always explain what the code does in prose — don't make the reader parse it cold.

**When NOT to include code:**

- If the lesson is about mindset, process, or decision-making, code often adds noise.
- If a screenshot or description conveys the same information more clearly.

---

## Editing Checklist

When editing or evaluating a draft, check these in order:

### 1. Does every section earn its space?

This is the primary editing lens. Read each paragraph and ask: "Does this teach, reframe, or move the reader forward?" If it does none of these, cut it or merge it.

### 2. Flag over-qualifying language

Known habit to watch for. Tighten these patterns:

| Weak                                   | Strong               |
| -------------------------------------- | -------------------- |
| "I think maybe this could work"        | "This works"         |
| "It's probably worth considering"      | "Consider this"      |
| "In my experience, I've found that..." | "I've found that..." |
| "I would say that"                     | (just say it)        |

**Rule:** One qualifier per paragraph maximum. If you've already said "I think" in a paragraph, the next statement in that paragraph should be declarative.

### 3. Check the opening

- Does it start with energy? (personal story, sharp observation, or direct statement)
- Is there throat-clearing? ("In today's fast-paced world...", "As developers, we all know...")
- Can you cut the first paragraph entirely and lose nothing? If yes, cut it.

### 4. Check for the "generic test"

Read the piece and ask: "Could anyone have written this?" If yes, it's missing:

- A specific personal experience or example
- A named tool, project, or situation
- An opinion that someone could disagree with

### 5. Check for the "self-indulgence test"

Read each personal anecdote and ask: "Does removing this weaken the lesson?" If the lesson stands without the story, the story is indulgent. Cut or compress.

### 6. Verify the value signal

Every piece should deliver at least one of:

- **Reframe:** Change how the reader thinks about something they already do
- **Actionable:** Give the reader something concrete they can apply today

The best pieces do both.

---

## Formatting Conventions

- Use `##` headers for main sections. Avoid deeply nested headers (no `####`).
- Bold one-line thesis statements as section anchors.
- Use bullet lists for scannable items (like steps or options). Use prose for explanations.
- Keep paragraphs short — 2-4 sentences. Wall-of-text kills readability.
- One idea per paragraph.
- Links should have descriptive text, not "click here."

---

## Newsletter-Specific Rules

The newsletter voice is **slightly more casual** than articles:

- Shorter sentences. More fragments are okay.
- Can open with "Hey" or a casual greeting.
- "What's on my mind" can be more speculative — floating an idea vs. delivering a conclusion.
- Still must deliver value. Casual ≠ empty.
- Keep the whole newsletter scannable in under 5 minutes of reading time.

---

## Summary: The Two Failure Modes

Every piece of content should be checked against these two extremes:

**Too generic:** Could be written by anyone. No personal experience, no specific examples, no opinions anyone could disagree with. Reads like it was generated from a prompt that said "write about productivity for developers."

**Too self-indulgent:** The writer is the main character instead of the reader. Personal stories that don't serve a lesson. Long preambles before the point. Reader thinks "why should I care?"

The sweet spot is content where **personal experience serves as evidence for a transferable lesson.** The reader sees themselves in the story and walks away with something they can use.
