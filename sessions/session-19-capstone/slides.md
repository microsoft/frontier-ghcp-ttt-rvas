---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 19 — Bounded End-to-End Capstone'
---

<!-- _class: lead -->

# Bounded End-to-End Capstone

Session 19 of 19 | 3 hours

---

# The capstone is a delivery decision

Success is one reviewed feature change or plan that another person can continue safely.

Do not build a complete application, deploy, or demonstrate tools.

---
# The capstone measures judgment

Learners should make a small delivery decision that another person can inspect and
continue. More code is not a better result.

The trainer evaluates whether the team:

- reduced a broad request to a bounded slice;
- used the prior decision and specification artifacts;
- gathered enough evidence to approve, revise, or pause;
- left a usable handover record.

---
# Start with a deliberately narrow slice

| Too broad | Capstone-sized |
| --- | --- |
| "Build bookmark management" | "Create one bookmark with validation" |
| "Improve the release process" | "Add a reviewed CI check for one path" |
| "Automate triage" | "Produce a draft-only triage recommendation" |

One slice should have a clear acceptance result and a natural stopping point. Reduce
the scope again if it needs many owners or a long design debate.

---
# The handover should survive the session

```text
Decision: approve, request changes, or pause
Scope: what this change covers and excludes
Evidence: checks, review, and open risks
Owner: who takes the next action and by when
```

Chat history is useful context. It is not the delivery artifact.

---
# Required inputs

- Session 17 decision record: allowed path, data boundary, meter, reviewer, and fallback.
- Session 18 handoff: goal, scope, constraints, acceptance criteria, tasks, and checks.

---

# One implementation-ready issue

```text
Goal: Implement POST /api/bookmarks.
Scope: Validate the documented Bookmark fields and response format.
Constraints: In-memory storage, synthetic data, approved dependencies only.
Done: Focused tests cover valid create, validation errors, and duplicate URLs.
```

---

# Delivery paths

| Path | Use |
| --- | --- |
| Approved cloud agent | One scoped issue and one reviewable pull request |
| Approved local agent mode | Work in the approved sandbox |
| Manual | Implement the same issue |
| Prepared change | Produce a reviewable patch plan |

---

# Governance gate

Before implementation, confirm the repository, data, tools, dependencies, MCP servers, meter, stop condition, and reviewer.

Stop when a boundary is unclear.

---

# Review and handover

Check the acceptance criteria, scope, validation, tests, dependencies, and governance.

Record one decision: approve, request changes, or pause.

---

# Lab time plan

| Phase | Time |
| --- | --- |
| Select and review the issue | 20 min |
| Establish baseline and checks | 20 min |
| Implement one slice | 40 min |
| Review and hand over | 40 min |
