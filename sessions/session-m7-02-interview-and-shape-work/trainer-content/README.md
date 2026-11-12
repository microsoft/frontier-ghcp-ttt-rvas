# Session M7-02 trainer guide: Interview ideas and shape better work

## Goal

Show how the supplied `decision-interview` project skill uses the Session M7-01
context brief to turn an unclear request into a reviewed decision brief and issue
proposal.

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

## Prepare

- Every learner can open the GitHub Copilot app and the training repository project.
- Copy the supplied skill to `.github/skills/decision-interview/SKILL.md`.
- In a new app session, check `decision-interview` appears under **Customize** → **Skills** → **Installed**.
- Run `/decision-interview` with the short test request from the lab, plus one follow-up answer.
- Interactive, Plan, and Autopilot modes are visible. The interview uses Interactive; file changes use Plan.
- `/context`, `/compact`, `/clear` or `/reset`, and `/rubber-duck` appear in the command picker.
- Open the starter templates and completed solution in separate windows.
- Assign a request owner and delivery reviewer for each pair.

For a trainer-only Azure Boards delivery, learners need an MCP connection or the
browser. Azure Boards changes only the update method. GitHub Copilot still runs
the interview.

## Core teaching points

### The frontier controls question order

The frontier is the set of decisions the owner can make now because their
prerequisites are settled. Ask all of them in one round. Hold any question that
depends on a decision still open.

Don't ask for notification wording before the group decides whether the first
release includes notifications. Don't ask for a success target before the group
agrees on the problem and affected user.

### Recommendations make choices easier to review

Each Copilot question includes a recommended answer with its reasoning. The owner
accepts or revises it.

```text
Q1: Target user
Which group has the problem in the first release?

Recommendation: Start with employees who submitted a request. Leave service agents
out of the first release because they already have an internal queue.
```

### Facts don't belong in the decision queue

Copilot reads facts such as current status values, portal fields, or published
retention rules from the sources. The request owner decides product behavior,
tradeoffs, ownership, and approval.

When a source is unavailable, mark the claim as unverified. Don't turn it into a
question for the owner.

### Check context between rounds

Run `/context` after each round. Compact only when the same thread must continue.
Start fresh when old recommendations leak into new decisions, carrying only the
settled decisions and open questions. The decision brief becomes the record.

### Use an independent critic

Before approval, run `/rubber-duck` against the brief and issue proposal. It looks
for unsupported criteria, missing owners, hidden scope, and visibility-rule
conflicts. The request owner decides which feedback to apply.

## Demonstration scenario

Start with:

> Make request status clearer so people stop asking support.

Run it through `/decision-interview`. The skill asks a numbered frontier and waits
for owner decisions instead of drafting the final brief.

### Round 1: Define the problem

1. Who is asking for updates?
2. What do they need to know?
3. What business or service problem should change?

Recommended direction: people who submitted a request need a plain-language status
and recent update. Aim first to reduce manual "what is happening?" contacts. Leave
service-process redesign out.

### Round 2: Set the scope

1. Which request types are included?
2. Which existing states can the portal expose?
3. Are email, chat, or mobile notifications included?
4. What data must remain hidden?

Recommended direction: facilities and equipment requests in the web portal. Show a
mapped public status, last updated time, and safe summary. Exclude outbound
notifications, internal notes, agent names, and security details.

### Round 3: Define success and failure

1. How will the team know the change helped?
2. What must never happen?
3. What should the requester see when a status is missing or stale?
4. Which accessibility and permission checks apply?

Recommended direction: fewer status-chasing contacts, and every supported request
shows a public status. Failure includes exposing internal notes, showing a status
to the wrong requester, or presenting stale data as current.

### Round 4: Close ownership and approval

1. Who owns the public status mapping?
2. Who approves the decision brief?
3. Who validates service behavior and access rules?
4. Who can approve release?

Recommended direction: the portal product owner owns the work item. The service
operations manager approves wording and state mapping. The privacy reviewer checks
data exposure. The product owner accepts the completed work after test or review
results are attached.

## Build the decision brief

Ask Copilot to create `docs/discovery/decision-brief.md` from the accepted
answers. Review:

- problem and target outcome;
- users and scope;
- non-goals;
- constraints and dependencies;
- success and failure measures;
- decisions and open questions;
- owner, reviewers, and approver.

Keep it short enough to review in one sitting.

## Build the issue proposal

Ask Copilot to convert the approved brief into an issue proposal:

1. Write one user outcome.
2. Copy the agreed scope and non-goals.
3. Turn success and failure cases into testable acceptance criteria.
4. Add dependencies and open risks.
5. Name the owner and reviewer.
6. Add a definition of done that covers test or review results and approval.

Learners check every drafted field against the approved brief. Session M7-03
creates the approved issues through GitHub MCP.

## Reopen an affected branch

Reveal `lab/starter/late-constraint.md`. Ask the skill to reopen only visibility
decisions. Requesters may now see only the public status label and latest update
date, so the earlier requester summary goes. Authorized support staff may see the
detailed status reason. Request types, notification exclusion, and ownership stay
unchanged while the affected criteria are revised.

## Facilitation notes

- Ask no more than four questions in a demonstration round.
- Let the request owner reject recommendations. A visible correction shows who owns the decision.
- Keep unresolved items in an open-questions table with an owner and due point.
- Push back on "easy," "fast," or "clear" without a result someone can check.
- Skip estimation. The goal is readiness.

## Lab launch

Learners use the Service Request Portal context from Session M7-01 or
[`../lab/starter/vague-request.md`](../lab/starter/vague-request.md). Each learner
or pair needs a request owner and delivery reviewer. The owner approves the
decision brief. The reviewer checks the brief and proposal in a fresh session.

### Trainer-only Azure Boards supplement

Use [`../lab/azure-boards/README.md`](../lab/azure-boards/README.md) when learners
have a seeded training requirement. It replaces work-item drafting in Phases 4 and
5. Check the field labels for priority and readiness first. Learners may use MCP or
the browser to apply approved changes. The standard learner path stays in GitHub.
