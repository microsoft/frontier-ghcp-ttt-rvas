# Session M7-03 trainer guide: Plan work with GitHub Issues and MCP

## Goal

Show learners how to plan a GitHub MCP write, approve it, and check what GitHub
stored. Once created, the live issues become the source of record.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:05 | Connect the decision brief to saved GitHub issues |
| 0:05-0:15 | Explain MCP, tool discovery, and permissions |
| 0:15-0:22 | Compare GitHub MCP with app-native features |
| 0:22-0:32 | Inspect repository context; parent/child issues, labels, milestones |
| 0:32-0:42 | Decompose the initiative into an issue plan |
| 0:42-0:52 | Preview, approve, and check a write |
| 0:52-1:00 | Common failures and the lab boundary |

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

### Terms to define

- **MCP:** a standard way to plug tools into Copilot. Use the USB-port picture.
- **Tool discovery:** ask Copilot to list its GitHub tools. If a tool isn't listed, it can't be called.
- **Permissions:** the connection's rights, not Copilot's. Read access can expose private data. Missing write access fails the write.
- **Parent and child issues:** the parent holds the outcome. Each child is one reviewable piece of work.
- **Labels and milestones:** labels classify, milestones group by target. Use only ones that exist.

### GitHub MCP or app-native

| | GitHub MCP | App-native (web UI, `gh`) |
| --- | --- | --- |
| Strength | Copilot can plan, preview, and repeat structured reads and writes | Already available; fine for one issue |
| Cost | Needs a connection and permissions | Manual and slow for many issues |
| Review | Tool call shows exact arguments | You see only the result |

Use MCP when Copilot must read or write GitHub as part of a plan. Don't claim
MCP is always better. Check current docs for which built-in features the app offers.

## Demo flow

### 1. Read the source

Open `lab/starter/approved-decision-brief.md`. Ask Copilot for the outcome,
constraints, non-goals, owners, and results needed for acceptance.

### 2. Inspect GitHub

Ask Copilot to identify the target repository, list relevant labels, and search
for duplicate or overlapping open issues.

`lab/starter/existing-issues.json` is a fallback for when the training
repository lacks the seeded records. The lesson is the live read, not the file. Have learners decide what to do with each candidate:

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
| No GitHub tools listed | Check **Customize** → **MCP** → **Installed**; restart the session |
| Read works, write fails | The account lacks issue-write access. Get access or stop |
| Write rejected on labels, milestone, or sub-issue link | Check the name exists. Sub-issue links use the `sub_issue_write` tool (add, remove, reprioritize); check that your toolset lists it |

## References

- [About Model Context Protocol (MCP)](https://docs.github.com/en/copilot/concepts/customizations/mcp)
- [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
- [Planning a project with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/plan-a-project)
