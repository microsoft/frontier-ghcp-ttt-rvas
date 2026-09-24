# Azure Boards Companion

**Time:** 45 to 60 minutes inside the existing two-hour lab

**Use:** Use Azure Boards for planning and status during Lab Exercises 1 through 3. Complete Exercise 4 in the main lab guide.

**Deliverable:** Live child-session reviews, updated planning states, and a release-readiness decision

## Purpose

Use a seeded Azure Boards Epic or Feature as the parent objective for the fictional **Service Request Portal**. Azure Boards holds the plan, ownership, and review record. GitHub holds repository work.

**GitHub Copilot must perform the orchestration.** Azure Boards MCP and the browser
are planning interfaces. They do not replace the built-in `/orchestrate` skill.

## Prerequisites

You need:

- access to a training Azure DevOps project with the seeded Service Request Portal Epic or Feature;
- permission to read and update the seeded child work items;
- an approved Azure Boards MCP connection or browser access;
- the work item IDs or seed tag supplied by the trainer;
- live GitHub Copilot orchestration through `/orchestrate`;
- access to the fictional GitHub repository when a selected item requires repository evidence.

## Required preflight

1. Open the seeded parent and confirm that it is tagged for Session 24 training.
2. Record the parent ID, process type, starting state, and selected child IDs.
3. Type `/` in the GitHub Copilot app and confirm that `/orchestrate` is available.
4. Open **Customize** → **Skills** → **Installed** and confirm the built-in
   `orchestrate` skill.
5. Confirm that you can open, steer, and stop those sessions.
6. Copy `workstream-review-template.md` once for each selected child item.
7. Set a 30-minute activity limit or a lower approved usage limit.
8. Confirm who owns the final release-readiness decision.

> [!IMPORTANT]
> **Stop if GitHub Copilot orchestration is unavailable.** Resolve access before you continue. Do not use separate prompts, role-play, exports, or prepared results as a substitute.

Use only the seeded fictional items. Do not open production work items, add real organization data, or change project settings.

## Parent objective

Use the seeded Epic or Feature named **Service Request Portal release-review evidence**.

> Decide whether the Service Request Portal release is ready for review. Produce an evidence record. Do not change production systems or publish release claims.

## Step 1: Select independent child work items

Open the parent item through approved MCP tools or the browser. Select up to four children with separate questions and approved inputs.

For each selected item, record:

- the bounded question;
- the required result packet;
- approved evidence;
- exclusions;
- a hard stop condition;
- the human reviewer.

No selected child should wait for another child result. Keep shared dependencies with the parent or run dependent work in sequence.

## Step 2: Record the contracts

For each selected child:

1. Move the item to the mapped active state.
2. Add the result packet, exclusions, and stop condition to the description or a review comment.
3. Record the human reviewer.
4. Keep the parent item as the owner of the shared release-readiness record.

Use the project's existing state mapping. Confirm the item ID before every MCP or browser write.

## Step 3: Start GitHub Copilot orchestration

Build the parent instruction from the selected work items. Include each item ID, bounded question, approved inputs, required packet, exclusions, and stop condition.

Start the work through `/orchestrate`. Confirm that GitHub Copilot created one live
child session for each selected item. Add each session link or identifier to its
Azure Boards item.

Repository work must name the allowed repository and path. The child session may return evidence or a draft pull request when the contract allows it. It must not close the Boards item, approve a pull request, merge, deploy, or make the release decision.

## Step 4: Inspect and control the work

Inspect the live child sessions in GitHub Copilot. Use Azure Boards MCP or the browser to record progress.

| Signal | Action |
| --- | --- |
| Work is safe and on scope | **Wait** |
| A safe result needs a bounded correction | **Redirect** |
| A completed result is unusable or outside scope | **Reject** |
| Work crosses an access, data, usage, or authority boundary | **Stop** |
| The contract is met | **Accept** |

Preserve genuine control decisions. Stop unsafe work. Reject unsupported claims. Escalate decisions that require human authority.

## Step 5: Review and update Boards

Complete `workstream-review-template.md` for each live child session.

1. Add the decision and reason to the child item.
2. Move accepted items to the project's reviewed or completed state.
3. Keep revised items active with one clear correction.
4. Move rejected items to the agreed closed state without approving their content.
5. Stop unsafe work and record the boundary that ended it.

Return to Exercise 4 in `../README.md`. Copy only accepted evidence into the shared release-readiness record.

## Safety boundaries

- Work only with the seeded Service Request Portal hierarchy.
- Do not change project process settings, team configuration, area paths, or iteration paths.
- Do not create service commitments or release claims without evidence.
- Do not place secrets, personal data, production records, or real organization names in work items.
- Do not let an agent approve, merge, deploy, contact people, or close the parent decision.
- Stop when an item requests restricted data, exceeds the agreed limit, or needs authority the learner does not have.

## Reset and cleanup

1. Restore each selected item to the starting state recorded during preflight.
2. Remove only links, tags, or assignments that you added when project policy allows it.
3. If a training comment cannot be removed, add a short cleanup note.
4. Close the GitHub Copilot child sessions and follow the repository's branch or pull-request cleanup policy.
5. Do not delete the seeded hierarchy unless the trainer gives a reset instruction for those exact item IDs.

If the trainer supplied a seed/reset tool, follow that tool's README. This lab does not run reset commands.
