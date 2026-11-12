# Session M7-06 lab: Create and review a delivery automation

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Sessions M7-01 to M7-05, Automations access, and GitHub MCP access

## Outcome

Create one automation that reads the live GitHub issues and the reviewed Session
M7-05 parent result. Review its first draft, apply one issue change, and run it
again. Compare the drafts to see how that change affected the update. You end with
the automation definition and one reviewed stakeholder update.

The core lab uses a manual trigger. Scheduling stays disabled.

**Boundary:** the automation only reads and drafts. A person reviews every draft
and shares it.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Check access and retrieve inputs | 15 min |
| 2 | Complete the automation definition | 15 min |
| 3 | Create and run the automation | 30 min |
| 4 | Review the draft | 20 min |
| 5 | Update one issue and rerun | 25 min |
| 6 | Finalize the stakeholder update | 15 min |

## Before you start

Complete the track
[capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

## Part 1: Check access and retrieve inputs

1. Open **Automations** in the GitHub Copilot app.
2. Check that **Create automation** is available. (Earlier builds may label it differently; check your version.)
3. Retrieve the parent and child GitHub issues through GitHub MCP.
4. Open the reviewed Session M7-05 parent orchestration result.
5. Check that issue state and the parent result agree on the four workstreams.

## Part 2: Complete the automation definition

Copy `starter/automation-definition-template.md` into your working folder.

Complete only these fields:

- trigger and cadence;
- authoritative inputs;
- permitted output;
- prohibited side effects;
- reviewer;
- stop conditions;
- current enabled or disabled state.

In your definition, use a manual trigger and limit the output to one draft
stakeholder update. Enable the automation only for supervised lab runs.

## Part 3: Create and run the automation

Create a local automation with the minimum GitHub read tools. In the docs'
manual flow, choose **Create manually** and leave **Run in the cloud** off. Run it
with the play button on its card, or use **Create and run**. Check the labels in
your app version.

Use this prompt:

```text
Read the approved status-visibility GitHub issues and the reviewed Session M7-05
parent orchestration result. Follow @automation-definition-template.md. Draft one
stakeholder update from supported issue state. Name unresolved exceptions and
owners. Don't invent missing values.
```

Review the trigger, tools, prompt, and enabled state before the run. Keep any
schedule disabled.

## Part 4: Review the draft

Inspect the run on the Automations surface.

Check that:

- each status claim traces to a live issue or the reviewed parent result;
- gaps or conflicts in the source information remain visible;
- no unsupported cause or forecast appears;
- the output is one draft stakeholder update.

Choose **Keep**, **Revise**, **Disable**, or **Pause**. Update the definition's
current state to match that decision.

## Part 5: Update one issue and rerun

Open `starter/approved-input-change.md`.

1. Apply the synthetic update to the named training issue
   through a reviewed GitHub MCP write.
2. Retrieve the issue again and check the new state.
3. Run the same automation. Do not create a second automation.
4. Compare the two runs on the Automations surface.
5. Check that only the approved issue change explains the draft change.

## Part 6: Finalize the stakeholder update

Complete `starter/stakeholder-update-template.md` from the second reviewed draft.

The update must state:

- the reporting scope;
- supported status changes;
- unresolved exceptions and owners;
- the review decision;
- the next action.

Name GitHub or Azure Boards as the authoritative planning system. A person shares
the update, not the automation.

## Final deliverable

- The completed automation definition, with trigger, inputs, output, reviewer, stop conditions, and current enabled state.
- One reviewed stakeholder update, finalized from the second run.
- A short note on how the issue change altered the draft.
