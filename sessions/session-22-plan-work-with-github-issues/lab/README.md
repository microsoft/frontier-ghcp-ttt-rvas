# Session 22 Lab: Create, Verify, and Correct a GitHub Issue Plan

**Duration:** 2 hours

**Difficulty:** Intermediate

**Deliverable:** A live GitHub issue hierarchy created through MCP, verified by a
fresh read, and corrected through a second approved write

## Deliverables

- Live parent and child issues
- The corrected issue

## Lab outcome

Create a reviewed GitHub issue hierarchy through MCP. Verify it with a fresh read,
then make and verify one focused correction.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Verify GitHub MCP and write access | 15 min |
| 2 | Read the source and existing GitHub state | 20 min |
| 3 | Design and review the issue hierarchy | 30 min |
| 4 | Preview and create the issues | 35 min |
| 5 | Verify and correct one issue | 20 min |

## Preflight

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

Confirm GitHub Copilot access. **Stop if access is unavailable.**

## Part 1: Verify GitHub MCP and write access (15 minutes)

In the GitHub Copilot app:

1. open **Customize** → **MCP** → **Installed**;
2. confirm that the approved GitHub MCP connection is available;
3. start a session for the training repository;
4. ask Copilot to list the GitHub tools it can use;
5. ask it to retrieve the repository name and five open issues;
6. confirm that you have issue-write permission.

GitHub MCP is built into Copilot CLI. CLI users can inspect it with:

```text
/mcp list
/mcp show github
```

If the approved connection is missing, use **Customize** → **MCP** to install or
configure the organization-approved server. **Never paste a token into a prompt
or repository file.**

Stop if the read test or issue-write check fails.

GitHub MCP is the tool connection used in this lab. A plugin can bundle an MCP
server with other customizations, but the learner must still verify the active
connection and its tools.

## Part 2: Read the source and existing GitHub state (20 minutes)

Attach the approved Session 21 decision brief and issue proposal. Use
`starter/approved-decision-brief.md` when those artifacts are unavailable.

Ask Copilot to:

1. summarize the approved outcome, non-goals, acceptance evidence, and owners;
2. retrieve available labels and milestones;
3. read `starter/existing-issues.json`, then search open and closed issues for
   matching live work;
4. report every GitHub MCP read it used;
5. identify any decision in the proposal that is absent from the brief.

Classify each concrete candidate as **duplicate**, **partial overlap**,
**conflict**, or **unrelated**. Add the disposition and reason to the issue plan.

**Checkpoint:** No issue is proposed until the source and existing repository state
have both been read.

## Part 3: Design and review the issue hierarchy (30 minutes)

Copy `starter/issue-plan-template.md` into your working folder.

Use this Markdown file only as a temporary preview. Do not submit or commit it.
Once GitHub creates the issues, the live parent and child issues replace the
preview.

Ask Copilot to propose:

- one parent issue for the approved outcome;
- three to five child issues with independently reviewable results;
- dependencies and parallel work;
- acceptance criteria and non-goals;
- source links to the decision brief;
- ownership gaps left unassigned.

Review the plan before any write.

Reuse or update an existing issue when it owns part of the approved outcome. Link
a closed duplicate for context. Do not merge conflicting or out-of-scope work.

Reject or revise an issue that:

- combines unrelated outcomes;
- duplicates existing work;
- has no observable acceptance evidence;
- invents an assignee, label, milestone, or date;
- includes work excluded by the decision brief.

**Checkpoint:** Every child issue traces to a decision and can be reviewed
independently.

## Part 4: Preview and create the issues (30 minutes)

Send:

```text
Before using a GitHub write tool, show the repository owner and name, issue count,
full title and body for every issue, labels, milestone, parent-child references,
dependencies, and every field left unset. Wait for my approval.
```

Compare the preview with the issue plan. Revise it until it is safe to approve.

After approval, ask Copilot to create the issues through GitHub MCP. Save each
returned issue number and URL in the parent issue or its linked child issues.

**Checkpoint:** The write result contains one parent and no more than five child
issues in the approved repository.

## Part 5: Verify and correct one issue (15 minutes)

Start a new Copilot request. Do not reuse the create response.

Ask Copilot to retrieve the created issues through GitHub MCP. Compare the fresh
state with the approved plan:

- title and body;
- acceptance criteria and non-goals;
- labels and milestone;
- source links and relationships;
- ownership fields.

Choose one child issue and add a missing verification section:

```text
Verification owner: Delivery reviewer
Source decision: docs/discovery/decision-brief.md
```

Require a full update preview. Approve the focused write, then retrieve the issue
again and confirm the new section is present. No separate verification document
is needed.

**Checkpoint:** A fresh read proves that both the original create and the correction
reached GitHub.

The parent issue must link every child issue and record dependency order,
unresolved ownership, the existing-work decisions, and the verified correction.
Session 23 reads this live issue set through GitHub MCP.

## Verification

- [ ] GitHub MCP read and write access passed.
- [ ] Existing issues were searched before creation.
- [ ] Concrete duplicate and partial-overlap candidates received a disposition.
- [ ] The complete write was previewed before approval.
- [ ] Created issues match the approved decision brief.
- [ ] A fresh read verified the created state.
- [ ] A second preview, write, and fresh read verified the correction.
- [ ] The parent issue links the child issues and records the planning decisions.
- [ ] No invented owner, date, label, or milestone was added.
- [ ] No customer or source organization names appear.
