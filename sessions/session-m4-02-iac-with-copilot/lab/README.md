# Session M4-02 lab: Terraform from modules to security gate

**Deliverable:** Validated Terraform modules, a repaired security case, and command output

## Lab overview

You connect Terraform modules, validate the project locally, and repair an intentional security failure.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Read the module contract | 10 min |
| 2 | Build and connect the modules | 35 min |
| 3 | Initialize and validate | 15 min |
| 4 | Investigate the intentional security failure | 20 min |
| 5 | Record command output and review limits | 10 min |

## Before you start

You need GitHub Copilot and Terraform 1.5 or later with the provider source. No cloud account, credentials, state backend, plan, or apply.

```bash
terraform version
terraform fmt -check -recursive lab/starter/terraform
```

Expected: Terraform 1.5 or later, and the supplied files are formatted.

## Part 1: Read the module contract

Open `lab/starter/terraform/`. Keep the supplied architecture:

- VPC `10.0.0.0/16`;
- two public, two private application, and two private database subnets;
- an internet-facing load balancer;
- private application instances;
- an encrypted, private PostgreSQL database;
- database ingress only from the application security group.

**Checkpoint:** List the root inputs and the outputs that connect network to compute and compute to database.

## Part 2: Build and connect the modules

Create the missing module files:

```text
modules/network/
modules/compute/
modules/database/
```

Use typed variables and narrow outputs. Keep the database password sensitive. Compare with `lab/solution/terraform/` only after your first draft.

```bash
terraform fmt -check -recursive lab/starter/terraform
```

The supplied files pass. If your generated files fail, run `terraform fmt -recursive lab/starter/terraform` and check again.

**Checkpoint:** Record the format result and any files Terraform changed.

## Part 3: Initialize and validate

```bash
terraform -chdir=lab/starter/terraform init -backend=false
terraform -chdir=lab/starter/terraform validate
```

Expected: initialization downloads the provider and validation reports `Success! The configuration is valid.`

If validation fails, fix the first reported module contract error and rerun. Don't add provider credentials to make it pass.

**Checkpoint:** Record the provider version, the validation result, and any contract error you repaired.

## Part 4: Investigate the intentional security failure

```bash
bash lab/starter/check-security.sh lab/starter/insecure-iac/main.tf
```

Expected failure: exit code 1, with findings such as public access, a hardcoded password, wildcard IAM access, missing database encryption, or missing load-balancer logging.

Repair `lab/starter/insecure-iac/main.tf` before opening the solution. Use the architecture to address the findings, then check:

```bash
bash lab/starter/check-security.sh lab/starter/insecure-iac/main.tf
terraform fmt lab/starter/insecure-iac/main.tf
terraform fmt -check lab/starter/insecure-iac/main.tf
terraform -chdir=lab/starter/insecure-iac init -backend=false
terraform -chdir=lab/starter/insecure-iac validate
```

Expected: the security gate and Terraform validation pass. Then compare with `lab/solution/secure-iac/main.tf`.

**Checkpoint:** Record the failing exit code, each cited line, the repaired file, and the passing rerun. Passing this gate doesn't mean the configuration is safe to deploy.

## Final deliverable

1. The Terraform root module and three modules.
2. Clean formatting and validation output.
3. Output from the failing security check and the passing rerun.
4. A short note on what still needs a plan, a cloud policy review, and human sign-off before deployment.

## Optional extension: Bicep comparison

The trainer may show `lab/solution/bicep/`. If you have Azure CLI with Bicep and time left:

```bash
az bicep build --file lab/solution/bicep/main.bicep
```

Compare module inputs, outputs, secure parameters, and local compilation with the Terraform project.
