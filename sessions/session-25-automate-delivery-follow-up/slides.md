---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 25: Automate Delivery Follow-up and Connect Work Systems'
---

<!-- _class: lead -->

# Automate Delivery Follow-up and Connect Work Systems

## Session 25

Product and Delivery Teams

---

# Start with a known workflow

Sessions 20-24 created the brief, issues, canvas, and reviewed work.

Session 24 produced `delivery-status-record.md`. Now automate one recurring draft.

---

# Check access and boundaries first

| Check | Required answer |
| --- | --- |
| GitHub Copilot | Can each learner open Automations now? |
| GitHub MCP | Can the automation read the approved issues? |
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

# Create one manual, draft-only automation

- Retrieve approved issue state.
- Read the synthetic delivery inputs.
- Draft the weekly update.
- Return run evidence.
- Do not publish or change work items.

Use a **Manual** trigger and keep **Run in cloud** off for the local-file lab.
Scheduling stays off in the core lab.

---

# Service Request Portal

Prepare an internal status draft from:

- Session 24 delivery-status records;
- the Session 24 handoff;
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

One workstream record has no evidence reference. The run must exclude it, explain
why, and name the escalation path.

Silently repairing or dropping a record fails the contract.

---

# Rerun after an approved input change

```text
Run 1
  → exclude SV-04: missing evidence reference
  → review evidence
  → apply approved source update
  → run the same automation again
  → compare evidence
```

The automation boundary stays fixed. Only the approved input changes.

---

# Compare the two runs

| Check | Run 1 | Run 2 |
| --- | --- | --- |
| Accepted records | 3 | 4 |
| Rejected records | 1 | 0 |
| Ready for review | 2 | 3 |
| Blocked records | 1 | 1 |
| Prohibited writes | 0 | 0 |

The second run must explain why the record changed classification.

---

# Decide

| Decision | Use when |
| --- | --- |
| Accept | Evidence is complete and the output meets the contract |
| Reject | The result is wrong, unsupported, incomplete, or out of bounds |
| Pause | Policy, data, meter, owner, or evidence is unresolved |

Update the contract status and next action.

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

# Choose the authoritative work system

Keep **GitHub** authoritative when issues and agent work live there.

Keep **Azure Boards** authoritative when the delivery backlog lives there.

Do not maintain competing status fields without an owner.

---

# Scheduling is a stretch

Keep the output draft only.

Before enabling a weekly trigger, confirm the time zone, owner, budget, failure
signal, and disable path.

Higher autonomy is trainer-only and needs stronger controls.

---

# Recheck product facts before delivery

GitHub documents local and cloud automations, supported triggers, tool controls, policy dependencies, visibility, and usage metering.

Check the current official documentation before delivery. Do not promise access or rely on a fixed interface.

---

# Lab deliverable

1. Automation contract
2. Two reviewed run records
3. Stakeholder-ready update
4. System-of-record decision

Run the same draft-only automation twice. Review both results, then choose
**keep**, **revise**, **disable**, or **pause**.
