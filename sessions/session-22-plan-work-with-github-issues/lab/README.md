# Session 22 Lab: Create and Verify a GitHub Issue Plan

**Duration:** 2 hours  
**Difficulty:** Intermediate

## Objective

Use the GitHub Copilot app and GitHub MCP to turn an approved decision brief into real, reviewed GitHub issues.

## Required preflight

**Access policy:** GitHub Copilot app access, the approved GitHub MCP connection, and issue-write access to the training repository are required.

1. Open the GitHub Copilot app and the training repository project.
2. Confirm that the approved GitHub MCP server is available.
3. Confirm read and issue-creation access to the training repository.
4. Record the repository owner and name in `starter/write-review-template.md`.
5. Set a limit of one parent issue and no more than five child issues.
6. Use only the supplied synthetic brief or approved, sanitized work.

> [!IMPORTANT]
> **Stop if required access is missing.** Resolve GitHub MCP, repository access, write review, or verification before continuing. A Markdown-only issue list does not complete this lab.

## Time plan

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Read the brief and inspect GitHub | 25 min |
| 2 | Propose and review the issue plan | 35 min |
| 3 | Create the approved issues | 30 min |
| 4 | Verify and correct the result | 20 min |
| 5 | Record the handoff | 10 min |

## Phase 1: read the brief and inspect GitHub

Give Copilot `starter/approved-decision-brief.md`.

Ask it to:

1. summarize the approved outcome and non-goals;
2. identify acceptance evidence and owners;
3. inspect the target repository through GitHub MCP;
4. list relevant existing labels;
5. search for overlapping open issues.

Record the read tools used and any duplicate risk.

## Phase 2: propose and review the issue plan

Copy `starter/issue-plan-template.md`.

Ask Copilot to propose:

- one parent issue for the approved outcome;
- three to five child issues with independently reviewable results;
- dependencies between child issues;
- acceptance criteria and non-goals;
- ownership gaps;
- a link or path to the decision brief.

Do not create anything yet.

Review the plan. Reject any issue that:

- mixes unrelated outcomes;
- repeats an existing open issue;
- has no observable acceptance evidence;
- invents an assignee, label, milestone, or due date;
- includes work excluded by the brief.

## Phase 3: create the approved issues

Complete `starter/write-review-template.md`.

Ask Copilot to show the full proposed write:

```text
Before using any GitHub write tool, show the repository owner and name, issue
count, title and body for every issue, labels, milestone, relationships, and
every field you will leave unset. Wait for my approval.
```

Record **Approve**, **Revise**, or **Reject**.

After approval, ask Copilot to create the issues through GitHub MCP. Save the returned issue numbers and URLs in the write review.

## Phase 4: verify and correct

Start a fresh request. Ask Copilot to retrieve the created issues through GitHub MCP.

Compare the retrieved issues with the approved plan:

- titles;
- descriptions;
- acceptance criteria;
- non-goals;
- labels;
- relationships;
- ownership fields.

Choose one safe correction. Preview and approve the update, then retrieve the issue again.

## Phase 5: record the handoff

Record:

- the parent issue;
- child issue numbers;
- unresolved ownership;
- the next planning action;
- the learner who verified the write.

Session 23 uses this issue set in a planning canvas.

## Deliverables

1. One reviewed issue plan.
2. One completed write-review record.
3. One parent GitHub issue and three to five child issues.
4. Fresh-read verification evidence.
5. One reviewed correction.

## Completion checklist

- [ ] GitHub MCP and repository access passed preflight.
- [ ] Existing issues were checked before creation.
- [ ] The complete write was reviewed before approval.
- [ ] The write stayed within the issue-count guard.
- [ ] Created issues match the approved brief.
- [ ] A fresh GitHub read verified the result.
- [ ] One correction followed the same preview and verification pattern.
- [ ] No customer or source organization names appear.
