---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 20: HVE Core Challenge'
---

<!-- _class: lead -->

# HVE Core Challenge

From product intent to reviewed code

---

# What HVE is

Hypervelocity Engineering is a structured engineering framework for GitHub Copilot.

It turns agent work into a repeatable process with explicit roles, standards,
human gates, and durable evidence.

---

# Four component types

| Component | Job |
|-----------|-----|
| Agents | Own roles and multi-step protocols |
| Prompts | Start repeatable workflows |
| Instructions | Apply standards by file pattern |
| Tracking artifacts | Carry state between phases |

---

# HVE uses files as interfaces

```text
Research artifact
  → Plan + details + planning log
  → Changes log
  → Review findings and decision
```

Each handoff is inspectable, diffable, and resumable.

---

# Research before code

Research answers:

* Which files own the behavior?
* What constraints already exist?
* Which alternatives were rejected?
* What check could disprove the approach?

Output: `.copilot-tracking/research/`

---

# Plan before implementation

Plan maps criteria to files, checks, dependencies, and human gates.

Outputs:

```text
.copilot-tracking/plans/
.copilot-tracking/details/
.copilot-tracking/plans/logs/
```

---

# Implement and Review

Implement follows the approved plan and writes a changes log.

Review checks request fulfillment, code quality, tests, and instruction compliance.

The human still decides: approve, request changes, or pause.

---

# Standalone and combined RPI

| Mode | Entry points | Use it when |
|------|--------------|-------------|
| Standalone | `/task-research`, `/task-plan`, `/task-implement`, `/task-review` | Learning, demos, explicit approvals |
| Combined | `/rpi task=... auto=false` | The team understands and trusts the handoffs |

Combined RPI adds Discover after Review.

---

# HVE customization is additive

```text
.github/copilot-instructions.md
.github/instructions/*.instructions.md
.github/agents/*.agent.md
```

Project context reaches all agents. Coding practices activate by `applyTo` glob.
Custom agents add repository-owned roles and output contracts.

---

# Activation needs evidence

An instruction file existing is not proof.

Show:

1. a matching path;
2. the rule that activated;
3. the plan, code, or review decision it changed.

---

# HVE starts before engineering

```text
Business idea
  → BRD Builder / Product Manager Advisor / PRD Builder
  → Agile Coach
  → RPI
  → reviewed code
```

Product agents test value and assumptions. Agile Coach turns intent into an
outcome-oriented story and acceptance criteria.

---

# The challenge ramp

1. Run standalone Research and Plan.
2. Add repository context, coding practices, and a custom reviewer.
3. Use Product Manager Advisor and Agile Coach.
4. Update the plan, then run Implement and Review.
5. Compare the result with combined `/rpi`.

---

# The implementation surface

Deliver `POST /api/decisions` from a bounded product intent and API contract.

The endpoint is small on purpose. Scope control is part of the score.

---

# The contract

| Input | Rule |
|-------|------|
| `title` | Required non-empty string; duplicate check ignores case |
| `context` | Required non-empty string |
| `decision` | Required non-empty string |
| `status` | `proposed`, `accepted`, or `superseded` |

Generate an ID and UTC timestamp. Keep state in memory.

Package tested source in a non-root runtime image with production dependencies and
a health check.

---

# Fast checks that find weak work

1. Send a required field as whitespace or a number.
2. Create the same trimmed title with different case.
3. Send malformed JSON.
4. Inspect the exact error envelope.
5. Check which stage supplies source to the runtime image.

These checks test the boundary, not the happy path.

---

# Completion evidence

| Area | Weight |
|------|-------:|
| HVE RPI artifact chain | 40% |
| HVE customization and activation | 25% |
| Product and Agile agent handoff | 20% |
| Feature and container validation | 15% |

A manual implementation does not complete an HVE challenge.
