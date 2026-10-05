# Trainer Content: Session 24, Orchestrate Agents and Workstreams

**Duration:** 1 hour

**Format:** Presentation plus live GitHub Copilot demonstration

## Delivery goal

Teach managers to direct the four Session 22 status-visibility issue roles through
live GitHub Copilot orchestration. A person reviews the evidence and decides what
enters `delivery-status-record.md`.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00-0:08 | Parent objective and workstream boundaries | Learners can split work without hidden dependencies. |
| 0:08-0:18 | Child-session contracts | Learners can set inputs, outputs, limits, and stop conditions. |
| 0:18-0:28 | Monitor and intervene | Learners can wait, redirect, stop, and escalate. |
| 0:28-0:40 | Live status-visibility demonstration | Learners see GitHub Copilot create and coordinate child sessions. |
| 0:40-0:52 | Accept, reject, and consolidate | Learners review evidence before updating the shared record. |
| 0:52-1:00 | Session 16 contrast and lab handoff | Learners know the scope and required access. |

## Product-state note

> [!IMPORTANT]
> Checked against official GitHub documentation on
> **October 5, 2026**. GitHub documents `/orchestrate` as a built-in skill that
> coordinates work across sessions or repositories. Confirm the current command
> picker before the session.

GitHub documents parallel sessions in isolated workspaces. Its rollout guidance names **My work** as an entry point. If the label has changed, show the current session or agent surface.

## Required preflight

Before the session:

- Confirm the GitHub Copilot app policy, license, model policy, and repository access.
- Use a fictional or sanitized repository.
- Type `/` and confirm that `/orchestrate` appears in the intended context.
- Open **Customize** → **Skills** → **Installed** and confirm that `orchestrate`
  is available as a built-in skill.
- Confirm that the trainer can open, steer, and stop those sessions.
- Set a guard of four child sessions.
- Stop any live child session that has not returned useful evidence within eight minutes.
- Decide who can approve repository changes or release statements.

> [!IMPORTANT]
> **Do not deliver the lab if orchestration is unavailable.** Resolve the license, policy, client, repository, or command-access issue first. A manual board, separate prompts, role-play, or prepared results cannot replace the live demonstration.

## 1. Start with one parent objective (0:00-0:08)

Use this objective:

> Decide whether the Service Request Portal status-visibility issue set is ready
> for delivery follow-up. Produce `delivery-status-record.md`. Do not change
> production systems or publish claims.

A strong parent objective names the decision, artifact, and boundary. Avoid vague requests for help with release readiness.

Split work only when the streams can proceed independently:

| Workstream | Question | Output |
| --- | --- | --- |
| WS-01 Public mapping | Is the public status vocabulary ready for owner approval? | Mapping packet with evidence and open decisions |
| WS-02 Requester view | Is issue `#241` ready for implementation review? | Field checklist and ownership gaps |
| WS-03 Empty and stale states | Are fallback states observable and testable? | Scenario checklist and open gaps |
| WS-04 Access boundary | Is requester-only access evidence ready? | Access checklist and recommendation |

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
Workstream: WS-03 Empty and stale states
Goal: Check that fallback criteria are observable and supported.
Return: Scenario checklist, evidence references, open questions, and a recommendation.
Do not: Add response-time promises, access production, or change systems.
Stop when: A criterion needs an unsupported commitment or restricted data.
```

The packet is the deliverable. The transcript is supporting context.

## 3. Monitor and intervene (0:18-0:28)

Use **My work**, the sessions list, the agents panel, or the current session
management surface. Look for progress, usage, evidence, and scope drift.

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

Open `lab/starter/orchestration-plan-template.md` and the reference plan in
`lab/solution/orchestration-plan.md`.

Submit the approved plan:

```text
/orchestrate Review the Service Request Portal status-visibility issue set.
Use the four workstreams in the approved orchestration plan. Keep each
workstream independent. Require a clear result and obey every stop condition.
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

If a child session reaches the eight-minute guard, stop it and record the timeout.
Do not replace it with a prepared result. Use another live child session to show
review behavior, then resolve the failed run before the lab starts.

## 5. Review and consolidate (0:40-0:52)

Review each live packet against its contract.

| Review question | Pass condition |
| --- | --- |
| Scope | The packet answers only its assigned question. |
| Evidence | Material claims point to supplied sources. |
| Boundaries | The child used no restricted access or unapproved action. |
| Completeness | The packet contains findings, evidence, gaps, and a recommendation. |
| Decision | The parent keeps supported findings and rejects unsupported claims. |

Only accepted content enters the shared record. Add rejected claims and reasons
there as well.

The delivery decision uses one outcome:

- **Ready:** Evidence meets every delivery-status gate.
- **Ready with conditions:** Named owners must close listed gaps.
- **Not ready:** One or more gates remain unresolved.

## 6. Distinguish this session from Session 16 (0:52-0:56)

Session 16 teaches an optional Squad implementation with persistent roles, routing, and shared memory. Session 24 teaches temporary built-in orchestration for one business objective. Do not teach agent definitions, custom-agent files, Squad setup, or autonomous issue queues here.

## Lab handoff (0:56-1:00)

Learners need working GitHub Copilot orchestration before they start. They submit:

1. an orchestration plan with live child-session identifiers;
2. live results;
3. `delivery-status-record.md` with the decision and Session 25 handoff.

For a planned Azure Boards delivery, use the trainer-only
[Azure Boards supplement](../lab/azure-boards/README.md). Do not introduce this
route during the standard lab. GitHub Copilot still performs the orchestration.

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
