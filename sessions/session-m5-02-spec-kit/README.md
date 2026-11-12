# Session M5-02: Spec Kit: Specification-driven development

**Module:** Specification-Driven Frameworks

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05

**Duration:** 3 hours 30 minutes (1 hour trainer content, 2 hours 30 minutes lab)

## Overview

Use Spec Kit to turn one feature request into tested code.
You initialize an existing Python project, create the Spec Kit artifacts,
implement an archive operation, and run convergence review. If you have time,
an optional second cycle adds a restore requirement to the living specification.

The lab uses Spec Kit's real project model:

- `.specify/memory/constitution.md` stores project principles.
- `specs/<feature>/spec.md` stores requirements and user stories.
- `plan.md`, supporting design files, and `tasks.md` drive implementation.
- `/speckit-analyze` checks artifact consistency.
- `/speckit-converge` compares the implementation with the accepted artifacts.
- `/speckit-github-taskstoissues` converts the generated task list into GitHub Issues (optional). It comes from Spec Kit's opt-in GitHub extension. `specify init` doesn't install it, so run `specify extension add github` first.

`specify init` generates the Copilot skills. Each skill is a folder under `.github/skills/` with instructions for one slash command, so `/speckit-plan` runs the instructions in `.github/skills/speckit-plan/`.

## Learning outcomes

- Initialize Spec Kit in an existing repository and inspect the generated files.
- Write testable requirements before choosing an implementation.
- Turn the accepted specification into a plan and dependency-ordered tasks.
- Implement the change in stages and use convergence to find missing work.
- Explain constitution, convergence, and idempotent in your own words.
- Optional: convert generated tasks into GitHub Issues.
- Optional: evolve a living specification and update the plan, tasks, and code to match.
- Explain which files come from Spec Kit and which records belong to the team.

## You need

Python 3.10 or later, Git, `uv`, and GitHub Copilot. The optional issue-conversion part also needs a GitHub training repository where you can create issues. For disconnected environments, prepare the official
air-gapped package before the session.

## Install

This session uses Spec Kit v1.4.0, the latest release on 12 November 2026. Check [github/spec-kit releases](https://github.com/github/spec-kit/releases) before the session. If you change the tag, run the lab once first, because command names and generated files change between releases.

```bash
export SPECKIT_TAG='v1.4.0'
uv tool install specify-cli --force \
  --from "git+https://github.com/github/spec-kit.git@${SPECKIT_TAG}"
specify version
```

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/`](trainer-content/) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/`](lab/) |
| Starter project | [`lab/starter/archive-task/`](lab/starter/archive-task/) |
| Reference result | [`lab/solution/archive-task/`](lab/solution/archive-task/) |
