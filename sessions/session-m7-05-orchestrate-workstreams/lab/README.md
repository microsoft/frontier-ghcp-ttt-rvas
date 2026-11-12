# Session M7-05 lab: Orchestrate agents and workstreams

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Live app orchestration access; Sessions M7-01 to M7-04 and GitHub MCP
read access for the product route, or Sessions M1-01 to M1-03, M2-01 to M2-04 and M2-05 for the developer route

## Choose one route

Both routes use the built-in `/orchestrate` skill and live child sessions.
Separate prompts and prepared answers don't complete the lab.

| Route | Use after | Inputs | Lab time |
| --- | --- | --- | --- |
| [Product and delivery](#product-and-delivery-route) | Sessions M7-01 to M7-04 | Live GitHub issues through MCP | 120 min |
| [Developer](#developer-route-review-your-m2-05-pull-request) | Sessions M1-01 to M1-03, M2-01 to M2-04 and M2-05 | Your M2-05 repo and PR | 120 min |

Complete one route. Developers don't need GitHub issues, canvases, or MCP.

## Product and delivery route

## Scenario

You work with four live GitHub issues: public status mapping, requester status,
empty and stale states, and requester access. Orchestrate one workstream per
issue. Session M7-06 uses your reviewed parent result.

Select the four required roles from the parent issue's child links. Any optional
fifth child stays outside this orchestration.

## Before you start

- `/orchestrate` is available.
- GitHub MCP can retrieve the parent and child issues.
- You can open, redirect, and stop child sessions.
- Stop any work that requests production data, personal data, secrets, external
  contact, publication, or unapproved changes.

## Schedule

| Exercise | Work | Time |
| --- | --- | --- |
| 1 | Approve and start the plan | 30 min |
| 2 | Monitor and intervene | 35 min |
| 3 | Review results | 35 min |
| 4 | Return the parent result | 20 min |

## Exercise 1: Approve and start the plan

Open `starter/orchestration-plan-template.md`.

1. Retrieve the approved parent and child issues through GitHub MCP.
2. Define one question with a clear scope for each child issue.
3. Name the approved issue and its linked sources for each workstream.
4. Add a hard stop condition and reviewer.
5. Check that no child depends on another child result.
6. Submit the plan through `/orchestrate`.

Use this prompt:

```text
/orchestrate Use the four workstreams in my approved plan. Keep them independent.
Each result must answer its assigned question, cite its approved inputs, state
unresolved gaps, and give a recommendation. Obey each stop condition. Do not
publish, contact people, access restricted data, or change systems.
```

Open each child session from the orchestration surface. Check its question,
inputs, stop condition, and reviewer.

## Exercise 2: Monitor and intervene

Use the orchestration surface as the live record. Don't copy session identifiers,
status, timing, or usage into the plan.

| Signal | Action |
| --- | --- |
| Safe and on scope | Wait |
| A safe result needs a precise correction | Redirect |
| A boundary is crossed | Stop |
| The result's answer is supported by its sources | Accept |
| The result is unsupported or outside scope | Reject |
| Human authority is required | Escalate |

Redirect only when the child can safely fix a specific problem with scope or
supporting sources.

## Exercise 3: Review results

Review each child result against its workstream:

- Does it answer the assigned question?
- Does it use only the approved issue and its linked sources?
- Did it obey the stop condition?
- Are unresolved gaps listed?
- Is the recommendation supported?

Reject unsupported claims. Redirect a safe, repairable result. Stop work that
crosses a hard boundary.

## Exercise 4: Return the parent result

Ask the parent to summarize only the reviewed child results.

The parent result must:

- link each finding to its GitHub issue;
- separate accepted findings from rejected claims;
- name unresolved gaps and their owners;
- state which issues are ready for follow-up;
- avoid publication or source-system changes.

Add the reviewed result to the parent GitHub issue if the trainer allows that
write. Retrieve the issue again to check the update.

Session M7-06 uses the live GitHub issues and this parent result.

## Completion check

- [ ] Plan with four workstreams, each with a defined scope.
- [ ] Live child results on the orchestration surface.
- [ ] At least one deliberate wait, redirect, stop, accept, or reject decision.
- [ ] Reviewed parent result linked to the live GitHub issues.
- [ ] Any issue update checked through a fresh GitHub read.

## Troubleshooting

| Issue | Response |
| --- | --- |
| A child requests restricted data | Stop the child and record the boundary in the parent result. |
| A result cites no supporting issue content | Reject it or redirect the child. |
| Two workstreams overlap | Pause one and move the shared question to the parent. |
| An issue cannot be retrieved | Stop that workstream until approved issue access is restored. |

## Developer route: Review your M2-05 pull request

### Goal and access

Use `/orchestrate` to review the fix and PR you made in Session M2-05. Three
child sessions answer three separate questions. Passing local tests and a
mergeable PR are different claims.

You need the GitHub Copilot app with `/orchestrate`, Python 3.10 or later, and the
`gh` CLI signed in to GitHub (or the GitHub MCP server). All work is read-only.

### Prepare the repo

**Start from your own M2-05 result:** the repaired `checkout-pricing` repo and
its pull request in your throwaway GitHub repo. Check out the PR branch:

```bash
cd ~/copilot-labs/session-m2-05/checkout-pricing
gh pr checkout <pr-number>
python -m unittest discover -s tests -v
```

**If you skipped M2-05**, build the same result. From the curriculum root, copy the
starter, apply the reference fix, and open a PR in a throwaway repo:

```bash
mkdir -p ~/copilot-labs/session-m7-05-developer
cp -R sessions/session-m2-05-copilot-app-for-developers/lab/starter \
  ~/copilot-labs/session-m7-05-developer/checkout-pricing
cp sessions/session-m2-05-copilot-app-for-developers/lab/solution/shop/pricing.py \
  ~/copilot-labs/session-m7-05-developer/fixed-pricing.py
cd ~/copilot-labs/session-m7-05-developer/checkout-pricing
git init -b main && git add -A && git commit -m "Start"
gh repo create checkout-pricing-lab --private --source . --push
gh issue create --title "Order totals are wrong" --body-file issue-brief.md
git switch -c fix-pricing
cp ../fixed-pricing.py shop/pricing.py
git commit -am "Fix order totals" && git push -u origin fix-pricing
gh pr create --fill --body "Closes #1"
```

Wait for the `tests` workflow to finish. From the curriculum root, copy
`developer-review-brief.md` and `developer-orchestration-plan.md` from
`sessions/session-m7-05-orchestrate-workstreams/lab/starter/` into the repo folder.
Don't commit them. Open the folder in the app.

You review. Don't repair the code, push, comment, approve, or merge. Use a
throwaway repo only.

### Exercise D1: Accept the work split (25 minutes)

Read `developer-review-brief.md` and complete `developer-orchestration-plan.md`.

Use independent questions:

| Workstream | Question | Inputs |
| --- | --- | --- |
| Implementation | Does the fix meet `issue-brief.md`? | `issue-brief.md`, `shop/pricing.py`, the PR diff |
| Tests | What do the tests prove, and what do they miss? | `issue-brief.md`, `tests/`, `shop/pricing.py` |
| PR state | What do the real checks and review threads say? | The PR, read with `gh` or GitHub MCP |

Each child works from its own inputs and doesn't wait for another child. The
parent compares the results afterward. Set a usage limit and stop conditions. Only
the test reviewer may run `python -m unittest discover -s tests -v`. Only the PR
reviewer may run read-only `gh pr` and `gh api` commands.

### Exercise D2: Start and inspect live work (30 minutes)

Submit the plan:

```text
/orchestrate Use developer-orchestration-plan.md to start three independent
read-only reviews: implementation, tests, and PR state. Each child must answer
its question, cite files, lines, check names, or thread links, and state what it
is unsure about. Don't edit files, push, comment, approve, or merge. Stop at the
agreed usage limit. The parent alone reconciles results.
```

Open the live children and check their inputs and task boundaries. Do not
substitute `/fleet`, separate chats, or captured answers.

### Exercise D3: Redirect and reconcile (35 minutes)

After the test reviewer returns its first result, redirect that child:

```text
Check your conclusion against issue-brief.md. Name each rule and symptom, and say
which test would fail if that rule broke again. Say which rules no test covers.
Don't edit or broaden the task.
```

Compare the child's original and revised answers. The redirect is a planned
follow-up, not proof that the first answer was wrong. Stop a child if it crosses
scope; don't stage a harmful action to demonstrate stopping.

Then ask the parent to reconcile all results with the provisional note in
`developer-review-brief.md`. Check any disagreement against the repo and the PR.
If children agree, say so.

### Exercise D4: Review the parent result (30 minutes)

Require the parent to return:

- a separate verdict for implementation, test coverage, and PR state;
- accepted findings with file, line, check, or thread references;
- rejected or unresolved claims and the reason;
- the effect of the child redirection;
- remaining gaps and the next human decision.

Check that the parent explains why passing local tests can't override a failing
required check or an unresolved review thread on the PR. Review the result
yourself and keep it in the app session. Inspect the app's usage display and
explain whether orchestration was worth using for this work.

### Developer completion check

- [ ] Plan with independent questions and a usage limit.
- [ ] Live child sessions inspected on the orchestration surface.
- [ ] Test reviewer redirected and its revised answer checked.
- [ ] Provisional note accepted or rejected using the PR's real checks and threads.
- [ ] Parent result separates implementation, test coverage, and PR state.
- [ ] No files, pushes, comments, approvals, or merges.
- [ ] A human decision and observed usage are recorded in the parent result.

Compare your result with
[`solution/developer-review-reference.md`](solution/developer-review-reference.md).
That reference can't replace live child-session work.

## Final deliverable

Deliverable: the reviewed parent result from the app session, with separate
verdicts, accepted and rejected findings, and your human decision. Product route
learners also link it to the live GitHub issues.
