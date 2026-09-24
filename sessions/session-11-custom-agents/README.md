# Session 11: Custom Agents & Agent Profiles

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions 01–07, 10
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Custom agents define narrow roles in Markdown that teams can review. Learners start
with a weak test-writer profile that enables every tool and permits source edits.
The boundary test fails. They then replace it with a profile that may read source,
edit tests, run one known command, and stop when production code must change.

## Learning outcomes

- Explain the `.agent.md` profile structure and current frontmatter.
- Detect a boundary violation with a repeatable contract test.
- Use documented tool aliases as a least-privilege allowlist.
- Write a stop condition that hands production conflicts to a human.
- Verify profile behavior on an approved Copilot surface or by manual simulation.
- Choose between instructions, custom agents, skills, and MCP.
- Record an owner and version marker for a shared profile.

## Required access

Node.js 20 or later is required for the local profile tests. A supported GitHub
Copilot surface is optional. If live profile loading is unavailable, run the same
boundary checks and manual scenario.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Weak profile | [`lab/starter/agent-project/.github/agents/weak-test-writer.agent.md`](lab/starter/agent-project/.github/agents/weak-test-writer.agent.md) |
| Tightened profile | [`lab/solution/agent-project/.github/agents/test-writer.agent.md`](lab/solution/agent-project/.github/agents/test-writer.agent.md) |
| Profile reference | [`lab/solution/agent-project/PROFILE-REFERENCE.md`](lab/solution/agent-project/PROFILE-REFERENCE.md) |
