---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 14: Infrastructure as Code with Copilot'
---

<!-- _class: lead -->
# Terraform from Modules to Security Gate
## DevOps & Infrastructure | Advanced

Session 14 of 19 | 2 hours 30 minutes

---
# Agenda

| Time | Topic |
| --- | --- |
| 0:00–0:08 | Architecture and project model |
| 0:08–0:20 | Module contracts |
| 0:20–0:32 | Root composition |
| 0:32–0:44 | Staged validation |
| 0:44–0:54 | Security failure |
| 0:54–1:00 | Bicep comparison and lab handoff |

---
# One required path

The learner path is Terraform:

```text
architecture → modules → root composition → format → init → validate → security gate
```

Bicep appears as a prepared comparison. Learners do not build both projects.

---
# Modules define contracts

| Module | Consumes | Exposes |
| --- | --- | --- |
| Network | CIDR and names | VPC and subnet IDs |
| Compute | VPC and subnet IDs | Load balancer DNS and app security group |
| Database | Private subnets and app security group | Database endpoint |

Keep secrets in sensitive inputs. Do not copy values between layers.

---
# Prompt from fixed constraints

```text
Complete the network, compute, and database module contracts. Pass values through
typed variables and outputs. Keep the database password sensitive. Do not add
credentials, a backend, plan, or apply command.
```

The architecture owns the boundaries. Copilot drafts the files.

---
# Validate in stages

```bash
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
```

Fix the first failure before moving on. Each stage answers a different question.

---
# What local validation does not prove

It does not check:

- the current cloud state;
- organization policy;
- quota or regional availability;
- the effect of an apply.

A reviewed plan needs an approved identity and target environment.

---
# One intentional security failure

```bash
bash lab/starter/check-security.sh lab/starter/insecure-iac/main.tf
```

The gate must fail. Learners investigate the cited lines, repair the file, and
prove the rerun passes.

---
# Bicep is a comparison

Show:

- module inputs and outputs;
- `@secure()` parameters;
- `az bicep build`;
- the same human review boundary.

Six minutes. No second required build.

---
<!-- _class: divider -->
# Lab

Complete Terraform, validate each stage, and repair the security-gate failure.
