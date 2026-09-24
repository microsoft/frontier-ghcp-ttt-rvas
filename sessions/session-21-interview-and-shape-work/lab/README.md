# Session 21 Lab: Interview a Request and Revise the Decision Brief

**Duration:** 2 hours

**Difficulty:** Beginner

**Prerequisites:** Session 20 and working GitHub Copilot app access

**Deliverable:** An approved decision brief and issue proposal produced through a
repeatable project skill

## What you will learn

You will install a repository skill, use it to interview the request owner, turn
the decisions into durable artifacts, reopen one decision branch when a late
constraint arrives, and verify that the issue proposal still matches the brief.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Install and verify the interview skill | 20 min |
| 2 | Run the first decision interview | 35 min |
| 3 | Create the decision brief and issue proposal | 25 min |
| 4 | Reopen one branch for a late constraint | 25 min |
| 5 | Verify readiness in a fresh session | 15 min |

## Before you start

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

Use the Session 20 working brief when available. Otherwise use
`starter/vague-request.md`.

Confirm GitHub Copilot access before starting. If GitHub Copilot access is
unavailable, stop and do not continue. Also stop if Copilot cannot read the
training repository or load project skills.

## Part 1: Install and verify the interview skill (20 minutes)

Copy the supplied project skill into the root of the training repository:

```bash
mkdir -p .github/skills/decision-interview
cp sessions/session-21-interview-and-shape-work/lab/starter/.github/skills/decision-interview/SKILL.md \
  .github/skills/decision-interview/SKILL.md
git add .github/skills/decision-interview/SKILL.md
git commit -m "Add decision interview skill"
```

Open a new GitHub Copilot app session for the project. Open
**Customize** → **Skills** → **Installed** and confirm that
`decision-interview` appears.

Run a short test:

```text
/decision-interview

Test request: Add a clearer request status.
Ask only the first decision frontier, then stop.
```

If the skill does not appear:

1. confirm the file is at `.github/skills/decision-interview/SKILL.md`;
2. confirm the skill name and description are present in its frontmatter;
3. reopen the project or start a new session;
4. stop if the project skill still does not load.

Copilot CLI users can run `/skills reload` and
`/skills info decision-interview`.

**Checkpoint:** Copilot invokes the supplied skill and returns a numbered first
frontier instead of drafting a work item.

## Part 2: Run the first decision interview (35 minutes)

Attach the Session 20 working brief or `starter/vague-request.md`, then run:

```text
/decision-interview

Interview me as the request owner. Use only the attached source. Continue until
scope, users, success, failure, ownership, approval, and non-goals are decided or
assigned as open questions.
```

For each frontier:

1. answer as the request owner;
2. accept, reject, or revise each recommendation;
3. require Copilot to record the decision and reason;
4. confirm that dependent questions wait for earlier decisions;
5. ask for the next frontier.

Save the interview record. Stop the interview when every branch has an owner
decision or named open question.

**Checkpoint:** The record contains questions, recommendations, owner answers,
reasons, open branches, and the final shared understanding.

## Part 3: Create the decision brief and issue proposal (25 minutes)

Ask Copilot to create:

- `docs/discovery/request-status-decision-brief.md` from
  `starter/decision-brief-template.md`;
- `docs/discovery/request-status-issue-proposal.md` from
  `starter/issue-proposal-template.md`.

Review both changes before accepting them.

The brief must separate:

- facts from the source;
- request-owner decisions;
- unresolved questions and owners;
- in-scope and out-of-scope behavior;
- success and failure evidence;
- approval state.

The issue proposal must trace each acceptance criterion to the approved brief.
Do not create the GitHub issue yet.

Commit the first accepted versions.

## Part 4: Reopen one branch for a late constraint (25 minutes)

Open `starter/late-constraint.md`.

Run the skill again:

```text
/decision-interview

Use the approved decision brief and @late-constraint.md. Reopen only the branches
affected by the new constraint. Show which prior decisions remain unchanged.
```

Answer the new frontier as the request owner. Update the interview record,
decision brief, and issue proposal.

Review the diff:

- unchanged decisions should remain stable;
- changed decisions should include a reason;
- acceptance criteria should reflect the new constraint;
- the issue proposal should contain no decision absent from the brief.

Commit the revision separately.

**Checkpoint:** The repository history shows a focused decision change rather than
a complete rewrite.

## Part 5: Verify readiness in a fresh session (15 minutes)

Start a new session and attach only the decision brief and issue proposal.

Ask Copilot to report:

1. the approved outcome and non-goals;
2. each acceptance criterion and its source decision;
3. unresolved questions and owners;
4. any contradiction between the two files;
5. a readiness result: **Ready**, **Revise**, or **Blocked**.

Fix any contradiction and rerun the check.

## Final deliverable

Submit:

1. the installed `decision-interview` project skill;
2. the interview record with the reopened branch;
3. the approved decision brief;
4. the aligned issue proposal;
5. the fresh-session readiness result.

Session 22 uses the approved brief and issue proposal to create live GitHub issues.

## Verification

- [ ] The project skill was installed and verified.
- [ ] Questions followed dependency order.
- [ ] Owner decisions and reasons are recorded.
- [ ] A late constraint reopened only affected branches.
- [ ] The brief and issue proposal were revised together.
- [ ] A fresh session found no contradiction.
- [ ] No customer or source organization names appear.
