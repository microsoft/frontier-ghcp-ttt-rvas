# Trainer content: Session M7-05, orchestrate agents and workstreams

**Duration:** 1 hour

**Format:** Presentation plus live demonstration

## Goal

Show learners how to direct four issue-based workstreams through live GitHub
Copilot orchestration. The orchestration surface tracks the running work. The
plan holds only the decisions needed before work starts.

Developers after Session M2-05 use the developer route instead. It
reviews their M2-05 fix, tests, and real pull request.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00-0:08 | Parent objective, terms, and boundaries | Define parent, child, and stop condition. |
| 0:08-0:18 | When to split; independence and shared dependencies | Decide to split, and split without hidden dependencies. |
| 0:18-0:26 | Minimal workstream plan | Set questions, inputs, stops, and reviewers. |
| 0:26-0:38 | Monitor and intervene; failure modes | Wait, redirect, stop, accept, reject, or escalate. |
| 0:38-0:50 | Live demonstration | Review child sessions on the orchestration surface. |
| 0:50-0:57 | Review the parent result | Keep supported findings and visible gaps. |
| 0:57-1:00 | Lab handoff | Check access and deliverables. |

## Prepare

- `/orchestrate` and the built-in `orchestrate` skill work.
- Product route: GitHub MCP can read the selected issues.
- Developer route: the supplied Python tests run and local project read access works.
- You can open, redirect, and stop child sessions.
- Use synthetic or sanitized work.

## Teach the concepts

**Terms.** In **parent-led orchestration**, a parent session owns the objective,
starts child sessions, and reviews their results. A **child session** works one
question from its own inputs. A **stop condition** is the one boundary that ends a
child's work.

**Against other approaches.** Parallel chats: you merge answers by hand and no one
reviews as a parent. Delegation (M2-05, M3-02): one task, one agent, one output to
review. Orchestration: one objective split across children, reconciled by the
parent. M5-01 adds persistent roles and a framework; M7-05 uses temporary
workstreams.

**When to split.** Split when questions are independent, each child has its own
inputs, and the parent can check each result. Keep one session when each step
needs the previous answer, or the work is small. Ask learners for one example of
each.

**Independence and shared dependencies.** A shared dependency, such as a term
definition two children both need, goes to the parent or is settled before the
children start. If two children answer the same question, the split is wrong.

**Failure modes.** Hidden dependency, overlap, drift past the question, crossing
the stop condition, a confident answer with no source, and agreement that comes
from a shared source rather than independent checks. Responses are in the
monitor table below.

**Commands.** `/orchestrate` and the `orchestrate` skill are listed in the current
GitHub Copilot app docs. Check current docs for options in your app version.

## Minimal workstream plan

Each workstream needs:

- one question with a clear scope;
- issue inputs;
- one hard stop condition;
- one reviewer.

Don't copy session links, status, timing, usage, or progress into the plan.
GitHub Copilot already holds that state.

| Workstream | Question | Approved input | Stop condition | Reviewer |
| --- | --- | --- | --- | --- |
| Public mapping | Is the public mapping ready for approval? | Mapping issue and linked sources | Restricted data or invented states are required | Product owner |
| Requester status | Is the issue ready for implementation review? | Requester-status issue and linked sources | An unsupported field or forecast is required | Delivery reviewer |
| Empty and stale states | Are fallback states testable? | Fallback-state issue and linked sources | An unsupported commitment is required | Service reviewer |
| Access boundary | Are requester-access results ready for review? | Access issue and linked synthetic results | Production or personal data is requested | Privacy reviewer |

## Monitor the live work

Use the current session management surface. Show learners why you wait,
redirect, stop, accept, reject, or escalate.

| Signal | Action |
| --- | --- |
| Safe and on scope | Wait |
| Safe work needs a precise correction | Redirect |
| A hard boundary is crossed | Stop |
| The result meets the plan | Accept |
| The result lacks support | Reject |
| Human authority is required | Escalate |

## Review the parent result

Check that the parent connects findings to live issues, shows rejected claims,
names open gaps, and recommends the next follow-up. It must not publish or change
source systems without approval.

Session M7-06 reads the live issues and the reviewed parent result. Don't copy
them into a separate status record or handoff file.

## Developer demonstration

Use the developer route in `lab/README.md` with the same one-hour plan. Replace
the four issue questions with implementation, tests, and PR-state questions from
`developer-orchestration-plan.md`.

Before delivery:

1. Check that each learner has their M2-05 repo and PR. If not, they follow the lab's fallback: copy the M2-05 starter, apply the reference fix, and open a PR in a throwaway repo.
2. Run `python -m unittest discover -s tests -v` and check the PR's `tests` run.
3. Read `developer-review-brief.md`.
4. Check that `gh` is signed in (or GitHub MCP works) and that children only read.

Run `/orchestrate` with the accepted questions. Open each child on the app
surface. Redirect the test reviewer to map each issue rule to a test after its first answer, then
inspect the revised answer rather than assuming the first was wrong.

Have the parent evaluate the provisional author note that green local tests make
the PR ready. The parent must read the live `tests` check and review threads. A red
check or open thread blocks the PR even when local tests pass. Children may agree;
never fabricate a disagreement.

Allow 25 minutes for the work split, 30 for live inspection, 35 for steering and
reconciliation, and 30 for parent review. Grade the findings learners checked and
how they redirected the work, not an exact child count or speedup.

Use `lab/solution/developer-review-reference.md` after the human review. It
explains the source facts but can't replace live child results.

## Lab handoff

Learners submit:

1. the orchestration plan;
2. the live orchestration result;
3. the result of a fresh GitHub read for any issue update.

For the developer route, require the plan and the app's reviewed parent result,
including the redirection, accepted or rejected readiness claim, and observed usage. No issue
update or Session M7-06 handoff.

For an Azure Boards delivery, use the
[trainer supplement](../lab/azure-boards/README.md). GitHub Copilot still performs
the orchestration.

## References

- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
