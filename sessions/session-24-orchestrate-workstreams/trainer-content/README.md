# Trainer Content: Session 24, Orchestrate Agents and Workstreams

**Duration:** 1 hour

**Format:** Presentation plus live demonstration

## Delivery goal

Teach learners to direct four issue-based workstreams through live GitHub Copilot
orchestration. The orchestration surface holds operational state. The plan holds
only the decisions needed before work starts.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00-0:10 | Parent objective and workstream boundaries | Split work without hidden dependencies. |
| 0:10-0:20 | Minimal workstream plan | Set questions, inputs, stops, and reviewers. |
| 0:20-0:32 | Monitor and intervene | Wait, redirect, stop, accept, reject, or escalate. |
| 0:32-0:45 | Live demonstration | Review child sessions on the orchestration surface. |
| 0:45-0:55 | Review the parent result | Keep supported findings and visible gaps. |
| 0:55-1:00 | Lab handoff | Confirm access and deliverables. |

## Required preflight

- Confirm `/orchestrate` and the built-in `orchestrate` skill.
- Confirm GitHub MCP read access to the approved issues.
- Use synthetic or approved sanitized work.
- Confirm that the trainer can open, redirect, and stop child sessions.
- Decide who may approve issue updates.

**Do not deliver the lab if orchestration or issue access is unavailable.**

## Minimal workstream plan

Each workstream needs:

- one bounded question;
- approved issue inputs;
- one hard stop condition;
- one reviewer.

Do not copy session links, status, timing, usage, or progress into the plan. GitHub
Copilot already holds that state.

| Workstream | Question | Approved input | Stop condition | Reviewer |
| --- | --- | --- | --- | --- |
| Public mapping | Is the public mapping ready for approval? | Mapping issue and linked evidence | Restricted data or invented states are required | Product owner |
| Requester status | Is the issue ready for implementation review? | Requester-status issue and linked evidence | An unsupported field or forecast is required | Delivery reviewer |
| Empty and stale states | Are fallback states testable? | Fallback-state issue and linked evidence | An unsupported commitment is required | Service reviewer |
| Access boundary | Is requester access evidence ready? | Access issue and linked synthetic evidence | Production or personal data is requested | Privacy reviewer |

## Monitor the live work

Use the current session management surface.

| Signal | Action |
| --- | --- |
| Safe and on scope | Wait |
| Safe work needs a precise correction | Redirect |
| A hard boundary is crossed | Stop |
| The result meets the plan | Accept |
| The result lacks support | Reject |
| Human authority is required | Escalate |

Show one meaningful intervention. Do not invent an intervention for the exercise.

## Review the parent result

The parent result should link findings to live issues, show rejected claims, name
open gaps, and recommend the next follow-up. It must not publish or change source
systems without approval.

Session 25 reads the live issues and the reviewed parent result. There is no manual
delivery-status record or static handoff.

## Session 16 distinction

Session 16 covers an optional persistent-team framework. Session 24 covers
temporary built-in orchestration for one objective.

## Lab handoff

Learners submit:

1. the approved orchestration plan;
2. the live orchestration result;
3. fresh-read proof for any approved GitHub issue update.

For an Azure Boards delivery, use the
[trainer supplement](../lab/azure-boards/README.md). GitHub Copilot still performs
the orchestration.

## Official references

- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
