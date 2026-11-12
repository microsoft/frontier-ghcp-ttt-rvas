# Session M4-02 trainer guide: Terraform modules and security checks

## Teaching goal

Show how to build and connect Terraform modules, validate them locally, and investigate a security-gate failure. Keep Bicep to a short comparison.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Architecture and Terraform project model |
| 0:08 to 0:20 | Module contracts |
| 0:20 to 0:32 | Root composition |
| 0:32 to 0:44 | Staged validation |
| 0:44 to 0:54 | Intentional security failure |
| 0:54 to 1:00 | Bicep comparison and lab handoff |

## Prepare

- Run `terraform fmt -check -recursive` on the solution.
- Initialize it with `-backend=false` and run `terraform validate`.
- Run the security gate once against the insecure file and once against the fix.
- Leave cloud credentials unset.
- Prepare the Bicep solution for a six-minute comparison.

## Architecture and module contracts

Use the supplied three-tier design. Trace address space and subnets through the network module. Show how compute uses subnet IDs and exposes the application security group, then how the database uses that group and its private subnets.

Ask learners to state each boundary before generating code. A module pays off when callers depend on a small, stable interface.

## Root composition

```text
Read the Terraform root module and architecture constraints. Complete the network,
compute, and database module contracts. Pass values through typed variables and
outputs. Keep the database password sensitive. Do not add credentials, a backend,
plan, or apply command.
```

Inspect every added input and output. Reject duplicated CIDRs or values copied between modules when an output should carry them.

## Staged validation

```bash
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
```

Formatting catches style drift. Initialization resolves providers and modules. Validation checks the configuration against the installed provider schema. None of them compares the configuration with a cloud environment.

Skip `terraform plan` in this session. A plan needs an identity, a target environment, a backend decision, and human review.

## Intentional security failure

```bash
bash lab/starter/check-security.sh lab/starter/insecure-iac/main.tf
```

Let learners read the output before you show the solution. The gate fails. Each repair must connect a reported pattern to the architecture or a security rule.

Rerun the gate and `terraform validate` on the repaired file, then compare with `lab/solution/secure-iac/main.tf`.

## Bicep comparison

Spend six minutes on the prepared Bicep module calls, the `@secure()` parameter, and outputs. Learners don't build a second project.

## Lab handoff

Learners have 90 minutes to complete the modules, run the staged checks, and investigate the security failure. They submit command output.

## Common questions

**Why no plan?** There's no cloud target or identity. Local validation covers the learning goal.

**Why keep Bicep a comparison?** It shows the module and validation ideas transfer without doubling the work.

**Does the security script replace policy tooling?** No. It's a deterministic training gate for the supplied failure.
