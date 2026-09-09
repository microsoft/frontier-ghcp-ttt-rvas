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
