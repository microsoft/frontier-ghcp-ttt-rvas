# Session 14 — Infrastructure as Code with Copilot

**Module:** 4 — DevOps & Infrastructure with Copilot  
**Difficulty:** Advanced  
**Prerequisites:** Sessions 01–05, 13  
**Duration:** 1 hour trainer content + 2 hours lab
**Last updated:** April 2026

## Prepare safely

Read the [course safety baseline](../../learning-safety-baseline.md). Use the supplied infrastructure values and local validation. Do not configure customer credentials or apply infrastructure during this session. A `terraform plan` needs a customer-approved nonproduction environment, credentials, and stop guard.

Copilot can draft Terraform and Bicep. It cannot verify the cloud account, provider version, organization policy, or the effect of an apply. Human review owns those decisions.

**Preflight**

- Open the supplied Terraform and Bicep starters, insecure Terraform file, and local validation tools.
- Confirm supplied CIDRs, approved values, reviewer, and a customer-owned stop guard.
- Prepare generated module files for comparison. Do not configure credentials or apply infrastructure.

## One-hour plan

| Time | Topic | Trainer move |
| --- | --- | --- |
| 0:00–0:08 | IaC model | Compare Terraform, Bicep, resources, modules, variables, and previews. |
| 0:08–0:20 | Terraform | Generate one secure, parameterized module and inspect it. |
| 0:20–0:30 | Bicep | Show the equivalent module and secure parameters. |
| 0:30–0:42 | Project design | Connect modules through clear inputs and outputs. |
| 0:42–0:52 | Security review | Find public access, broad permissions, plain-text secrets, and missing encryption. |
| 0:52–0:57 | Validation | Run local syntax and consistency checks. |
| 0:57–1:00 | Lab handoff | Assign the four bounded exercises. |

Use one language for the live demo based on the audience. Show the other as a comparison. If generation fails, inspect prepared files and keep the security review and validation.

## IaC model

Infrastructure as Code stores cloud-resource intent in versioned files. Terraform uses HCL across providers. Bicep targets Azure and compiles to ARM JSON.

| Concept | Terraform | Bicep |
| --- | --- | --- |
| Resource | `resource` block | `resource` declaration |
| Reusable unit | `module` | `module` |
| Input | `variable` | `param` |
| Output | `output` | `output` |
| Preview | `terraform plan` | `az deployment what-if` |

Ask Copilot to read the existing repository first. Give it the exact architecture, allowed CIDRs, runtime, ownership boundaries, required outputs, and constraints. Then inspect every generated resource against the request.

```text
Read this Terraform project. Add a network module for the supplied CIDRs.
Expose only the VPC and subnet IDs the root module needs. Use variables and outputs;
do not add credentials, public database access, or a plan/apply command.
```

Learners should see a small network module, explicit inputs and outputs, and no credentials or public database access. At 0:42, stop generation troubleshooting and inspect the prepared module; keep the security review and local checks.

## Module design

Keep the lab's network, compute, and database modules small enough to review. Pass values through typed inputs and outputs instead of duplicating literals. Terraform variables can validate permitted values; Bicep can use parameter types, decorators, and `@secure()` for sensitive parameters.

Copilot Spaces can provide approved project files, cloud documentation, and team conventions. Use a Space only after policy permits its sources. Review the sources, instructions, data boundary, and result. A Space is context, not a security control.

## Security review

Audit generated files before validation:

- block public storage access unless the design explicitly requires it;
- restrict security-group and NSG ingress to required ports and sources;
- keep passwords and tokens out of source; mark inputs sensitive or use the approved secret system;
- use encryption for storage and databases;
- give IAM identities the minimum action and resource scope;
- add logging and retention required by the design or policy;
- verify provider and resource API versions against current documentation.

Use the insecure starter file to find the six intended issues: open ingress, hardcoded database password, public S3 read, wildcard IAM action, unencrypted RDS, and missing ALB access logging. Fix only what the requirements support. Extra “best practices” should be proposed for review, not silently added.

## Validate, then review

Run existing local tools:

```bash
terraform fmt
terraform validate
az bicep build --file main.bicep
```

These checks do not prove that deployment is safe. Run a reviewed plan or what-if only in an approved environment. Record the commands, results, unresolved provider-version questions, and reviewer decision.

## Lab handoff

Learners generate Terraform network, compute, and database modules; create the equivalent Bicep project; remediate the supplied insecure Terraform; and compare a Space-grounded draft with a normal prompt when available. The deliverable is validated code plus a documented security review. No cloud resource is provisioned.

## Likely questions

**Does `terraform validate` show that a deployment is safe?** No. It checks local configuration. A reviewed plan or what-if needs an approved environment.

**Can learners use customer credentials for a plan?** Only with customer approval for a nonproduction environment, credentials, and stop guard. This session uses local validation.

**What if Terraform or Bicep generation fails?** Use the prepared files, inspect the intended issues, and run the available local checks.
