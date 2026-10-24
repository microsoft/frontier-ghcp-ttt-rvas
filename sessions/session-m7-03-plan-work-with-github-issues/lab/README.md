# Session M7-03 lab: Create, check, and correct a GitHub issue plan

**Duration:** 2 hours

**Difficulty:** Intermediate

**Deliverable:** A live GitHub issue hierarchy created through MCP, checked by a
fresh read, and corrected through a second approved write

## Deliverables

- Live parent and child issues
- The corrected issue

## Lab outcome

Create a reviewed GitHub issue hierarchy through MCP. Read the issues back from
GitHub to check what was saved. Then make one focused correction and read it back
again.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Check GitHub MCP and write access | 15 min |
| 2 | Read the source and existing GitHub state | 20 min |
| 3 | Design and review the issue hierarchy | 30 min |
| 4 | Preview and create the issues | 35 min |
| 5 | Check and correct one issue | 20 min |

## Preflight

Complete the track [capability setup](../../../tracks/product-and-delivery-teams.md#capability-setup).

Check GitHub Copilot access. **Stop if access is unavailable.**

## Part 1: Check GitHub MCP and write access (15 minutes)

In the GitHub Copilot app:

1. open **Customize** → **MCP** → **Installed**;
2. check that the approved GitHub MCP connection is available;
3. start a session for the training repository;
4. ask Copilot to list the GitHub tools it can use;
5. ask it to retrieve the repository name and five open issues;
6. check that you have issue-write permission.

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
server with other customizations, but you must still check the active
connection and its tools.

## Part 2: Read the source and existing GitHub state (20 minutes)

Attach the approved Session M7-02 decision brief and issue proposal. Use
`starter/approved-decision-brief.md` when those artifacts are unavailable.

Ask Copilot to:

1. summarize the approved outcome, non-goals, acceptance evidence, and owners;
2. retrieve available labels and milestones;
3. read `starter/existing-issues.json`, then search open and closed issues for
   matching live work;
4. report every GitHub MCP read it used;
5. identify any decision in the proposal that is absent from the brief.

Classify each candidate as **duplicate**, **partial overlap**, **conflict**, or
**unrelated**. Record what you will do with it and why in the issue plan.

**Checkpoint:** No issue is proposed until the source and existing repository state
have both been read.

## Part 3: Design and review the issue hierarchy (30 minutes)

Copy `starter/issue-plan-template.md` into your working folder.

Use this Markdown file only as a temporary preview. Do not submit or commit it.
Once GitHub creates the issues, the live parent and child issues replace the
preview.

Ask Copilot to propose:

- one parent issue for the approved outcome;
- four child issues: public status mapping, requester status view, empty and
  stale states, and requester-access verification;
- dependencies and parallel work;
- acceptance criteria and non-goals;
- source links to the decision brief;
- ownership gaps left unassigned.

Review the plan before any write.

These four roles feed Sessions M7-04 and M7-05. A fifth issue is optional and stays
outside the four orchestration workstreams.

Reuse or update an existing issue when it owns part of the approved outcome. Link
a closed duplicate for context. Do not merge conflicting or out-of-scope work.

Reject or revise an issue that:

- combines unrelated outcomes;
- duplicates existing work;
- gives reviewers no way to check acceptance;
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

**Checkpoint:** The live hierarchy contains one parent and the four required child
roles in the approved repository. Reuse existing issues that cover a required
role. The hierarchy may also contain one optional fifth child.

## Part 5: Check and correct one issue (15 minutes)

Start a new Copilot request. Do not reuse the create response.

Ask Copilot to retrieve the created issues through GitHub MCP. Compare the fresh
state with the approved plan:

- title and body;
- acceptance criteria and non-goals;
- labels and milestone;
- source links and relationships;
- ownership fields.

Choose one child issue and add the missing section that names who will check the
work and which decision it follows:

```text
Verification owner: Delivery reviewer
Source decision: docs/discovery/decision-brief.md
```

Require a full update preview. Approve the focused write, then retrieve the issue
again and check the new section is present. Keep the check in the issue; you do
not need a separate document.

**Checkpoint:** A fresh read proves that both the original create and the correction
reached GitHub.

Link every child issue from the parent. Identify the four required roles and
label any optional fifth child as outside the Session M7-05 workstreams.
Record dependency order, unresolved ownership, your decisions about existing work,
and the correction you checked.
Session M7-04 reads this live issue set through GitHub MCP.

## Verification

- [ ] GitHub MCP read and write access passed.
- [ ] Existing issues were searched before creation.
- [ ] Each duplicate and partial-overlap candidate has a recorded decision.
- [ ] The complete write was previewed before approval.
- [ ] Created issues match the approved decision brief.
- [ ] A fresh read matched the created state to the approved plan.
- [ ] A second preview, write, and fresh read checked the correction.
- [ ] The parent issue links the child issues and records the planning decisions.
- [ ] No invented owner, date, label, or milestone was added.
- [ ] No customer or source organization names appear.
