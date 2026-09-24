# Session 25 Lab: Create, Review, and Rerun a Delivery Automation

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20–24, GitHub Copilot app Automations access, and
GitHub MCP access

**Deliverable:** A manual, draft-only automation with two reviewed runs, evidence,
and a system-of-record decision

## Deliverables

- the saved manual, draft-only Automation;
- two run outputs and evidence packets;
- the completed approval record;
- the final Keep, Revise, Disable, or Pause decision.

## What you will learn

You will create an Automation through the app, restrict its tools and outputs, run
it on demand, reject or revise the first result, change an approved input, rerun
the same automation, and compare the evidence.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Verify Automations and prepare inputs | 15 min |
| 2 | Write the automation contract | 25 min |
| 3 | Create the manual automation | 25 min |
| 4 | Run and review the first draft | 20 min |
| 5 | Update the input and rerun | 20 min |
| 6 | Decide, measure, and hand over | 15 min |

## Preflight

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

Confirm GitHub Copilot access before starting. If GitHub Copilot access is
unavailable, stop and do not continue.

## Part 1: Verify Automations and prepare inputs (15 minutes)

1. Open **Automations** in the GitHub Copilot app.
2. Confirm that **New automation** is available.
3. Confirm that GitHub MCP can read the approved training repository and issues.
4. Copy the starter data into a working folder:

   ```bash
   cp sessions/session-25-automate-delivery-follow-up/lab/starter/synthetic-service-requests.csv \
     working-service-requests.csv
   cp sessions/session-25-automate-delivery-follow-up/lab/starter/synthetic-change-log.md \
     working-change-log.md
   ```

5. Record the owner, reviewer, usage guard, and stop condition.

Stop if Automations, the project, or the approved GitHub read tools are
unavailable.

## Part 2: Write the automation contract (25 minutes)

Copy `starter/automation-contract-template.md` into your working folder.

Set the autonomy level to **draft only**. The automation may:

- read `working-service-requests.csv`;
- read `working-change-log.md`;
- read approved GitHub issue state;
- create a Markdown status draft;
- create a JSON evidence packet.

It may not publish, comment, edit issues, change labels, contact people, or write
to an external system.

Define:

- manual trigger;
- approved project;
- allowed tools;
- input validation rules;
- required evidence;
- owner and reviewer;
- one-run or time limit;
- rejection and recovery procedure.

**Checkpoint:** Every output and side effect is either explicitly allowed or
prohibited.

## Part 3: Create the manual automation (25 minutes)

In **Automations**, click **New automation**.

Configure:

| Setting | Value |
| --- | --- |
| Name | `Draft weekly delivery update` |
| Trigger | Manual |
| Run in cloud | Off for this local-file exercise |
| Project | Training repository |
| Tools | Minimum GitHub read tools only |
| Model | Organization-approved model or Auto |
| Schedule | None |

Use this prompt:

```text
Prepare one internal weekly status draft for the fictional Service Request Portal.
Follow @automation-contract-template.md. Use only
@working-service-requests.csv, @working-change-log.md, and approved GitHub issue
reads. Exclude any record that fails the contract's input rules and explain the
exclusion. Do not post, message, edit source records, call unapproved tools, or
invent missing values. Return a Markdown draft and JSON evidence for review.
```

Review the selected project, trigger, tools, and prompt. Create the automation but
do not schedule it.

## Part 4: Run and review the first draft (20 minutes)

Run the automation on demand.

Save:

- the Markdown draft;
- the JSON evidence;
- the run status and duration;
- the tools used;
- accepted and rejected record counts.

Compare the result with the source files and contract.

The first run should exclude `SR-1048` because it has no owner. Confirm that:

- accepted and rejected counts reconcile;
- every number matches an accepted source record;
- the missing-owner record is named in the exception list;
- no unsupported cause or forecast appears;
- no prohibited write occurred.

Record **Accept**, **Reject**, or **Pause** for the first run. Do not publish the
draft.

## Part 5: Update the input and rerun (20 minutes)

Open `starter/approved-input-change.md`. Apply the approved update to
`working-service-requests.csv`.

Run the same automation again on demand. Do not create a second automation.

Compare the two runs:

| Check | First run | Second run |
| --- | --- | --- |
| Input version |  |  |
| Accepted records |  |  |
| Rejected records |  |  |
| Blocked records |  |  |
| Exception list |  |  |
| Tool boundary |  |  |

The second evidence packet must identify the updated input and show why `SR-1048`
changed classification.

**Checkpoint:** The automation responds to an approved source change without
changing its tool or publication boundary.

## Part 6: Decide, measure, and hand over (15 minutes)

Complete:

- `approval-record-template.md`;
- `stakeholder-update-template.md`.

Choose **Keep**, **Revise**, **Disable**, or **Pause** for the automation.

Calculate useful time saved:

```text
manual baseline
- automation run time
- review time
- rework time
- allocated setup and operating overhead
```

Record zero or a negative value when the workflow did not save useful time.

Name the authoritative planning system:

- **GitHub**, when issues and agent work remain authoritative there; or
- **Azure Boards**, when the delivery backlog remains authoritative there.

Distribution remains a human action outside the automation.

## Verification

- [ ] A manual Automation was created in the app.
- [ ] The project, trigger, tools, and prompt were reviewed.
- [ ] The automation remained draft only.
- [ ] The first run excluded the invalid record and explained why.
- [ ] An approved input change was applied.
- [ ] The same automation ran a second time.
- [ ] The two evidence packets were compared.
- [ ] A person recorded Keep, Revise, Disable, or Pause.
- [ ] Useful time saved includes review, rework, and overhead.
- [ ] The system of record and handoff owner are explicit.
- [ ] No customer or source organization names appear.
