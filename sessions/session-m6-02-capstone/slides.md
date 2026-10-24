---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M6-02: Bounded End-to-End Capstone'
---

<!-- _class: lead -->

# End-to-end capstone for one endpoint

Session M6-02 | 3 hours

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
- implemented patch;
- executable test results;
- review decision;
- deferred scope and next action.

---

# Keep the boundary in the issue

Keep every scope decision in the accepted GitHub issue. Implement only
`POST /api/bookmarks`, use synthetic data, and keep the existing dependencies.

**Stop if the work requires another endpoint, live data, deployment, tool
configuration, or a new dependency.**

---

# Session M5-02 is an input

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

# When work is blocked

Use GitHub Copilot for the implementation.

Record the blocker and a request-changes or pause decision in the handoff.
Resume the work before claiming completion.

---

# Executable verification

```bash
npm test
```

The suite checks success, defaults, field validation, and duplicate URLs.

---

# Review and handover

Trace the change back to the specification. Review the diff, test output,
dependency change, and scope decisions in the issue. Record any deviation in the
handoff.

Record one decision: approve, request changes, or pause.

---

# Lab time plan

| Phase | Time |
| --- | --- |
| Accept the specification and scope | 25 min |
| Write the issue and establish the baseline | 25 min |
| Implement the accepted slice | 35 min |
| Verify, review, and hand off | 35 min |
