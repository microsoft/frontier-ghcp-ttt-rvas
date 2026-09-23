# Session 24 Lab: Orchestrate Agents and Workstreams

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-23, the Session 24 trainer content, and live GitHub Copilot orchestration access

**Deliverable:** An orchestration plan, live child-session result packets, signed reviews, and a release-readiness decision

## Scenario

The fictional **Service Request Portal** is approaching a release review. You are the delivery manager. You need evidence for the decision, but you do not want several sessions editing the same record.

You will select the parent objective and child issues created in Session 22, confirm their state in the Session 23 canvas, and start four workstreams through GitHub Copilot orchestration. You will then review each result and update the shared plan.

## Required preflight

Complete every check before Exercise 1.

- [ ] Use only the supplied fictional data or approved sanitized work.
- [ ] Confirm who will act as the human release approver.
- [ ] Confirm the GitHub Copilot app policy, repository permission, and approved model.
- [ ] Retrieve the approved parent and child issues through GitHub MCP.
- [ ] Open the Session 23 planning canvas and confirm the selected workstreams.
- [ ] Type `/` and confirm that `/orchestrate` is available.
- [ ] If your organization uses an approved equivalent, confirm that it creates and coordinates live child sessions from one parent objective.
- [ ] Confirm that you can open, steer, and stop the child sessions.
- [ ] Set the guard to four child sessions, 30 minutes of live activity, or a lower approved meter.
- [ ] Stop any task that requests production access, personal data, secrets, external contact, or unapproved changes.

> [!IMPORTANT]
> **Stop if `/orchestrate` or the approved equivalent is unavailable.** Resolve access before you continue. Do not replace orchestration with manual role-play, separate prompts, prepared outputs, or static files.

> [!NOTE]
> Product behavior was checked on **September 23, 2026**. **My work** may appear under a renamed session or agent surface. Use the current equivalent.

## Azure Boards companion

If the trainer provides a seeded training project, you may use the [Azure Boards companion](azure-boards/README.md) for planning and status. Azure Boards can use MCP or the browser. GitHub Copilot must orchestrate the child sessions.

## Lab schedule

| Exercise | Work | Time |
| --- | --- | --- |
| 1 | Plan and start the orchestration | 30 min |
| 2 | Monitor and intervene | 30 min |
| 3 | Review live result packets | 30 min |
| 4 | Consolidate evidence and approve | 30 min |

## Exercise 1: Plan and start the orchestration (30 min)

Open `starter/orchestration-plan-template.md`.

1. Read `starter/scenario-source-brief.md` and the approved GitHub parent issue.
2. Copy the parent objective and relevant issue numbers into the plan.
3. Define four independent workstreams.
4. Name each workstream's approved inputs and required packet.
5. Add exclusions and a stop condition.
6. Name the human reviewer.
7. Check that no workstream depends on another child session.
8. Submit the approved plan through `/orchestrate` or the approved equivalent.

Use this parent prompt as a starting point:

```text
/orchestrate Prepare release-review evidence for the fictional Service Request
Portal. Use the four workstreams in my approved plan. Keep them independent.
Each child session must return the required packet and obey its stop condition.
Use only the supplied sanitized sources. Do not access production, publish
content, contact people, or change systems.
```

Confirm that GitHub Copilot created the expected child sessions. Record their links or identifiers in your plan.

**Expected result:** A reviewed plan and live child sessions created by GitHub Copilot orchestration.

## Exercise 2: Monitor and intervene (30 min)

Use **My work**, the session list, the agents panel, or the current equivalent.

For each child session:

1. Check its status, elapsed time, and usage.
2. Compare its current work with the approved contract.
3. Record one action: `wait`, `redirect`, or `stop`.
4. Send a short instruction when you redirect or stop.
5. Save the session link and action in the orchestration plan.

Use these guards:

- stop at four child sessions;
- stop when the agreed meter is reached;
- stop a child that requests restricted data;
- stop or redirect work that overlaps another workstream;
- escalate when a decision needs authority that the child session does not have.

**Stop conditions are part of the lesson.** They do not provide an alternate completion route.

**Expected result:** Every live workstream has a recorded management action and reason.

## Exercise 3: Review the live result packets (30 min)

Open `starter/review-template.md`. Copy the final packet from each child session into your working folder or link to the session output.

Review each packet for:

- the assigned question;
- evidence references;
- compliance with exclusions;
- open questions;
- a supported recommendation.

Record **accept** or **reject** for every packet. If a safe correction can repair the result, redirect the live child session and review the new packet. If the session crossed a hard boundary, stop it and record the reason.

Do not repair unsupported claims inside the final record. Reject them first so the decision trail stays clear.

**Expected result:** Four signed reviews tied to live child-session output.

## Exercise 4: Consolidate and approve (30 min)

Open `starter/shared-work-artifact-template.md`.

1. Copy only accepted findings into the shared record and planning canvas.
2. Record rejected claims and the reason for each rejection.
3. Add unresolved gaps with an owner and due date.
4. Choose **Go**, **Conditional go**, or **No-go**.
5. Add the human approver's name or training role and the review date.
6. Add the accepted result or follow-up need to the relevant GitHub issue through a reviewed MCP update.
7. Retrieve the updated issue and compare it with the canvas.
8. Compare your structure with the files in `solution/` only after you finish your own work.

**Expected result:** One release-readiness record that traces each decision to a live, reviewed packet.

## Deliverables

- [ ] Completed orchestration plan with live child-session identifiers.
- [ ] Management action for each child session.
- [ ] Result packets returned by live GitHub Copilot orchestration.
- [ ] Acceptance or rejection review for each packet.
- [ ] Shared release-readiness record.
- [ ] Reviewed GitHub issue update and fresh-read verification.
- [ ] Planning canvas updated with the accepted result or unresolved gap.
- [ ] Explicit human approval.

## Review rubric

| Area | Meets the requirement |
| --- | --- |
| Access | GitHub Copilot created and coordinated live child sessions. |
| Plan | Workstreams are independent and have outputs, exclusions, stop conditions, and reviewers. |
| Control | The learner uses meter, time, access, and scope guards. |
| Review | Every live packet receives an accept or reject decision with a reason. |
| Evidence | Accepted claims point to approved evidence. |
| Approval | A person owns the final decision. |

## Troubleshooting

| Issue | Response |
| --- | --- |
| `/orchestrate` is missing | **Stop the lab.** Resolve license, policy, client, or command access. |
| The approved equivalent does not create coordinated child sessions | **Stop the lab.** It does not meet the session requirement. |
| **My work** is missing | Use the current session or agent surface. |
| A child requests production data | Stop the child and record the boundary. |
| Usage details are unavailable | Apply the four-session and 30-minute guards. |
| A packet cites no evidence | Reject it or redirect the live child session. |
| Two workstreams overlap | Pause one and move the shared question back to the parent. |
