# Session M4-02: Infrastructure as code with Copilot

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-02, M4-01
**Duration:** 2 hours 30 minutes (1 hour trainer content + 1 hour 30 minutes lab)

## Overview

**Infrastructure as code (IaC)** means you describe networks, servers, and storage in files, and a tool builds them. The files can be reviewed, repeated, and scanned.

You learn Terraform's vocabulary in plain words, the networking terms you need, and how to prompt Copilot for IaC. You see where Copilot is weak: invented arguments, old provider versions, insecure defaults. Then you build one VPC with two subnets and a bucket, run `init`, `validate`, and `plan`, scan it with Trivy, and fix a finding. You finish by writing the same resources in Bicep. No cloud account needed.

## Learning outcomes

- Explain what IaC is and why teams use it.
- Define resource, variable, output, module, provider, state, and plan.
- Explain VPC, CIDR, subnet, and security group.
- Write a Copilot prompt with architecture, constraints, naming, and variables instead of literals.
- Run `fmt`, `init`, `validate`, and `plan`, and read the plan.
- Spot invented arguments, outdated syntax, and insecure defaults in Copilot's output.
- Scan Terraform with Trivy and fix a finding.
- Write the same resources in Bicep and build them with `az bicep build`.

## You need

GitHub Copilot, Terraform 1.5 or later, Trivy, and the Azure CLI with Bicep. No cloud account or credentials. Internet access for the first `init` and scan.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter project | [`lab/starter/`](lab/starter/) |
| Reference module | [`lab/solution/modules/baseline/`](lab/solution/modules/baseline/) |
| Reference Bicep | [`lab/solution/bicep/main.bicep`](lab/solution/bicep/main.bicep) |

## Key topics

- What IaC is and why
- Terraform: resource, variable, output, module, provider, state, plan
- Networking: VPC, CIDR, subnet, security group
- Prompting Copilot for IaC, and repository instructions
- Where Copilot is weak
- Static scanning with Trivy
- Bicep compared with Terraform
- Pros, cons, tips, and common mistakes
