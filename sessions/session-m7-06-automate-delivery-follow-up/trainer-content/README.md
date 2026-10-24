# Session M7-06 trainer guide: Automate delivery follow-up

## Delivery objective

Show learners how to build one draft-only automation from live GitHub issues and
the reviewed Session M7-05 parent result. It drafts a stakeholder update, but a
person must review every run and control how the update is shared.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:10 | Choose the recurring draft |
| 0:10-0:22 | Write the concise automation definition |
| 0:22-0:35 | Configure and run the automation |
| 0:35-0:47 | Review platform run records |
| 0:47-0:55 | Change one issue and rerun |
| 0:55-1:00 | Decide the authoritative system and current state |

## Required access

Check Automations and GitHub MCP access before the session. Stop if either is
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
2. the reviewed Session M7-05 parent orchestration result.

Do not add copied status files or a static Session M7-05 handoff. They can drift from
the platform state.

## Review the run on the platform

Check the sources behind each claim in the final draft. Review open exceptions,
tool use, and side effects on the platform. Do not ask learners to copy run
identifiers, timing, usage, or status into a second record.

Have learners choose **Keep**, **Revise**, **Disable**, or **Pause**, then update
the definition's current state to match.

## Demo

1. Retrieve the live issues and Session M7-05 parent result.
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
