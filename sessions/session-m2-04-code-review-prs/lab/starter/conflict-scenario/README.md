# Merge conflict scenario: Trainer setup guide

**Used in:** Session M2-04 conflict-resolution exercise

## Access and cost preflight

Follow the [course safety baseline](../../../../learning-safety-baseline.md). Set a
usage limit if the demonstration is metered.

GitHub pull-request and Copilot review access are required for the lab. Use this
scenario for the planned conflict-resolution exercise.

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

After checking the current GitHub docs, a trainer may demonstrate the assisted
workflow. Compare its proposal with the manual result and tests. A human reviewer
makes the final decision.
