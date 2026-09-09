# Reversible Governance Rollout — Example

This example decision record does not determine commercial terms, entitlement, legal, security, privacy, or compliance status. Before delivery, the customer checks current GitHub documentation and administrator policy.

## Scope and owners

| Item | Example decision |
| --- | --- |
| Repository | A non-sensitive repository sandbox |
| Bounded task | Add tests for an existing utility with explicit acceptance criteria |
| Engineering owner | Team lead |
| Administrator | Customer-designated administrator |
| Data owner | Repository owner |
| Other reviewers | Customer-designated security, privacy, legal, and finance contacts |

## Start gate

- The team records its current documentation and customer-policy checks.
- The repository owner confirms the sandbox classification.
- The administrator confirms the approved workflow and permissions.
- A reviewer defines acceptance criteria and a manual baseline.
- The training lead records a manual fallback before the trial begins.

## Metered-work guardrail

| Item | Example decision |
| --- | --- |
| Meter | The customer-selected current measurement source |
| Observation window | A bounded trial period |
| Threshold | Customer-defined |
| Escalation | Training lead to the designated customer owner |
| Stop condition | Pause automated work and begin the manual fallback |
| Manual fallback | Implement and review the same test change without the automated workflow |

## Continue, expand, or pause

| Gate | Example evidence |
| --- | --- |
| Continue | The task meets acceptance criteria and the reviewer accepts the change. |
| Expand | Required customer owners accept quality, safety, review, and usage evidence. |
| Pause | Policy, data, quality, or measurement uncertainty remains. |

## Decision record

Record the evidence, trial limits, and next customer-owned decision. Check current GitHub documentation and administrator policy again before changing scope.
