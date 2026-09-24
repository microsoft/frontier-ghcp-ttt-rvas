# Session 18: Spec Kit: Specification-Driven Development

**Module:** Specification-Driven Frameworks

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–12 and 17
**Duration:** 3 hours 30 minutes (1 hour trainer content, 2 hours 30 minutes lab)

## Overview

Use Spec Kit to carry one bounded change from a feature request to tested code.
Learners initialize an existing Python project, create the Spec Kit artifacts,
implement an archive operation, and run convergence review. They then update the
living specification to add restore behavior and repeat the workflow.

The lab uses Spec Kit's real project model:

- `.specify/memory/constitution.md` stores project principles.
- `specs/<feature>/spec.md` stores requirements and user stories.
- `plan.md`, supporting design files, and `tasks.md` drive implementation.
- `/speckit-analyze` checks artifact consistency.
- `/speckit-converge` compares the implementation with the accepted artifacts.
- `/speckit-taskstoissues` converts the generated task list into GitHub Issues.

Spec Kit generates its own Copilot skills during `specify init`. **This session
does not ship substitute skills or a `.specify.yml` configuration file.**

## Learning outcomes

- Initialize Spec Kit in an existing repository and inspect the generated files.
- Write testable requirements before choosing an implementation.
- Turn the accepted specification into a plan and dependency-ordered tasks.
- Convert generated tasks into GitHub Issues.
- Implement the change in stages and use convergence to find missing work.
- Evolve a living specification and bring downstream artifacts back into alignment.
- Explain which files come from Spec Kit and which records belong to the team.

## Required access

Learners need a GitHub training repository with issue permissions, Python 3.10 or
later, Git, GitHub Copilot in the selected coding environment, and an approved Spec
Kit source and version. For disconnected environments, prepare the official
air-gapped package before the session.

## Approved installation pattern

```bash
export SPECKIT_TAG='<approved-release-tag>'
uv tool install specify-cli --force \
  --from "git+https://github.com/github/spec-kit.git@${SPECKIT_TAG}"
specify version
```

Use the approved internal package source when policy requires it. Before
installation, record the source, tag, and approval.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/`](trainer-content/) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/`](lab/) |
| Starter project | [`lab/starter/archive-task/`](lab/starter/archive-task/) |
| Reference result | [`lab/solution/archive-task/`](lab/solution/archive-task/) |
