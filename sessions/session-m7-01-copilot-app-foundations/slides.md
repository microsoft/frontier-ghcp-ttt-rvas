---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M7-01: Work Effectively in the GitHub Copilot App'
---

<!-- _class: lead -->

# Work effectively in the GitHub Copilot app

Session M7-01 | Product and Delivery Teams | Beginner

---

# Work in the GitHub Copilot app

Work in the GitHub Copilot app with repository context. Save work that others can
review.

**Delivery Decision Studio** is the six-session path. **Service Request Portal**
is the initiative.

---

# Save work beyond the chat

Use the chat to work through an idea. Keep project context, source references,
issues, and saved work available for review after the conversation ends.

```text
Gather evidence → form a proposal → review it → save the decision → verify it
```

Check Copilot's explanation against the source facts.

---

# Context has a cost

| Context choice | When it helps |
| --- | --- |
| One named file | The answer depends on a specific rule or API |
| A project or repository | The task needs relationships across files |
| An issue or pull request | The task needs delivery history and discussion |
| No repository context | The work is general and contains no project facts |

Tell Copilot why each source matters. **Don't make it guess.**

---

# Separate facts, assumptions, and decisions

| Type | Example |
| --- | --- |
| Fact | "Issue 42 names a response-time problem." |
| Assumption | "The mobile client uses the documented endpoint." |
| Decision | "The product owner will confirm the client behavior." |

Separating these categories makes uncertainty visible.

---

# Know the main work areas

| Area | Use it for |
| --- | --- |
| Chats | Exploration and interviews |
| Projects | Ongoing goals across repositories (public preview) |
| My work | Issues, pull requests, and sessions |
| Search | Finding repository information |
| Automations | Recurring or on-demand tasks |
| Customize | Skills, agents, MCP servers, and canvases |

---

# Context comes before the prompt

Attach the smallest set of sources that answers the question.

Name the files, issues, or repository that should support the answer.

---

# What this session adds

| Session | Covers |
| --- | --- |
| M2-05 | Developer loop: worktrees, diffs, pull requests |
| M3-01 | Canvas and plugin design |
| **M7-01** | **How context reaches the answer, mode choice, one saved brief** |

---

# Choose the session mode

| Mode | Choose it when |
| --- | --- |
| Interactive | Interviews, source checks, drafts you review step by step |
| Plan | Several steps; approve the approach first |
| Autopilot | Scope, sources, and stop point agreed; no review per action |

**Start in Interactive. Move to Plan before Copilot writes.** Autopilot risks
spreading a wrong assumption before you see it. M7-01 never uses it.

---

# What the app can and can't see

| It sees | It can't see |
| --- | --- |
| The conversation, including its own earlier answers | A file you only named |
| Files attached with `@`, issues with `#` | Other chats or sessions |
| Loaded instructions and MCP results | Meetings and your memory |

A wrong early answer **keeps influencing later ones** until you clear or compact.

---

# Use context controls

- `@` adds a file, `#` references an issue, `/` opens commands.
- `/context` shows context usage.
- `/compact` summarizes earlier turns and keeps the thread.
- `/clear` or `/reset` starts a fresh conversation.

---

# Ask for sources

```text
Explain the initiative for a product owner.
Cite the supplied source for each factual claim.
Mark missing information as unknown.
```

**A confident answer without a source is still unverified.**

---

# Inspect what Copilot can use (briefly)

Find one of each in **Customize**.

- Skills provide repeatable procedures.
- Agents carry role-specific instructions and tools.
- MCP servers connect Copilot to systems.
- Plugins install reusable packages that can include MCP servers and other
  customizations.
- Canvases provide visible shared state.
- Automations repeat tasks with a defined scope.

Availability depends on the plan, policy, and installation.

---

# Use one repeatable work pattern

```text
Read -> propose -> review -> write -> verify
```

Every later Module 7 session uses this pattern.

---

# Save the working brief

The lab creates `initiative-context-brief.md` with:

- facts and sources;
- unknowns;
- useful GitHub artifacts;
- the next decision and owner.

The brief must make sense without the chat history.

---

# Revise the brief when sources change

```text
Initial source
  → first brief
  → approved late evidence
  → focused revision
  → fresh-session verification
```

Keep the brief consistent with the new source information.

---

# Lab

1. Open the repository as a Copilot project.
2. Inspect the available capabilities.
3. Start fresh without the source, then compare an unscoped answer with a grounded answer.
4. Create and commit the initiative context brief.
5. Apply approved late evidence.
6. Review and commit the focused revision.
7. Ask `/rubber-duck` for independent critique.
8. Check the brief in a fresh session.
