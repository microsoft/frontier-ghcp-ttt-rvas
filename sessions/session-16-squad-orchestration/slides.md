---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 16 — AI Team Orchestration & Coordination Patterns'
---

<!-- _class: lead -->

# AI Team Orchestration & Coordination Patterns
## Module 5: Advanced Topics & Capstone | Advanced

Session 16 of 19 | 3 hours | Optional

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| Coordination trade-offs | 7 min |
| Roles, routing, and memory | 20 min |
| Issues and monitored work | 8 min |
| Prepared team demonstration | 12 min |
| Decision framework and lab handoff | 13 min |
| Lab | 2 hours |

---

# Coordination has a cost

Use a team when work has separate owners, clear interfaces, and a durable decision to share. An individual agent is better for a small, well-understood change.

More agents create more state, review work, and cost.

---

# Coordinator pattern

```text
Issue with acceptance criteria
        ↓
Coordinator selects a bounded role
        ↓
Role writes a proposal or change
        ↓
Focused checks and human review
        ↓
Decision record, merge, follow-up, or pause
```

The coordinator routes bounded work. An ambiguous request needs clarification before implementation.

---

# Team boundaries

| Role | Responsibility |
| --- | --- |
| Lead | Scope, decisions, review gate |
| Implementer | A bounded product area or file set |
| Tester | Focused checks and reported gaps |
| Scribe | Shared decisions and history |
| Work monitor | Surface ready, approved work |

Agents need charters that state inputs, outputs, and limits. Avoid concurrent writes to the same files.

---

# Shared memory

Commit durable decisions: the choice, evidence, owner, and date. Keep temporary drafts separate.

Agents can write individual proposals. A designated owner reviews and merges the shared record. Git history keeps the trail.

---

# Issues and monitored work

An issue is a work contract. It needs acceptance criteria, non-goals, constraints, checks, and a reviewer.

```text
Ready issue → assignment → bounded change → focused checks →
human review → merge or follow-up issue
```

Treat Ralph as a monitored queue. Stop when approval, ownership, policy, test status, scope, or usage limits are unclear.

---

# When orchestration helps

| Situation | Path |
| --- | --- |
| One small repair | Individual agent or manual work |
| Separate work with explicit interfaces | Coordinated team |
| Overlapping ownership or unclear design | Plan before implementation |
| Restricted path or unapproved tool | Manual workflow |

---

# Demonstration and lab

Inspect a prepared Squad team or initialize one through an approved path. Show the roster, routing rules, charter, and decision record. Assign one narrow issue and review its outcome.

Initialize a team, assign bounded work, use GitHub Issues, and monitor a small queue. One reviewed issue is sufficient.
