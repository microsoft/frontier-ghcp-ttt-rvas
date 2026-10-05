# Session 24 Lab: Orchestrate Agents and Workstreams

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-23, trainer content, live orchestration access, and
GitHub MCP read access

**Deliverable:** An approved orchestration plan and a reviewed parent result from
live child sessions

## Deliverables

- An approved orchestration plan
- A reviewed parent result backed by live GitHub issues

## Scenario

Four live GitHub issues cover public status mapping, requester status, empty and
stale states, and requester access. Orchestrate one workstream per issue. The
parent result will become an authoritative input to Session 25.

## Preflight

- Confirm GitHub Copilot access before the lab.
- Confirm `/orchestrate` is available.
- Confirm GitHub MCP can retrieve the approved parent and child issues.
- Confirm that you can open, redirect, and stop child sessions.
- Use only supplied synthetic material or approved sanitized work.
- Stop any work that requests production data, personal data, secrets, external
  contact, publication, or unapproved changes.

> [!IMPORTANT]
> **Stop if GitHub Copilot access, orchestration, or issue access is unavailable.**
> Do not replace the live run with separate prompts, role-play, or prepared
> outputs.

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
2. Define one bounded question for each child issue.
3. Name the approved issue and linked evidence for each workstream.
4. Add a hard stop condition and reviewer.
5. Confirm that no child depends on another child result.
6. Submit the plan through `/orchestrate`.

Use this prompt:

```text
/orchestrate Use the four workstreams in my approved plan. Keep them independent.
Each result must answer its bounded question, cite its approved inputs, state
unresolved gaps, and give a recommendation. Obey each stop condition. Do not
publish, contact people, access restricted data, or change systems.
```

Open each child session from the orchestration surface. Confirm its question,
inputs, stop condition, and reviewer.

## Exercise 2: Monitor and intervene

Use the orchestration surface as the live record. Do not copy session identifiers,
status, timing, or usage into the plan.

| Signal | Action |
| --- | --- |
| Safe and on scope | Wait |
| A safe result needs a precise correction | Redirect |
| A boundary is crossed | Stop |
| The result answers the question with evidence | Accept |
| The result is unsupported or outside scope | Reject |
| Human authority is required | Escalate |

Redirect only when a specific scope or evidence problem can be fixed safely.

## Exercise 3: Review results

Review each child result against its workstream:

- Does it answer the bounded question?
- Does it use only the approved issue and linked evidence?
- Did it obey the stop condition?
- Are unresolved gaps explicit?
- Is the recommendation supported?

Reject unsupported claims. Redirect a safe, repairable result. Stop work that
crosses a hard boundary.

## Exercise 4: Return the parent result

Ask the parent orchestration to summarize only the reviewed child results.

The parent result must:

- link each finding to its GitHub issue;
- separate accepted findings from rejected claims;
- name unresolved gaps and their owners;
- state which issues are ready for follow-up;
- avoid publication or source-system changes.

Add the reviewed result to the approved parent GitHub issue if the trainer has
approved that write. Retrieve the issue again to verify the update.

Session 25 uses the live GitHub issues and this parent result. Do not create a
separate handoff form.

## Completion check

- [ ] Approved plan with four bounded workstreams.
- [ ] Live child results on the orchestration surface.
- [ ] At least one deliberate wait, redirect, stop, accept, or reject decision.
- [ ] Reviewed parent result linked to the live GitHub issues.
- [ ] Fresh-read verification after any approved issue update.

## Troubleshooting

| Issue | Response |
| --- | --- |
| `/orchestrate` is missing | Stop and resolve license, policy, client, or command access. |
| A child requests restricted data | Stop the child and record the boundary in the parent result. |
| A result cites no issue evidence | Reject it or redirect the child. |
| Two workstreams overlap | Pause one and move the shared question to the parent. |
| An issue cannot be retrieved | Stop that workstream until approved issue access is restored. |
