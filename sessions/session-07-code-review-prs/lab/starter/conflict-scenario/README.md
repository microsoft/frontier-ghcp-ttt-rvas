# Merge Conflict Scenario — Trainer Setup Guide

**Used in:** Session 07 conflict-resolution exercise

## Access and cost preflight

Use Enterprise Cloud as the governance baseline. Verify current official GitHub documentation and the customer administrator policy before a live demonstration. For metered work, define a customer-owned threshold, escalation route, and stop guard.

## No-access fallback

Use this scenario for manual conflict resolution and peer review in the repository sandbox.

## Scenario

Two branches modify `src/utils.js`:

- **Branch A (`feature/date-formatting`):** adds `formatDate()`.
- **Branch B (`feature/price-formatting`):** changes `formatPrice()` to accept a currency code.

Preserve both intended behaviors. Do not choose a branch by default.

## Manual exercise

1. Create the two branches from the starter repository.
2. Make the described changes independently.
3. Merge one branch into the other and inspect the conflict.
4. Read both intentions and write the desired merged behavior.
5. Resolve the file manually.
6. Add or update focused tests.
7. Request peer review before completing the exercise.

## Optional live demonstration

After verifying current official GitHub documentation and customer policy, a trainer may demonstrate an approved assisted workflow. Compare its proposal with the manual result and tests. A human reviewer makes the final decision.
