# Session M2-04: Copilot for code review & pull requests

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-03
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

Follow one pull request from change brief to final human decision. Inspect
a flawed change, run `/review` and `/security-review` on its local diff, and compare
those findings with Copilot PR review. Then correct the code and resolve a
conflict. Keep the diff, test output, and reviewer decision.

## Learning outcomes

- Generate PR summaries and review comments with Copilot
- Configure automatic Copilot reviews for a repository or organization
- Judge Copilot review quality and blind spots
- Run general and security review on a local patch before committing
- Triage unsupported claims and check fixes with regression tests
- Resolve a merge conflict manually and keep both branches' intended behavior

## Session materials

| Resource                | Location                               |
| ----------------------- | -------------------------------------- |
| Lab exercises           | [`lab/`](lab/)                         |
| Lab starter files       | `lab/starter/`         |
| Lab solution files      | `lab/solution/`       |

## Key topics

- PR summaries and commit message generation
- Copilot code review, manual and automatic
- Local `/review` and `/security-review`, then review of the correction diff
- Review comments with one-click fixes
- Manual merge conflict resolution and tests
- Quality gates and team adoption
