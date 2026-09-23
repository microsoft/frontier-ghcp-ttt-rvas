---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 23: Orchestrate Agents and Workstreams'
---

<!-- _class: lead -->

# Orchestrate Agents and Workstreams
## Product and Delivery Teams | Intermediate

Session 23 | 3 hours

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

- `/orchestrate` or an approved equivalent is required.
- The tool must create and coordinate live child sessions.
- Confirm that you can open, steer, and stop each child.
- `/spawn` alone does not meet the lesson goal.

**Stop and resolve access if orchestration is unavailable.**

No role-play, prepared-result, offline, or static completion route is available.

---

# Product state: September 23, 2026

- `/orchestrate` is a documented GitHub Copilot app skill.
- `/spawn` creates a focused child session.
- `/usage` opens plan usage and rate-limit details.
- Commands vary by context.
- **My work** may appear under a renamed session or work surface.

Confirm the current command picker before the session.

---

# One parent objective

> Decide whether the Service Request Portal release is ready for review.
> Produce a short evidence record. Do not change production or publish claims.

The parent owns scope, routing, review, and the final decision.

---

# Independent workstreams

| ID | Question | Packet |
| --- | --- | --- |
| WS-01 | Which user-visible changes are supported? | Release notes |
| WS-02 | What does support need before launch? | Readiness checklist |
| WS-03 | What could block release? | Risk register |
| WS-04 | Which approved answers can we prepare? | Stakeholder FAQ |

Parallel work needs clean boundaries. Sequence hidden dependencies.

---

# Child-session contract

```text
Goal: One bounded question
Inputs: Approved, sanitized sources
Return: Findings, evidence, gaps, recommendation
Do not: Change systems or invent facts
Stop when: Access, scope, usage, or evidence becomes unsafe
Reviewer: Named human owner
```

The result packet is the deliverable.

---

# Start live orchestration

```text
/orchestrate Prepare release-review evidence for the Service Request Portal.
Use the four workstreams in the approved plan. Keep them independent.
Require one result packet per workstream. Obey every stop condition.
```

Confirm that GitHub Copilot created the expected child sessions.

---

# Monitor the work

Use **My work**, sessions, agents, or the current equivalent.

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
  Release-readiness record
```

One owner edits the final record.

---

# Human approval remains the gate

Record:

- accepted evidence;
- rejected claims and reasons;
- unresolved owners and dates;
- **Go**, **Conditional go**, or **No-go**.

Copilot coordinates work. It does not receive release authority.

---

# Session 16 is different

| Session 16 | Session 23 |
| --- | --- |
| Optional Squad framework | Built-in app orchestration |
| Persistent roles and routing | Temporary workstreams |
| Team setup and shared memory | Result packets and review |
| Advanced implementation | Manager-led delivery practice |

No custom-agent construction or Squad implementation in this session.

---

# Lab deliverable

- Orchestration plan with live child-session identifiers
- Management action for each child session
- Live result packets
- Acceptance or rejection for every result
- Release-readiness record with human approval

Azure Boards may use MCP or the browser. GitHub Copilot must perform the orchestration.
