# Session 14 Lab — Infrastructure as Code with Copilot

**Duration:** 2 hours · **Difficulty:** Advanced
**Prerequisites:** Sessions 01–05 and 13 · **Deliverable:** Validated Terraform and Bicep plus a security review

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm the selected Copilot feature, cloud account, local tools, and data boundary with the customer. Use only the supplied infrastructure values. Do not configure cloud credentials or provision resources.

If access is unavailable, write from the requirements, run approved offline checks, and peer-review the security checklist. A `terraform plan` is optional and requires a customer-approved nonproduction environment, credentials, and stop guard.

| Exercise | Task | Time |
| --- | --- | --- |
| 1 | Terraform modules | 40 min |
| 2 | Bicep templates | 30 min |
| 3 | Secure the supplied Terraform | 30 min |
| 4 | Approved Space context | 20 min |

## Setup

Use VS Code with Copilot, Terraform 1.5+, and, if available, Azure CLI with Bicep. Verify only local tools:

```bash
terraform --version
az --version
az bicep version
```

## 1. Generate Terraform modules

Open `lab/starter/terraform/`. Build `modules/network/`, `modules/compute/`, and `modules/database/`, then connect them from the root module.

Use the supplied network: VPC `10.0.0.0/16`; public subnets `10.0.1.0/24` and `10.0.2.0/24`; private application subnets `10.0.3.0/24` and `10.0.4.0/24`; private database subnets `10.0.5.0/24` and `10.0.6.0/24`. The design includes an internet gateway, NAT gateway, route tables, an ALB, a private Auto Scaling Group using Amazon Linux 2023, and an encrypted multi-AZ PostgreSQL 15 RDS instance. Database access is only from the application security group.

Use variables and outputs for cross-module values. Keep the RDS password sensitive and out of source. Validate:

```bash
terraform init
terraform validate
```

Compare with `lab/solution/terraform/`. Run `terraform plan` only under the stated approval conditions.

## 2. Generate Bicep

Open `lab/starter/bicep/`. Create a VNet with web, app, and database subnets; a Linux B1 App Service Plan and Node.js 20 Web App; and a PostgreSQL Flexible Server with private access. Use `@secure()` for the database password. Update `main.bicep` to call the modules and return the web URL and database FQDN.

Review parameter types, dependencies, least-privilege NSGs, and outputs. If Azure CLI is available:

```bash
az bicep build --file main.bicep
```

Compare with `lab/solution/bicep/`.

## 3. Secure the starter configuration

Read `lab/starter/insecure-iac/main.tf`. Find and fix the six intended issues:

1. all-port `0.0.0.0/0` ingress;
2. hardcoded database password;
3. public S3 read access;
4. wildcard IAM action;
5. unencrypted RDS;
6. missing ALB access logging.

Run `terraform validate`, then compare the result with `lab/solution/secure-iac/main.tf`. Submit further controls separately for human review.

## 4. Use approved Space context

Read `lab/starter/spaces-iac-guide.md`. If Spaces and its sources are approved, create an IaC reference Space with the project files, approved cloud documentation, and team conventions. Use its instructions to draft a secure versioned S3 bucket with KMS encryption, 90-day Glacier transition, public-access blocking, and separate logging.

Compare it with a normal prompt. Record required tags, variable descriptions, API-version verification, and any missing convention. If Spaces are unavailable, review the same source material manually.

## Completion checklist

- [ ] Terraform modules validate locally.
- [ ] Bicep compiles locally when Azure CLI is available.
- [ ] All six security issues have a reviewed remediation.
- [ ] Any Space sources and instructions were approved.
- [ ] No cloud resource was planned or applied without explicit approval.
