# Session M7-02 lab: Interview a request and revise the decision brief

**Duration:** 2 hours

**Difficulty:** Beginner

**Prerequisites:** Session M7-01 and working GitHub Copilot app access

## What you will learn

Copy a ready-made skill into the repository and use it to interview the request
owner. Turn the decisions into a brief and issue proposal. When a late constraint
arrives, revise the affected decisions and check that both files still agree.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Install the skill and compare it with a plain prompt | 25 min |
| 2 | Run the first decision interview | 35 min |
| 3 | Create the decision brief and issue proposal | 25 min |
| 4 | Reopen one branch for a late constraint | 20 min |
| 5 | Check readiness in a fresh session | 15 min |

## Before you start

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

Use the Session M7-01 `initiative-context-brief.md`. If the trainer is delivering
Session M7-02 alone, use `starter/vague-request.md`.

## Part 1: Install the skill and compare it with a plain prompt (25 minutes)

Copy the skill into the root of the training repository. You don't need to commit
it.

```bash
mkdir -p .github/skills
cp -r sessions/session-m7-02-interview-and-shape-work/lab/starter/.github/skills/decision-interview \
  .github/skills/
```

Open `.github/skills/decision-interview/SKILL.md` and read it. The frontmatter has
a `name` and a `description`. Copilot reads the description to decide whether your
request needs this skill, so it says when to use the skill and when not to. The
body is the method: one question at a time, a recommended answer, and a stop
condition. [Session M3-05](../../session-m3-05-agent-skills-ecosystem/README.md)
teaches how to write one.

Open a new app session for the project. Check that `decision-interview` appears
under **Customize** → **Skills** → **Installed**. Use **Interactive** mode. The
request owner answers every round, so don't use Autopilot. Context commands are
as in [M7-01](../../session-m7-01-copilot-app-foundations/README.md).

**Baseline.** Run an ordinary prompt first:

```text
Write an issue for this request: Add a clearer request status.
```

Note what Copilot assumed: user, scope, data, owner. Then run the skill in a fresh
session (`/clear`):

```text
/decision-interview

Test request: Add a clearer request status.
Ask only the first question, then stop.
```

If the skill doesn't appear, check the file is at
`.github/skills/decision-interview/SKILL.md`, then reopen the project or start a
new session. Project skills also load from `.claude/skills` and `.agents/skills`;
personal skills load from `~/.copilot/skills` and `~/.agents/skills`. Copilot CLI
users can run `/skills reload` and `/skills info decision-interview`.

**Checkpoint:** The skill asks one numbered question with a recommended answer and
no draft. You can name two things the plain prompt guessed that the skill asked.

## Part 2: Run the first decision interview (35 minutes)

Attach the Session M7-01 working brief or `starter/vague-request.md`, then run:

```text
/decision-interview

Interview me as the request owner. Use only the attached source. Continue until
scope, users, success, failure, ownership, approval, and non-goals are decided or
assigned as open questions.
```

For each **decision frontier** (the decisions whose prerequisites are settled):

1. answer each question as the request owner, one at a time;
2. accept, reject, or revise the recommendation;
3. check that Copilot restates the decision and reason;
4. check that questions that depend on an open decision wait;
5. ask for the next frontier.

Reject a **leading** question, such as "Should we show status to all users so
support calls drop?" A useful question names one decision, offers real options,
and doesn't assume the answer.

Stop when each branch has a decision or a named open question with an owner.

Run `/context` after each round. If context is crowded and the thread matters,
`/compact`. If the interview has drifted, `/clear`, attach the context brief, and
paste only the settled decisions and open questions.

**Checkpoint:** As the request owner, you can state the settled decisions,
their reasons, and the open questions without relying on the chat transcript.

## Part 3: Create the decision brief and issue proposal (25 minutes)

Ask Copilot to create:

- `docs/discovery/decision-brief.md` from
  `starter/decision-brief-template.md`;
- `docs/discovery/issue-proposal.md` from
  `starter/issue-proposal-template.md`.

Review both changes before accepting them.

The brief must separate:

- facts from the source;
- request-owner decisions;
- unresolved questions and owners;
- in-scope and out-of-scope behavior;
- results that show success or failure;
- approval state.

The issue proposal must trace each acceptance criterion to the approved brief.
Do not create the GitHub issue yet.

Commit the first accepted versions.

## Part 4: Reopen one branch for a late constraint (20 minutes)

Open `starter/late-constraint.md`.

Run the skill again:

```text
/decision-interview

Use the approved decision brief and @late-constraint.md. Reopen only the branches
affected by the new constraint. Show which prior decisions remain unchanged.
```

Answer the new frontier as the request owner. Update the decision brief and issue
proposal.

Review the diff:

- unchanged decisions should remain stable;
- changed decisions should include a reason;
- acceptance criteria should reflect the new constraint;
- the issue proposal should contain no decision absent from the brief.

Commit the revision separately.

**Checkpoint:** Your repository history shows which decisions changed without
rewriting the rest of the brief and proposal.

## Part 5: Check readiness in a fresh session (15 minutes)

Start a new session with `/clear`. Attach only the decision brief and
issue proposal.

Ask Copilot to report:

1. the approved outcome and non-goals;
2. each acceptance criterion and its source decision;
3. unresolved questions and owners;
4. any contradiction between the two files;
5. a readiness result: **Ready**, **Revise**, or **Blocked**.

Fix any contradiction and rerun the check.

Then request independent critique:

```text
/rubber-duck Challenge the decision brief and issue proposal. Find unsupported
criteria, hidden scope, missing owners, and conflicts with the late constraint.
```

## Final deliverable

Submit:

1. the `decision-interview` skill copied into `.github/skills/`;
2. the approved decision brief;
3. the aligned issue proposal;
4. any fixes made after the fresh-session check.

Session M7-03 uses the approved brief and issue proposal to create live GitHub issues.
