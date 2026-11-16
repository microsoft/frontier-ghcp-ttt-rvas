---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M7-04: Build and Use a Planning Canvas'
---

<!-- _class: lead -->

# Build and use a planning canvas

Session M7-04 | Product and Delivery Teams | Intermediate

---

# Key terms

- **Canvas:** a shared panel in the GitHub Copilot app where you and the agent work on the same artifact.
- **Project-scoped canvas:** a canvas stored in the repository under `.github/extensions`, so the team shares it. (Personal ones live in `~/.copilot/extensions`.)
- **Extension:** the code behind the canvas: a `package.json`, an entry file such as `extension.mjs`, and optional saved state.
- **State drift:** the canvas shows older data than the source system.

---

# Canvas, chat, or issues?

| | Chat | Canvas | GitHub issues |
| --- | --- | --- | --- |
| Good for | Asking, reasoning | Seeing and steering shared state | Recording work |
| Lasts | The conversation | Until you retire it | Until closed |
| Authoritative for | Nothing | Planning notes you add | Issue state, titles, assignees |

**Which state wins:** GitHub wins for issue facts. The canvas wins only for the
planning fields it owns, such as planning status, risk, and decision.

---

# Canvas trade-offs

**Pros:** one visible view, repeatable actions, survives the chat, you can edit it
directly.

**Cons and limits:** generated code you must review; it holds a copy of the
data, so it goes stale; it needs an owner; it runs only in the app.

**Refresh:** the canvas doesn't update itself when GitHub changes. Refresh runs a
read you trigger and updates the last-refresh time.

**Don't use one** for a single answer, a one-off draft, or data you won't revisit.

---

# When a canvas beats chat

Use a canvas when the work needs:

- a view people can see and review after the chat ends;
- several related records;
- repeated updates through named actions;
- one shared artifact that you and the agent both edit.

Keep a single answer or one-off draft in chat.

---

# Keep GitHub state and planning state apart

GitHub records the facts. The canvas adds the planning view people use to decide.

| GitHub fact | Planning view |
| --- | --- |
| Open issue | Ready for discovery |
| Assigned issue | Ownership confirmed |
| Blocked issue | Risk, dependency, next decision |
| Closed issue | Planning result recorded |

**Label the two kinds of state differently.** A canvas can say `ready for review`
while the issue stays open. Without labels, nobody can tell a decision from a fact.

---

# Keep fields that change a decision

| Field | Keep it when | Remove it when |
| --- | --- | --- |
| Risk | It changes sequencing or approval | It repeats the issue body |
| Owner | Responsibility is unclear | GitHub already shows it |
| Next action | A team needs a follow-up | It only restates status |

A canvas should surface important work. **Don't turn it into a second backlog.**

---

# Ask for a canvas in plain language

```text
/create-canvas Create a delivery-planning canvas for the approved GitHub issues.
People can update planning status and record decisions. Copilot can summarize
and propose updates. Do not close issues, change assignees, or publish content.
```

Say what people can change, what Copilot can propose, and what is off limits.
Then review the generated extension under **Customize** → **Canvas** and in
`.github/extensions` (check current docs if the UI differs).

---

# Review the generated canvas

1. Does each field support a real decision?
2. Can you explain each action in one sentence?
3. Are external writes excluded?
4. Can the owner recover after an interrupted update?
5. When do you retire the canvas?

**Remove generated fields and actions that don't help anyone decide or act.**

---

# Review every update

```text
Read source state
      ↓
Propose canvas update
      ↓
Review the affected record
      ↓
Accept, revise, or reject
```

This loop catches stale data and updates that cite no source.

---

# Drift: the canvas holds a copy

The canvas doesn't update itself when GitHub changes. Drift starts the moment
someone comments, reassigns, or closes an issue.

Spot it by comparing three views:

- the visible canvas;
- what Copilot reports;
- a fresh read from GitHub.

**Explain or fix every mismatch.** The last-refresh time shows how old the copy is.

---

# Refresh and reconcile

Refresh is an action you trigger. It reads the source again and sets a new
last-refresh time.

After a refresh, check that:

- new blockers show in planning state;
- next actions name who decides;
- GitHub facts and planning state stay labeled apart.

---

# Critique before you rely on it

Run `/context`. Use a fresh session if the old one is crowded. Then ask
`/rubber-duck` to find stale claims, mixed state labels, unsafe actions, and
missing owners.

---

# In the lab

You build a canvas from the live Session M7-03 issues, create and fix drift, and
record owner, refresh, recovery, and retirement rules. The live canvas and linked
issues carry into Session M7-05.
