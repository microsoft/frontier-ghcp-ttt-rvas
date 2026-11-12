---
description: "HVE Core challenge covering RPI, optional customization and product agents, and reviewed delivery"
---

# Session M5-03 lab: HVE from product intent to reviewed code

**Duration:** 3 hours

**Difficulty:** Advanced

**Prerequisites:** HVE Core installed; Sessions M1-01 to M1-03, M2-01 to M2-04 and M3-04 or equivalent experience

## Objective

Use HVE Core to take one Engineering Decision API feature through the four RPI
phases: Research, Plan, Implement, Review. Customizing HVE for the repository and
using the product agents are **optional** and fit only if you finish the core
exercises early.

The handoff is an index of the HVE artifacts and your decision.

## Terms

- **RPI:** Research, Plan, Implement, Review. Four phases, each run by its own prompt. A fifth step, Follow-up, sends defects, decision gaps, and evidence gaps back to the phase that owns them.
- **File as interface:** each phase writes a Markdown file under `.copilot-tracking/`. The next phase reads that file, not the chat. You can read it, diff it, edit it, and attach it to a fresh chat.
- **BRD / PRD:** business requirements document (why the business wants this) and product requirements document (what the product must do). `@BRD Builder` and `@PRD Builder` write them. You use them when you start from a business idea. This lab starts from `starter/product-intent.md`.
- **`applyTo` glob:** a frontmatter line in an `.instructions.md` file, such as `applyTo: "src/**/*.js"`. The instruction loads only when Copilot works on a file that matches the pattern.

## Before you start

You need Node.js 20 or later, GitHub Copilot, and the HVE Core extension or Copilot
CLI plugin. Use synthetic decision records.

HVE command names and output paths change between versions. Check the
[HVE Core README](https://github.com/microsoft/hve-core) and its
[RPI docs](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md) for
your installed version. This lab uses the names below. If yours differ, use yours.

1. Check that `/rpi-research`, `/rpi-plan`, `/rpi-implement`, `/rpi-review`, and `/rpi`
   are available. For the optional exercises, also check `@Product Manager Advisor`
   and `@Agile Coach`. Current HVE Core `main` replaced these agents with skills
   (`requirements-author` and the backlog skills), so use whatever your install
   offers. Type the command in chat. If it appears in the picker or
   runs, it's available. In Copilot CLI, `/skills` and `/agent` list what's loaded.
2. Check that `.copilot-tracking/` is ignored by Git.
3. Run `npm test` (run `npm ci` first if dependencies are missing).
4. Read `starter/product-intent.md`, `starter/challenge-brief.md`, and the
   artifact index in `starter/challenge-handoff.md`.
5. Reserve the last 20 to 30 minutes for Review, your decision, and the handoff.

The baseline is one passing health test and no `POST /api/decisions`. If one HVE
invocation fails, use `starter/hve-phase-recovery.md` and continue with the next phase.

## Pacing

Agent latency varies. Move on when the stage's files exist.

| Stage | Range | Done when |
|-------|-------|-----------|
| Preflight | 10 to 15 min | Commands are available and you can name the four tracking paths |
| Research and Plan | 30 to 40 min | Research, plan, critique, and your approval exist |
| Implement and validate | 35 to 45 min | Changes log, code, and test and container results exist |
| Review and combined-RPI comparison | 20 to 30 min | Review file, your decision, and the comparison note exist |
| Optional: customization | 20 to 25 min | You can name one change a repository file caused |
| Optional: product and Agile agents | 20 to 25 min | You have a story, criteria, and exclusions |

The required stages take about 1 hour 35 minutes to 2 hours 10 minutes. Do the
optional stages with the time that remains, between Plan and Implement.

## Exercise 1: Run Research and Plan

Four kinds of file drive HVE: agents (roles), prompts (slash-command entry points),
instructions (standards by file pattern), and `.copilot-tracking/` files (state
between phases).

Run:

```text
/rpi-research "Add POST /api/decisions to the starter API using the supplied product intent and feature contract"
```

Expect a file like `.copilot-tracking/research/<date>/<task>-research.md`. Open it.
It should record the scope, a rejected alternative, a constraint, and the next phase.

Clear the chat, attach the research file, then run `/rpi-plan`. Expect a plan under
`.copilot-tracking/plans/<date>/` and a plan critique under
`.copilot-tracking/reviews/plans/<date>/`. Read both. Approve the plan only when every
acceptance criterion maps to an owning file and a focused check.

## Optional exercise 2: Customize HVE for the repository

Create three repository-owned files:

1. `.github/copilot-instructions.md` with the service context, architecture, data
   boundary, and dependency rule. Copilot loads it for every request in the repository.
2. `.github/instructions/javascript-api.instructions.md` with `description` and
   `applyTo` frontmatter for `src/**/*.js` and `tests/**/*.test.js`. Require stable
   envelopes, app-instance state, and HTTP-level tests.
3. `.github/agents/decision-api-reviewer.agent.md` with a narrow review mission,
   read/search tools only, and a response format that maps findings to criteria.

Check that each one is active:

| File | How to check |
|------|--------------|
| `copilot-instructions.md` | Ask "What rules does this repository give you?" The answer should quote it. In VS Code, the response's References list shows the file. |
| `*.instructions.md` | Open or edit a file that matches `applyTo`, then ask a question about it. The instruction should appear in References. A file outside the glob should not load it. |
| `*.agent.md` | The agent appears in the agent picker (`/agent` in Copilot CLI). Run it once and check its answer uses your response format. |

Then re-run `/rpi-plan` or review the plan again, and note one concrete change caused
by one of the files. Creating a file alone doesn't show HVE used it.

## Optional exercise 3: Product and Agile agents

Give `starter/product-intent.md` to `@Product Manager Advisor`. Ask it to test the
feature's value, users, assumptions, priority, and non-goals. Cite its output from
the plan.

Give the advisor output and `starter/challenge-brief.md` to `@Agile Coach`. Ask for
one outcome-oriented user story, acceptance criteria, and named exclusions. Compare
those criteria with the plan. Update the plan if they expose a gap, and say so in the
plan. Don't create live work items.

Use the agent picker to find `@BRD Builder` and `@PRD Builder`. Write one sentence on
when you'd start with each instead of `product-intent.md`.

## Exercise 4: Implement and review

Attach the approved plan (and any product or Agile output), then run `/rpi-implement`.
The finished behavior must:

* require non-empty string values for `title`, `context`, and `decision`;
* accept `proposed`, `accepted`, or `superseded` as status;
* default status to `proposed`;
* reject a stored title after trimmed, case-insensitive comparison;
* generate a unique string ID and UTC `createdAt` value;
* return stable success and error envelopes;
* keep the health route test passing;
* run tests in a container build stage;
* ship only production dependencies and tested source in the runtime stage;
* run as a non-root user with a health check for `GET /health`.

Expect a changes log under `.copilot-tracking/changes/<date>/`. Then run
`/rpi-review` and expect a review file under `.copilot-tracking/reviews/logs/<date>/`.
Review every criterion as `pass`, `fail`, `deferred`, or `not run`. Check that errors reveal no
stack traces, app instances do not share records, and the runtime image excludes
development dependencies and root execution.

If the platform produces commit or pull-request text, leave it in the platform
output. Don't commit, push, merge, or create a remote pull request.

## Compare direct and combined RPI

You just ran the phases one at a time. Don't start a second feature. Write a short
note, using the table:

| | Direct prompts (what you ran) | Combined `/rpi task="..."` |
|-|-------------------------------|----------------------------|
| You type | One prompt per phase | One prompt for the task |
| Approval | You approve between phases | Depends on the mode you pick. Some modes check in; some run end to end |
| Files you get | One file per phase, at the paths above | The same kinds of files, tied to one task name. Some versions also open a workflow canvas |
| After Review | You decide where defects go | Follow-up routes defects to Implement, decision gaps to Plan, and evidence gaps to Research |
| Use it when | Learning, demos, explicit approvals | You trust the handoffs |

In your note, say which defect or gap from your own Review Follow-up would send back,
and to which phase.

## Final deliverable

Fill in `starter/challenge-handoff.md`:

* the paths of the four phase files;
* your decision (approve, request changes, or pause);
* open risks and the next action.

If you did the optional exercises, add the paths of the repository files and the
agent outputs. Keep test and container results in the Implement or Review file.

## References

* [HVE Core installation](https://github.com/microsoft/hve-core/blob/main/docs/getting-started/install.md)
* [RPI workflow](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md)
* [Using RPI together](https://github.com/microsoft/hve-core/blob/main/docs/rpi/using-together.md)

## Solution reference

Trainers can compare the result with `solution/decision-api` and
`solution/reference-notes.md` after the learner records a review decision.
