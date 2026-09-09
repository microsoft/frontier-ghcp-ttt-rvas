# Using Copilot Spaces for IaC

Create a Space only when the selected sources and custom instructions are approved.

## Sources

Add the Terraform modules from Exercise 1, Bicep templates from Exercise 2, existing infrastructure documentation, approved AWS or Azure documentation, architecture decisions, and security checklists. Do not add sensitive values.

## Instructions

```text
Use current stable provider and API versions. Follow approved security guidance.
Tag resources with Environment, Project, ManagedBy, and Owner. Use modules and
variables for configurable values. Describe variables and outputs. Encrypt data
stores, block public storage access, use least-privilege network rules, and add
storage lifecycle policies.
```

## Compare

Ask the Space for a versioned, KMS-encrypted S3 bucket with lifecycle rules and blocked public access. Generate the same request outside the Space. Record whether each result has required tags, variable descriptions, current versions, encryption, public-access blocking, and clear comments.

Use the Space to review `insecure-iac/main.tf` or translate an approved Terraform module to Bicep only after you validate its sources and output.
