---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 16 — AI Team Orchestration & Coordination Patterns'
---

<!-- _class: lead -->

# Brady's Squad: Human-Led AI Teams
## Module 5: Specification-Driven Frameworks | Advanced

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
# Parallelism only helps with real independence

Work can run in parallel when each stream has its own inputs, a clear output, and
no hidden dependency on another stream's decision.

| Work item | Parallel? | Reason |
| --- | --- | --- |
| Review separate test files | Often | Each reviewer can return findings |
| Choose a shared domain model | No | Every implementation depends on the decision |
| Update unrelated documentation | Often | Output boundaries are clear |

Splitting an ambiguous task across agents spreads the ambiguity instead of removing it.

---
# The coordinator owns the integration risk

A coordinator should not merely hand out tasks. It needs to know:

1. Which decision makes the workstreams compatible.
2. Which files or systems only one role may change.
3. What evidence each role must return.
4. When a conflict should stop the workflow rather than be merged automatically.

This is why the coordinator is a human-led role even when agents do the initial work.

---
# Use a result packet, not a chat transcript

Each workstream should return a small, reviewable artifact:

```text
Scope completed:
Evidence:
Files or records changed:
Checks run:
Open questions:
Recommendation:
```

The parent can compare packets without reconstructing a long agent conversation.
Missing evidence is a finding, not an invitation to guess.

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
