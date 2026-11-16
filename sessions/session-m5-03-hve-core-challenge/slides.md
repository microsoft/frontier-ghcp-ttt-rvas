---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M5-03: HVE Core Challenge'
---

<!-- _class: lead -->

# HVE Core challenge

From product intent to reviewed code

---

# What HVE is

Hypervelocity Engineering is a structured engineering framework for GitHub Copilot.

It gives agent work defined roles, standards, human review gates, and
saved phase files.

Command names change between versions. **Check the HVE Core README for your version.**

---

# RPI in one slide

**R**esearch → **P**lan → **I**mplement → **R**eview, then Follow-up.

| Phase | Prompt | Writes |
|-------|--------|--------|
| Research | `/rpi-research` | What exists, limits, rejected options |
| Plan | `/rpi-plan` | Tasks, acceptance criteria, checks, critique |
| Implement | `/rpi-implement` | Code and a changes log |
| Review | `/rpi-review` | Per-criterion verdicts and a decision |

Follow-up sends defects to Implement, decision gaps to Plan, and missing facts to
Research.

---

# Four component types

| Component | Job |
|-----------|-----|
| Agents | Own roles and multi-step protocols |
| Prompts | Start repeatable workflows |
| Instructions | Apply standards by file pattern |
| Tracking artifacts | Carry state between phases |

---

# File as interface

Each phase writes a Markdown file. The next phase reads that file, not the chat.

```text
.copilot-tracking/research/<date>/<task>-research.md
  → plans/<date>/<task>-plan.md  (+ critique under reviews/plans/)
  → changes/<date>/<task>-changes.md
  → reviews/logs/<date>/<task>-review.md
```

You can read, diff, and edit a file, then attach it to a fresh chat and carry on.
Paths vary by version.

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

Output:

```text
.copilot-tracking/plans/
```

---

# Implement and Review

Implement follows the approved plan and writes a changes log.

Review checks whether the result meets the request, code quality standards, tests,
and instructions.

The human still decides: approve, request changes, or pause.

---

# Direct and combined RPI

| | Direct prompts | Combined `/rpi task="..."` |
|-|----------------|----------------------------|
| You type | One prompt per phase | One prompt for the task |
| Approval | You approve each phase | Depends on the mode you pick |
| Output | One file per phase | The same kinds of files, one task name |
| After Review | You route defects | Follow-up routes them |
| Use it when | Learning, demos, approvals | The team trusts the handoffs |

Both write the same files. Combined only changes who drives.

---

# Optional: HVE customization is additive

```text
.github/copilot-instructions.md
.github/instructions/*.instructions.md
.github/agents/*.agent.md
```

Project context reaches all agents. Custom agents add repository-owned roles and
output contracts.

An instruction loads by `applyTo` glob, set in its frontmatter:

```yaml
applyTo: "src/**/*.js,tests/**/*.test.js"
```

Copilot loads it only when working on a matching file.

---

# Check that it's active

Creating a file doesn't mean HVE used it.

| File | Check |
|------|-------|
| Instructions | Edit a matching file, ask a question. The file shows in References. A non-matching file doesn't load it |
| Agent | It appears in the agent picker (`/agent` in the CLI). Its answer follows your format |
| Prompt | Typing `/name` shows it in the picker, and it runs |

Then find one plan, code, or review change it caused.

---

# Optional: HVE starts before engineering

```text
Business idea
  → BRD Builder / Product Manager Advisor / PRD Builder
  → Agile Coach
  → RPI
  → reviewed code
```

**BRD**: business requirements, why the business wants this. **PRD**: product
requirements, what the product must do. `@BRD Builder` and `@PRD Builder` write them.

Product Manager Advisor tests value and assumptions. Agile Coach turns intent into
a user story and acceptance criteria. The lab starts from a supplied product intent.

---

# Spot weak work with fast checks

Agents write code that looks finished. Run a few cheap checks that try to break it.

1. **Bad input**: send a required field as whitespace or a number.
2. **Edge cases**: repeat a value with different case or spacing.
3. **Malformed requests**: send broken JSON.
4. **Error shape**: read the exact error body, not just the status code.
5. **Build boundaries**: check which stage supplies source to the runtime image.

A failed check is a defect for Implement. A check nobody defined is a gap for Plan.

---

# Keep the handoff short

A handoff file points to the work. It doesn't repeat it.

Include:

* the paths of the phase files;
* your decision;
* open risks;
* the next action.

Leave out copied phase text and command output. The next reader opens the files.

---

# In the lab

You run direct Research and Plan, then Implement and Review, then compare with combined `/rpi`.
The task is `POST /api/decisions`, built inside the supplied product intent and API contract.
Optional, before Implement: add repository context, an `applyTo` instruction, and a custom reviewer.
