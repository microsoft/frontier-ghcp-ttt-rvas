# Session 14 Trainer Guide: Terraform as the Required Path

## Delivery objective

Teach one complete IaC path. Learners build Terraform modules, connect their
contracts, validate locally, and investigate one security-gate failure. Bicep is
a short trainer comparison or optional extension.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Architecture and Terraform project model |
| 0:08–0:20 | Module contracts |
| 0:20–0:32 | Root composition |
| 0:32–0:44 | Staged validation |
| 0:44–0:54 | Intentional security failure |
| 0:54–1:00 | Bicep comparison and lab handoff |

## Prepare

- Run `terraform fmt -check -recursive` on the solution.
- Initialize the solution with `-backend=false` and run `terraform validate`.
- Run the security gate once against the insecure file and once against the fix.
- Keep cloud credentials unset.
- Prepare the Bicep solution for a six-minute comparison. Do not assign it as
  required learner work.

## Architecture and module contracts

Use the supplied three-tier design. The network module owns address space and
subnets. Compute consumes subnet IDs and exposes the application security group.
Database consumes that security group and its private subnets.

Ask learners to state each boundary before generating code. A module is useful
when its callers depend on a small, stable interface.

## Root composition

Use this request:

```text
Read the Terraform root module and architecture constraints. Complete the network,
compute, and database module contracts. Pass values through typed variables and
outputs. Keep the database password sensitive. Do not add credentials, a backend,
plan, or apply command.
```

Inspect every added input and output. Reject duplicated CIDRs or values copied
between modules when an output should carry them.

## Staged validation

Run checks in this order:

```bash
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
```

Formatting catches style drift. Initialization resolves providers and modules.
Validation checks the configuration against the installed provider schema. None of
these commands compares the configuration with a cloud environment.

Do not run a plan during the required session. A plan needs an approved identity,
target environment, backend decision, and review boundary.

## Intentional security failure

Run:

```bash
bash lab/starter/check-security.sh lab/starter/insecure-iac/main.tf
```

Let learners inspect the output before showing the solution. The gate should fail.
Each repair must connect a reported pattern to the architecture or security rule.

Then show the passing command against `lab/solution/secure-iac/main.tf`.

## Bicep comparison

Use the final six minutes to show the prepared Bicep module calls, `@secure()`
parameter, and outputs. The comparison helps learners transfer the design ideas.
It does not create another required lab path.

## Access policy

GitHub Copilot, Terraform, and the approved provider source are required. Stop if
any is unavailable. No cloud account or credentials are needed.

## Lab handoff

Learners have 90 minutes. They complete the Terraform modules, run staged checks,
investigate the security failure, and submit evidence. Point out that the session
duration changed to 2 hours 30 minutes because the duplicate Bicep build was
removed from the required lab.

## Common questions

**Why no plan?** The required exercise has no approved cloud target or identity.
Local validation is enough for the learning goal.

**Why keep Bicep?** It shows that the module and validation ideas transfer without
doubling the required implementation.

**Does the security script replace policy tooling?** No. It is a deterministic
training gate for the supplied failure.
