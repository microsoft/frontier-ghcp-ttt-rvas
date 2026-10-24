# Trainer supplement: Shape a requirement in Azure Boards

Use GitHub Copilot to interview the request owner, review a seeded Azure Boards
requirement, and prepare approved updates.

**Time:** Use the two-hour Session M7-02 lab plan. This companion replaces Phases 4 and 5.

> [!IMPORTANT]
> The trainer must select and prepare this route before the workshop. It is not
> part of the standard learner path.

## Deliverable

Record these items in [`work-item-update-plan.md`](work-item-update-plan.md):

- the approved decisions;
- planned field changes;
- the saved field values;
- open gaps and next action;
- the IDs of child Tasks created after the parent update.

## Required preflight

You need:

- GitHub Copilot access;
- the supplied `decision-interview` project skill;
- a request owner and delivery reviewer;
- the seeded **Show request status in the portal** requirement in an approved training project;
- either an Azure Boards browser session or an approved MCP connection that can read and update work items.

Before starting:

1. Run one prompt and one follow-up in GitHub Copilot.
2. Open [`../starter/vague-request.md`](../starter/vague-request.md).
3. Open [`work-item-update-plan.md`](work-item-update-plan.md).
4. Open the seeded requirement.
5. Check the title and the `session-m7-02` and `service-request-portal` tags.
6. Record the current description, acceptance criteria, priority, state, board column, and readiness value.
7. Check which field, board column, or approved tag represents readiness.
8. Check the trainer's reset method.

> [!IMPORTANT]
> **Stop if GitHub Copilot access fails.** Fix access before the exercise starts.
> If Azure Boards MCP is unavailable, use the browser. If neither Azure
> Boards path works, stop and resolve project access.

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

## Phase 1: Run the Copilot interview

Run the decision-tree interview against:

> Make request status clearer so people stop asking support.

Work through the branches for scope, constraints, success, failure, ownership,
and approval. Settle each branch or assign its open question to an owner. Record
the approved decisions in the update plan.

Ask the request owner to check that the recorded decisions match what you agreed
before you review Azure Boards.

## Phase 2: Compare the findings with the requirement

Read the seeded item without changing it. Ask GitHub Copilot to compare the current
fields with the approved decisions.

| Field | Review question |
| --- | --- |
| Description | Does it name the user, current problem, target outcome, scope, and non-goals? |
| Acceptance criteria | Can a reviewer observe the main path, permission boundary, stale or unmapped state, and excluded behavior? |
| Priority | Does the value match approved impact and urgency? |
| State | Does the state match the request owner's decision? |
| Board column | Is the item still in refinement, or is it approved for planning? |
| Readiness | Does the team's existing field, column, or tag state readiness? |

Record the current value, Copilot proposal, reason, and owner decision. A field may stay unchanged.

## Phase 3: Prepare the update

Ask GitHub Copilot to draft exact field values from the approved decisions.

For the supplied scenario, use these expected changes to review the draft:

| Field | Proposed direction |
| --- | --- |
| Description | Cover facilities and equipment requesters, the public status label and latest update date, and named exclusions. |
| Acceptance criteria | Add requester-only access, the two permitted requester fields, stale and unmapped application behavior, support-only detail, and unchanged behavior for excluded request types. |
| Priority | Propose `1` and record the 20% contact-reduction target as the reason. The request owner may choose another value. |
| State | Use the team's approved state for an item that can enter planning. |
| Board column | Move from `New` only after approval. Use the team's existing ready-for-planning column. |
| Readiness | Set the existing readiness field or tag to the team's ready value. |

Do not save yet.

## Phase 4: Request owner approval

Show the request owner:

1. the approved decisions;
2. the field comparison;
3. the exact proposed values;
4. the proposed child Tasks.

The request owner records:

- **Approved:** update the parent, then create the approved child Tasks.
- **Approved with changes:** revise the proposal, record the changes, then update.
- **Needs another interview round:** return to the open branches. Do not update the item.

**Silence is not approval.** The delivery reviewer cannot approve for the request
owner.

## Phase 5: Apply the approved update

### MCP path

Use the approved Azure Boards MCP connection to:

1. read the seeded requirement;
2. prepare an update request without sending it;
3. compare the request with the update plan;
4. update only accepted fields;
5. read the item again and record the saved values;
6. create child Tasks after the parent matches the approval;
7. read the parent links and record the Task IDs.

If MCP cannot show the pending update or read back the saved result, use the browser path.

### Browser path

1. Use the Copilot draft as the source for each accepted value.
2. Edit only the accepted description, acceptance criteria, priority, state, board column, and readiness field or tag.
3. Compare the form with the update plan.
4. Save the requirement.
5. Reopen it and record the saved values.
6. Create only the approved child Tasks.
7. Check each Task links to the seeded requirement.

Do not use bulk edit.

## Child Task gate

Create child Tasks only after the request owner accepts the parent changes. The supplied scenario normally needs two:

- implement the requester status view and safe application fallback behavior;
- validate state mapping, freshness behavior, and requester-only access.

Give each Task a clear result and owner role. If a blocking decision remains open,
leave the child Task table empty.

## Review and deliver

Before delivery, check:

- saved fields match the update plan;
- acceptance criteria include positive and failure behavior;
- readiness did not move while a blocking decision remained open;
- every created Task links to the parent;
- the next action has an owner.

Fix mismatches and list unresolved gaps with an owner and next action.

## Reset and cleanup

Use the trainer's reset method. If the trainer directs cleanup in the browser or through MCP:

1. Remove only child Tasks created by your pair.
2. Restore only the fields listed in the trainer's seed record.
3. Read the item again.
4. Check the seeded title, tags, field values, and empty child-link list.

If you cannot prove that your pair created a child Task, leave it in place and tell
the trainer.
