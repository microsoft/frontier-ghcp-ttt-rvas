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

- **Trigger and cadence:** manual (you click run), a schedule (hourly, daily, or weekly), or a repository event such as a new issue or pull request. Cloud and local automations offer different triggers; check current docs.
- **Local scope:** runs on your machine, only while the app can run it. Cloud automations are a separate type that need Copilot cloud agent enabled for the repository.
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

# Pick authoritative sources

A draft is only as good as its inputs.

- **Live issues beat copied status files.**
- A reviewed parent result beats chat memory.
- When sources disagree, the draft says so. It doesn't pick one.
- A claim without a source gets cut.

Pick one system for status. Use **GitHub** when issues and agent work live there.
Use **Azure Boards** when the backlog lives there. Don't keep competing status
fields.

---

# A useful update, and why drafts go wrong

A useful update says **what changed, what is stuck, who owns it, and what happens
next.** It is short, and every claim has a source.

Drafts go wrong when:

- inputs are stale or incomplete;
- the model guesses a cause to fill a gap;
- the prompt asks for tone, not facts;
- nobody reviews it.

---

# Define the automation before you build it

| Field | Decide |
| --- | --- |
| Trigger and cadence | Manual, schedule, or event |
| Inputs | Which sources it may read |
| Allowed output | What it may produce |
| Prohibited side effects | Posts, messages, edits, external writes |
| Reviewer | A named person or role |
| Stop conditions | The hard limits |
| State | Enabled or disabled |

Give it the **minimum tools** it needs. Read-only is a good default.

---

# Review every run

Open the run on the platform. Check status, timing, usage, and what the agent read.

Then check the draft:

- Trace each claim to a source.
- Keep gaps and conflicts visible.
- Reject causes and forecasts nobody supported.
- Check that no prohibited side effect happened.
- Decide: **keep, revise, disable, or pause.**

---

# Test a change on purpose

Change one input, read it again, and rerun the same automation. The new draft
should differ only because of that change. If it differs elsewhere, the prompt
is too loose.

---

# Scheduling: pros and cons

**Pros:** nobody forgets; timing is consistent.

**Cons:** it repeats mistakes unattended; it costs usage; stale inputs give
confident wrong drafts; someone must own it.

**Start with supervised manual runs.** Add a cadence only after someone signs off,
and update the enabled state when you turn it on or off.

---

# In the lab

You build one manual, draft-only automation from the live issues and the Session
M7-05 parent result. You review the run, change one issue, rerun, and review the
stakeholder update. A person shares it. You deliver the automation definition and
the reviewed update.
