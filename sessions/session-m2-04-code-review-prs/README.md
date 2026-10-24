# Session m2-04: Copilot for code review & pull requests

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-03
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

Follow one pull request from change brief to final human decision. Inspect
a flawed change, run `/review` and `/security-review` on its local diff, and compare
those findings with Copilot PR review. Then correct the code and resolve a
conflict. Record the diff, test output, and reviewer decision.

## Learning outcomes

- Use Copilot to generate PR summaries and review comments
- Configure automatic Copilot reviews at repository or organization level
- Evaluate Copilot review quality and blind spots
- Run general and security review before committing a local patch
- Triage unsupported claims and check fixes with regression tests
- Resolve merge conflicts manually and check that both branches' intended behavior survives
- Add Copilot to a team code-review workflow
- Support every blocking comment and accepted fix with a code reference or reproducible check

## Session materials

| Resource                | Location                               |
| ----------------------- | -------------------------------------- |
| Lab exercises           | [`lab/`](lab/)                         |
| Lab starter files       | `lab/starter/`         |
| Lab solution files      | `lab/solution/`       |

## Key topics

- PR summaries and commit message generation
- Copilot code review, manual and automatic
- Local `/review` and `/security-review`, followed by review of the correction diff
- Security-review scope and its limits alongside repository scanning
- Review comments with one-click fixes
- Manual merge conflict resolution and tests
- Quality gates and team adoption
