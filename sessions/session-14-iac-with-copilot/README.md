# Session 14: Infrastructure as Code with Copilot

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Advanced
**Prerequisites:** Sessions 01–05, 13
**Duration:** 2 hours 30 minutes (1 hour trainer content + 1 hour 30 minutes lab)

## Overview

Use Terraform to build and review one modular infrastructure path. Learners connect
network, compute, and database modules, validate each stage, and repair a supplied
configuration that fails the local security gate.

Bicep is a trainer comparison and optional extension. It is not part of the
required learner deliverable.

## Learning outcomes

- Generate Terraform modules from fixed architecture constraints.
- Connect module inputs and outputs without copying values between layers.
- Run formatting, initialization, validation, and a local security gate in order.
- Explain what local validation proves and what still needs a reviewed plan.
- Review the equivalent Bicep structure without building a second required path.

## Required access

Learners need GitHub Copilot, Terraform 1.5 or later, and network access to the
approved Terraform provider source. No cloud account or credentials are required.
Stop if the approved provider source is unavailable.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Terraform starter | [`lab/starter/terraform/`](lab/starter/terraform/) |
| Terraform solution | [`lab/solution/terraform/`](lab/solution/terraform/) |
| Optional Bicep extension | [`lab/starter/bicep/`](lab/starter/bicep/) |
