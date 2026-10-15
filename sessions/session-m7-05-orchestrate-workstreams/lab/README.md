# Session m7-05 Lab: Orchestrate Agents and Workstreams

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Live app orchestration access; Sessions m7-01 to m7-04 and GitHub MCP
read access for the product route, or Sessions m1-01 to m1-03, m2-01 to m2-04 and m2-05 for the developer route

**Deliverable:** An accepted orchestration plan and a reviewed parent result from
live child sessions

## Deliverables

- An accepted orchestration plan
- A reviewed parent result backed by the selected route's source files or issues

## Choose one route

Read the [course safety baseline](../../learning-safety-baseline.md). Both routes
require the app's built-in `/orchestrate` skill and live child sessions.
**Stop if orchestration access is unavailable.** Separate prompts and prepared
answers do not complete the lab.

| Route | Use after | Inputs | Lab time |
| --- | --- | --- | --- |
| [Product and delivery](#product-and-delivery-route) | Sessions m7-01 to m7-04 | Live GitHub issues through MCP | 120 min |
| [Developer](#developer-route-review-pr-readiness) | Sessions m1-01 to m1-03, m2-01 to m2-04 and m2-05 | Local Python code and a synthetic PR snapshot | 120 min |

Complete one route. Developers do not need the product route's GitHub issues,
canvases, or MCP access.

## Product and delivery route

The following issue-based exercises are unchanged. Their GitHub access
requirements apply to this route only.

## Scenario

Four live GitHub issues cover public status mapping, requester status, empty and
stale states, and requester access. Orchestrate one workstream per issue. The
parent result will become an authoritative input to Session m7-06.

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

Session m7-06 uses the live GitHub issues and this parent result. Do not create a
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

## Developer route: review PR readiness

### Goal and access

Supervise independent read-only reviews of a readiness evaluator, its tests, and
a supplied PR snapshot. Passing local tests and PR readiness are different claims.

You need the GitHub Copilot app with `/orchestrate`, local project read access,
and Python 3.10 or later. Check that you can open, redirect, and stop child
sessions. **If any requirement is unavailable, stop this route.** No GitHub
connection, MCP server, or remote write is needed.

### Prepare the local project

From the curriculum root, copy these files to a fresh workspace:

```bash
mkdir -p ~/copilot-labs/session-m7-05-developer
cp -R sessions/session-m2-05-copilot-app-for-developers/lab/solution/readiness_guard \
  ~/copilot-labs/session-m7-05-developer/
cp -R sessions/session-m2-05-copilot-app-for-developers/lab/solution/tests \
  ~/copilot-labs/session-m7-05-developer/
cp sessions/session-m2-05-copilot-app-for-developers/lab/starter/issue-brief.md \
  ~/copilot-labs/session-m7-05-developer/
cp sessions/session-m2-05-copilot-app-for-developers/lab/starter/prepared-evidence/05-pr-snapshot.json \
  ~/copilot-labs/session-m7-05-developer/pr-snapshot.json
cp sessions/session-m7-05-orchestrate-workstreams/lab/starter/developer-review-brief.md \
  sessions/session-m7-05-orchestrate-workstreams/lab/starter/developer-orchestration-plan.md \
  ~/copilot-labs/session-m7-05-developer/
cd ~/copilot-labs/session-m7-05-developer
PYTHONDONTWRITEBYTECODE=1 python -m unittest discover -s tests -v
```

The supplied reference implementation's six tests should pass. This route reviews
it; do not repair it or install packages. Attach this folder as an app project.
Keep the children read-only and restrict tool access to the named files and test
command. Do not grant network or GitHub write access.

### Exercise D1: Accept the work split (25 minutes)

Read `developer-review-brief.md` and complete `developer-orchestration-plan.md`.

Use independent questions:

| Workstream | Question | Inputs |
| --- | --- | --- |
| Implementation | Does the evaluator meet the brief's behavior contract? | `issue-brief.md`, `readiness_guard/` |
| Tests | What do the tests prove, and what remains untested? | `issue-brief.md`, `tests/`, `readiness_guard/` |
| PR state | Is the supplied PR ready based on its required checks and threads? | `issue-brief.md`, `pr-snapshot.json` |

Each child works from its own inputs and does not wait for another child. The
parent compares the results afterward. Name a reviewer, stop conditions, and a
usage limit. The test reviewer may run only the supplied test command.

### Exercise D2: Start and inspect live work (30 minutes)

Submit the accepted plan:

```text
/orchestrate Use developer-orchestration-plan.md to start independent read-only
reviews of implementation, tests, and PR state. Each child must answer its
question, cite files or JSON fields, and state uncertainty. Keep scope limited to
the named local files and test command. Do not edit, install, use the network, or
change GitHub. Stop at the agreed usage limit. The parent alone reconciles results.
```

Open the live children and check their inputs and task boundaries. If the command
does not create live child sessions, stop and resolve the feature or plan. Do not
substitute `/fleet`, separate chats, or captured answers.

### Exercise D3: Redirect and reconcile (35 minutes)

After the test reviewer returns its first result, redirect that child:

```text
Check your test-coverage conclusion against acceptance criterion 5 in
issue-brief.md. Explain whether sorted reason codes are tested and whether the
test also proves the exact complete reason list. Do not edit or broaden the task.
```

Compare the child's original and revised answers. This is a planned follow-up
question, not proof that the first answer was wrong. Stop a child if it crosses
scope; do not stage a harmful action merely to demonstrate stopping.

Then ask the parent to reconcile all results with the provisional `READY` note in
`developer-review-brief.md`. Check any disagreement against the source files.
If children agree, say so; do not fabricate conflicting child conclusions.

### Exercise D4: Review the parent result (30 minutes)

Require the parent to return:

- a separate verdict for implementation behavior, test coverage, and PR readiness;
- accepted findings with file or JSON-field references;
- rejected or unresolved claims and the reason;
- the effect of the child redirection;
- remaining gaps and the next human decision.

The parent must explain why local passing tests cannot override a failed required
PR check or unresolved blocking thread. Review the result yourself. Keep it in the
app session; do not copy session identifiers or a second progress log into the plan.
Inspect the app's usage display and explain whether the work justified orchestration.

### Developer completion check

- [ ] Accepted plan with independent questions and a usage limit.
- [ ] Live child sessions inspected on the orchestration surface.
- [ ] Test reviewer redirected and its revised answer checked.
- [ ] Provisional `READY` note accepted or rejected using the actual PR fields.
- [ ] Parent result separates implementation, test coverage, and PR state.
- [ ] No source files, packages, or external systems changed.
- [ ] A human decision and observed usage are recorded in the parent result.

Compare your reviewed result with
[`solution/developer-review-reference.md`](solution/developer-review-reference.md).
That reference cannot replace live child-session work.
