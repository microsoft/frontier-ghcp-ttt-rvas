# Session 20 Lab: Build and Verify a Grounded Working Brief

**Duration:** 2 hours

**Difficulty:** Beginner

**Deliverable:** `initiative-context-brief.md`, ready for Session 21 without the
original chat

## What you will learn

See how project context changes Copilot's answer. Then turn sourced information
into a durable brief, update it when new evidence arrives, and verify it in a fresh
session.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Verify the app, mode, and project | 15 min |
| 2 | Compare weak and grounded context | 25 min |
| 3 | Create the first working brief | 30 min |
| 4 | Update the brief with new evidence | 25 min |
| 5 | Verify the brief in a fresh session | 25 min |

## Before you start

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

You need:

- GitHub Copilot app access;
- read access to the training repository project;
- permission to create a branch or working copy for the brief.

Confirm GitHub Copilot access before starting. If GitHub Copilot access or project
access is unavailable, **stop**. Do not continue in a generic chatbot.

## Part 1: Verify the app and project (15 minutes)

1. Open the training repository under **Projects**.
2. Start an interactive session.
3. Select **Interactive** mode. Type `@` and add
   `lab/starter/initiative-overview.md`.
4. Ask Copilot to report the file name and its first heading.
5. Open **Customize** → **Installed** and inspect the visible skills, MCP servers,
   plugins, and canvases.
6. Run `/context`.

Use **Interactive** for the comparison. Switch to **Plan** before asking Copilot
to propose repository changes. Do not use **Autopilot** for this lab because each
write needs a learner review.

`@` adds files, `#` references issues, and `/` opens commands in the app. Type the
character and select the item from the picker. A typed file token alone does not
confirm that the app attached the source.

**Checkpoint:** Copilot can read the supplied file and the learner knows which
capabilities are available.

## Part 2: Compare weak and grounded context (25 minutes)

Start with a deliberately weak prompt without attaching a file:

```text
Explain the Service Request Portal initiative, its users, constraints, and next
decision. Mark anything uncertain.
```

Identify statements that have no visible source.

Now attach `starter/initiative-overview.md` and ask:

```text
Use only @initiative-overview.md. Explain the requested outcome, affected users,
known constraints, and next decision. Cite the heading that supports each fact.
Keep missing information as unknown.
```

Compare the answers:

| Check | Unscoped answer | Grounded answer |
| --- | --- | --- |
| Unsupported facts |  |  |
| Visible unknowns |  |  |
| Source references |  |  |
| Useful next decision |  |  |

**Checkpoint:** Explain which answer is safer and how repository context changed
it.

## Part 3: Create the first working brief (30 minutes)

Copy the templates:

```bash
cp sessions/session-20-copilot-app-foundations/lab/starter/initiative-context-brief-template.md \
  docs/discovery/initiative-context-brief.md
```

Ask Copilot to complete the brief from `initiative-overview.md`. Require:

- the requested outcome and affected users;
- known facts with section references;
- assumptions separated from unknowns;
- explicit non-goals;
- the next decision and its owner;
- the relevant capabilities found in Part 1.

Review the proposed change before accepting it. Reject any statement that has no
source, invents an owner, or turns an unknown into a fact.

Commit the first version:

```bash
git add docs/discovery/initiative-context-brief.md
git commit -m "Create grounded initiative working brief"
```

**Checkpoint:** A reader can distinguish source facts, assumptions, unknowns, and
the next decision without reading the chat.

## Part 4: Update the brief with new evidence (25 minutes)

Open `starter/late-evidence.md`. Treat it as newly approved evidence that arrived
after the first brief was committed.

Ask Copilot to:

1. compare the new evidence with the saved brief;
2. list which sections need to change;
3. identify any resolved unknown;
4. identify any statement that is now contradicted;
5. propose a focused file update.

Review the diff. Do not rewrite unrelated sections.

Commit the revision:

```bash
git add docs/discovery/initiative-context-brief.md
git commit -m "Update working brief with approved evidence"
```

**Checkpoint:** Git history shows what changed when the evidence changed.

## Part 5: Verify the brief in a fresh session (25 minutes)

Before starting fresh, run `/context`. If the current session is crowded but the
thread still matters, use `/compact`. For the fresh-session check, use
`/clear` or `/reset`, then attach only
`docs/discovery/initiative-context-brief.md`.

Ask:

```text
Using only this working brief, report:
1. the requested outcome;
2. supported facts and their sources;
3. unresolved decisions;
4. explicit non-goals;
5. the next owner action.
Do not infer missing information.
```

Compare the answer with the file. Correct the brief if the fresh session cannot
recover the intended state.

Run an independent critique:

```text
/rubber-duck Review the initiative context brief for unsupported claims,
ambiguous ownership, hidden customer references, and decisions presented as facts.
```

If `/rubber-duck` is unavailable, stop this step. The trainer must verify the
current documented critique option before delivery rather than inventing a
replacement command.

## Final deliverable

Submit:

1. `docs/discovery/initiative-context-brief.md`;
2. two commits showing the first brief and the evidence-driven revision.

Session 21 uses this brief as the source for its decision interview.

## Verification

- [ ] Copilot read the repository project successfully.
- [ ] The unscoped and grounded answers were compared.
- [ ] Every fact in the brief points to a source section.
- [ ] Assumptions and unknowns remain separate.
- [ ] New evidence produced a focused revision.
- [ ] A fresh session recovered the intended state from the brief alone.
- [ ] No customer or source organization names appear.
