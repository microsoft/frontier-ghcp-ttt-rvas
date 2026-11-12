# Session M6-02: End-to-end capstone project

**Module:** Advanced Topics & Capstone (Module 6)

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05 and M5-02; Session M5-01 is optional

**Duration:** 3 hours (1 hour trainer content, 2 hours lab)

## Overview

Implement and review one Bookmark API slice: `POST /api/bookmarks`. You turn a
supplied specification into a GitHub issue, prompt Copilot to implement it, and
review the result against the spec and the tests. You finish with a handoff another
engineer can use.

**The capstone stays small on purpose.** Authentication, persistent storage,
deployment, and every other bookmark endpoint are out of scope. Use synthetic data
and the existing dependencies.

## Learning outcomes

- Turn a specification into one implementation-ready issue.
- Prompt Copilot to implement the issue.
- Use the failing starter tests as the baseline.
- Review the patch against the spec and the tests, not only the trace.
- Hand off the result with a review decision and next action.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter files | `lab/starter/` |
| Reference solution | `lab/solution/` |

## Final deliverable

A reviewed handoff for `POST /api/bookmarks` with the issue, patch, test results,
review decision, and next action.
