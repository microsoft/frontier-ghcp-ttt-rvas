# Session M7-03 trainer guide: Plan work with GitHub Issues and MCP

## Goal

Show learners how to plan a GitHub MCP write, approve it, and check what GitHub
stored. Once created, the live issues become the source of record.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:08 | Connect the decision brief to saved GitHub issues |
| 0:08-0:18 | Explain MCP from the learner's point of view |
| 0:18-0:30 | Inspect tools, permissions, and repository context |
| 0:30-0:43 | Decompose the initiative into an issue plan |
| 0:43-0:53 | Preview, approve, and check a write |
| 0:53-1:00 | Explain the lab guardrails |

## Prepare

- Every learner can open the GitHub Copilot app.
- The GitHub MCP server is available: **Customize** → **MCP** → **Installed**.
- Test one GitHub read before demonstrating a write.
- Learners can read the training repository and create issues in it. Use a training repository, not a production backlog.
- Note the repository owner and name.

Stop if a learner can't identify the target repository, inspect the tool call, or
check the resulting issue.

## Explain MCP without implementation detail

> An MCP server gives Copilot a set of named tools for reading or changing another system.

- The tool runs with the permissions of the connection.
- A read can still expose restricted information.
- A write must name its target and proposed values.
- Copilot proposes an action. The learner approves it.
- Check the saved result with a new read. Copilot's success message isn't enough.

Skip server protocols, transports, and SDKs.

## Demo flow

### 1. Read the source

Open `lab/starter/approved-decision-brief.md`. Ask Copilot for the outcome,
constraints, non-goals, owners, and results needed for acceptance.

### 2. Inspect GitHub

Ask Copilot to identify the target repository, list relevant labels, and search
for duplicate or overlapping open issues.

Use `lab/starter/existing-issues.json` when the training repository lacks the
seeded records. Have learners decide what to do with each candidate:

- reuse `#241`: it partially overlaps the requester view;
- leave `#256` unchanged: notifications are out of scope;
- reject `#263`: it is implementation work that conflicts with the visibility boundary;
- link `#278` only as historical context.

### 3. Propose the issue set

Use one parent issue and four child roles: public status mapping, requester status
view, empty and stale states, and requester-access verification. These feed
Sessions M7-04 and M7-05. A fifth child is optional and stays outside those four
workstreams. Each issue needs:

- a clear outcome;
- scope and a non-goal;
- acceptance criteria;
- dependencies;
- owner or ownership gap;
- link to the decision brief.

Reject technical subtasks with no independent outcome or review point. The
Markdown plan is a temporary preview. Don't commit it or hand it to the next session.

### 4. Preview the write

Before Copilot calls a write tool, it shows:

- repository owner and name;
- issue count;
- each title and body;
- labels and milestone;
- parent-child relationship method;
- fields left unset.

The learner records **Approve**, **Revise**, or **Reject**.

### 5. Check and correct

After creation, retrieve the issues in a fresh read and compare them with the
plan. Demonstrate a correction: add the verification owner and source-decision
path to one child issue. Preview the update, approve it, write it, and read it back.

Check that the parent issue links the complete child set. Session M7-04 reads
those issues directly.

## Common failures

| Failure | Response |
| --- | --- |
| Copilot targets the wrong repository | Reject the operation and restate the repository |
| Duplicate issue exists | Link or update it instead of creating another |
| Partial overlap exists | Reuse the covered work and create only the missing outcomes |
| Child issue is too broad | Split it before the write |
| Labels don't exist | Use existing labels or leave the field unset |
| Tool output claims success without a returned issue | Run a fresh repository read |

## References

- [About the GitHub MCP server](https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp/about-mcp)
- [Using the GitHub MCP server](https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp/using-the-github-mcp-server)
- [Planning a project with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/plan-a-project)
