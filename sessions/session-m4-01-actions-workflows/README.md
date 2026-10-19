# Session m4-01: GitHub Actions & workflow generation

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-02
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

You will use one Node.js application for four workflow tasks: create CI, design a
staged deployment, repair broken workflow files, and validate a local JavaScript
action. Every task uses `copilot-webapp`, so you can trace each decision back
to the same scripts, tests, build output, and health endpoint.

Submit your workflow files. At each checkpoint, record the command and result,
which file changed, and the review decision.

## Learning outcomes

- Generate CI from repository facts and check it with local commands.
- Design staging and production jobs without performing a live deployment.
- Repair workflow syntax and behavior from exact failures.
- Validate a JavaScript action against the application with pass and fail cases.
- Review triggers, permissions, secrets, artifacts, and deployment gates.

## Required access

You need Node.js 20 or later and GitHub Copilot in the selected coding
environment. Repository and GitHub Actions access are optional. Complete the lab
with local tests, YAML parsing, and peer review.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Application starter | [`lab/starter/webapp/`](lab/starter/webapp/) |
| Reference workflows and action | [`lab/solution/`](lab/solution/) |
