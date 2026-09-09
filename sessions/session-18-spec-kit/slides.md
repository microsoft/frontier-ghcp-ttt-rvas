---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 18 — Spec Kit: Enterprise Specification-Driven Development'
---

<!-- _class: lead -->

# Spec Kit: Enterprise Specification-Driven Development

Session 18 of 19 | 3 hours

---

# Make intent reviewable before code exists

A feature request is rarely ready to implement. Make its scope, constraints, and acceptance criteria explicit first.

---

# The sequence

```text
Constitution → Specify → Clarify → Plan → Checklist → Tasks →
Analyze → Implement → Converge
```

Use the sequence to reason through the work. Spec Kit is an optional implementation example, not the contract.

---

# Constitution

Define the outcome, non-goals, constraints, owners, data boundary, and review gate.

It stops a small request from becoming a product roadmap.

---

# Specify behavior

Describe endpoint or user behavior with observable criteria:

```text
Given an invalid email, POST /users returns HTTP 400 and creates no user.
Given an existing email, POST /users returns HTTP 409.
```

---

# Clarify before planning

Resolve ambiguous behavior, or record an explicit deferral and its owner. Do not bury decisions in implementation tasks.

---

# Plan, checklist, and tasks

The plan identifies implementation units and dependencies. The checklist covers acceptance and review. Tasks identify files, expected results, and checks.

Remove tasks without a source requirement.

---

# Convergence review

Compare the code or handoff, tests, and documentation against the accepted specification. Each criterion is passed, deferred, or returned for changes with evidence.

---

# Delivery controls

Before installing a pre-1.0 tool, confirm the customer-approved package source and pinned version, access, integration, synthetic data, usage guard, and manual fallback.

---

# Lab

Build a User API specification, carry a favorites request through the nine phases, review tool governance, and produce a peer-reviewed handoff.
