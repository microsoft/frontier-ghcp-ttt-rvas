# Session 24 Lab: Orchestrate Agents and Workstreams

**Duration:** 2 hours

**Difficulty:** Intermediate

**Prerequisites:** Sessions 20-23, the Session 24 trainer content, and live GitHub Copilot orchestration access

**Deliverable:** An orchestration plan, live child-session results, and
`delivery-status-record.md`

## Final deliverables

- The approved orchestration plan
- Live results from the child sessions
- Any redirect or stop needed during the run
- A delivery-status decision

## Scenario

The fictional **Service Request Portal** has four status-visibility issue roles:
public mapping, requester view, empty and stale states, and access-boundary
verification. You need evidence for a delivery-status decision without several
sessions editing the same record.

Use the Session 22 `issue-handoff.md` and Session 23 `canvas-handoff.md`. Start one
workstream per issue role through GitHub Copilot orchestration. Review each result,
then update the shared delivery-status record.

## Required preflight

Complete every check before Exercise 1.

- [ ] Confirm GitHub Copilot access. If access is unavailable, stop and do not
      continue.
- [ ] Use only the supplied fictional data or approved sanitized work.
- [ ] Confirm the GitHub Copilot app policy, repository permission, and approved model.
- [ ] Retrieve the approved parent and child issues through GitHub MCP.
- [ ] Open the Session 23 planning canvas and confirm the selected workstreams.
- [ ] Open **Customize** → **Skills** → **Installed** and confirm the built-in
      `orchestrate` skill.
- [ ] Type `/` and confirm that `/orchestrate` is available.
- [ ] Confirm that you can open, steer, and stop the child sessions.
- [ ] Set the guard to four child sessions, 30 minutes of live activity, or a lower approved meter.
- [ ] Stop any task that requests production access, personal data, secrets, external contact, or unapproved changes.

> [!IMPORTANT]
> **Stop if `/orchestrate` is unavailable.** It is a built-in GitHub Copilot app
> skill. Resolve app version, sign-in, policy, or capability access before you
> continue. Do not install a look-alike skill or replace orchestration with manual
> role-play, separate prompts, prepared outputs, or static files.

> [!NOTE]
> Product behavior was checked on **October 5, 2026**. **My work** may appear
> under a renamed session or agent surface. Use the current equivalent.

## Lab schedule

| Exercise | Work | Time |
| --- | --- | --- |
| 1 | Plan and start the orchestration | 30 min |
| 2 | Monitor and intervene | 30 min |
| 3 | Review live results | 30 min |
| 4 | Consolidate evidence and approve | 30 min |

## Exercise 1: Plan and start the orchestration (30 min)

Open `starter/orchestration-plan-template.md`.

1. Read `starter/scenario-source-brief.md` and the approved GitHub parent issue.
2. Copy the parent objective and relevant issue numbers into the plan.
3. Define four independent workstreams.
4. Name each workstream's approved inputs and required packet.
5. Add exclusions and a stop condition.
6. Check that no workstream depends on another child session.
7. Submit the plan through `/orchestrate`.

Use this parent prompt as a starting point:

```text
/orchestrate Prepare release-review evidence for the fictional Service Request
Portal. Use the four workstreams in my approved plan. Keep them independent.
Each child session must return the required packet and obey its stop condition.
Use only the supplied sanitized sources. Do not access production, publish
content, contact people, or change systems.
```

Confirm that GitHub Copilot created the expected child sessions. Record their links or identifiers in your plan.

Open every child session once. Confirm its assigned question, approved inputs,
required packet, and stop condition before allowing it to continue.

**Expected result:** A reviewed plan and live child sessions created by GitHub Copilot orchestration.

## Exercise 2: Monitor and intervene (30 min)

Use **My work**, the session list, the agents panel, or the current session
management surface.

For each child session:

1. Check its status, elapsed time, and usage.
2. Compare its current work with the approved contract.
3. Wait, redirect, or stop based on what the session is doing.
4. Send a short instruction when you redirect or stop.

Redirect a child session only when a real scope, evidence, or packet problem needs
correction.

Use these guards:

- stop at four child sessions;
- stop when the agreed meter is reached;
- stop a child that requests restricted data;
- stop or redirect work that overlaps another workstream;
- escalate when a decision needs authority that the child session does not have.

**Stop conditions are part of the lesson.** They do not provide an alternate completion route.

**Expected result:** The child sessions remain within scope and stop when a hard
boundary is reached.

## Exercise 3: Review the live results (30 min)

Review each packet for:

- the assigned question;
- evidence references;
- compliance with exclusions;
- open questions;
- a supported recommendation.

Accept useful findings and reject unsupported claims. If a safe correction can
repair the result, redirect the live child session and review the new packet. If
the session crossed a hard boundary, stop it.

Add accepted findings and rejected claims directly to the delivery-status record.

**Expected result:** The delivery-status record separates supported findings from
rejected claims.

## Exercise 4: Consolidate and approve (30 min)

Open `starter/delivery-status-record-template.md`.

1. Copy only accepted findings into the shared record and planning canvas.
2. Record rejected claims and the reason for each rejection.
3. Add unresolved gaps with an owner and due date.
4. Choose **Ready**, **Ready with conditions**, or **Not ready**.
5. Add the accepted result or follow-up need to the relevant GitHub issue through a reviewed MCP update.
6. Retrieve the updated issue and compare it with the canvas.
7. Compare your structure with the files in `solution/` only after you finish your own work.

**Expected result:** One delivery-status record that traces each decision to a
live, reviewed packet and gives Session 25 an approved input version.

## Completion check

- [ ] Completed orchestration plan with live child-session identifiers.
- [ ] Results returned by live GitHub Copilot orchestration.
- [ ] `delivery-status-record.md`.
- [ ] Reviewed GitHub issue update and fresh-read verification.
- [ ] Planning canvas updated with the accepted result or unresolved gap.

## Quality check

| Area | Meets the requirement |
| --- | --- |
| Access | GitHub Copilot created and coordinated live child sessions. |
| Plan | Workstreams are independent and have outputs, exclusions, and stop conditions. |
| Control | The learner uses meter, time, access, and scope guards. |
| Review | Supported findings and rejected claims are separated. |
| Sources | Accepted claims point to their source artifacts. |
| Handoff | Session 25 receives a clear delivery-status input. |

## Troubleshooting

| Issue | Response |
| --- | --- |
| `/orchestrate` is missing | **Stop the lab.** Resolve license, policy, client, or command access. |
| **My work** is missing | Use the current session or agent surface. |
| A child requests production data | Stop the child and record the boundary. |
| Usage details are unavailable | Apply the four-session and 30-minute guards. |
| A packet cites no evidence | Reject it or redirect the live child session. |
| Two workstreams overlap | Pause one and move the shared question back to the parent. |
