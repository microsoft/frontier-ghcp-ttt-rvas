# Session M4-01: GitHub Actions & workflow generation

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Intermediate
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-02
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

You use one Node.js application, `copilot-webapp`, for four workflow tasks: create CI, design a staged deployment, repair broken workflow files, and validate a local JavaScript action. Every decision traces back to the same scripts, tests, build output, and health endpoint.

Submit your workflow files. At each checkpoint, record the command, the result, and the file that changed.

## Learning outcomes

- Generate CI from repository facts and check it with local commands.
- Design staging and production jobs without a live deployment.
- Repair workflow syntax and behavior from exact failures.
- Validate a JavaScript action against the application with pass and fail cases.
- Review triggers, permissions, secrets, artifacts, and deployment gates.

## You need

Node.js 20 or later and GitHub Copilot. Repository and GitHub Actions access are optional: the lab runs on local tests and YAML parsing.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Application starter | [`lab/starter/webapp/`](lab/starter/webapp/) |
| Reference workflows and action | [`lab/solution/`](lab/solution/) |
