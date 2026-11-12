# Session M2-03: Copilot Spaces & context management

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-02
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

Copilot only knows what is in its **context window**: the limited space that holds your prompt, instructions, files, and the conversation. Good results depend on filling it with the right material.

This session covers the ways to supply context and when to use each: **Copilot Spaces**, repository instructions, path-specific instructions, prompt files, custom agents, skills, memory, and @-mentions. In the lab you build a real Space, write an instructions file, and run the same task four times to see what each one changes.

## Learning outcomes

- Explain what a context window is and why more context isn't always better.
- Explain what a Copilot Space is: its sources, how they refresh, who can see it, and how to share it.
- Write `.github/copilot-instructions.md` and a path-specific `.instructions.md` file with an `applyTo` pattern.
- Choose between a Space, instructions, a prompt file, a custom agent, a skill, memory, and an @-mention.
- Run a controlled before-and-after comparison of context mechanisms.
- Spot stale sources, context overload, and sensitive data in shared context.

## Session materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter project and scorecard | [`lab/starter/`](lab/starter/) |
| Reference instructions, Space setup, expected results | [`lab/solution/`](lab/solution/) |

## Key topics

- Context windows and curation
- Copilot Spaces: sources, refresh, sharing, visibility
- `.github/copilot-instructions.md` and `.instructions.md` with `applyTo`
- Prompt files, custom agents, skills, and memory
- @-mentions and file context
- Comparison table, pros, cons, tips, and common mistakes
- Optional: `/env` and `/instructions` in the Copilot CLI
