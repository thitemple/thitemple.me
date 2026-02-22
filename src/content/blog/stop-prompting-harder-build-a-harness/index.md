---
title: From Better Prompts to Better Structure
description: "Prompt engineering is subjective and fragile. A project harness — structured docs that define boundaries, quality, and architecture — gives AI agents something to compare against every time. Here's the idea behind building one."
summary: "I kept trying to write better prompts. Then I read about harness engineering and realized the leverage isn't in the prompt — it's in the structure around it."
categories:
  - side-projects
  - ai-coding
  - productivity
date: 2026-02-22
published: true
type: article
---

I kept trying to write better prompts. More context. More examples. More "please follow this pattern." It worked — sometimes. Other times the AI would drift, and I'd spend more time correcting output than I would have spent writing the code myself.

The problem wasn't the prompt. The problem was that "better" had no definition. I might get a great result from one prompt and a terrible result from a nearly identical one, with no way to identify _why_. Better is subjective. Better doesn't have structure. And without structure, you can't improve systematically.

Then I read OpenAI's piece on [harness engineering](https://openai.com/index/harness-engineering/), and something clicked. One line in particular stuck with me: 

> This is the kind of architecture you usually postpone until you have hundreds of engineers. With coding agents, it's an early prerequisite: the constraints are what allows speed without decay or architectural drift.

That reframe changed how I work with AI agents across my projects. I stopped trying to prompt harder and started building a harness instead.

## What I mean by a harness

Think of it this way: you validate code with type checkers. You validate logic with unit tests. But what validates your project's intent, architecture, and quality standards for an AI agent?

That's what a harness does. It's a set of structured documents that live in your repo and define the boundaries an AI agent should work within. Not a giant prompt. Not a single mega-file. A system of connected, verifiable context that the agent can navigate based on what's relevant to the task at hand.

The concept isn't complicated. You're answering a few fundamental questions in writing: What is this product? What does the architecture look like? How do we work here? What does quality mean? Where does everything live?

The key is that these answers are structured, findable, and — ideally — verifiable.

## The anatomy of a harness

Here's what the structure looks like across my projects:

```
AGENTS.md                          ← navigation layer (table of contents)
docs/
  harness/
    product-context.md             ← what is this product and why does it exist
    architecture-context.md        ← system shape, boundaries, and decisions
    engineering-context.md         ← how we work: workflow, standards, quality gates
    repo-map.md                    ← where things live and dependency rules
    prd-template.md                ← the standard for specifying new features
  product-specs/
    phases/                        ← canonical PRDs organized by delivery phase
  exec-plans/
    active/                        ← implementation plans for in-flight work
    completed/                     ← shipped plans (audit trail)
  quality/
    scorecard-template.md          ← how to validate delivery quality
    scoring-rubric.md              ← what "good" looks like, scored
```

Each document has a specific job. **Product context** defines what the product is, who it's for, and what the current focus is — so the agent doesn't build features that drift from the product's intent. **Architecture context** documents the system shape, runtime topology, data flows, and the _why_ behind technology choices — so the agent respects boundaries instead of inventing new ones. **Engineering context** defines the workflow, required quality gates, test strategy, and definition of done — so the agent knows what "finished" actually means. **Repo map** lays out where code lives, what depends on what, and what's off-limits — so the agent doesn't accidentally couple things that should stay separate. **PRD template** standardizes how new features are specified — so every feature description is structured enough for an agent to implement without ambiguity.

The execution plans and quality scorecards close the loop: before non-trivial work starts, there's a plan; after it ships, there's evidence that it met the quality bar.

## Why structure beats prompting

Here's what I was doing before: every time I started a new task, I'd load context into the prompt. Explain the project. Remind the agent about patterns. Point out pitfalls. It worked, but I was doing this work _every single time_. And the results were inconsistent because I'd inevitably forget something or phrase it differently.

With a harness, that context lives in the repo. The agent reads it. I don't have to repeat myself. The work becomes more consistent because the source of truth doesn't change between tasks — it evolves deliberately.

And when something does go off the rails? I don't have to debug a prompt. I look at the structure. Was the boundary unclear? Was the architecture doc missing a decision? I fix the harness, and every future task benefits. Or, I can ask the LLM to update the harness.

In a [previous article](/blog/reliable-ai-pair-programming-with-tests), I wrote about using gold-standard reference tests to steer AI output. That was the first step — giving the agent examples to compare against. The harness is the same idea applied to the entire project. You're giving the agent a definition of "good" that it can reference on every task, not just testing.

## The table of contents, not the encyclopedia

One thing I borrowed directly from the OpenAI article: instead of treating `AGENTS.md` as the encyclopedia, treat it as the table of contents. Their repository's knowledge base lives in a structured `docs/` directory treated as the system of record, with `AGENTS.md` serving as a short map — roughly 100 lines — with pointers to deeper sources of truth elsewhere.

This matters more than it sounds. Most AI coding tools load a root file (like `AGENTS.md` or `CLAUDE.md`) into context on every single task. If you stuff everything into that file — architecture decisions, coding standards, product context, deployment procedures — you're burning context on information that's irrelevant to most tasks.

Instead, keep that file short. Just pointers to deeper docs. Let the agent decide what's relevant and pull in only what it needs. You're saving context space and giving the LLM the freedom to navigate, the same way a new engineer would navigate a well-organized wiki.

## Define boundaries, not instructions

The mindset shift that matters most: you're not writing instructions for the AI. You're defining the boundaries of your project.

What's the product? What are the constraints? What are the architecture decisions and _why_ were they made? What does "done" look like? What quality standards must hold? Where does each piece of the codebase live, and what are the dependency rules?

When these boundaries are clear, organized, and written down, the AI can compare its output against them. It's the difference between telling someone "write good code" and giving them a style guide, architecture diagram, and test suite to check their work against.

And here's the part that surprised me: you don't need to have all the answers upfront. You can ask the AI itself to help you think through and structure these definitions. The harness doesn't need to be perfect on day one — it needs to exist, and then it evolves as your understanding of the project deepens.

## Validate the harness itself

Here's an idea that most people wouldn't think of, and frankly it's still a work in progress for me: validate your documentation the same way you validate your code.

You have linters for code style. Type checkers for correctness. Test suites for behavior. Why not have a check that ensures your harness documents actually exist, that the links between them aren't broken, and that the structure is intact?

I run a simple validation script that confirms all required harness files are present and that every link in the navigation file resolves to a real document. It's not sophisticated, but it catches the kind of drift that silently degrades your harness over time — a renamed file that breaks a reference, a new doc that never gets linked, a deleted section that leaves a dead pointer.

Documentation rot is real, and it's especially dangerous when an AI agent is depending on that documentation to make decisions.

## The payoff

Since building out this structure, I've been needing less and less correction on AI output. The process is faster — not because the AI got smarter, but because it has something consistent to compare against.

The work shifted. I spend less time re-explaining context and more time refining the structure itself. When I improve a boundary definition or add an architecture decision, that improvement compounds across every future task. It's leverage in the truest sense.

## Start with the questions, not the format

If you're thinking about building something like this for your own projects, don't get hung up on format or file structure. Start with the questions:

What is this product, and what problem does it solve? What does the system look like, and where are the boundaries? How do we work in this codebase — what are the standards, the workflow, the definition of done? Where does everything live?

Write those answers down. Put them in your repo. Point your AI agent at them. Then iterate. The format will emerge from your needs. The important thing is that the boundaries exist in a place the AI can find them, and that you treat those documents as living artifacts — not write-once-and-forget.

The leverage isn't in the prompt. It's in the structure around it.
