---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 14 — Infrastructure as Code with Copilot'
---

<!-- _class: lead -->
# Infrastructure as Code with Copilot
## DevOps & Infrastructure | Advanced

---
# Agenda

| Time | Topic |
| --- | --- |
| 0:00–0:08 | IaC model |
| 0:08–0:20 | Terraform module |
| 0:20–0:30 | Bicep comparison |
| 0:30–0:42 | Module composition |
| 0:42–0:52 | Security review |
| 0:52–1:00 | Validation and lab handoff |

---
# IaC model

| Concept | Terraform | Bicep |
| --- | --- | --- |
| Resource | `resource` block | `resource` declaration |
| Reusable unit | `module` | `module` |
| Input | `variable` | `param` |
| Output | `output` | `output` |
| Preview | `terraform plan` | `az deployment what-if` |

---
# IaC describes desired resources, not intent

The same configuration can create a secure private service or an exposed one. The
difference is in the details: identity, network paths, defaults, and dependencies.

Before generating code, establish:

- the architecture boundary and approved regions;
- the inputs that come from the environment;
- who owns state and applies changes;
- the controls that must be visible in review.

Copilot can draft resources. The architecture must come first.

---
# Modules create contracts

A module is useful when callers should depend on a stable interface rather than
the resources inside it.

| Module element | Review question |
| --- | --- |
| Input | Is this the smallest safe configuration surface? |
| Output | Does this expose only what callers need? |
| Resource | Does it meet the architecture and policy constraints? |
| Documentation | Can another team use it without reading its internals? |

Avoid modules that only hide a single resource without creating a useful boundary.

---
# State and preview answer different questions

State records what the IaC tool believes it manages. A plan or what-if compares
the requested configuration with the target environment.

Both need protection:

```text
State: approved backend, access controls, no secrets in source
Preview: approved identity, bounded environment, human review before apply
```

Never use generated IaC as proof that a deployment is safe. Use the preview to
find changes, then review whether those changes should happen.

---
# Prompt from facts

```text
Read this Terraform project. Add a network module for the supplied CIDRs.
Expose only needed VPC and subnet IDs. Use variables and outputs; do not add
credentials, public database access, or a plan/apply command.
```

Check every resource against the architecture before accepting it.

---
# Security review

- Block unneeded public access.
- Restrict ingress by port and source.
- Keep secrets out of source.
- Encrypt storage and databases.
- Limit IAM actions and resources.
- Add required logging.

Generated IaC is a draft. Human review owns the deployment decision.

---
# Validate locally

```bash
terraform fmt
terraform validate
az bicep build --file main.bicep
```

A plan or what-if needs an approved environment, credentials, and stop guard.

---
<!-- _class: divider -->
# Lab

Generate Terraform and Bicep, secure the supplied Terraform, and compare approved Space context with a normal prompt. Do not provision cloud resources.
