---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 25: Automate Delivery Follow-up'
---

<!-- _class: lead -->

# Automate Delivery Follow-up

## Product and Delivery Teams | Intermediate

Session 25 | 3 hours

---

# Start from authoritative state

Use:

- the approved live GitHub issues;
- the reviewed Session 24 parent result.

Do not copy platform state into a static handoff.

---

# Define the automation

| Field | Decision |
| --- | --- |
| Trigger and cadence | Manual; no schedule |
| Authoritative inputs | Live issues and parent result |
| Permitted output | One draft stakeholder update |
| Prohibited side effects | No posts, messages, edits, or external writes |
| Reviewer | Named human role |
| Stop conditions | Named hard boundaries |
| Current state | Enabled or disabled |

---

# Keep the output real

The automation produces one stakeholder update.

The platform already holds run status, identifiers, timing, usage, and evidence.
Do not recreate those fields in a form.

---

# Create one manual automation

```text
Read the approved status-visibility GitHub issues and the reviewed Session 24
parent result. Draft one stakeholder update from supported issue state. Name
unresolved exceptions and owners. Do not publish or change systems.
```

Use the minimum GitHub read tools.

---

# Review the first run

- Trace every claim to an issue or the parent result.
- Keep unresolved evidence visible.
- Reject unsupported causes and forecasts.
- Confirm that no prohibited side effect occurred.
- Choose Keep, Revise, Disable, or Pause.

---

# Change one approved input

Update the requester-access training issue with the approved synthetic evidence.

Retrieve the issue again. Then run the same automation.

Only the approved issue change should explain the new draft.

---

# Stakeholder update

State:

- the reporting scope;
- supported status changes;
- unresolved exceptions and owners;
- the review decision;
- the next action.

Distribution remains a human action.

---

# Choose one authoritative system

Use **GitHub** when issues and agent work live there.

Use **Azure Boards** when the delivery backlog lives there.

Do not maintain competing status fields.

---

# Scheduling stays disabled

The core lab uses supervised manual runs.

Enable a cadence only after separate approval. Update the current state when the
automation is enabled or disabled.

---

# Lab deliverable

1. Concise automation definition
2. Reviewed stakeholder update

No copied Session 24 status file. No second run-status artifact.
