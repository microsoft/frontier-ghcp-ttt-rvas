# Trainer Supplement: Shape a Requirement in Azure Boards

Use GitHub Copilot to interview the request owner, review a seeded Azure Boards requirement, and prepare approved updates.

**Time:** Use the two-hour Session 21 lab plan. This companion replaces Phases 4 and 5.

> [!IMPORTANT]
> The trainer must select and prepare this route before the workshop. It is not
> part of the standard learner path.

## Deliverable

Submit one completed [`copilot-work-item-review.md`](copilot-work-item-review.md) with:

- the Copilot interview findings;
- a before-and-after field review;
- the request owner's approval decision;
- the saved field values;
- the final readiness result;
- the IDs of child Tasks created after approval.

## Required preflight

You need:

- working access to an approved GitHub Copilot surface;
- the supplied `decision-interview` project skill;
- a request owner and delivery reviewer;
- the seeded **Show request status in the portal** requirement in an approved training project;
- either an Azure Boards browser session or an approved MCP connection that can read and update work items.

Before starting:

1. Run one prompt and one follow-up in GitHub Copilot.
2. Open [`../starter/vague-request.md`](../starter/vague-request.md).
3. Open [`copilot-work-item-review.md`](copilot-work-item-review.md).
4. Open the seeded requirement.
5. Confirm the title and the `session-21` and `service-request-portal` tags.
6. Record the current description, acceptance criteria, priority, state, board column, and readiness value.
7. Confirm which field, board column, or approved tag represents readiness.
8. Confirm the trainer's reset method.

> [!IMPORTANT]
> **Stop if GitHub Copilot access fails.** Resolve access before the exercise starts. If Azure Boards MCP is unavailable, use the browser. If neither Azure Boards path works, stop and resolve project access.

Do not configure a new organization, process, field, or MCP server during the lab.

## Safety boundaries

- Use only the fictional Service Request Portal item.
- Read the item before proposing an update.
- Treat every Copilot change as a draft.
- Do not change area paths, iteration paths, identities, links, process settings, or team settings.
- Do not create child Tasks until the request owner records approval.
- Change only the seeded requirement and Tasks created by your pair.
- Never delete the seeded requirement.
- Do not paste tokens, credentials, personal data, or live customer material into prompts.

## Phase 1: run the Copilot interview

Run the decision-tree interview against:

> Make request status clearer so people stop asking support.

Close or assign the branches for scope, constraints, success, failure, ownership, and approval. Save the interview record.

The request owner must confirm shared understanding before the Azure Boards review.

## Phase 2: compare the findings with the requirement

Read the seeded item without changing it. Ask GitHub Copilot to compare the current fields with the approved interview findings.

| Field | Review question |
| --- | --- |
| Description | Does it name the user, current problem, bounded outcome, scope, and non-goals? |
| Acceptance criteria | Can a reviewer observe the main path, permission boundary, stale or unmapped state, and explicit non-goal? |
| Priority | Does the value match approved impact and urgency? |
| State | Does the state match the request owner's decision? |
| Board column | Is the item still in refinement, or is it approved for planning? |
| Readiness | Is readiness explicit in the team's existing field, column, or tag? |

Record the current value, Copilot proposal, reason, and owner decision. A field may stay unchanged.

## Phase 3: prepare the update

Ask GitHub Copilot to draft exact field values from the approved interview record.

For the supplied scenario, expect this direction:

| Field | Proposed direction |
| --- | --- |
| Description | Cover facilities and equipment requesters, public status, last updated time, safe summary, and named exclusions. |
| Acceptance criteria | Add requester-only access, mapped status, stale and unmapped application behavior, safe summary behavior, and unchanged behavior for excluded request types. |
| Priority | Propose `1` and record the 20% contact-reduction target as the reason. The request owner may choose another value. |
| State | Use the team's approved state for an item that can enter planning. |
| Board column | Move from `New` only after approval. Use the team's existing ready-for-planning column. |
| Readiness | Set the existing readiness field or tag to the team's ready value. |

Do not save yet.

## Phase 4: request owner approval

Show the request owner:

1. the Copilot interview summary;
2. the field comparison;
3. the exact proposed values;
4. the proposed child Tasks.

The request owner records:

- **Approved:** update the parent, then create the approved child Tasks.
- **Approved with changes:** revise the proposal, record the changes, then update.
- **Needs another interview round:** return to the open branches. Do not update the item.

Silence is not approval. The delivery reviewer cannot approve for the request owner.

## Phase 5: apply the approved update

### MCP path

Use the approved Azure Boards MCP connection to:

1. read the seeded requirement;
2. prepare an update request without sending it;
3. compare the request with the approval record;
4. update only approved fields;
5. read the item again and record the saved values;
6. create child Tasks after the parent matches the approval;
7. read the parent links and record the Task IDs.

If MCP cannot show the pending update or read back the saved result, use the browser path.

### Browser path

1. Use the Copilot draft as the source for each approved value.
2. Edit only the approved description, acceptance criteria, priority, state, board column, and readiness field or tag.
3. Compare the form with the approval record.
4. Save the requirement.
5. Reopen it and record the saved values.
6. Create only the approved child Tasks.
7. Confirm each Task links to the seeded requirement.

Do not use bulk edit.

## Child Task gate

Create child Tasks only after approval. The supplied scenario normally needs two:

- implement the requester status view and safe application fallback behavior;
- validate state mapping, freshness behavior, and requester-only access.

Each Task needs a clear result, owner role, and evidence note. If the parent is **Revise** or **Blocked**, leave the child Task table empty.

## Review and deliver

The delivery reviewer checks:

- saved fields match the approval record;
- acceptance criteria include positive and failure behavior;
- readiness did not move while a blocking decision remained open;
- every created Task links to the parent;
- the next action has an owner.

Record **Ready**, **Revise**, or **Blocked**.

## Reset and cleanup

Use the trainer's reset method. If the trainer directs cleanup in the browser or through MCP:

1. Remove only child Tasks created by your pair.
2. Restore only the fields listed in the trainer's seed record.
3. Read the item again.
4. Confirm the seeded title, tags, field values, and empty child-link list.

If you cannot prove that your pair created a child Task, leave it in place and tell the trainer.
