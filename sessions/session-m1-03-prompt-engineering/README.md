# Session m1-03: Prompt engineering fundamentals

**Module:** Copilot Fundamentals

**Difficulty:** Beginner

**Prerequisites:** Sessions m1-01 to m1-02

**Duration:** 3 hours (1 hour trainer content, 2 hours lab)

## Overview

Build one todo API by improving prompts as the project evolves. Learners use intent,
context, constraints, and examples to implement a store and Express routes. They
then change the accepted behavior to add priority filtering and record how context
affected the proposal.

The lab ties prompts to tests and API checks. A useful prompt produces work
that still has to pass the project tests and API checks.

## Learning outcomes

- Write prompts that state the task, relevant context, boundaries, and examples.
- Refine a useful result without mixing unrelated concerns.
- Use CLI `/refine` and check that its rewrite preserves the intended task.
- Use comments and neighboring files as deliberate context.
- Recognize vague, overloaded, and untrusted instructions.
- Turn a successful project prompt into a reusable pattern.

## Required access

Learners need GitHub Copilot Chat, inline suggestions, the standalone CLI with
`/refine`, Node.js 22 or later, and the declared npm dependency. Set up the CLI
before delivery; Session m2-01 is not a prerequisite. If a requirement is
unavailable, stop the lab.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/`](trainer-content/) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/`](lab/) |
| Starter project | [`lab/starter/api-starter/`](lab/starter/api-starter/) |
| Reference result | [`lab/solution/api-complete/`](lab/solution/api-complete/) |
