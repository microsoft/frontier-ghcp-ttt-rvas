# Trainer Content: Session 23, Orchestrate Agents and Workstreams

**Duration:** 1 hour

**Format:** Presentation plus live GitHub Copilot demonstration

## Delivery goal

Teach managers to direct parallel work through live GitHub Copilot orchestration. The parent session coordinates bounded child sessions. A person reviews the evidence and decides what enters the release record.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00-0:08 | Parent objective and workstream boundaries | Learners can split work without hidden dependencies. |
| 0:08-0:18 | Child-session contracts | Learners can set inputs, outputs, limits, and stop conditions. |
| 0:18-0:28 | Monitor and intervene | Learners can wait, redirect, stop, and escalate. |
| 0:28-0:40 | Live Service Request Portal demonstration | Learners see GitHub Copilot create and coordinate child sessions. |
| 0:40-0:52 | Accept, reject, and consolidate | Learners review evidence before updating the shared record. |
| 0:52-1:00 | Session 16 contrast and lab handoff | Learners know the scope and required access. |

## Product-state note

> [!IMPORTANT]
> This guide was checked against official GitHub documentation on **September 23, 2026**. GitHub documents `/orchestrate` as a built-in skill that coordinates work across sessions or repositories. GitHub also documents `/spawn` and `/usage`. Command availability depends on context. Confirm the current command picker before the session.

GitHub documents parallel sessions in isolated workspaces. Its rollout guidance names **My work** as an entry point. If the label has changed, show the current session or agent surface.

## Required preflight

Before the session:

- Confirm the GitHub Copilot app policy, license, model policy, and repository access.
- Use a fictional or sanitized repository.
- Type `/` and confirm that `/orchestrate` appears in the intended context.
- If the organization uses an approved equivalent, confirm that it creates and coordinates live child sessions from one parent objective.
- Confirm that the trainer can open, steer, and stop those sessions.
- Set a guard of four child sessions.
- Stop any live child session that has not returned useful evidence within eight minutes.
- Decide who can approve repository changes or release statements.

> [!IMPORTANT]
> **Do not deliver the lab if orchestration is unavailable.** Resolve the license, policy, client, repository, or command-access issue first. A manual board, separate prompts, role-play, or prepared results cannot replace the live demonstration.

## 1. Start with one parent objective (0:00-0:08)

Use this objective:

> Decide whether the Service Request Portal release is ready for the release-review meeting. Produce a short evidence record. Do not change production systems or publish release claims.

A strong parent objective names the decision, artifact, and boundary. Avoid vague requests for help with release readiness.

Split work only when the streams can proceed independently:

| Workstream | Question | Output |
| --- | --- | --- |
| WS-01 Release notes | What user-visible changes are supported by approved sources? | Draft notes with evidence references |
| WS-02 Support readiness | What must support staff know before launch? | Checklist with owners and open gaps |
| WS-03 Release risk | What could block or delay release? | Risk register with go/no-go conditions |
| WS-04 Stakeholder FAQ | Which approved answers can be prepared? | FAQ with source references |

Keep one owner for the shared readiness record. Child sessions return packets. They do not edit the final decision at the same time.

## 2. Write child-session contracts (0:08-0:18)

Every workstream needs:

- a bounded question;
- approved source material;
- a required output shape;
- exclusions;
- a stop condition;
- a review owner.

Use this contract:

```text
Workstream: WS-03 Release risk
Goal: Identify release risks supported by the supplied sanitized evidence.
Return: Findings, evidence references, open questions, and a recommendation.
Do not: Access production, contact people, change files, or invent likelihood.
Stop when: Evidence is missing, the task requires restricted data, or the
work overlaps another workstream.
```

The packet is the deliverable. The transcript is supporting context.

## 3. Monitor and intervene (0:18-0:28)

Use **My work**, the sessions list, the agents panel, or the current equivalent. Look for progress, usage, evidence, and scope drift.

| Signal | Manager action |
| --- | --- |
| Work is safe and on scope | Wait |
| A safe task needs a precise correction | Redirect |
| The child requests restricted data or exceeds the guard | Stop |
| The packet meets the contract | Accept |
| Claims lack evidence or break a boundary | Reject |
| A decision needs human authority | Escalate |

Redirect with a precise correction:

```text
Return to the supplied sanitized release summary. Remove adoption claims.
Finish the packet with evidence references and open questions only.
```

Stop when a boundary breaks. Do not spend more usage trying to rescue unsafe work.

## 4. Live demonstration (0:28-0:40)

Open `lab/starter/orchestration-plan-template.md` and the completed plan in `lab/solution/orchestration-plan.md`.

Submit the approved plan:

```text
/orchestrate Prepare the Service Request Portal release-review evidence.
Use the four workstreams in the approved orchestration plan. Keep each
workstream independent. Require a result packet and obey every stop condition.
Use only the supplied sanitized sources. Do not access production, publish
content, contact people, or change systems.
```

Show that GitHub Copilot created the expected child sessions. Open at least two.

Demonstrate these controls on the live sessions:

1. Wait while a safe child remains on scope.
2. Redirect an unsupported claim to the supplied evidence.
3. Stop any request for restricted data.
4. Reject a completed packet that still lacks evidence.
5. Escalate a release or access decision to the human owner.

If a child session reaches the eight-minute guard, stop it and record the timeout. The trainer must not replace it with a prepared result. Use another live child session to show review behavior, then resolve the failed run before learners start the lab.

## 5. Review and consolidate (0:40-0:52)

Review each live packet against its contract.

| Review question | Pass condition |
| --- | --- |
| Scope | The packet answers only its assigned question. |
| Evidence | Material claims point to supplied sources. |
| Boundaries | The child used no restricted access or unapproved action. |
| Completeness | The packet contains findings, evidence, gaps, and a recommendation. |
| Decision | The reviewer records accept, reject, redirect, stop, or escalate. |

Only accepted content enters the shared record. Keep rejected packets and reasons in the decision trail.

The human approval uses one outcome:

- **Go:** Evidence meets every release gate.
- **Conditional go:** Named owners must close listed gaps.
- **No-go:** One or more release gates remain unresolved.

## 6. Distinguish this session from Session 16 (0:52-0:56)

Session 16 teaches an optional Squad implementation with persistent roles, routing, and shared memory. Session 23 teaches temporary built-in orchestration for one business objective. Do not teach agent definitions, custom-agent files, Squad setup, or autonomous issue queues here.

## Lab handoff (0:56-1:00)

Learners must have working GitHub Copilot orchestration before they start. They submit:

1. an orchestration plan with live child-session identifiers;
2. management actions for the live sessions;
3. an acceptance or rejection decision for every result packet;
4. a release-readiness record with human approval.

Learners with a seeded training project may use the [Azure Boards companion](../lab/azure-boards/README.md). Azure Boards can use MCP or the browser. GitHub Copilot still performs the orchestration.

## Common questions

**Does `/orchestrate` approve work?** No. It coordinates sessions. A person owns acceptance, rejection, and the release decision.

**Must every child session write code?** No. This session uses evidence review, planning, risk, and communication workstreams.

**Can one child session depend on another?** Yes, but that is sequential work. Move the dependency to the parent or run the tasks in order.

**What if My work is not visible?** Use the current session or agent surface.

**What if `/orchestrate` is unavailable?** Stop. Resolve access before the lab starts.

**What if usage details are unavailable?** Apply the four-session and time guards.

## Official references

- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Rolling out the GitHub Copilot app to your team](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/copilot-app-for-teams)
- [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
