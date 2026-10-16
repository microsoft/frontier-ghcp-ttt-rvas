# Session m3-04: Custom agents & agent profiles

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04, m3-03
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
- Load the profile in the CLI and check that a source-code conflict stops the run.
- Choose between instructions, custom agents, skills, and MCP.
- Inspect an LSP definition/reference lookup and distinguish a caller from an export.
- Record an owner and version marker for a shared profile.

## Required access

Learners need Node.js 22.22.2 or later, Git, the standalone Copilot CLI with live
custom-agent loading, and a working JavaScript LSP server. Stop if any required
access is missing. A manual scenario does not replace the live run or lookup.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Language-server setup | [`lab/lsp-setup.md`](lab/lsp-setup.md) |
| Weak profile | [`lab/starter/agent-project/.github/agents/weak-test-writer.agent.md`](lab/starter/agent-project/.github/agents/weak-test-writer.agent.md) |
| Tightened profile | [`lab/solution/agent-project/.github/agents/test-writer.agent.md`](lab/solution/agent-project/.github/agents/test-writer.agent.md) |
| Profile reference | [`lab/solution/agent-project/PROFILE-REFERENCE.md`](lab/solution/agent-project/PROFILE-REFERENCE.md) |
