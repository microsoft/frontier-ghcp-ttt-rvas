# Session 16 Lab — Brady's Squad — AI Team Orchestration

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07 and 09–12
**Deliverable:** A configured team, reviewed work items, and a decision record

## Before you start

This is an optional, vendor-neutral lab. Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that the orchestration tool, repository access, external integrations, and metered-work limit are approved.

If the live path is unavailable, assign the sample issues to human roles, maintain the decision and shared-memory files manually, and review the coordination plan with a trainer.

| Exercise | Work | Time |
| --- | --- | ---|
| 1 | Initialize a team | 30 min |
| 2 | Assign bounded work | 30 min |
| 3 | Use GitHub Issues | 30 min |
| 4 | Monitor approved work | 30 min |

## Setup

- Node.js 20 or later
- Authenticated `gh` CLI
- Copilot CLI and an approved editor workflow
- A repository that you may push to, if using the live path

## Exercise 1: Initialize a Squad team (30 min)

Copy `lab/starter/squad-project/` into a training repository. Run the baseline before changing it:

```bash
npm install
npm start
curl http://localhost:3000/api/health
npm test
```

If the approved setup permits it, install and verify the CLI:

```bash
npm install -g @bradygaster/squad-cli
squad --version
```

Read `lab/starter/squad-init-guide.md`, then initialize the team through the approved path:

```text
Initialize a Squad team for this Node.js Express API. We need bounded roles
for feature work, bug fixes, and quality review. Keep a decision record.
```

Review the proposed team before confirming it. Names are cosmetic. Check the role boundaries in `.squad/team.md`, the routing in `.squad/routing.md`, the shared record in `.squad/decisions.md`, and one agent charter. Commit the generated team only after this review.

```bash
tree .squad/ -L 2
git add .
git commit -m "Initialize Squad team"
git push origin main
```

| Check | Expected result |
| --- | --- |
| Team | Active roles have charters and history files. |
| Routing | Each work type maps to a bounded owner. |
| Decisions | The shared record exists and has one owner for updates. |
| Repository | The reviewed setup is committed. |

If installation, agent mode, or the coordinator is unavailable, do not guess at a workaround. Use the tabletop route and preserve the same role and review decisions.

## Exercise 2: Assign work to agents (30 min)

Read `lab/starter/work-assignments.md`. Assign the lead a design decision, the backend role one endpoint, and the tester focused edge-case coverage. Do not give several agents write access to the same files.

Example endpoint request:

```text
{BackendName}, add GET /api/users/:id. Return a user by ID, return 404 when
it does not exist, follow the existing patterns, and add or update focused tests.
```

Inspect each result before passing work on:

```bash
ls .squad/decisions/inbox/
cat .squad/decisions.md
cat .squad/agents/{backend-name}/history.md
npm test
```

The reviewer should confirm that the decision, code, test evidence, and history agree. Split a request that is too broad or return it to the lead.

## Exercise 3: GitHub Issues integration (30 min)

Read `lab/starter/sample-issues.md`. Create the general label and labels for the actual team names:

```bash
gh label create "squad" --color "6f42c1" --description "Work for the Squad AI team"
gh label create "squad:{backend-name}" --color "0e8a16" --description "Assigned to {BackendName}"
gh label create "squad:{tester-name}" --color "d93f0b" --description "Assigned to {TesterName}"
gh label create "squad:{lead-name}" --color "0075ca" --description "Assigned to {LeadName}"
```

Create the first three prepared issues from `sample-issues.md`, then ask the lead to triage only those issues. Each issue needs a bounded scope, acceptance criteria, non-goals, and a reviewer.

```text
{LeadName}, triage the open Squad issues. Assign each to the appropriate
squad:{member} label and record the reason for the assignment.
```

Verify labels and inspect one resulting branch or draft pull request:

```bash
gh issue list --label "squad" --json number,title,labels
gh pr list --state open
gh pr view <PR_NUMBER>
```

Do not wait for a queue of autonomous changes. One reviewed issue is enough for the exercise.

## Exercise 4: Ralph and continuous development (30 min)

Read `lab/starter/ralph-guide.md` and `lab/starter/backlog-items.md`. Add the prepared backlog only if the repository and integration are approved. Review the monitor's status:

```bash
squad watch --health
```

Use the monitor to surface ready work. A human approves or merges it. For every selected item, confirm the issue scope, assigned role, current meter, required checks, and human reviewer. Stop if ownership overlaps, a check fails, policy changes, or the usage guard is reached.

The fallback is a manual board: triage the same backlog, assign one owner per item, simulate the monitor's next choice, and record the review decision.

## Deliverables

- [ ] A reviewed team structure or tabletop equivalent.
- [ ] Three role-bounded assignments with decision and test evidence.
- [ ] At least one triaged issue and reviewable result, if the live path is approved.
- [ ] A monitor or manual-board record with stop conditions.
- [ ] A documented manual fallback.
