---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 22: Plan and Steer Work with Canvases'
---

<!-- _class: lead -->

# Plan and Steer Work with Canvases

Session 22 | Product and Delivery Teams

---

# This session uses a prepared canvas

You need GitHub Copilot and the approved prepared canvas.

You will use Copilot to inspect, change, and verify shared state.

Session 08 covers extension design and construction.

---

# Access is a prerequisite

- Sign in to GitHub Copilot.
- Open the approved canvas.
- Confirm Copilot can read the state and call the required actions.
- Stop if any check fails.

The seed files do not replace live canvas work.

---

# The scenario

The **Service Request Portal** is preparing a limited release.

The team needs one reviewed view of:

- work and release scope;
- risks and decisions;
- gates and supporting evidence;
- ownership and stop conditions.

---

# Inspect the contract first

```text
State: work, risks, decisions, gates, evidence, ownership
Human actions: inspect, edit, review, approve, pause
Copilot actions: read state and make named, bounded updates
Validation: accepted values and evidence rules
Boundary: synthetic data and no external changes
```

If the contract is unclear, stop.

---

# One state, two ways to act

| Person | GitHub Copilot |
| --- | --- |
| Uses visible controls | Uses named capabilities |
| Reviews before saving | Reports the requested change |
| Sees the resulting state | Reads the same resulting state |

The artifact is the record. Chat is not the record.

---

# Visible update, Copilot check

1. Change one work item.
2. Add or link evidence.
3. Record why the change is valid.
4. Ask Copilot to read the result.
5. Compare the report with the canvas.

---

# Copilot-requested update

```text
Update W-103 to ready only if the state contains acceptable evidence.
If evidence is missing, do not change the item.
Report the item, evidence, revision, and readiness result.
```

Bound the request. Name the item and the rule.

---

# Compare state with report

Check:

- item status and evidence;
- risk and gate state;
- decision owner and rationale;
- revision number;
- readiness result and reason.

Resolve any mismatch before approval.

---

# Readiness is derived

| Condition | Result |
| --- | --- |
| A required gate is blocked | `no-go` |
| A gate is pending or a risk is open | `conditional` |
| Required gates pass or are waived, and no risk is open | `go` |

A canvas displays the decision. It does not replace the release owner.

---

# Policy and safety gate

- Use synthetic data.
- Confirm the prepared canvas and Copilot actions are approved.
- Do not connect external systems during the lab.
- Stop on unclear scope, policy, ownership, or evidence.
- Stop when required Copilot or canvas access is missing.

---

# Finish with ownership

Record:

- artifact owner and reviewer;
- recovery procedure;
- removal trigger;
- unresolved risks;
- next safe action.

No owner means no approval.

---

# Recovery starts after access is confirmed

If the canvas fails after preflight:

1. Stop changes and record the last revision.
2. Reopen the same approved canvas.
3. Ask Copilot to read state without changing it.
4. Resume only when the report matches the canvas.

Otherwise, pause the lab.

---

<!-- _class: divider -->

# Lab

Review the Service Request Portal release-readiness canvas and produce an evidence record.
