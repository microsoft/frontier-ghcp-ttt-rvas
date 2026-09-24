---
name: replace-with-directory-name
description: State the matching task, paths, required preconditions, and important non-matching tasks.
---

# Skill name

## Preconditions

- Name required repository state, inputs, permissions, and reviewer.
- Stop when any required item is missing.

## Procedure

1. Read the named source and tests.
2. Map acceptance criteria to observable evidence.
3. Make the smallest permitted change.
4. Run the verified focused check.
5. Report results and request review.

## Validation

Name the exact test, manual check, and evidence needed for success.

## Failure behavior

- Stop outside the stated scope.
- Surface command failures.
- Do not claim success when validation did not run.

## Maintenance

Name the owner, fallback, and events that require review.
