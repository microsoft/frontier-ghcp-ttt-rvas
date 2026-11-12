# Terraform rules for this project

- Use Terraform 1.5 or later and `hashicorp/aws` `~> 5.0`.
- Put every resource in `modules/baseline`. Do not edit the root files unless asked.
- Name resources `${var.name_prefix}-<purpose>`. Apply `var.tags` to every resource that supports tags.
- Use variables for CIDRs, names, and zones. No hardcoded values in resources.
- Every variable needs a `description` and a `type`. Every output needs a `description`.
- Use only resource arguments you are sure exist in the AWS provider 5.x docs. If unsure, say so.
- Never write secrets, keys, or passwords into `.tf` files.
- Do not run `terraform apply`.
