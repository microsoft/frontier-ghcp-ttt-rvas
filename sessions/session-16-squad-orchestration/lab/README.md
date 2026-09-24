# Session 16 Lab: Carry One Issue Through a Squad

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07 and 09–12

**Deliverable:** One input-validation issue carried through assignment,
implementation, tests, review, and a durable decision record

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use synthetic
data only.

Choose one route:

- **Live route:** Learners must confirm GitHub Copilot access, the approved
  orchestration tool, the GitHub training repository, integrations, and the
  metered-work limit.
- **Tabletop route:** Use the same issue and role packet without the live tool.
  Learners act as lead, backend implementer, tester, and scribe.

If GitHub Copilot access or the approved live path is unavailable, stop live setup
and use the tabletop route. Do not improvise installation commands or connect an
unapproved repository.

| Exercise | Work | Time |
| --- | --- | --- |
| 1 | Prepare the project and team | 25 min |
| 2 | Assign Issue 001 | 20 min |
| 3 | Implement and test | 45 min |
| 4 | Review, decide, and monitor | 30 min |

## Setup

- Node.js 20 or later
- Git
- For the live route: authenticated `gh`, GitHub Copilot, an approved Squad
  installation, and a training repository that you may push to
- For the tabletop route: the supplied starter and solution assets

## Exercise 1: Prepare the project and team (25 min)

Copy `lab/starter/squad-project/` into a training repository. Run the baseline:

```bash
npm install
npm test
```

The starter suite should pass. Issue 001's validation cases do not exist yet.

For the live route, verify the already approved installation:

```bash
squad --version
```

Read `lab/starter/squad-init-guide.md`, then initialize or inspect the team:

```text
Initialize a Squad team for this Node.js Express API. We need bounded roles
for lead review, backend implementation, test evidence, and decision recording.
Keep one owner for the shared decision record.
```

Review `.squad/team.md`, `.squad/routing.md`, `.squad/decisions.md`, and every
charter. The backend role may edit `src/routes/api.js`. The tester may edit
`tests/api.test.js`. The lead reviews the result. The scribe is the only role that
updates the shared decision record.

```bash
tree .squad/ -L 3
```

| Check | Expected result |
| --- | --- |
| Team | Lead, backend, tester, and scribe have charters and history files. |
| Routing | Implementation, test evidence, review, and decision updates have one owner each. |
| Decisions | The shared record names the scribe as its editor. |
| Stop rule | Overlapping ownership, failed tests, scope growth, or an unclear data boundary pauses work. |

**Checkpoint:** The trainer signs off on the team boundary before Issue 001 is
assigned. Tabletop learners record the same roles in
`lab/starter/work-assignments.md`.

## Exercise 2: Assign Issue 001 (20 min)

Open Issue 001 in `lab/starter/sample-issues.md`. This is the only implementation
issue used in the required lab path.

The lead assigns it with this work order:

```text
Assign Issue 001 to the backend role.

Implement validation for POST /api/users in src/routes/api.js.
Accept a non-empty string name up to 100 characters and a valid email shape.
Return status 400 with a descriptive error for invalid input.
Do not add dependencies, change the response envelope, or edit unrelated routes.
The tester owns focused evidence in tests/api.test.js.
The lead reviews the final packet.
```

Record the assignment in the live `.squad/` log or the tabletop worksheet. It must
include the issue, owner, permitted files, non-goals, tests, reviewer, and stop
conditions.

**Checkpoint:** A partner compares the assignment with Issue 001. Fix any added
scope before implementation starts.

## Exercise 3: Implement and test (45 min)

The backend role updates `src/routes/api.js`. Keep validation inline and add no
package.

The tester adds focused cases to `tests/api.test.js` for:

- a trimmed non-empty name;
- an empty or non-string name;
- a name longer than 100 characters;
- a malformed email;
- a valid request that still returns `201`.

Run:

```bash
npm test
```

Record the command, result, and changed files. If a test fails, return the packet
to the owning role. Do not weaken the issue or delete a failing case to get a green
run.

**Checkpoint:** All focused and existing tests pass. Compare the result with
`lab/solution/squad-project/src/routes/api.js` and
`lab/solution/squad-project/tests/api.test.js`.

## Exercise 4: Review, decide, and monitor (30 min)

The lead checks the implementation against every acceptance criterion and records
one outcome: **approve**, **request changes**, or **pause**.

The review packet must include:

- issue and assignment;
- changed files;
- test command and result;
- acceptance-criteria checks;
- lead decision;
- durable decision-record entry.

Use `lab/starter/ralph-guide.md` to simulate the monitor after review. The monitor
may surface Issue 001 as ready for closure only after the lead approves it. A human
still closes or merges the work.

The items in `lab/starter/backlog-items.md` are optional discussion prompts.
**Do not implement them during the required lab.**

## Final deliverable

Submit one folder or pull request containing:

1. the reviewed team structure or tabletop role sheet;
2. the Issue 001 assignment;
3. the bounded code and test changes;
4. passing `npm test` evidence;
5. the lead review and durable decision.

## Verification

- [ ] Local prerequisites match Sessions 01–07 and 09–12.
- [ ] The selected route was approved before work began.
- [ ] One role owned each write boundary.
- [ ] Issue 001 kept the same acceptance criteria through review.
- [ ] No dependency or unrelated route was changed.
- [ ] Existing and focused tests pass.
- [ ] The lead decision cites test evidence.
- [ ] The live and tabletop routes produce the same review packet.
