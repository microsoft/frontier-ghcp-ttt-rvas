# Session M7-06 lab: Create and review a delivery automation

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Sessions M7-01 to M7-05, Automations access, and GitHub MCP access

**Deliverable:** One reviewed stakeholder update from a draft-only automation

## Deliverables

- A concise automation definition
- One reviewed stakeholder update

## Outcome

Create one automation that reads the live GitHub issues and the reviewed Session
M7-05 parent result. Review its first draft, then apply one approved issue change
and run it again. Compare the drafts to see how that change affected the update.

The core lab uses a manual trigger and draft-only output. Scheduling stays
disabled.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Check access and retrieve inputs | 20 min |
| 2 | Complete the automation definition | 20 min |
| 3 | Create and run the automation | 30 min |
| 4 | Review the draft | 20 min |
| 5 | Update one issue and rerun | 20 min |
| 6 | Finalize the stakeholder update | 10 min |

## Preflight

Complete the track
[capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

Check GitHub Copilot Automations access and GitHub MCP access before the lab.

**Stop if GitHub Copilot access, Automations, or GitHub MCP access is
unavailable.** Fix access before continuing.

## Part 1: Check access and retrieve inputs

1. Open **Automations** in the GitHub Copilot app.
2. Check that **New automation** is available.
3. Retrieve the approved parent and child GitHub issues through GitHub MCP.
4. Open the reviewed Session M7-05 parent orchestration result.
5. Check that issue state and the parent result agree on the four workstreams.

Do not copy platform state into local handoff files.

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

Create a local automation with the minimum GitHub read tools.

Use this prompt:

```text
Read the approved status-visibility GitHub issues and the reviewed Session M7-05
parent orchestration result. Follow @automation-definition-template.md. Draft one
stakeholder update from supported issue state. Name unresolved exceptions and
owners. Do not publish, message people, edit issues, change labels, call
unapproved tools, or invent missing values.
```

Review the trigger, tools, prompt, and enabled state before the run. Keep any
schedule disabled.

## Part 4: Review the draft

Inspect the run on the Automations surface.

Check that:

- each status claim traces to a live issue or the reviewed parent result;
- unresolved evidence remains visible;
- no unsupported cause or forecast appears;
- no prohibited side effect occurred;
- the output is one draft stakeholder update.

Choose **Keep**, **Revise**, **Disable**, or **Pause**. Update the definition's
current state to match that decision. Do not create a separate status record.

## Part 5: Update one issue and rerun

Open `starter/approved-input-change.md`.

1. Apply the approved synthetic evidence update to the named training issue
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

Name GitHub or Azure Boards as the authoritative planning system. Leave
sharing the update to a person, not the automation.

## Verification

- [ ] Live issues and the Session M7-05 parent result were the only status inputs.
- [ ] The concise automation definition is complete.
- [ ] The automation produced one draft stakeholder update.
- [ ] The platform holds run status, tool calls, and output.
- [ ] One approved issue change was checked with a fresh read.
- [ ] The same automation ran again.
- [ ] A person chose Keep, Revise, Disable, or Pause.
- [ ] Scheduling remains disabled.
- [ ] No prohibited side effect occurred.
