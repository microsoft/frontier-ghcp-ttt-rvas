# Session 24 Trainer Guide: Review Outcomes and Govern Automation

## Delivery objective

Learners leave with a governed workflow, not an automation demo. They use **GitHub Copilot** to define what the workflow may do, inspect evidence from one run, record a human decision, and communicate the result.

Use the fictional **Service Request Portal** weekly status workflow. Do not configure enterprise policies or repeat the Session 17 administration material.

> [!IMPORTANT]
> Verify GitHub Copilot access before the session. If a learner cannot use an approved Copilot surface, stop and resolve access before the lab starts. Do not offer a manual or no-access substitute.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:06 | Accountability stays with the workflow owner |
| 0:06–0:14 | Copilot access, policy, data, and meter preflight |
| 0:14–0:24 | Autonomy and approval classification |
| 0:24–0:35 | Build the automation contract |
| 0:35–0:47 | Review a synthetic run evidence packet |
| 0:47–0:55 | Accept, reject, or pause |
| 0:55–1:00 | Useful time saved, stakeholder update, and lab launch |

## Current product facts to verify before delivery

These notes were checked against official GitHub documentation on **September 23, 2026**. Recheck them before teaching because feature names, eligibility, billing, and controls can change.

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

Do not promise a fixed feature or click path. If an automation feature is unavailable, use an approved GitHub Copilot surface to review the prepared evidence. GitHub Copilot access remains required.

## Core model

### 1. Classify autonomy

| Level | Automation may | Human gate |
| --- | --- | --- |
| A0: Manual | Supply a checklist or template | Human performs all work |
| A1: Draft | Read approved inputs and draft an output | Human approves every use or distribution |
| A2: Bounded action | Take a reversible action in a named system | Human approves the contract and reviews exceptions |
| A3: Unattended action | Run and act without per-run approval | Owner monitors evidence and can stop it immediately |

The lab selects **A1: Draft**. The workflow may prepare a weekly status update. It may not publish, message stakeholders, change requests, or modify repository content.

### 2. Match approval to consequence

Approval is not a label added after the run. Define it before the run:

- what the reviewer checks;
- which evidence must exist;
- which defects cause rejection;
- who handles exceptions;
- when the workflow stops.

Higher autonomy needs a smaller action boundary, stronger evidence, and a faster stop path. If the group cannot name those controls, lower the autonomy level.

### 3. Write the contract

Use `lab/starter/automation-contract-template.md`. A useful contract names:

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
2. Open the synthetic request CSV and change log.
3. Review `synthetic-run-evidence.json`.
4. Ask GitHub Copilot to draft or review the weekly update.
5. Compare it with `lab/solution/run-output.md`.
6. Record the decision in the approval template.
7. Calculate useful time saved.

Run one automation test only after the access, policy, data, and meter preflight passes. Select the minimum tools. Keep the output in draft form. Stop after 12 minutes. If a stop condition fires, preserve the evidence and have learners use GitHub Copilot to inspect the supplied packet.

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

Do not count generated words, agent activity, or elapsed calendar time as value. A rejected run can save no useful time even when it finishes quickly.

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

## Lab handoff

Learners submit one automation contract, one GitHub Copilot-reviewed evidence packet, one approval record, and one stakeholder-ready update. The submission must show how GitHub Copilot drafted, inspected, or reviewed the work.
