# Session 25 Trainer Guide: Automate Delivery Follow-up and Connect Work Systems

## Delivery objective

Teach learners to turn the manual delivery workflow into one bounded GitHub
Copilot Automation. They run it twice in draft-only mode with an approved input
change between runs, compare the evidence, and decide whether to keep, revise,
disable, or pause it.

Use the fictional **Service Request Portal** weekly status workflow. Do not configure enterprise policies or repeat the Session 17 administration material.

> [!IMPORTANT]
> Verify GitHub Copilot app Automations and GitHub MCP access before the session. Stop if either capability is unavailable.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Choose the recurring delivery task |
| 0:08–0:18 | Open Automations and inspect the available controls |
| 0:18–0:30 | Build the draft-only automation contract |
| 0:30–0:42 | Configure and run the automation |
| 0:42–0:53 | Change an input, rerun, and compare evidence |
| 0:53–1:00 | Connect the result to GitHub or Azure Boards |

## Current product facts to verify before delivery

These notes were checked against official GitHub documentation on
**September 24, 2026**. Recheck them before teaching because feature names,
eligibility, billing, and controls can change.

- Copilot automations can save recurring agent tasks and run them on demand or from supported triggers. The GitHub Copilot app documentation describes local and cloud automations.
- Cloud automations depend on Copilot cloud agent access and organization or repository settings. The available controls depend on the learner's plan, account, repository, and administrator decisions.
- Tool selection limits what a cloud automation can do. Grant only the tools required for the contract.
- Automation prompts, session logs, and resulting changes can have different visibility. Keep secrets and restricted data out of prompts and evidence.
- Copilot cloud agent usage consumes AI credits and can consume GitHub Actions minutes. The team must confirm its current meter and budget before a live run.
- GitHub Copilot policies do not apply uniformly across every surface. The Copilot app and other clients can have separate controls.

Official references:

- [Using automations in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/using-automations)
- [About Copilot automations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations)
- [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
- [Adding GitHub Copilot cloud agent to your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/add-copilot-cloud-agent)
- [GitHub Copilot policies for enterprises and organizations](https://docs.github.com/en/copilot/concepts/enterprise/policies)
- [Supported surfaces for GitHub Copilot policies](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies)
- [Billing and usage for organizations and enterprises](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises)
- [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion)

Do not promise a fixed click path. The session requires the current Automations area or its documented replacement.

## Core model

### 1. Classify autonomy

| Level | Automation may | Human gate |
| --- | --- | --- |
| A0: Manual | Supply a checklist or template | Human performs all work |
| A1: Draft | Read approved inputs and draft an output | Human approves every use or distribution |
| A2: Bounded action | Take a reversible action in a named system | Human approves the contract and reviews exceptions |
| A3: Unattended action | Run and act without per-run approval | Owner monitors evidence and can stop it immediately |

The lab selects **A1: Draft**. The workflow may retrieve approved issue state and prepare a weekly status update. It may not publish, message stakeholders, change work items, or modify repository content.

### 2. Match approval to consequence

Define approval before the run:

- what the reviewer checks;
- which evidence must exist;
- which defects cause rejection;
- who handles exceptions;
- when the workflow stops.

Higher autonomy needs a smaller action boundary, stronger evidence, and a faster stop path. If the group cannot name those controls, lower the autonomy level.

### 3. Write the contract

Use `lab/starter/automation-contract-template.md`. The contract names:

- purpose and cadence;
- owner, reviewer, and escalation contact;
- autonomy and approval level;
- allowed and prohibited inputs;
- allowed and prohibited outputs;
- acceptance and rejection rules;
- evidence packet;
- meter and stop guard;
- recovery procedure.

### 4. Review the run, not the prose

Open `lab/starter/synthetic-run-evidence.json`. Ask learners to trace every status claim to an accepted source record. One record lacks an owner and is excluded. That exclusion is part of the evidence, not a hidden cleanup step.

Review in this order:

1. Identity: contract version, run ID, time, trigger, and operator.
2. Boundary: approved inputs, tools, data classification, and outputs.
3. Completeness: source count, accepted count, rejected count, and reasons.
4. Accuracy: claims match accepted source records.
5. Side effects: no post, message, request edit, or unapproved write occurred.
6. Meter: the packet records the GitHub Copilot surface and available usage evidence.
7. Decision: accept, reject, or pause, with an owner and next action.

## Demo

Use the starter files and an approved GitHub Copilot surface.

1. Show the incomplete contract template.
2. Open **Automations** and create a manual, local, draft-only automation.
3. Grant the minimum GitHub read tools.
4. Run it against the first input version.
5. Review the exception for the missing owner.
6. Apply `lab/starter/approved-input-change.md`.
7. Run the same automation again.
8. Compare both evidence packets and record the decision.

Run only the two approved manual tests after preflight. Stop either run after
12 minutes. If a stop condition fires, preserve the evidence and record
**Pause**.

## Useful time saved

Use a plain calculation:

```text
useful time saved =
manual baseline
- automation run time
- human review time
- rework time
- allocated setup and operating overhead
```

The reference run saves 15 minutes:

```text
42 - 8 - 12 - 4 - 3 = 15 minutes
```

Do not count generated words, agent activity, or elapsed calendar time as value.
A rejected run may save no useful time, even when it finishes quickly.

## Decision language

**Accept** when required evidence exists, the output meets the contract, exceptions are explicit, and no prohibited action occurred.

**Reject** when the output is wrong, incomplete, unsupported, or outside the allowed boundary. Name the correction and owner.

**Pause** when policy, data, meter, ownership, or evidence is unresolved. Follow the recovery procedure and keep the automation stopped until the issue is closed.

## Facilitation notes

- Ask “Who owns this claim?” whenever a learner points to the automation.
- Keep workflow approval separate from enterprise policy approval.
- Treat a clean-looking update without traceable evidence as a failed run.
- Avoid fictional customer names. Use roles such as product owner, delivery lead, and reviewer.
- Let learners substitute sanitized recurring work only when its inputs and outputs can be shared in the room.

## System-of-record decision

End the demonstration by asking where the approved state belongs:

- Keep GitHub authoritative when the issues, repositories, and agent work already live there.
- Keep Azure Boards authoritative when the delivery organization manages its backlog there.
- Do not maintain competing status fields in both systems without a named synchronization owner.

The optional Azure Boards route may prepare a draft update or hand approved implementation work to a linked GitHub repository. It must not turn the session into an Azure Boards product tour.

## Lab handoff

Learners submit one automation contract, two run evidence packets, one comparison
and approval record, and one stakeholder-ready update.
