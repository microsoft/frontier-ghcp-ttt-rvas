# Trainer supplement: Orchestrate work tracked in Azure Boards

**Time:** 45 to 60 minutes inside the existing two-hour lab

**Use:** Use Azure Boards as the approved issue source for the main lab.

**Deliverable:** Live child-session results, reviewed parent result, and checked
planning updates

> [!IMPORTANT]
> The trainer must select and prepare this route before the workshop. It is not
> part of the standard learner path.

Use a seeded Azure Boards Epic or Feature for the same four Session M7-03 issue
roles. Keep the authoritative plan and status in Azure Boards, and repository
work in GitHub.

**GitHub Copilot must perform the orchestration.** Azure Boards MCP and the browser
are planning interfaces. They do not replace the built-in `/orchestrate` skill.

## Prerequisites

You need:

- access to a training Azure DevOps project with the seeded status-visibility Epic or Feature;
- permission to read and update the seeded child work items;
- an approved Azure Boards MCP connection or browser access;
- the work item IDs or seed tag supplied by the trainer;
- live GitHub Copilot orchestration through `/orchestrate`;
- access to the fictional GitHub repository when a selected item requires repository evidence.

## Required preflight

1. Open the seeded parent and check that it is tagged for Session M7-05 training.
2. Record the parent ID, process type, starting state, and selected child IDs.
3. Type `/` in the GitHub Copilot app and check that `/orchestrate` is available.
4. Open **Customize** → **Skills** → **Installed** and check the built-in
   `orchestrate` skill.
5. Check that you can open, steer, and stop those sessions.
6. Name who reviews the parent result and who may approve Boards updates.

> [!IMPORTANT]
> **Stop if GitHub Copilot orchestration is unavailable.** Fix access before you
> continue. Do not use separate prompts, role-play, exports, or prepared results
> as a substitute.

Use only the seeded fictional items. Do not open production work items, add real organization data, or change project settings.

## Parent objective

Use the seeded status-visibility Epic or Feature.

> Review the four approved status-visibility items and return one reviewed result
> for each. Do not change production systems or publish claims.

## Step 1: Select independent child work items

Open the parent item through approved MCP tools or the browser. Select up to four
children. Give each a separate question and approved inputs.

Mirror the standard lab wording:

| Session M7-03 issue role | Azure Boards child wording |
| --- | --- |
| Public status mapping | Public status mapping approval |
| Requester status view | Requester view field review |
| Empty and stale states | Empty and stale state validation |
| Requester access verification | Requester-only access evidence |

For each selected item, record the question and its scope, approved inputs, hard stop
condition, and reviewer.

Check that each selected child can work without waiting for another child's
result. Keep shared dependencies with the parent or run dependent work in sequence.

## Step 2: Record the contracts

For each selected child:

1. Move the item to the mapped active state.
2. Add the question, scope, and stop condition to the description or a comment.
3. Keep shared decisions in the parent item.

Use the project's existing state mapping. Check the item ID before every MCP or browser write.

## Step 3: Start GitHub Copilot orchestration

Build the parent instruction from the selected work items. Include each item ID,
question and its scope, approved inputs, stop condition, and reviewer.

Start the work through `/orchestrate`. Check that GitHub Copilot created one live
child session for each selected item. Use the orchestration surface to track the
sessions. Do not copy live session identifiers into Boards.

Repository work must name the allowed repository and path. The child session may return evidence or a draft pull request when the contract allows it. It must not close the Boards item, approve a pull request, merge, deploy, or make the release decision.

## Step 4: Inspect and control the work

Inspect the live child sessions in GitHub Copilot. Use Azure Boards MCP or the browser to record progress.

| Signal | Action |
| --- | --- |
| Work is safe and on scope | **Wait** |
| A safe result needs a specific correction | **Redirect** |
| A completed result is unusable or outside scope | **Reject** |
| Work crosses an access, data, usage, or authority boundary | **Stop** |
| The contract is met | **Accept** |

Record the control decisions you actually make. Stop unsafe work, reject
unsupported claims, and escalate decisions that require human authority.

## Step 5: Review and update Boards

1. Add the decision and reason to the child item.
2. Move accepted items to the project's reviewed or completed state.
3. Keep revised items active with one clear correction.
4. Move rejected items to the agreed closed state without approving their content.
5. Stop unsafe work and record the boundary that ended it.

Return to Exercise 4 in `../README.md`. Use the reviewed parent result to update
the parent item only when that write is approved. Retrieve the item again to
check the change.

## Safety boundaries

- Work only with the seeded training hierarchy.
- Do not change project process settings, team configuration, area paths, or iteration paths.
- Do not create service commitments or release claims without evidence.
- Do not place secrets, personal data, production records, or real organization names in work items.
- Do not let an agent approve, merge, deploy, contact people, or close the parent decision.
- Stop when an item requests restricted data or needs authority the learner does
  not have.

## Reset and cleanup

1. Restore each selected item to the starting state recorded during preflight.
2. Remove only links, tags, or assignments that you added when project policy allows it.
3. If a training comment cannot be removed, add a short cleanup note.
4. Close the GitHub Copilot child sessions and follow the repository's branch or pull-request cleanup policy.
5. Do not delete the seeded hierarchy unless the trainer gives a reset instruction for those exact item IDs.

If the trainer supplied a seed/reset tool, follow that tool's README. This lab does not run reset commands.
