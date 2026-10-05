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
| Parent objective and workstreams | 8 min |
| Child-session contracts | 10 min |
| Monitor and intervene | 10 min |
| Live orchestration demonstration | 12 min |
| Review and consolidate | 12 min |
| Lab handoff | 8 min |

---

# Required access

- Confirm the built-in `orchestrate` skill under **Customize** → **Skills**.
- `/orchestrate` must create and coordinate live child sessions.
- Confirm that you can open, steer, and stop each child.

**Stop and resolve access if orchestration is unavailable.**

No role-play, prepared-result, offline, or static completion route is available.

---

# Product state: October 5, 2026

- `/orchestrate` is a documented GitHub Copilot app skill.
- Commands vary by context.
- **My work** may appear under a renamed session or work surface.

Confirm the current command picker before the session.

---

# One parent objective

> Decide whether the Service Request Portal status-visibility issue set is ready
> for delivery follow-up. Produce `delivery-status-record.md`.

The parent owns scope, routing, review, and the final decision.

---

# Independent workstreams

| ID | Question | Packet |
| --- | --- | --- |
| WS-01 | Is public status mapping ready? | Mapping packet |
| WS-02 | Is requester view issue `#241` ready? | Field checklist |
| WS-03 | Are empty and stale states testable? | Scenario checklist |
| WS-04 | Is requester-only access evidence ready? | Access checklist |

Parallel work needs clean boundaries. Sequence hidden dependencies.

---

# Child-session contract

```text
Goal: One bounded question
Inputs: Approved, sanitized sources
Return: Findings, evidence, gaps, recommendation
Do not: Change systems or invent facts
Stop when: Access, scope, usage, or evidence becomes unsafe
Decision owner: Named human role
```

The workstream result is the deliverable.

---

# Start live orchestration

```text
/orchestrate Review the Service Request Portal status-visibility issue set.
Use the four workstreams in the approved plan. Keep them independent.
Require one result per workstream. Obey every stop condition.
```

Confirm that GitHub Copilot created the expected child sessions.

---

# Monitor the work

Use **My work**, sessions, agents, or the current session management surface.

Check:

- status and elapsed time;
- evidence gathered;
- usage against the guard;
- scope drift or blocked access;
- whether the packet is ready.

---

# Intervene deliberately

| Signal | Action |
| --- | --- |
| Safe and on scope | Wait |
| Safe work needs correction | Redirect |
| Restricted data, excess usage, or broken boundary | Stop |
| Contract met | Accept |
| Unsupported or unsafe result | Reject |
| Human authority required | Escalate |

Stopping weak work is a valid management decision.

---

# Live demonstration

1. Start four child sessions through GitHub Copilot orchestration.
2. Open the live session list.
3. Redirect an unsupported claim.
4. Stop a restricted-data request.
5. Accept evidence-backed work.
6. Record the human decision.

At least one live redirect must improve scope, evidence, or packet structure.

Do not substitute prepared packets when a live run fails.

---

# Evidence before fluency

Review each packet for:

- scope;
- source references;
- boundary compliance;
- open questions;
- a usable recommendation.

A polished answer with no evidence is still a rejection.

---

# One shared record

Child sessions return packets to the parent.

```text
Parent objective
  |-- WS-01 packet
  |-- WS-02 packet
  |-- WS-03 packet
  `-- WS-04 packet
          |
      Human review
          |
  Delivery-status record
```

One owner edits the final record.

---

# The human still makes the decision

Record:

- accepted evidence;
- rejected claims and reasons;
- unresolved owners and dates;
- **Ready**, **Ready with conditions**, or **Not ready**.

Copilot coordinates work. It does not receive release authority.

---

# Session 16 is different

| Session 16 | Session 24 |
| --- | --- |
| Optional Squad framework | Built-in app orchestration |
| Persistent roles and routing | Temporary workstreams |
| Team setup and shared memory | Results and review |
| Advanced implementation | Manager-led delivery practice |

No custom-agent construction or Squad implementation in this session.

---

# Lab deliverable

- Orchestration plan with live child-session identifiers
- Live results
- Delivery-status record with the decision and Session 25 handoff

Azure Boards may use MCP or the browser. GitHub Copilot must perform the orchestration.
