# Session M4-01: GitHub Actions & workflow generation

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Intermediate
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-02
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

You learn the parts of a GitHub Actions workflow first, then use one Node.js application, `copilot-webapp`, for three tasks: generate and lint CI with Copilot, design a staged deployment, and repair broken workflow files. Validating a local JavaScript action is optional. Every decision traces back to the same scripts, tests, build output, and health endpoint.

## Learning outcomes

- Name the parts of a workflow: trigger, job, step, runner, action, artifact, `needs`, permissions, secrets, and environments.
- Generate CI with Copilot from repository facts, then check it with `actionlint` and local commands.
- Design staging and production jobs without a live deployment.
- Repair workflow syntax and behavior from exact failures.
- Decide when a reusable workflow or custom action is worth it.
- Spot common YAML mistakes in review.

## You need

Node.js 20 or later, GitHub Copilot (CLI or agent mode in your editor), and `actionlint`. Repository and GitHub Actions access are optional: the lab runs locally.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Application starter | [`lab/starter/webapp/`](lab/starter/webapp/) |
| Reference workflows and action | [`lab/solution/`](lab/solution/) |
