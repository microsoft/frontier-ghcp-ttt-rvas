# Session 21 Lab: Interview Ideas and Shape Better Work

**Duration:** 2 hours

**Difficulty:** Beginner

**Prerequisites:** Session 20, the Session 21 trainer content, and working GitHub Copilot access

## Objective

Use GitHub Copilot to turn one vague request into a reviewed decision brief and a sprint-ready work item.

## Required preflight

1. Open an approved GitHub Copilot surface.
2. Run one prompt and one follow-up answer.
3. Confirm that you can use `grill-me`, `grilling`, or the prompt in Phase 2.
4. Choose an approved, sanitized request or [`starter/vague-request.md`](starter/vague-request.md).
5. Confirm that the input contains no customer names, source organization names, secrets, personal data, or restricted details.
6. Name two roles:
   - **Request owner:** makes product decisions and approves the brief.
   - **Delivery reviewer:** checks that the work item is ready for planning.
7. Open:
   - [`starter/grilling-reference.md`](starter/grilling-reference.md)
   - [`starter/decision-brief-template.md`](starter/decision-brief-template.md)
   - [`starter/work-item-template.md`](starter/work-item-template.md)
   - [`starter/review-checklist.md`](starter/review-checklist.md)

> [!IMPORTANT]
> **Stop if GitHub Copilot is unavailable.** Resolve licensing, sign-in, policy, extension, network, or model access before starting. A partner-led interview or worksheet does not meet this lab's requirements.

To use Azure Boards, open [`azure-boards/README.md`](azure-boards/README.md). The companion replaces Phases 4 and 5. The interview still runs with GitHub Copilot.

## Time plan

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Select and inspect the request | 10 min |
| 2 | Run the Copilot decision-tree interview | 45 min |
| 3 | Draft and review the decision brief | 25 min |
| 4 | Draft the sprint-ready work item | 25 min |
| 5 | Validate, assign ownership, and hand over | 15 min |

## Phase 1: select and inspect the request

Read the request exactly as received. Do not improve it yet.

Give GitHub Copilot the approved context. Ask it to separate:

- known facts;
- hidden assumptions;
- decisions;
- missing or unverified evidence.

Review the list before the interview starts.

The supplied request is deliberately thin:

> Make request status clearer so people stop asking support.

## Phase 2: run the decision-tree interview

Invoke `grill-me` or `grilling`. If that command is not available, send this prompt to GitHub Copilot:

```text
Interview me in decision-tree rounds. Ask the whole current frontier, number each
question, and recommend an answer. Cover scope, constraints, success, failure,
ownership, and approval. Use facts only from the approved material I provide.
Ask me to make product decisions. Do not draft the work item until I confirm
shared understanding.
```

Answer as the request owner. After each round:

1. Check that each question belongs on the current frontier.
2. Accept, reject, or revise each recommendation.
3. Ask GitHub Copilot to record the decision and reason.
4. Ask it to state the next frontier.

Save the interview record. It must show the questions, recommendations, owner answers, reasons, and open branches.

### Interview stop check

The interview can stop when:

- every branch has a decision or named open question;
- no silent assumption changes the scope;
- success and failure are observable;
- the owner and approver are named;
- the request owner confirms shared understanding.

## Phase 3: draft and review the decision brief

Ask GitHub Copilot to complete [`starter/decision-brief-template.md`](starter/decision-brief-template.md) from the confirmed interview record.

Check that the draft includes:

- the problem and target outcome;
- target users;
- in-scope and out-of-scope behavior;
- constraints and dependencies;
- success and failure measures;
- decisions with reasons;
- open questions with owners;
- approval record.

The request owner marks the brief **approved**, **approved with open questions**, or **needs another interview round**.

If it needs another round, give GitHub Copilot only the unresolved branches. Do not restart the interview.

## Phase 4: draft the sprint-ready work item

Ask GitHub Copilot to complete [`starter/work-item-template.md`](starter/work-item-template.md) from the approved brief.

Review each acceptance criterion. Cover:

- the main user path;
- a boundary or permission check;
- a missing, stale, or unsupported state;
- an explicit non-goal;
- the evidence needed for review.

Then review the definition of done. It must name the required validation, handoff, owner review, and final approval.

## Phase 5: validate and hand over

Use [`starter/review-checklist.md`](starter/review-checklist.md).

The delivery reviewer records:

- **Ready:** the item can enter sprint planning.
- **Revise:** specific fields or criteria need work.
- **Blocked:** a required decision, fact, owner, or approval is missing.

Assign each revision or blocker to a named role. Record the next action.

## Deliverables

Submit:

1. A **Copilot interview record** with rounds and request-owner decisions.
2. A **reviewed decision brief** with the request owner's decision.
3. A **sprint-ready work item** with acceptance criteria, definition of done, owner, reviewer, and readiness result.

Use the completed fictional examples in [`solution/`](solution/) only after your first review.

## Validation

- [ ] GitHub Copilot access passed preflight.
- [ ] The input is approved and sanitized.
- [ ] The interview ran with GitHub Copilot.
- [ ] Interview questions followed dependency order.
- [ ] Scope, constraints, success, failure, ownership, and approval are resolved or assigned.
- [ ] The brief separates facts, decisions, assumptions, and open questions.
- [ ] Acceptance criteria are observable and include a failure or boundary case.
- [ ] The definition of done includes evidence and human approval.
- [ ] The request owner reviewed the brief.
- [ ] The delivery reviewer recorded Ready, Revise, or Blocked.
- [ ] The next action has an owner.

## Ownership

The request owner owns product choices. The delivery reviewer checks readiness but does not invent missing decisions. The implementation team may challenge the brief during planning and return it for another Copilot interview round.
