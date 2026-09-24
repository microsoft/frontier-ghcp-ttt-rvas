# Session 12: Agent Skills and Repository Guidance

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07 and 11
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Skills capture reusable procedures owned by the repository. Learners build one
skill under `.github/skills/`, validate its directory and frontmatter, then run
three deterministic scenarios: a matching API task, a documentation task that
must not trigger, and a matching task blocked by a missing reviewer.

## Learning outcomes

- Create a valid skill directory and `SKILL.md`.
- Write a description that carries positive and negative trigger conditions.
- Test matching, non-matching, and failed-precondition behavior.
- Stop visibly when required evidence or approval is missing.
- Run one bounded scenario and inspect its result.
- Maintain skills through an owner and repository review.

## Required access

Learners need Node.js 20 or later. A supported GitHub Copilot surface is optional
because the lab includes a local contract runner. If live loading is unavailable,
the same skill remains usable as a manual checklist.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Completed skill | [`lab/solution/skills-project/.github/skills/api-design/SKILL.md`](lab/solution/skills-project/.github/skills/api-design/SKILL.md) |
| Run evidence | [`lab/solution/skills-project/RUN-EVIDENCE.md`](lab/solution/skills-project/RUN-EVIDENCE.md) |
