# Session 07: Copilot for Code Review & Pull Requests

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions 01 to 06
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

Follow one pull request from change brief to final human decision. Learners inspect
a flawed change, run `/review` and `/security-review` on its local diff, and compare
those findings with Copilot PR review. They correct the code,
resolve a conflict, and record the evidence required for approval.

## Learning Outcomes

- Use Copilot to generate PR summaries and review comments
- Configure automatic Copilot reviews at repository or organization level
- Evaluate Copilot review quality and blind spots
- Run general and security review before committing a local patch
- Triage unsupported claims and check fixes with regression tests
- Resolve merge conflicts using the cloud agent
- Add Copilot to a team code-review workflow
- Tie every blocking comment and accepted fix to reproducible evidence

## Session Materials

| Resource                | Location                               |
| ----------------------- | -------------------------------------- |
| Lab exercises           | [`lab/`](lab/)                         |
| Lab starter files       | `lab/starter/`         |
| Lab solution files      | `lab/solution/`       |

## Key Topics

- PR summaries and commit message generation
- Copilot code review, manual and automatic
- Local `/review` and `/security-review`, followed by review of the correction diff
- Security-review scope and its limits alongside repository scanning
- Review comments with one-click fixes
- Merge conflict resolution via cloud agent
- Quality gates and team adoption
