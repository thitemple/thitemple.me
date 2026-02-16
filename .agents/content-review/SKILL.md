---
name: content-review
description: >
  Evaluate and assist with content for "From the Temple" — Thiago Temple's articles and newsletter issues. Use this skill whenever the user shares a draft, asks for feedback on writing, wants to validate content quality, or needs help transforming rough notes into polished content. Trigger on: "review my draft", "check this article", "help me write", "evaluate this post", "newsletter draft", "content feedback", "does this sound like me", or any reference to writing for thitemple.me. This skill has two modes: EVALUATE (score against rubrics) and ASSIST (help shape rough drafts while preserving voice).
---

# Content Harness — From the Temple

This skill helps Thiago Temple produce high-quality content that matches his established voice, structure, and standards. It works in two modes and handles both content types (articles and newsletter issues).

## First: Load the Guidelines

Before doing anything else, read the content guidelines:

```
Read docs/content-guidelines.md
```

This file is located relative to the project root (the SvelteKit site at `src/thitemple.me/`). It contains the voice principles, anti-patterns, structural rules, editing checklist, and newsletter-specific rules that define Thiago's writing. Everything in this skill references those guidelines. If the guidelines file is not found, ask the user where it is — the skill cannot function without it.

---

## Determine Mode

Ask the user or infer from context:

**EVALUATE mode** — The user has a draft (or near-final content) and wants quality feedback.

- Trigger phrases: "review", "check", "evaluate", "feedback", "how does this look", "is this ready"
- Output: Structured scorecard with pass/fail rubrics, specific line-level feedback, and an overall verdict

**ASSIST mode** — The user has rough notes, an outline, or a partial draft and wants help shaping it into finished content.

- Trigger phrases: "help me write", "flesh this out", "turn this into", "I have some notes", "rough draft"
- Output: A polished draft that sounds like Thiago, with annotations explaining key choices

If unclear, ask: "Do you want me to evaluate what you have, or help you build it out?"

---

## Determine Content Type

Identify whether this is an **article** or a **newsletter issue**:

- Articles are long-form (typically 1000-2000+ words), single-topic deep dives
- Newsletter issues have three sections: "What's on my mind", "Worth your time", "From me lately"

If the content type isn't obvious from context, ask.

---

## EVALUATE Mode

### Step 1: Read the Draft

Read the full draft. If it's a file path, use the Read tool. If it's pasted in the conversation, work from that.

### Step 2: Run the Rubrics

Score each rubric as PASS, SOFT FAIL, or FAIL. A SOFT FAIL means the issue is present but minor — it won't tank the piece but should be fixed.

For the full rubric definitions, read: `references/rubrics.md`

Summary of rubrics:

**Universal (R1-R7):** Voice Match, Reader Test, Value Signal, No Generic Content, No Self-Indulgence, Over-Qualifying Language, Sections Earn Space

**Article-specific (R8-R10):** Front-Loaded Value, Traps Before Solutions, Thesis Anchor

**Newsletter-specific (R11-R13):** Three Sections Present, Curated Links Have Context, Scannable in 5 Minutes

### Step 3: Compile the Scorecard

Present results in this format:

```
## Content Evaluation: [Title]
Type: [Article / Newsletter Issue #X]

### Scorecard
R1  Voice Match              [PASS/SOFT FAIL/FAIL]  — [one-line explanation]
R2  Reader Test              [PASS/SOFT FAIL/FAIL]  — [one-line explanation]
R3  Value Signal             [PASS/SOFT FAIL/FAIL]  — [one-line explanation]
R4  No Generic Content       [PASS/SOFT FAIL/FAIL]  — [one-line explanation]
R5  No Self-Indulgence       [PASS/SOFT FAIL/FAIL]  — [one-line explanation]
R6  Over-Qualifying Language [PASS/SOFT FAIL/FAIL]  — [one-line explanation]
R7  Sections Earn Space      [PASS/SOFT FAIL/FAIL]  — [one-line explanation]
[R8-R10 for articles / R11-R13 for newsletters]

### Line-Level Feedback
[Specific passages that need attention, with suggested rewrites where helpful]

### Verdict
[SHIP / REVISE / RETHINK]
```

Verdict definitions:

- **SHIP**: All rubrics pass or soft-fail only. Minor polish needed at most.
- **REVISE**: 1-2 hard fails. Fixable without major restructuring.
- **RETHINK**: 3+ hard fails or a fundamental voice/value problem.

### Step 4: Offer to Help Fix

After presenting the scorecard, offer: "Want me to help fix the issues I flagged? I can switch to assist mode and work through the revisions with you."

---

## ASSIST Mode

### Step 1: Understand What Exists

Ask for or read the raw material. This could be rough notes, bullet points, a partial draft, a voice memo transcript, or just a topic idea.

### Step 2: Clarify the Piece

Before writing, confirm:

- **Content type**: Article or newsletter issue?
- **Core lesson or insight**: What's the one thing the reader should take away?
- **Personal experience**: Is there a specific story or example from Thiago's experience that anchors this?

If the user doesn't have a personal story, note that the piece may need one and ask. The guidelines are clear: personal experience should serve as evidence for a transferable lesson.

### Step 3: Draft or Reshape

Write the content following the guidelines. The voice calibration checklist:

- Use contractions naturally ("I'm", "don't", "it's")
- Short paragraphs (2-4 sentences)
- Specific over abstract — name the tool, the project, the situation
- Cut throat-clearing intros
- One qualifier per paragraph max
- Be opinionated — take a position and back it up
- Personal stories serve the lesson, never the other way around

For detailed structural guidance per content type, read: `references/structure-guide.md`

### Step 4: Annotate Key Choices

After presenting the draft, briefly explain 2-3 key structural or voice choices. This helps Thiago decide if the choices fit. Keep annotations to 1-2 sentences each.

Example: "I opened with the server migration story because it sets up the 'familiar vs. new' tension before the lesson. If you have a stronger personal example, swap it in."

### Step 5: Self-Evaluate

Run the EVALUATE rubrics on your own draft before presenting it. If any rubric hard-fails, fix it first. Present the draft only when it would score SHIP or REVISE with soft fails only.

Note in your response: "I ran this through the evaluation rubrics — here's how it scored: [brief summary]."

---

## Edge Cases

**Content that's already good:** Don't manufacture feedback. If it passes all rubrics, say so. It's okay for the scorecard to be all green.

**Raw notes too thin to draft from:** Don't fabricate content. Ask for the missing pieces: "I need a bit more to work with. What's the specific experience or lesson you want to anchor this around?"

**Breaking from usual structure:** The guidelines say structure should evolve. Evaluate against voice and value rubrics but be flexible on structural ones. Note in the scorecard why the deviation works.

**Topic outside usual expertise:** Flag it: "This topic is outside your usual territory. The piece will need stronger evidence or a clearer 'I'm learning this too' framing to maintain credibility."
