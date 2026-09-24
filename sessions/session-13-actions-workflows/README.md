# Session 13: GitHub Actions & Workflow Generation

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–05
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Carry one Node.js application through four workflow tasks: create CI, design a
staged deployment, repair broken workflow files, and validate a local JavaScript
action. Every task uses `copilot-webapp`, so learners can trace each decision back
to the same scripts, tests, build output, and health endpoint.

The lab requires evidence, not just finished YAML. Learners record the command,
result, changed file, and review decision at each checkpoint.

## Learning outcomes

- Generate CI from repository facts and verify it with local commands.
- Design staging and production jobs without performing a live deployment.
- Repair workflow syntax and behavior from exact failures.
- Validate a JavaScript action against the application with pass and fail cases.
- Review triggers, permissions, secrets, artifacts, and deployment gates.

## Required access

Learners need Node.js 20 or later and GitHub Copilot in the selected coding
environment. Repository and GitHub Actions access are optional. The required path
uses local tests, YAML parsing, and peer review.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Application starter | [`lab/starter/webapp/`](lab/starter/webapp/) |
| Reference workflows and action | [`lab/solution/`](lab/solution/) |
