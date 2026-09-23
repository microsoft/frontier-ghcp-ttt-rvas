---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 21: Interview Ideas and Shape Better Work'
---

<!-- _class: lead -->

# Interview Ideas and Shape Better Work

Session 21 | Product and Delivery Teams | 3 hours

---

# GitHub Copilot is required

Before the session:

- Open an approved GitHub Copilot surface.
- Run one prompt and one follow-up.
- Confirm that `grill-me`, `grilling`, or the supplied interview prompt works.

**Stop and resolve access if any check fails.**

---

# Start with the actual problem

> "Make request status clearer so people stop asking support."

This is an idea, not sprint-ready work.

It hides choices about users, scope, data, behavior, ownership, and approval.

---

# The shaping flow

```text
Vague request
  -> GitHub Copilot decision-tree interview
  -> human decisions
  -> decision brief
  -> structured work item
  -> acceptance criteria
  -> definition of done
```

Do not jump from one sentence to an issue template.

---

# Interview as a decision tree

Each answer can unlock new questions.

Ask the current **frontier**: every decision that can be made now without guessing about an unsettled decision.

Questions that depend on this round wait for the next round.

---

# Work in rounds

```text
Round 1: outcome, affected user, current pain
Round 2: scope, current state, constraints
Round 3: success, failure, edge cases
Round 4: owner, reviewer, approval, rollout
```

Ask GitHub Copilot to recompute the next frontier from the confirmed answers.

---

# Give a recommendation

For each question:

1. State the decision clearly.
2. Offer concrete choices when useful.
3. Recommend an answer and explain the tradeoff.
4. Wait for the request owner to decide.

GitHub Copilot frames the choice. It does not own the choice.

---

# Facts and decisions are different

| Use approved evidence for facts | Ask people for decisions |
| --- | --- |
| Existing workflow | Which users are in scope |
| Current labels or fields | Which behavior should change |
| Known technical limits | Which tradeoff to accept |
| Policy and data rules | Who approves release |

Mark an unverified fact. Never turn it into an assumption.

---

# Six branches must close

- **Scope:** who and what are included?
- **Constraints:** what limits the solution?
- **Success:** what observable result matters?
- **Failure:** what can go wrong, and what should happen?
- **Ownership:** who decides and who maintains it?
- **Approval:** who reviews the brief and accepts the work?

An open branch stays visible.

---

# The decision brief

A useful brief records:

- problem and target outcome;
- users, scope, and exclusions;
- constraints and dependencies;
- success and failure measures;
- settled decisions and open questions;
- owner, reviewer, and approval gate.

Keep it short enough to review in one sitting.

---

# Move into a structured work item

Ask GitHub Copilot to draft:

- user and outcome;
- bounded scope and non-goals;
- acceptance criteria;
- dependencies and risks;
- owner and reviewer;
- definition of done.

Compare the draft with the approved brief.

---

# Acceptance criteria describe evidence

Weak:

> Status is easy to understand.

Testable:

> A requester can see the current status and last updated time for each submitted request.

Include a failure case when the feature can mislead, expose data, or block progress.

---

# Definition of done closes delivery

Acceptance criteria describe product behavior.

Definition of done covers the work needed to release and hand over safely:

- criteria reviewed;
- permissions checked;
- supported states documented;
- validation evidence attached;
- product and service owners approve.

---

# Azure Boards update paths

The interview always runs with **GitHub Copilot**.

| Azure Boards path | Method |
| --- | --- |
| MCP | Copilot prepares and reviews the approved update before the MCP tool sends it |
| Browser | Copilot prepares the exact values, then the learner enters and verifies them |

There is no static or no-Copilot route.

---

# Lab deliverables

1. A **reviewed decision brief**.
2. A **sprint-ready work item** with acceptance criteria and definition of done.
3. A **Copilot interview record** that shows the rounds and owner decisions.

The request owner approves the brief. A delivery reviewer checks readiness.

---

# Stop conditions

Stop when:

- GitHub Copilot access does not pass preflight;
- the input is not approved or sanitized;
- a required decision owner is absent;
- policy or data boundaries are unclear;
- the team cannot state how success or failure will be observed.

Record content blockers. Resolve Copilot access before starting the exercise.
