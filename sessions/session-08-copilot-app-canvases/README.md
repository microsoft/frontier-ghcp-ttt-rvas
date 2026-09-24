# Session 08: Copilot App, Plugins & Canvas Extensions

**Module:** Agentic Workflows

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

This session teaches canvas extension design through one synthetic delivery-readiness board. Learners define the contract first, create the canvas in the GitHub Copilot app when access is approved, test direct and agent-requested updates, force a safe rejection, recover, and complete a peer review.

A canvas is a shared interactive surface. People use visible controls while an agent uses named capabilities against the same state. The canvas does not replace the system that owns the work.

## Learning outcomes

- Choose a canvas only when visible shared state improves the workflow.
- Separate canvas state, human actions, and agent-callable capabilities.
- Write validation rules that reject unsafe or incomplete state changes.
- Create and review a project-scoped or user-scoped canvas.
- Recover from a rejected action without weakening the contract.
- Record ownership, review, fallback, and retirement decisions.

## Deliverables

Learners submit:

1. a completed canvas contract;
2. a canvas created in an approved sandbox, or the manual simulation record;
3. checkpoint evidence for direct, agent-requested, rejected, and recovered changes;
4. a completed peer-review record with a final decision.

## Access policy

The live route requires GitHub Copilot app access and the built-in `/create-canvas` skill. Project scope also requires approval to create files under `.github/extensions`.

If app access, `/create-canvas`, or the requested scope is unavailable, **do not bypass policy or install a replacement**. Use the manual route in the lab. It uses the same contract, prepared inputs, state transitions, rejection, recovery, and review gate.

## Session materials

| Resource | Purpose |
| --- | --- |
| [`trainer-content/README.md`](trainer-content/README.md) | Minute-mapped teaching and demo plan |
| [`slides.md`](slides.md) | Trainer-facing teaching deck |
| [`lab/README.md`](lab/README.md) | Two-hour learner guide |
| [`lab/starter/`](lab/starter/) | Prepared inputs, contract harness, and review records |
| [`lab/solution/`](lab/solution/) | Worked contract, final state, and completed evidence |

## Current product references

Product notes were checked against official GitHub documentation on September 24, 2026. Trainers must recheck availability and policy before delivery:

- Working with canvas extensions in the GitHub Copilot app
- Slash commands for the GitHub Copilot app
