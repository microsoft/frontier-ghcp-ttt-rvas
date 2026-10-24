# Session M3-01: Copilot app, plugins & canvas extensions

**Module:** Agentic Workflows

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Design a canvas extension for one synthetic delivery-readiness board. Start with the contract, then create the canvas in the GitHub Copilot app with the required access. Test direct and agent-requested updates, including a rejected update and recovery. Compare the final canvas with the contract.

A canvas is a shared interactive surface. People use visible controls while an agent uses named capabilities against the same state. The canvas does not replace the system that owns the work.

## Learning outcomes

- Choose a canvas only when visible shared state improves the workflow.
- Separate canvas state, human actions, and agent-callable capabilities.
- Write validation rules that reject unsafe or incomplete state changes.
- Create and review a project-scoped or user-scoped canvas.
- Recover from a rejected action without weakening the contract.
- Record ownership, review, failure handling, and retirement decisions.

## Deliverables

Submit:

1. a completed canvas contract;
2. a canvas created in a sandbox you have approval to use;
3. checkpoint records for direct, agent-requested, rejected, and recovered changes;
4. a final state that matches the contract.

## Access policy

The lab requires GitHub Copilot app access and the built-in `/create-canvas` skill.
Project scope also requires approval to create files under `.github/extensions`.

If app access or `/create-canvas` is unavailable, stop the lab. If project scope
is unavailable, use user scope. **Do not bypass policy
or install a replacement.**

## Session materials

| Resource | Purpose |
| --- | --- |
| [`trainer-content/README.md`](trainer-content/README.md) | Minute-mapped teaching and demo plan |
| [`slides.md`](slides.md) | Trainer-facing teaching deck |
| [`lab/README.md`](lab/README.md) | Two-hour learner guide |
| [`lab/starter/`](lab/starter/) | Prepared inputs and contract harness |
| [`lab/solution/`](lab/solution/) | Worked contract, final state, and completed change records |

The default lab remains the delivery-readiness board. An optional **Feature
Workbench** variant uses synthetic CI results to practice a test-gate decision:

- [`lab/starter/feature-workbench-contract.md`](lab/starter/feature-workbench-contract.md)
- [`lab/starter/feature-workbench-sample.json`](lab/starter/feature-workbench-sample.json)
- [`lab/solution/feature-workbench-solution.md`](lab/solution/feature-workbench-solution.md)
- [`lab/solution/feature-workbench-final-state.json`](lab/solution/feature-workbench-final-state.json)

See the [curriculum glossary](../glossary.md) for canvas, capability, plugin, and
MCP terminology.

## Current product references

Product notes were checked against official GitHub documentation on October 5,
2026. Trainers must recheck availability and policy before delivery:

- [Working with canvas extensions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
- [Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app)
- [About GitHub Copilot plugins](https://docs.github.com/en/copilot/concepts/agents/about-plugins)
