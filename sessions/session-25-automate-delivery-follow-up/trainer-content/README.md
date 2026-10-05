# Session 25 Trainer Guide: Automate Delivery Follow-up

## Delivery objective

Teach learners to build one bounded automation from live GitHub issues and the
reviewed Session 24 parent result. The automation drafts a stakeholder update. A
person reviews every run and controls distribution.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:10 | Choose the recurring draft |
| 0:10-0:22 | Write the concise automation definition |
| 0:22-0:35 | Configure and run the automation |
| 0:35-0:47 | Review platform evidence |
| 0:47-0:55 | Change one issue and rerun |
| 0:55-1:00 | Decide the authoritative system and current state |

## Required access

Verify Automations and GitHub MCP access before the session. Stop if either is
unavailable.

## The automation definition

Use `lab/starter/automation-definition-template.md`. It contains only:

- trigger and cadence;
- authoritative inputs;
- permitted output;
- prohibited side effects;
- reviewer;
- stop conditions;
- current enabled or disabled state.

The core lab uses a manual trigger. Scheduling stays disabled.

## Authoritative inputs

The automation reads:

1. the approved live GitHub issues;
2. the reviewed Session 24 parent orchestration result.

Do not add copied status files or a static Session 24 handoff. They can drift from
the platform state.

## Review the run on the platform

Check claim traceability, open exceptions, tool use, side effects, and the final
draft. Do not ask learners to copy run identifiers, timing, usage, or status into
a second record.

The learner chooses **Keep**, **Revise**, **Disable**, or **Pause**, then updates
the definition's current state to match.

## Demo

1. Retrieve the live issues and Session 24 parent result.
2. Complete the automation definition.
3. Create a manual automation with minimum GitHub read tools.
4. Run it and review the stakeholder draft.
5. Apply `lab/starter/approved-input-change.md` through a reviewed MCP write.
6. Retrieve the issue again.
7. Run the same automation and compare the platform results.
8. Finalize the stakeholder update.

## Stop conditions

Stop when an authoritative input is unavailable, evidence conflicts, restricted
data is requested, a prohibited side effect is required, or the reviewer is
unavailable.

## System-of-record decision

Keep GitHub authoritative when issues and agent work live there. Keep Azure Boards
authoritative when the delivery backlog lives there. Do not maintain competing
status fields.

## Lab handoff

Learners submit the concise automation definition and one stakeholder update.
