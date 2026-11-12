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

# What is an automation?

An **automation** is a saved prompt plus a **trigger**, a set of **tools**, and an
**enabled** state. When the trigger fires, the agent runs the prompt.

- **Trigger and cadence:** manual (you click run), a schedule (hourly, daily, weekly, cron), or a repository event.
- **Local scope:** runs on your machine, only while the app can run it. Cloud automations are a separate type; check current docs.
- **Enabled state:** an enabled automation can fire. A disabled one can't.

---

# Automation, saved prompt, or Actions workflow?

| | Saved prompt | Copilot automation | GitHub Actions workflow |
| --- | --- | --- | --- |
| Starts | You, each time | Trigger or you | Repository event or schedule |
| Runs | In your session | An agent run with chosen tools | Deterministic steps on a runner |
| Output | Varies | Varies; needs review | Same steps, same result |
| Best for | Repeated asks you watch | Recurring judgment work, like a draft update | Builds, tests, deploys |

Use Actions when the job must be exact. Use an automation when the job needs
reading and writing.

---

# Source reliability

A draft is only as good as its inputs.

- Live issues beat copied status files.
- A reviewed parent result beats chat memory.
- When sources disagree, the draft should say so, not pick one.
- A claim without a source gets cut.

---

# A useful update, and why drafts go wrong

A useful update says **what changed, what is stuck, who owns it, and what happens
next.** It is short and every claim has a source.

Drafts go wrong when:

- inputs are stale or incomplete;
- the model fills gaps with a guess or a cause;
- the prompt asks for tone, not facts;
- nobody reviews it.

---

# Scheduling: pros and cons

**Pros:** no one forgets; consistent timing.

**Cons:** repeats mistakes unattended; costs usage; stale inputs produce
confident wrong drafts; someone must own it.

That's why this lab stays manual.

---

# Start from authoritative state

Use:

- the live GitHub issues;
- the reviewed Session M7-05 parent result.

Skip static handoffs. They drift from the platform state.

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
platform.

---

# Create one manual automation

```text
Read the approved status-visibility GitHub issues and the reviewed Session M7-05
parent result. Draft one stakeholder update from supported issue state. Name
unresolved exceptions and owners. Boundary: draft only.
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

Enable a cadence only after separate sign-off. Update the current state when the
automation is enabled or disabled.

---

# Lab deliverable

1. Concise automation definition
2. Reviewed stakeholder update

Run records stay on the platform.
