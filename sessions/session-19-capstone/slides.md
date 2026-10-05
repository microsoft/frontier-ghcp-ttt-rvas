---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 19: Bounded End-to-End Capstone'
---

<!-- _class: lead -->

# Bounded End-to-End Capstone

Session 19 | 3 hours

---

# One slice

Implement and review:

```http
POST /api/bookmarks
```

**Everything else is deferred.**

---
# The result is a handoff

- implementation-ready issue;
- patch or patch plan;
- executable test evidence;
- review decision;
- deferred scope and next action.

---

# Keep the boundary in the issue

The accepted GitHub issue holds every scope decision. Implement only
`POST /api/bookmarks`, use synthetic data, and keep the existing dependencies.

**Stop if the work requires another endpoint, live data, deployment, tool
configuration, or a new dependency.**

---

# Session 18 is an input

The accepted specification must separate:

| Behavior | Implementation constraint |
| --- | --- |
| Observable request and response rules | Node.js, Express, in-memory storage |
| Validation and duplicate behavior | Existing dependencies only |
| Acceptance scenarios | Exact files and test command |

---

# Issue trace

Every acceptance criterion maps to:

```text
specification ID -> planned file -> executable test
```

If the issue adds behavior missing from the specification, revise the issue before
implementation.

---

# Scope guard

In scope:

- create one bookmark;
- validate the accepted fields;
- reject a duplicate URL;
- return the documented envelope and status.

Out of scope: authentication, persistence, other endpoints, deployment, and new
packages.

---

| Path | Use |
| --- | --- |
| Approved agent | Implement the single issue |
| Manual | Implement the same files and tests |
| Blocked | Produce a reviewable patch plan |

---

# Executable verification

```bash
npm test
```

The suite checks success, defaults, field validation, and duplicate URLs.

---

# Review and handover

Check the specification trace, diff, test output, dependency change, and scope
decisions in the issue. Record any deviation in the handoff.

Record one decision: approve, request changes, or pause.

---

# Lab time plan

| Phase | Time |
| --- | --- |
| Govern and accept the specification | 25 min |
| Write the issue and establish the baseline | 25 min |
| Implement or write the patch plan | 35 min |
| Verify, review, and hand off | 35 min |
