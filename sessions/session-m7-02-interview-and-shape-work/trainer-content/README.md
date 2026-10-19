# Session m7-02 trainer guide: Interview ideas and shape better work

## Delivery objective

Demonstrate how the supplied `decision-interview` project skill uses the Session
m7-01 context brief to turn an unclear request into a reviewed decision brief and
issue proposal.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:06 | Show the vague request and the cost of guessing |
| 0:06-0:15 | Explain the decision tree, frontier, and rounds |
| 0:15-0:25 | Model strong Copilot questions and recommendations |
| 0:25-0:42 | Run the Service Request Portal interview with GitHub Copilot |
| 0:42-0:51 | Review the answers and build a decision brief |
| 0:51-0:57 | Convert the brief into a GitHub issue proposal |
| 0:57-1:00 | Explain the lab and review roles |

## Required preflight

Complete this check before learners begin:

- Check that every learner can open the GitHub Copilot app and the training repository project.
- Copy the supplied skill to
  `.github/skills/decision-interview/SKILL.md`.
- Open a new app session and check that `decision-interview` appears under
  **Customize** → **Skills** → **Installed**.
- Run `/decision-interview` with the short test request from the lab.
- Test one prompt and one follow-up answer.
- Check Interactive, Plan, and Autopilot modes are visible. The interview uses
  Interactive; artifact changes use Plan.
- Check `/context`, `/compact`, `/clear` or `/reset`, and `/rubber-duck` in the
  current command picker.
- Use only the supplied fictional scenario during the demonstration.
- Open the starter templates and completed solution in separate windows.
- Assign a request owner and delivery reviewer for each pair.

> [!IMPORTANT]
> **Stop if the GitHub Copilot app or repository project is unavailable.** Resolve licensing, sign-in, policy, client, or repository access before the session starts.

For a planned trainer-only Azure Boards delivery, check that learners can use
either an approved MCP connection or the browser. Azure Boards changes the update
method. It never replaces GitHub Copilot.

## Core teaching points

### The frontier controls question order

Explain the frontier as the decisions the owner can make now because their
prerequisites are settled. Ask all of those questions in one round. Hold any
question that depends on an answer still open in that round.

For example, do not ask for notification wording before the group decides whether the first release includes notifications. Do not ask for a success target before the group agrees on the problem and affected user.

### Recommendations make choices easier to review

Each Copilot question should include a recommended answer. The recommendation shows
its reasoning and gives the request owner something concrete to accept or revise.

Use this format:

```text
Q1: Target user
Which group has the problem in the first release?

Recommendation: Start with employees who submitted a request. Leave service agents
out of the first release because they already have an internal queue.
```

### Facts do not belong in the decision queue

GitHub Copilot should use approved sources for facts such as current status
values, portal fields, or published retention rules. The request owner decides
product behavior, tradeoffs, ownership, and approval.

When a source is unavailable, mark the claim as unverified. Do not turn it into
a question for the owner to decide.

### Keep context healthy

Run `/context` after each interview round. Compact only when the same thread must
continue. Start fresh when old recommendations begin to leak into new decisions.
When starting fresh, carry only the owner's settled decisions and open questions. The
decision brief becomes the saved record.

### Use an independent critic

Before approval, run `/rubber-duck` against the brief and issue proposal. The
critic should look for unsupported criteria, missing owners, hidden scope, and
visibility-rule conflicts. The request owner decides which feedback to apply.

## Demonstration scenario

Start with:

> Make request status clearer so people stop asking support.

Run the demonstration through `/decision-interview`. The skill must ask a numbered
frontier and wait for owner decisions instead of drafting the final brief.

### Round 1: Define the problem

Ask GitHub Copilot to cover:

1. Who is asking for updates?
2. What do they need to know?
3. What business or service problem should change?

Recommended direction: people who submitted a request need a plain-language status
and recent update. Aim first to reduce manual "what is happening?" contacts. Keep
service-process redesign outside this work.

### Round 2: Set the scope

Use the first answers to ask:

1. Which request types are included?
2. Which existing states can the portal expose?
3. Are email, chat, or mobile notifications included?
4. What data must remain hidden?

Recommended direction: cover facilities and equipment requests in the web portal. Show a mapped public status, last updated time, and safe summary. Exclude outbound notifications, internal notes, agent names, and security details.

### Round 3: Define success and failure

Ask:

1. How will the team know the change helped?
2. What must never happen?
3. What should the requester see when a status is missing or stale?
4. Which accessibility and permission checks apply?

Recommended direction: measure fewer status-chasing contacts and check that every supported request shows a public status. Failure includes exposing internal notes, showing a status to the wrong requester, or presenting stale data as current.

### Round 4: Close ownership and approval

Ask:

1. Who owns the public status mapping?
2. Who approves the decision brief?
3. Who validates service behavior and access rules?
4. Who can approve release?

Recommended direction: the portal product owner owns the work item. The service operations manager approves wording and state mapping. The privacy reviewer checks data exposure. The product owner accepts the completed work after test or review results are attached.

## Build the decision brief

Ask GitHub Copilot to create `docs/discovery/decision-brief.md` from answers the
owner accepted. Then review:

- problem and target outcome;
- users and scope;
- non-goals;
- constraints and dependencies;
- success and failure measures;
- decisions and open questions;
- owner, reviewers, and approval gate.

Keep it short enough to review in one sitting. Review the proposed repository change before accepting it.

## Build the issue proposal

Ask GitHub Copilot to convert the approved brief into an issue proposal:

1. Write one user outcome.
2. Copy the agreed scope and non-goals.
3. Turn success and failure cases into observable acceptance criteria.
4. Add dependencies and open risks.
5. Name the owner and reviewer.
6. Add a definition of done that covers test or review results and approval.

Have learners check every field Copilot drafts against the approved brief.
Session m7-03 creates the approved issue set through GitHub MCP.

## Reopen an affected branch

Reveal `lab/starter/late-constraint.md`. Ask the skill to reopen only visibility
decisions. Show that scope, request types, notification exclusion, and ownership
stay unchanged while role-specific acceptance criteria are revised.

## Facilitation notes

- Ask no more than four questions in a demonstration round.
- Let the request owner reject recommendations. A visible correction helps the
  class see who owns the decision.
- Keep unresolved items in an open-questions table with an owner and due point.
- Push back when criteria use words such as "easy," "fast," or "clear" without a result someone can check.
- Keep estimation outside the exercise. The goal is readiness.

## Lab launch

Learners use the Service Request Portal context from Session m7-01 or
[`../lab/starter/vague-request.md`](../lab/starter/vague-request.md).

Each learner or pair needs a request owner and delivery reviewer. The request owner
approves the decision brief. The delivery reviewer checks the brief and proposal
in a fresh session.

### Trainer-only Azure Boards supplement

Use [`../lab/azure-boards/README.md`](../lab/azure-boards/README.md) when learners have a seeded training requirement. The companion replaces work-item drafting in Phases 4 and 5.

Before the lab, check the field labels used for priority and readiness. Learners
may use MCP or the browser to apply approved changes. They must use GitHub Copilot
for the interview and draft review.

Azure Boards is trainer-only. Keep the standard learner path in GitHub.
