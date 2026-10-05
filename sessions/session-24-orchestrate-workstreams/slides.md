---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 24: Orchestrate Agents and Workstreams'
---

<!-- _class: lead -->

# Orchestrate Agents and Workstreams

## Product and Delivery Teams | Intermediate

Session 24 | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| Parent objective and boundaries | 10 min |
| Minimal workstream plan | 10 min |
| Monitor and intervene | 12 min |
| Live demonstration | 13 min |
| Review and lab handoff | 15 min |

---

# Required access

- `/orchestrate` must create and coordinate live child sessions.
- GitHub MCP must read the approved issues.
- You must be able to open, redirect, and stop child sessions.

**Stop if orchestration or issue access is unavailable.**

---

# One parent objective

> Review the four approved status-visibility issues and return one reviewed
> result for each.

The parent owns scope and review.

---

# Keep the plan small

Each workstream needs:

- a bounded question;
- approved inputs;
- a stop condition;
- a reviewer.

The orchestration surface already holds session links, status, timing, and usage.

---

# Four independent workstreams

| Workstream | Question |
| --- | --- |
| Public mapping | Is the mapping ready for approval? |
| Requester status | Is the issue ready for implementation review? |
| Empty and stale states | Are fallback states testable? |
| Access boundary | Is the approved evidence ready? |

Move shared questions back to the parent.

---

# Start live orchestration

```text
/orchestrate Use the four workstreams in my approved plan. Keep them independent.
Each result must answer its question, cite approved inputs, state unresolved
gaps, and give a recommendation. Obey each stop condition.
```

---

# Monitor on the platform

| Signal | Action |
| --- | --- |
| Safe and on scope | Wait |
| Safe work needs correction | Redirect |
| A boundary is crossed | Stop |
| The result meets the plan | Accept |
| The result lacks support | Reject |
| Human authority is required | Escalate |

Do not maintain a second status log.

---

# Review each result

- Does it answer the bounded question?
- Does it use only approved issue evidence?
- Did it obey the stop condition?
- Are gaps explicit?
- Is the recommendation supported?

A fluent answer without evidence is still a rejection.

---

# The parent result is the handoff

The reviewed result:

- links findings to live GitHub issues;
- shows rejected claims;
- names gaps and owners;
- recommends the next follow-up.

Session 25 reads this result and the live issues.

---

# The human keeps authority

Copilot coordinates work. A person reviews results and approves any issue update,
publication, or release statement.

---

# Session 16 is different

| Session 16 | Session 24 |
| --- | --- |
| Persistent roles and routing | Temporary workstreams |
| Optional framework setup | Built-in orchestration |
| Shared memory | Live issue evidence |

---

# Lab deliverable

1. Approved orchestration plan
2. Live child-session results
3. Reviewed parent result linked to live issues

No manual delivery-status form. No copied session identifiers.
