---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 23: Build and Use a Planning Canvas'
---

<!-- _class: lead -->

# Build and Use a Planning Canvas

Session 23 | Product and Delivery Teams | Intermediate

---

# Use visible state when chat stops being enough

A canvas helps when work has several records, repeated updates, named actions, and a review view that must survive the conversation.

---

# Start from the GitHub issue plan

The canvas should show:

- parent objective;
- issue and planning status;
- owner or ownership gap;
- dependency and risk;
- decision and next action.

---

# Create it in plain language

```text
/create-canvas Create a delivery-planning canvas for the approved GitHub issues.
People can update planning status and record decisions. Copilot can summarize
and propose updates. Do not close issues, change assignees, or publish content.
```

---

# Review before use

Ask:

1. Does each field support a real decision?
2. Can every action be explained?
3. Are external writes excluded?
4. Can the owner recover?
5. When should the canvas be retired?

---

# Simpler is better

Remove generated fields and actions that do not help the team decide or act.

A crowded canvas is not a mature canvas.

---

# Load live GitHub issues

Use GitHub MCP to retrieve the Session 22 issues.

Copilot can move the approved fields into the canvas. GitHub remains the source for issue state.

---

# Keep planning state explicit

The canvas may show `ready for review` while the GitHub issue remains open.

That is acceptable when the canvas labels the planning state and source-system state separately.

---

# Verify three views

Compare:

- the visible canvas;
- Copilot's report;
- a fresh GitHub MCP read.

Resolve or explain every mismatch.

---

# Lab result

- Learner-created canvas
- Reviewed state and actions
- Live GitHub issue data
- Human and Copilot updates
- Owner, recovery, and retirement

**Stop if live canvas creation is unavailable.**
