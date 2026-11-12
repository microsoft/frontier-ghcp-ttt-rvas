# Session M3-01: Copilot app, plugins & canvas extensions

**Module:** Agentic Workflows

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Design a canvas extension for one synthetic delivery-readiness board. Write the contract first, then create the canvas in the GitHub Copilot app. Test a direct update, an agent-requested update, and a rejected update with its recovery. Compare the final canvas with the contract.

A canvas is a shared interactive surface. People use visible controls while an agent calls named capabilities against the same state. It does not replace the system that owns the work.

## Learning outcomes

- Choose a canvas only when visible shared state improves the workflow.
- Separate canvas state, human actions, and agent-callable capabilities.
- Write validation rules that reject incomplete state changes.
- Create a project-scoped or user-scoped canvas and review what it generated.
- Recover from a rejected action without weakening the contract.

## You need

- GitHub Copilot app access with the built-in `/create-canvas` skill.
- Permission to create files under `.github/extensions` for project scope. Otherwise use user scope.

## Deliverables

1. A completed canvas contract.
2. A canvas created in a sandbox.
3. Records of a direct, an agent-requested, a rejected, and a recovered change.
4. A final state that matches the contract.

## Session materials

| Resource | Purpose |
| --- | --- |
| [`trainer-content/README.md`](trainer-content/README.md) | Minute-mapped teaching and demo plan |
| [`slides.md`](slides.md) | Trainer-facing teaching deck |
| [`lab/README.md`](lab/README.md) | Two-hour learner guide |
| [`lab/starter/`](lab/starter/) | Prepared inputs and contract harness |
| [`lab/solution/`](lab/solution/) | Worked contract, final state, and completed change records |

An optional **Feature Workbench** variant uses synthetic CI results to practice a test-gate decision:

- [`lab/starter/feature-workbench-contract.md`](lab/starter/feature-workbench-contract.md)
- [`lab/starter/feature-workbench-sample.json`](lab/starter/feature-workbench-sample.json)
- [`lab/solution/feature-workbench-solution.md`](lab/solution/feature-workbench-solution.md)
- [`lab/solution/feature-workbench-final-state.json`](lab/solution/feature-workbench-final-state.json)

See the [curriculum glossary](../glossary.md) for canvas, capability, plugin, and MCP terms.

## References

Canvas extensions are new and may change.

- [Working with canvas extensions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app)
- [About GitHub Copilot plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins)
