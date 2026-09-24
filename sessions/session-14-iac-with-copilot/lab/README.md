# Session 14 Lab: Terraform from Modules to Security Gate

**Duration:** 1 hour 30 minutes
**Difficulty:** Advanced
**Prerequisites:** Sessions 01–05 and 13
**Deliverable:** Validated Terraform modules, a repaired security case, and command evidence

## Lab overview

| Part | Work | Time |
| --- | --- | --- |
| 1 | Inspect and format the Terraform project | 10 min |
| 2 | Build and connect the modules | 35 min |
| 3 | Initialize and validate | 15 min |
| 4 | Investigate the intentional security failure | 20 min |
| 5 | Record evidence and review limits | 10 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). You must have GitHub Copilot access, Terraform 1.5 or later, and the approved provider source.
This lab does not need a cloud account, credentials, state backend, plan, or apply.

If GitHub Copilot access or the approved provider source is unavailable, stop and
do not continue the required lab. The instructor may still show the prepared files.

## Setup

Run:

```bash
terraform version
terraform fmt -check -recursive lab/starter/terraform
```

Expected result: Terraform reports version 1.5 or later and the supplied files are
formatted.

## Part 1: Read the module contract

Open `lab/starter/terraform/`. Keep the supplied architecture:

- VPC `10.0.0.0/16`;
- two public, two private application, and two private database subnets;
- an internet-facing load balancer;
- private application instances;
- an encrypted, private PostgreSQL database;
- database ingress only from the application security group.

Do not add credentials, a remote backend, a plan, or an apply command.

**Checkpoint:** List the root inputs and the outputs that connect network to
compute and compute to database.

## Part 2: Build and connect the modules

Create the missing module files under:

```text
modules/network/
modules/compute/
modules/database/
```

Use typed variables and narrow outputs. Keep the database password sensitive.
Compare with `lab/solution/terraform/` only after your first draft.

Run the formatting stage:

```bash
terraform fmt -check -recursive lab/starter/terraform
```

Expected result: the supplied files pass. If your generated files fail, run
`terraform fmt -recursive lab/starter/terraform`, then rerun the check.

**Checkpoint:** Record the format result and any files Terraform changed.

## Part 3: Initialize and validate

Run these stages in order:

```bash
terraform -chdir=lab/starter/terraform init -backend=false
terraform -chdir=lab/starter/terraform validate
```

Expected result: initialization downloads the approved provider and validation
reports `Success! The configuration is valid.`

If validation fails, fix the first reported module contract error before running
it again. Do not add provider credentials to make validation pass.

**Checkpoint:** Record the provider version, validation result, and any contract
error you repaired.

## Part 4: Investigate the intentional security failure

Run the local policy gate against the supplied insecure file:

```bash
bash lab/starter/check-security.sh lab/starter/insecure-iac/main.tf
```

Expected failure: the command exits with code 1 and reports prohibited public
access, a hardcoded password, wildcard IAM access, missing database encryption,
or missing load-balancer logging.

Investigate the file before opening the solution. Repair the findings supported
by the stated architecture, then run:

```bash
bash lab/starter/check-security.sh lab/solution/secure-iac/main.tf
terraform fmt -check lab/solution/secure-iac/main.tf
terraform -chdir=lab/solution/secure-iac init -backend=false
terraform -chdir=lab/solution/secure-iac validate
```

Expected result: the security gate and Terraform validation pass.

**Checkpoint:** Record the failing exit code, each cited line, the repaired file,
and the passing rerun. A quiet gate does not approve a deployment.

## Final deliverable

Submit:

1. The completed Terraform root module and three modules.
2. Clean formatting and validation output.
3. The security-gate failure and passing repair evidence.
4. A short review note that states what requires a plan, cloud policy review, and
   human approval before deployment.

## Optional extension: Bicep comparison

The trainer may show `lab/solution/bicep/`. If time remains and Azure CLI with
Bicep is already approved, build the prepared template:

```bash
az bicep build --file lab/solution/bicep/main.bicep
```

Compare module inputs, outputs, secure parameters, and local compilation with the
Terraform project. Do not make Bicep a second required implementation.
