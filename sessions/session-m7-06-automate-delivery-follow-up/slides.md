---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M7-06: Automate Delivery Follow-up'
---

<!-- _class: lead -->

# Automate delivery follow-up

## Product and Delivery Teams | Intermediate

Session M7-06 | 3 hours

---

# Start from authoritative state

Use:

- the approved live GitHub issues;
- the reviewed Session M7-05 parent result.

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

# Review run details on the platform

Inspect run status, identifiers, timing, usage, and supporting results on the
platform. Do not recreate those fields in a form.

---

# Create one manual automation

```text
Read the approved status-visibility GitHub issues and the reviewed Session M7-05
parent result. Draft one stakeholder update from supported issue state. Name
unresolved exceptions and owners. Do not publish or change systems.
```

Use the minimum GitHub read tools.

---

# Review the first run

- Trace every claim to an issue or the parent result.
- Keep gaps or conflicts in the source information visible.
- Reject unsupported causes and forecasts.
- Check that no prohibited side effect occurred.
- Choose Keep, Revise, Disable, or Pause.

---

# Change one approved input

Update the requester-access training issue with the approved synthetic results.

Retrieve the issue again. Then run the same automation.

Check that the new draft differs only because of the approved issue change.

---

# Stakeholder update

State:

- the reporting scope;
- supported status changes;
- unresolved exceptions and owners;
- the review decision;
- the next action.

A person shares the update.

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

Use the live Session M7-05 result and platform run records. Do not copy them into
a status file or second run-status record.
