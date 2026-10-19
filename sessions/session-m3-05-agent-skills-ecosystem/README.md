# Session m3-05: Agent Skills and repository guidance

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04 and m3-04
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Skills capture reusable procedures owned by the repository. Build one
skill under `.github/skills/`. Test when it should run, when it should stay out of
scope, and when a missing reviewer should stop it. Then check live loading and
compare the local `decision-interview`
skill with a pinned copy of Matt Pocock's `grill-me` and its `grilling` dependency.
The accepted interview decisions become inputs to `/plan`.
Finish by reviewing scoped `/chronicle improve` suggestions. Use actual session
corrections to decide whether a rule belongs in instructions, a skill, or neither.

## Learning outcomes

- Create a valid skill directory and `SKILL.md`.
- Write a description that states when to use the skill and when not to use it.
- Test matching, non-matching, and failed-precondition behavior.
- Stop visibly when required evidence or approval is missing.
- Run the named API scenario and inspect its result.
- Assign an owner and review skill changes in the repository.
- Inspect community skill dependencies and license before loading them.
- Compare two live interviews, then trace owner decisions into an implementation plan.
- Review repository-scoped session suggestions without applying them automatically.

## Required access

You need Node.js 22 or later and the standalone Copilot CLI with project
skill loading, `/plan`, and `/chronicle improve`. **Stop if required access is unavailable.**
The deterministic runner checks its own contract; it does not replace live skill
invocation. Session m7-02 supplies reusable interview assets but is not a prerequisite.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Completed skill | [`lab/solution/skills-project/.github/skills/api-design/SKILL.md`](lab/solution/skills-project/.github/skills/api-design/SKILL.md) |
| Expected output | [`lab/solution/skills-project/EXPECTED-OUTPUT.md`](lab/solution/skills-project/EXPECTED-OUTPUT.md) |
| Pinned community snapshot | [`lab/starter/community-interview/README.md`](lab/starter/community-interview/README.md) |
| Interview comparison reference | [`lab/solution/interview-comparison-reference.md`](lab/solution/interview-comparison-reference.md) |
