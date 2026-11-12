# Session M3-04: Custom agents & agent profiles

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04, M3-03
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Custom agents define narrow roles in Markdown that teams can review. Start with a weak test-writer profile that enables every tool and permits source edits. After its boundary test fails, replace it with a profile that may read source, edit tests, and run one known command. The profile must stop when production code needs to change.

## Learning outcomes

- Explain the `.agent.md` structure, key frontmatter fields, tool aliases, and `disable-model-invocation`.
- Decide when a custom agent beats a general agent, and how an agent is selected.
- Describe how tools, instructions, and model change behavior.
- Detect a boundary violation with a repeatable contract test.
- Use tool aliases as a least-privilege allowlist.
- Write a stop condition that hands production conflicts to a human.
- Load the profile in the CLI and check that a source-code conflict stops the run.
- Choose between instructions, skills, custom agents, and MCP: know-how, a role, or reach.
- Optional stretch: run an LSP definition/reference lookup and tell a caller from an export.

## You need

Node.js 22.22.2 or later, Git, the standalone Copilot CLI with custom-agent support, and, for the optional stretch, a working JavaScript language server ([setup](lab/lsp-setup.md)).

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Language-server setup (optional) | [`lab/lsp-setup.md`](lab/lsp-setup.md) |
| Weak profile | [`lab/starter/agent-project/.github/agents/weak-test-writer.agent.md`](lab/starter/agent-project/.github/agents/weak-test-writer.agent.md) |
| Tightened profile | [`lab/solution/agent-project/.github/agents/test-writer.agent.md`](lab/solution/agent-project/.github/agents/test-writer.agent.md) |
| Profile reference | [`lab/solution/agent-project/PROFILE-REFERENCE.md`](lab/solution/agent-project/PROFILE-REFERENCE.md) |
