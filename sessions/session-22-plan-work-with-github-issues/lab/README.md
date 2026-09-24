# Session 22 Lab: Create, Verify, and Correct a GitHub Issue Plan

**Duration:** 2 hours

**Difficulty:** Intermediate

**Deliverable:** A live GitHub issue hierarchy created through MCP, verified by a
fresh read, and corrected through a second approved write

## Deliverables

- the live parent and child issues;
- two fresh-read verification records;
- the corrected issue;
- a completed handoff record.

## What you will learn

You will verify the GitHub MCP connection, inspect existing repository state,
preview a complete write, create an issue hierarchy, retrieve it in a fresh
request, and correct one issue without bypassing review.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Verify GitHub MCP and write access | 15 min |
| 2 | Read the source and existing GitHub state | 20 min |
| 3 | Design and review the issue hierarchy | 30 min |
| 4 | Preview and create the issues | 30 min |
| 5 | Verify and correct one issue | 15 min |
| 6 | Record the handoff | 10 min |

## Preflight

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

Confirm GitHub Copilot access before starting. If GitHub Copilot access is
unavailable, stop and do not continue.

## Part 1: Verify GitHub MCP and write access (15 minutes)

In the GitHub Copilot app:

1. open **Customize** → **MCP** → **Installed**;
2. confirm that the approved GitHub MCP connection is available;
3. start a session for the training repository;
4. ask Copilot to list the GitHub tools it can use;
5. ask it to retrieve the repository name and five open issues;
6. confirm that you have issue-write permission.

GitHub MCP is built into Copilot CLI. CLI users can inspect it with:

```text
/mcp list
/mcp show github
```

If the approved connection is missing from the app, use **Customize** → **MCP** to
install or configure the organization-approved server. Do not paste a token into a
prompt or repository file.

Stop if the read test or issue-write check fails.

## Part 2: Read the source and existing GitHub state (20 minutes)

Attach the approved Session 21 decision brief and issue proposal. Use
`starter/approved-decision-brief.md` when those artifacts are unavailable.

Ask Copilot to:

1. summarize the approved outcome, non-goals, acceptance evidence, and owners;
2. retrieve available labels and milestones;
3. search open and closed issues for overlapping work;
4. report every GitHub MCP read it used;
5. identify any decision in the proposal that is absent from the brief.

Record the read evidence and duplicate risk in
`starter/write-review-template.md`.

**Checkpoint:** No issue is proposed until the source and existing repository state
have both been read.

## Part 3: Design and review the issue hierarchy (30 minutes)

Copy `starter/issue-plan-template.md` into your working folder.

Ask Copilot to propose:

- one parent issue for the approved outcome;
- three to five child issues with independently reviewable results;
- dependencies and parallel work;
- acceptance criteria and non-goals;
- source links to the decision brief;
- ownership gaps left unassigned.

Review the plan before any write.

Reject or revise an issue that:

- combines unrelated outcomes;
- duplicates existing work;
- has no observable acceptance evidence;
- invents an assignee, label, milestone, or date;
- includes work excluded by the decision brief.

**Checkpoint:** Every child issue traces to a decision and can be reviewed
independently.

## Part 4: Preview and create the issues (30 minutes)

Complete the proposed-write section in `starter/write-review-template.md`.

Send:

```text
Before using a GitHub write tool, show the repository owner and name, issue count,
full title and body for every issue, labels, milestone, parent-child references,
dependencies, and every field left unset. Wait for my approval.
```

Compare the preview with the issue plan. Record **Approve**, **Revise**, or
**Reject**.

After approval, ask Copilot to create the issues through GitHub MCP. Save each
returned issue number and URL.

**Checkpoint:** The write result contains one parent and no more than five child
issues in the approved repository.

## Part 5: Verify and correct one issue (15 minutes)

Start a new Copilot request. Do not reuse the create response.

Ask Copilot to retrieve the created issues through GitHub MCP. Compare the fresh
state with the approved plan:

- title and body;
- acceptance criteria and non-goals;
- labels and milestone;
- source links and relationships;
- ownership fields.

Choose one child issue and add a missing verification section:

```text
Verification owner: Delivery reviewer
Source decision: docs/discovery/request-status-decision-brief.md
```

Require a full update preview. Approve the focused write, then retrieve the issue
again and confirm the new section is present.

**Checkpoint:** A fresh read proves that both the original create and the correction
reached GitHub.

## Part 6: Record the handoff (10 minutes)

Record:

- the parent issue;
- child issue numbers;
- dependency order;
- unresolved ownership;
- the corrected issue and verification evidence;
- the issue set that Session 23 must load.

## Verification

- [ ] GitHub MCP read and write access passed.
- [ ] Existing issues were searched before creation.
- [ ] The complete write was previewed before approval.
- [ ] Created issues match the approved decision brief.
- [ ] A fresh read verified the created state.
- [ ] A second preview, write, and fresh read verified the correction.
- [ ] No invented owner, date, label, or milestone was added.
- [ ] No customer or source organization names appear.
