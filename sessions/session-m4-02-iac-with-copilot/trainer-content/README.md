# Session M4-02 trainer guide: Infrastructure as code with Copilot

## Teaching goal

Learners leave knowing what IaC is, what the Terraform words mean, how to prompt Copilot for IaC, where Copilot goes wrong, and how a static scan catches some of it.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | What IaC is and why |
| 0:08 to 0:20 | Terraform in plain words, including state |
| 0:20 to 0:25 | Networking terms |
| 0:25 to 0:37 | Prompting Copilot for IaC |
| 0:37 to 0:45 | Where Copilot is weak |
| 0:45 to 0:55 | Demo: prompt, plan, scan |
| 0:55 to 1:00 | Bicep, pros and cons, lab handoff |

## Preparation

- Install Terraform 1.5+, Trivy, and the Azure CLI with Bicep. Run `terraform version`, `trivy --version`, `az bicep version`.
- Copy `lab/starter` to a scratch folder and run the lab once. Keep `lab/solution/` open for comparison.
- Run `terraform init` and `trivy config .` once before the session. Both download files on first use.
- Leave AWS credentials unset. The starter's provider block makes `plan` work without them.
- Do not commit `.terraform/` or `.terraform.lock.hcl` from scratch runs into this folder.

## What IaC is and why (0:00 to 0:08)

- IaC means infrastructure described in files and built by a tool.
- Four reasons: review, repeat, undo, scan. Ask who has debugged a setup nobody remembers clicking.
- Terraform works across clouds. Bicep is Azure-only.

## Terraform in plain words (0:08 to 0:20)

Use the lab starter as the example. Open each file and point at the word.

| Word | Plain meaning | Where to see it |
| --- | --- | --- |
| Resource | One thing to create | `modules/baseline/main.tf` in the solution |
| Variable | An input | `variables.tf` |
| Output | A value shown or passed on | `outputs.tf` |
| Module | A folder you call like a function | `module "baseline"` in `main.tf` |
| Provider | Plugin for a cloud | `required_providers` |
| State | Terraform's record of what it built | Created by `apply`, not by `plan` in this lab |
| Plan | Preview of changes | `terraform plan` |

**State needs its own two minutes.** Say: Terraform compares your code to state and plans the difference. State can hold secrets, so it stays out of git. Teams use remote state with locking. This lab never applies, so no state file appears.

Walk through `fmt`, `init`, `validate`, `plan`, and say that `apply` is where money starts.

## Networking terms (0:20 to 0:25)

Define in one sentence each: VPC, CIDR, subnet, private subnet, security group, `0.0.0.0/0`. Draw the lab architecture on a slide or board. Show that `cidrsubnet("10.0.0.0/16", 8, 1)` is `10.0.1.0/24`.

## Prompting Copilot for IaC (0:25 to 0:37)

Teach the five parts: architecture, constraints, naming and tags, variables not literals, limits. Show the weak and strong prompts side by side. Run the weak one if time allows and list what it hardcodes.

Show `.github/copilot-instructions.md` from the starter. Rules you repeat in every prompt belong there.

Say: **the plan is the review point.** Copilot drafts. You read the plan.

## Where Copilot is weak (0:37 to 0:45)

| Weakness | What to say |
| --- | --- |
| Invented arguments | It writes arguments that sound right. `validate` catches them. |
| Old provider and syntax | Older examples dominate. In AWS provider 5.x, bucket versioning and encryption are separate resources. |
| Insecure defaults | It writes what works fast: open ingress, no encryption. |
| Hardcoded values | Literals are shorter than variables. |
| Wrong architecture | Valid code does not mean the right design. |

Ask it: "Which arguments are you least sure about?" It often names real doubts. Treat the answer as a lead, not proof.

## Demo: prompt, plan, scan (0:45 to 0:55)

1. Prompt with all five parts in the starter. Read the diff aloud.
2. Run `terraform fmt -recursive`, `init`, `validate`, `plan`.
3. Prompt: "Add a security group named ${var.name_prefix}-admin that allows SSH from anywhere."
4. Run `trivy config --severity HIGH,CRITICAL .`. Read AWS-0107.
5. Ask Copilot to fix it with a variable. Scan again.

Copilot's output varies. If your run is already clean, the SSH prompt still produces the finding. Fall back to the solution if a prompt misfires.

## Scanner options

| Tool | Notes |
| --- | --- |
| Trivy (`trivy config`) | Reads `.tf` files directly. Also scans containers. Used in the lab. |
| Checkov | Python-based, many policies, can scan plans. |
| TFLint | Linter. Finds invalid instance types and provider-specific mistakes. Not a security scanner. |

Trivy rule IDs and severities change between releases. Say "check the output you see".

## Bicep comparison (0:55 to 1:00)

Show `lab/solution/bicep/main.bicep` next to the Terraform module. Map `param` to `variable`, `resource` to `resource`, `output` to `output`. Run `az bicep build --file main.bicep --stdout`. Bicep needs no provider block and no state file because Azure Resource Manager tracks deployments.

## Lab answer key

| Part | Expected |
| --- | --- |
| 1 | CIDR is in `variables.tf`. Inputs come from the module call. Outputs return to the root `outputs.tf`. No secrets, no `apply`. |
| 3 | `Plan: 9 to add` with the solution. Your count varies with how Copilot splits resources. |
| 4 | Common catches: bucket settings inline, hardcoded CIDRs, missing tags, old provider pin. |
| 5 | AWS-0107 on open SSH. AWS-0132 on bucket encryption without a customer-managed key. Fix with `ssh_allowed_cidrs` and `aws_kms_key`. |
| 6 | `az bicep build` passes. Terraform `variable` maps to `param`. No provider block or state in Bicep. |

LOW and MEDIUM findings left in the solution: bucket access logging (AWS-0089) and VPC flow logs (AWS-0178). Use them to discuss accepting a risk versus fixing it.

## Pros, cons, and tips

**Pros**

- Fast first drafts of standard resources
- Explains plans and errors in plain language
- Converts between Terraform and Bicep

**Cons**

- Invents arguments and picks old versions
- Writes insecure shortcuts when you ask for quick
- Does not know your organization's naming, tagging, or network rules

**Tips**

- Put rules in `.github/copilot-instructions.md`.
- Ask for variables up front.
- Run `validate` and a scan after every change.
- Name the finding when you ask for a fix. Paste the scanner output.
- Pin provider versions and read the changelog before you upgrade.

## Common mistakes

- Prompting for "a VPC" with no constraints
- Accepting code without reading the plan
- Committing `.terraform/`, state files, or plans
- "Fixing" `validate` by deleting the failing line
- Trusting a clean scan as proof of a safe design
- Using the lab's dummy provider credentials outside the lab

## References

Check the current docs before the session.

- [Terraform language documentation](https://developer.hashicorp.com/terraform/language)
- [Terraform AWS provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Trivy misconfiguration scanning](https://trivy.dev/latest/docs/scanner/misconfiguration/)
- [Bicep documentation](https://learn.microsoft.com/azure/azure-resource-manager/bicep/)
- [Repository custom instructions for Copilot](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
