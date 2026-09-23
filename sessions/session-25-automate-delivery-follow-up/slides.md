---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 24: Review Outcomes and Govern Automation'
---

<!-- _class: lead -->

# Review Outcomes and Govern Automation

## Session 24

Product and Delivery Teams

---

# Accountability does not transfer

An automation can perform work. The product or delivery owner still owns the workflow, its evidence, and the decision to use the result.

---

# Start with the preflight

| Check | Required answer |
| --- | --- |
| GitHub Copilot | Can each learner use an approved surface now? |
| Policy | Is this surface and feature approved here? |
| Data | Which inputs may enter the workflow? |
| Meter | Which usage and cost signals will we watch? |
| Owner | Who decides whether the result is usable? |
| Stop guard | What ends the run or disables the workflow? |
| Recovery procedure | How will we stop, preserve evidence, and return control to the owner? |

**No Copilot access means stop. Resolve access before the lab.**

---

# Autonomy levels

| Level | Allowed behavior | Approval |
| --- | --- | --- |
| A0 | Checklist or template | Human performs the work |
| A1 | Draft an output | Human approves every use |
| A2 | Take a bounded, reversible action | Contract approval plus exception review |
| A3 | Act without per-run approval | Monitoring and immediate stop path |

Use the lowest level that still saves useful time.

---

# The automation contract

- Purpose and cadence
- Allowed inputs and outputs
- Prohibited data and actions
- Required evidence
- Owner, reviewer, escalation, and stop condition
- Acceptance, rejection, and recovery

---

# Service Request Portal

Every Friday, prepare an internal status draft from:

- synthetic service request records;
- a short change log;
- the approved contract.

The lab workflow is **A1: Draft**. It cannot publish or change source records.

---

# Review the run in order

1. Confirm the contract and run identity.
2. Check inputs, tools, and data boundaries.
3. Reconcile source, accepted, and rejected counts.
4. Trace each claim to evidence.
5. Confirm that no prohibited side effect occurred.
6. Record the Copilot surface and available usage evidence.

---

# Exceptions are evidence

One source record has no owner. The run must exclude it, explain why, and name the escalation path.

Silently repairing or dropping a record fails the contract.

---

# Decide

| Decision | Use when |
| --- | --- |
| Accept | Evidence is complete and the output meets the contract |
| Reject | The result is wrong, unsupported, incomplete, or out of bounds |
| Pause | Policy, data, meter, owner, or evidence is unresolved |

Record the reason, reviewer, time, and next action.

---

# Measure useful time saved

```text
manual baseline
- run time
- review time
- rework
- allocated overhead
= useful time saved
```

The reference run: `42 - 8 - 12 - 4 - 3 = 15 minutes`

---

# Stakeholder-ready update

State:

- what period and workflow the update covers;
- what changed and which exception remains;
- what the reviewer accepted;
- what happens next and who owns it.

Do not expose prompts, internal reasoning, secrets, or unsupported claims.

---

# Product facts can change

GitHub documents local and cloud automations, supported triggers, tool controls, policy dependencies, visibility, and usage metering.

Check the current official documentation before delivery. Do not promise access or rely on a fixed interface.

---

# Lab deliverable

1. Automation contract
2. GitHub Copilot-reviewed evidence packet
3. Approval record
4. Stakeholder-ready update

Use GitHub Copilot to draft, inspect, or review the governed work. Prepared evidence supports that review. It does not replace Copilot access.
