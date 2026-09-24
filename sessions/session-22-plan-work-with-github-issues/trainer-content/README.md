# Session 22 Trainer Guide: Plan Work with GitHub Issues and MCP

**Duration:** 1 hour

## Delivery objective

Learners should leave able to use GitHub MCP as a controlled work interface. They plan first, approve the write, and verify the result.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:08 | Connect the decision brief to durable GitHub work |
| 0:08-0:18 | Explain MCP from the learner's point of view |
| 0:18-0:30 | Inspect tools, permissions, and repository context |
| 0:30-0:43 | Decompose the initiative into an issue plan |
| 0:43-0:53 | Preview, approve, and verify a write |
| 0:53-1:00 | Explain the lab guardrails |

## Required preflight

- Confirm that every learner can open the GitHub Copilot app.
- Confirm that the approved GitHub MCP server is available.
- In the app, open **Customize** → **MCP** → **Installed** and inspect the
  connection.
- Test one GitHub read before demonstrating a write.
- Confirm that learners can read the training repository and create issues in it.
- Use a repository created for training. Do not use a production backlog.
- Record the repository owner and name before the demonstration.

> [!IMPORTANT]
> Stop if the learner cannot identify the target repository, inspect the tool call, or verify the resulting issue.

## Explain MCP without implementation detail

Use this definition:

> An MCP server gives Copilot a set of named tools for reading or changing another system.

Learners need to understand:

- the tool runs with the permissions available to the connection;
- a read operation can still expose restricted information;
- a write operation must name its target and proposed values;
- Copilot can propose an action, but the learner approves it;
- verification must use a new read rather than the generated confirmation text.

Do not explain server protocols, transports, or SDKs.

## Demo flow

### 1. Read the approved source

Open `lab/starter/approved-decision-brief.md`. Ask Copilot to identify the outcome, constraints, non-goals, owners, and acceptance evidence.

### 2. Inspect GitHub

Ask Copilot to:

- identify the target repository;
- list existing labels relevant to the plan;
- search for duplicate or overlapping open issues;
- report any permission or context uncertainty.

### 3. Propose the issue set

Use one parent issue and three to five child issues. Each issue should have:

- a clear outcome;
- bounded scope;
- acceptance criteria;
- a non-goal;
- dependencies;
- owner or ownership gap;
- link to the decision brief.

Reject technical subtasks that have no independent outcome or review point.

### 4. Preview the write

Before Copilot calls a write tool, ask it to show:

- repository owner and name;
- issue count;
- each title and body;
- labels and milestone;
- parent-child relationship method;
- fields that remain unset.

The learner records **Approve**, **Revise**, or **Reject**.

### 5. Verify and correct

After creation, start a fresh read. Retrieve the issues and compare them with the
approved plan. Add the verification owner and source-decision path to one child
issue through another preview, approval, write, and fresh read.

## Common failure modes

| Failure | Trainer response |
| --- | --- |
| Copilot targets the wrong repository | Reject the operation and restate the repository |
| Duplicate issue exists | Link or update the existing issue instead of creating another |
| Child issue is too broad | Split it before the write |
| Labels do not exist | Use approved existing labels or leave the field unset |
| Tool output claims success without a returned issue | Run a fresh repository read |
| Learner cannot review tool arguments | Stop the lab |

## Product notes verified September 24, 2026

Check current GitHub MCP availability, authentication, tool names, issue hierarchy support, and write confirmations before delivery.

Official references:

- [About the GitHub MCP server](https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp/about-mcp)
- [Using the GitHub MCP server](https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp/using-the-github-mcp-server)
- [Planning a project with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/plan-a-project)
