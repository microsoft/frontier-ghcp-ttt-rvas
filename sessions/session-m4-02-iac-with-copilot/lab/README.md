# Session M4-02 lab: A VPC and a bucket with Copilot

**Duration:** 90 minutes
**Deliverable:** A `baseline` Terraform module that passes `terraform validate`, a saved plan, a clean `trivy` scan for HIGH and CRITICAL findings, and a Bicep file that builds

## Lab overview

You build a small AWS setup with Copilot: one **VPC** (a private network), two subnets, and one S3 bucket. You run `init`, `validate`, and `plan`. You never run `apply`, and you need no AWS account.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Read the starter | 10 min |
| 2 | Build the module with Copilot | 20 min |
| 3 | Run `fmt`, `init`, `validate`, `plan` | 15 min |
| 4 | Catch what Copilot got wrong | 10 min |
| 5 | Add an admin rule, scan, fix | 20 min |
| 6 | The same thing in Bicep | 10 min |
| 7 | Decide | 5 min |

## Before you start

You need:

- GitHub Copilot in the Copilot CLI or your IDE's agent mode
- [Terraform](https://developer.hashicorp.com/terraform/install) 1.5 or later
- [Trivy](https://trivy.dev/latest/getting-started/installation/) (for example `brew install trivy`)
- The Azure CLI with Bicep for Part 6 (`az bicep install`)

Check them with `terraform version`, `trivy --version`, and `az bicep version`.

Terraform and Trivy download a provider and a rule set on first run, so you need internet access. Everything else runs locally.

```bash
mkdir -p ~/copilot-labs/session-m4-02
cp -R sessions/session-m4-02-iac-with-copilot/lab/starter ~/copilot-labs/session-m4-02/iac
cd ~/copilot-labs/session-m4-02/iac
git init -q && git add -A && git commit -qm "Start"
```

## Part 1: Read the starter

Read the files before you prompt.

| File | What it is |
| --- | --- |
| `main.tf` | Provider setup and one **module** call. The provider block skips credential checks so `plan` works offline. |
| `variables.tf` | **Variables**: the inputs, with defaults. |
| `outputs.tf` | **Outputs**: values the root shows after a run. |
| `modules/baseline/` | Empty. Copilot fills it in Part 2. |
| `.github/copilot-instructions.md` | Terraform rules Copilot reads on every request. |

Answer in your own words:

1. Which file sets the CIDR block (the address range) of the VPC?
2. How does the module get its inputs? Where do its outputs go?
3. What do the instructions forbid?

**Checkpoint:** You can say what a resource, variable, output, and module are, using this project as the example.

## Part 2: Build the module with Copilot

Start `copilot` in the project, or open agent mode. Give it the architecture, the constraints, and the naming. Do not say "make me a VPC".

```text
Write the Terraform module in modules/baseline. The root main.tf already calls it.

Architecture:
- One VPC using var.vpc_cidr
- Two private subnets, one per zone in var.zones. Derive their CIDRs from the VPC CIDR with cidrsubnet. No public IPs.
- One S3 bucket for application data

Constraints:
- Bucket: block all public access, enable versioning, enable server-side encryption.
- Name every resource ${var.name_prefix}-<purpose>. Tag every resource with var.tags.
- Define the module's variables in variables.tf and its outputs in outputs.tf.
  The outputs are vpc_id, subnet_ids, and bucket_name, as the root outputs.tf expects.
- Hardcode nothing that belongs in a variable.
- Use only arguments that exist in the hashicorp/aws 5.x provider. Say so if you are unsure.
- Do not run terraform apply.
```

Read the diff before you accept it. Look for hardcoded CIDRs, names, or zones, and for arguments you do not recognize.

**Checkpoint:** The module has `main.tf`, `variables.tf`, and `outputs.tf`. You know which variable feeds each resource.

## Part 3: Run the Terraform workflow

Run these in order:

```bash
terraform fmt -recursive
terraform init
terraform validate
terraform plan -out=tfplan
```

- `fmt` fixes style.
- `init` downloads the AWS provider and loads the module.
- `validate` checks syntax and references. It does not call AWS.
- `plan` shows what Terraform would create.

If `validate` fails, paste the error into Copilot and ask for a fix. Check that the fix does not just delete the failing line.

Read the plan. Find your VPC, two subnets, and the bucket settings. `terraform show tfplan` prints it again.

**Checkpoint:** `validate` passes. The plan ends with `Plan: N to add, 0 to change, 0 to destroy.` You can explain each resource in it.

> A plan is a prediction. `validate` and `plan` do not catch a wrong CIDR, an unwanted cost, or a setting that is legal but unsafe.

## Part 4: Catch what Copilot got wrong

Copilot's Terraform often looks right and is not. Check your module:

| Problem | How to check |
| --- | --- |
| **Invented argument** | `validate` fails with `Unsupported argument`. |
| **Old style** | Bucket settings written inside `aws_s3_bucket` (`acl`, `versioning`, `server_side_encryption_configuration` blocks). In provider 5.x they are separate resources. |
| **Hardcoded value** | Search for quoted `10.`, `eu-west`, or a literal bucket name. |
| **Missing tags or names** | Read `terraform show tfplan` against the naming rule. |
| **Old provider version** | Compare the `version` line in `main.tf` with the [provider docs](https://registry.terraform.io/providers/hashicorp/aws/latest). The lab pins `~> 5.0` on purpose, so a newer major version is not a Copilot mistake. |

If you find a problem, name it when you ask Copilot to fix it. If you find none, ask:

```text
Which arguments in modules/baseline/main.tf are you least sure exist in
hashicorp/aws 5.x? Check each against the provider docs.
```

Re-run `terraform validate` after every fix.

**Checkpoint:** You fixed at least one problem or checked each row and found it clean. `validate` still passes.

## Part 5: Add an admin rule, scan, fix

Admins need SSH to future servers. Ask Copilot for the quick version:

```text
Add a security group named ${var.name_prefix}-admin to modules/baseline, in the VPC.
Allow SSH (port 22) in from anywhere so admins can connect from home.
```

Scan it:

```bash
trivy config --severity HIGH,CRITICAL .
```

Trivy reads the `.tf` files. It needs no `init` and no cloud account. Expect **AWS-0107** (HIGH): unrestricted ingress from any IP address. Older Trivy versions may also report **AWS-0132**: the bucket isn't encrypted with a customer-managed key. Rule IDs and severities change between Trivy versions, so fix what your run reports.

Ask Copilot to fix each finding:

```text
Fix this trivy finding. Add a variable ssh_allowed_cidrs with a description and a
default of ["10.0.0.0/16"]. Use it in the security group. Show me the diff.

<paste the finding>
```

If your run reports AWS-0132, ask for an `aws_kms_key` with key rotation, used in the bucket's encryption rule.

Run until clean:

```bash
trivy config --severity HIGH,CRITICAL --exit-code 1 .
terraform validate && terraform plan -out=tfplan
```

Then run `trivy config .` with no filter. LOW and MEDIUM findings remain, such as bucket logging and VPC flow logs. For each, decide: fix now, accept for the lab, or fix later.

**Checkpoint:** The HIGH and CRITICAL scan exits with code 0. `validate` and `plan` pass. The SSH range is a variable, not a literal.

## Part 6: The same thing in Bicep

**Bicep** is Azure's IaC language. Ask Copilot for the Azure equivalent of your module in one file:

```text
Write bicep/main.bicep with the Azure equivalent of the baseline module:
one virtual network with two subnets (cidrSubnet from a vnetCidr parameter) and one
storage account with public blob access off, HTTPS only, and TLS 1.2.
Use parameters with @description for names, region, and CIDR. Add tags.
```

Build it:

```bash
az bicep build --file bicep/main.bicep --stdout > /dev/null && echo "Bicep builds"
```

`az bicep build` compiles Bicep to an ARM template and reports errors. It needs no Azure login.

Answer in one sentence each:

1. Which Terraform concept matches `param`, `resource`, and `output`?
2. What did you not write in Bicep that Terraform needed? (Hint: provider setup.)

**Checkpoint:** `az bicep build` succeeds. You can name one thing both tools share and one that differs.

## Part 7: Decide

Write short answers:

1. Which prompt rule prevented the most mistakes?
2. What will you always check by hand after Copilot writes IaC?
3. What would you run in CI so nobody has to remember?

## Final deliverable

Keep in your lab folder:

- `modules/baseline/` that passes `terraform validate`
- `tfplan` from `terraform plan -out=tfplan`
- A passing `trivy config --severity HIGH,CRITICAL --exit-code 1 .` run
- `bicep/main.bicep` that builds with `az bicep build`
- Your answers from Part 7

Compare with `lab/solution/` last. Your resources can differ if the checks pass.
