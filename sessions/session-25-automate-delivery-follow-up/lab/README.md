# Session 25 Lab: Automate a Weekly Delivery Follow-up

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-24, GitHub Copilot app Automations access, and GitHub MCP access

## Objective

Create and run one draft-only weekly Service Request Portal automation. Submit its contract, run evidence, approval record, stakeholder-ready update, and system-of-record decision.

## Scenario

The product team prepares an internal update every Friday. The update summarizes closed, active, and blocked service requests and notes portal changes.

Use only the fictional data in `starter/`. You may substitute sanitized recurring work when the trainer confirms that its inputs, outputs, and evidence can be shared.

## Time plan

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Confirm access and classify the workflow | 20 min |
| 2 | Complete the automation contract | 30 min |
| 3 | Use GitHub Copilot to draft and inspect | 30 min |
| 4 | Review and decide | 25 min |
| 5 | Measure and communicate | 15 min |

## Preflight

Complete this before the lab.

| Area | Record |
| --- | --- |
| GitHub Copilot | Signed in to the app with Automations access |
| GitHub MCP | Able to read the approved training repository and issues |
| Policy | Approved GitHub Copilot surface and feature |
| Data | Synthetic or approved sanitized inputs only |
| Meter | Current AI-credit and compute meter, budget, and observer |
| Owner | Accountable product or delivery owner |
| Reviewer | Person who accepts, rejects, or pauses the result |
| Escalation | Person or role that resolves exceptions |
| Stop guard | Condition that ends the run or disables the workflow |
| Recovery procedure | Steps to stop the workflow, preserve evidence, and return control to the owner |

> [!IMPORTANT]
> **Stop if Automations or GitHub MCP access fails.** Resolve the sign-in, entitlement, policy, connection, or repository issue before you continue.

Confirm current eligibility and controls in the official GitHub documentation. The interface and available options may differ from this lab. Use the minimum required tools. Do not place secrets, customer data, or restricted content in prompts or evidence.

**Exercise guard:** Run one automation test. Stop if the approved usage meter is unavailable, the data classification is unclear, the workflow requests an unapproved tool, or the run exceeds 12 minutes. Preserve the evidence and record **Pause**.

## Phase 1: Classify the workflow (20 min)

Choose an autonomy level:

| Level | Description |
| --- | --- |
| A0 | Manual work with a checklist or template |
| A1 | Automation drafts; a human approves every use |
| A2 | Automation takes a bounded, reversible action |
| A3 | Automation acts without per-run approval |

Select **A1** for the supplied scenario. The workflow may read the two approved starter inputs and draft two local artifacts:

- a weekly status update;
- a run evidence packet.

It may not post messages, edit service requests, change labels, open pull requests, or write to an external system.

Record the preflight answers and selected level in `automation-contract-template.md`.

## Phase 2: Complete the automation contract (30 min)

Copy `starter/automation-contract-template.md` into your working folder. Complete every field.

Your contract must define:

- purpose and weekly cadence;
- owner, reviewer, and escalation contact;
- allowed and prohibited inputs and outputs;
- required evidence and review rules;
- usage meter and stop guard;
- recovery procedure and review interval.

Keep the output factual. Each count or status claim must trace to an accepted source record. A record missing required fields must appear in the exception list.

## Phase 3: Use GitHub Copilot to draft and inspect (30 min)

Create the automation in the GitHub Copilot app. Provide the completed contract, approved GitHub issue scope, and synthetic inputs. Grant only the required GitHub read tools. Do not let it publish or change source records.

Suggested work order:

```text
Prepare one internal weekly status draft for the fictional Service Request Portal.
Follow the attached automation contract. Use only the attached synthetic request
records and change log. Exclude records that fail the input rules and explain each
exclusion. Do not post, message, edit source records, call external tools, or invent
missing values. Return a markdown draft and JSON evidence for human review.
```

Run one draft-only test after the preflight. Keep all outputs reviewable. Stop after one test or 12 minutes. Export or transcribe the evidence required by the contract. Leave the automation unscheduled unless the owner approves another run.

If policy, product availability, or a stop condition blocks the run, record **Pause** and stop the lab. `starter/synthetic-run-evidence.json` is a comparison aid after the live attempt, not a completion route.

Use `starter/run-evidence-template.json` for the evidence packet. Replace every placeholder with results from your Copilot draft or Copilot review.

## Phase 4: Review and decide (25 min)

Compare the draft with the source records and contract.

- Does the run identify its contract version and input files?
- Do source, accepted, and rejected counts reconcile?
- Does every number match accepted records?
- Is the missing-owner record excluded and explained?
- Does the output avoid unsupported causes or forecasts?
- Did the run stay within its tool and output boundary?
- Does the packet record the GitHub Copilot surface and available usage evidence?
- Is the owner able to stop the workflow?

Complete `approval-record-template.md`. Choose one decision:

- **Accept** for stakeholder preparation.
- **Reject** and name the correction.
- **Pause** until a policy, data, meter, owner, or evidence gap is resolved.

Acceptance does not publish the draft. Distribution remains a human action outside the automation.

## Phase 5: Measure and communicate (15 min)

Calculate useful time saved:

```text
manual baseline
- Copilot draft or review time
- review time
- rework time
- allocated setup and operating overhead
```

Record zero or a negative result when the workflow did not save useful time. Keep the measure for this run separate from a claim about long-term productivity.

Complete `stakeholder-update-template.md`. Include:

- reporting period and workflow;
- accepted results;
- exceptions and owner;
- approval decision;
- useful time saved and its calculation;
- next action and stop status.

Record the authoritative planning system:

- **GitHub**, when the issues and agent work remain authoritative there; or
- **Azure Boards**, when the delivery backlog remains authoritative there.

If Azure Boards is selected, state how the draft will be reviewed before a person updates the work item or sends approved implementation work to a linked GitHub repository.

Do not include prompts, hidden reasoning, secrets, restricted data, or names from a customer or source organization.

## Checkpoints

| Time | Expected state |
| --- | --- |
| 20 min | Preflight and A1 classification recorded |
| 50 min | Contract complete |
| 80 min | Draft and evidence packet ready |
| 105 min | Approval decision recorded |
| 120 min | Stakeholder update complete |

## Deliverable

Submit these four artifacts:

1. One completed automation contract.
2. One GitHub Copilot-reviewed run evidence packet.
3. One approval record with accept, reject, or pause.
4. One stakeholder-ready update with useful time saved.
5. One system-of-record decision for GitHub or Azure Boards.

The artifacts must name the owner, reviewer, escalation path, stop condition, and recovery procedure. The evidence must show where GitHub Copilot drafted, inspected, or reviewed the governed work.

## Final check

- [ ] The workflow uses the lowest useful autonomy level.
- [ ] GitHub Copilot app Automations and GitHub MCP access are recorded.
- [ ] Policy, data, and meter checks are recorded.
- [ ] Inputs, outputs, tools, and side effects are bounded.
- [ ] Required evidence traces the draft to accepted source records.
- [ ] Exceptions are visible and assigned.
- [ ] The reviewer recorded a decision and next action.
- [ ] Useful time saved subtracts review, rework, and overhead.
- [ ] The stakeholder update contains no customer or source organization names.
- [ ] The authoritative planning system and handoff owner are explicit.

## Solution reference

Compare your work with `solution/` after recording your own decision. The reference solution uses GitHub Copilot to review the prepared synthetic evidence.
