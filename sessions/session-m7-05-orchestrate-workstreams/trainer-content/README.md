# Trainer content: Session M7-05, orchestrate agents and workstreams

**Duration:** 1 hour

**Format:** Presentation plus live demonstration

## Delivery goal

Show learners how to direct four issue-based workstreams through live GitHub
Copilot orchestration. Use the orchestration surface to track the running work.
Keep only the decisions needed before work starts in the plan.

For developers after Session M2-05, use the local PR-readiness route instead. It
reviews implementation behavior, tests, and a supplied snapshot without GitHub
MCP access.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00-0:10 | Parent objective and workstream boundaries | Split work without hidden dependencies. |
| 0:10-0:20 | Minimal workstream plan | Set questions, inputs, stops, and reviewers. |
| 0:20-0:32 | Monitor and intervene | Wait, redirect, stop, accept, reject, or escalate. |
| 0:32-0:45 | Live demonstration | Review child sessions on the orchestration surface. |
| 0:45-0:55 | Review the parent result | Keep supported findings and visible gaps. |
| 0:55-1:00 | Lab handoff | Check access and deliverables. |

## Required preflight

- Check `/orchestrate` and the built-in `orchestrate` skill.
- Product route: check GitHub MCP read access to the selected issues.
- Developer route: run the supplied Python tests and check local project read access.
- Use synthetic or approved sanitized work.
- Check that the trainer can open, redirect, and stop child sessions.
- Decide who may approve issue updates.

**Stop if orchestration or the selected route's source access is unavailable.**

## Minimal workstream plan

Each workstream needs:

- one question with a clear scope;
- approved issue inputs;
- one hard stop condition;
- one reviewer.

Do not copy session links, status, timing, usage, or progress into the plan. GitHub
Copilot already holds that state.

| Workstream | Question | Approved input | Stop condition | Reviewer |
| --- | --- | --- | --- | --- |
| Public mapping | Is the public mapping ready for approval? | Mapping issue and linked sources | Restricted data or invented states are required | Product owner |
| Requester status | Is the issue ready for implementation review? | Requester-status issue and linked sources | An unsupported field or forecast is required | Delivery reviewer |
| Empty and stale states | Are fallback states testable? | Fallback-state issue and linked sources | An unsupported commitment is required | Service reviewer |
| Access boundary | Are requester-access results ready for review? | Access issue and linked synthetic results | Production or personal data is requested | Privacy reviewer |

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

As you inspect the work, show learners why you choose to wait, redirect, stop,
accept, reject, or escalate.

## Review the parent result

Review how the parent connects findings to live issues. Check that it shows
rejected claims, names open gaps, and recommends the next follow-up. It must not
publish or change source systems without approval.

Session M7-06 reads the live issues and the reviewed parent result. Do not copy
them into a separate delivery-status record or handoff file.

## Developer demonstration

Use the developer route in `lab/README.md` and keep the same one-hour teaching
plan. Replace the four issue questions with implementation, tests, and PR-state
questions from `developer-orchestration-plan.md`.

Before delivery:

1. Copy the supplied reference implementation and six tests from Session M2-05.
2. Run the documented unittest command and retain the actual result.
3. Read `developer-review-brief.md` and `pr-snapshot.json`.
4. Check that child sessions can read the shared files without editing them or using the network.
5. Agree a usage limit and identify the human reviewer.

Run `/orchestrate` with the accepted questions. Open each child on the app
surface. Redirect the test reviewer to criterion 5 after its first answer; inspect
the revised answer rather than assuming the first was wrong.

Require the parent to evaluate the provisional author note that green local
tests make the PR ready. The supplied snapshot has a failed required integration
check and unresolved blocking thread `R1`. Those remain blockers even when local
tests pass. Children may agree; never fabricate a disagreement.

Allow 25 minutes for the developer work split, 30 for live inspection, 35 for
steering and reconciliation, and 30 for parent review. Grade the findings learners
checked and how they redirected the work. Do not grade an exact child count or
speedup.

Use `lab/solution/developer-review-reference.md` after the human review. It
explains the source facts but cannot replace live child results.

## Session M5-01 distinction

Session M5-01 covers an optional persistent-team framework. Session M7-05 covers
temporary built-in orchestration for one objective.

## Lab handoff

Learners submit:

1. the approved orchestration plan;
2. the live orchestration result;
3. the result of a fresh GitHub read for any approved issue update.

For the developer route, require the accepted developer plan and the app's
reviewed parent result, including the redirection, rejected readiness claim, and
observed usage. Do not require an issue update or Session M7-06 handoff.

For an Azure Boards delivery, use the
[trainer supplement](../lab/azure-boards/README.md). GitHub Copilot still performs
the orchestration.

## Official references

- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
