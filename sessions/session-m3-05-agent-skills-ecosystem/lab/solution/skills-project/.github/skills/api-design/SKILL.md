---
name: api-design
description: Use for creating or reviewing REST routes under src/api/ when acceptance criteria, a reviewer, and a verified focused test command are available. Do not use for documentation, UI, deployment, or generated clients.
---

# API design

## Preconditions

- The task names one REST route under `src/api/`.
- Acceptance criteria define success and failure behavior.
- A human reviewer is assigned.
- The repository has a verified focused test command.

If any precondition is missing, stop and report the missing item. Do not infer a
repository convention or claim that validation ran.

## Procedure

1. Read the target route and adjacent tests.
2. Map each acceptance criterion to success or failure evidence.
3. Preserve the repository's current response and error shapes.
4. Validate input at the route boundary.
5. Make the smallest route and focused-test change.
6. Run the verified focused test command.
7. Report changed files, test output, and unresolved gaps.
8. Request human review.

## Validation

The run is complete only when the focused test command passes and the reviewer can
trace every assertion to an acceptance criterion. If the command fails, show the
failure and do not report success.

## Failure behavior

- Stop when the task is outside `src/api/`.
- Stop when acceptance criteria, a reviewer, or the test command is missing.
- Do not add a dependency, call a network service, or change deployment files.
- Do not replace a failed command with a manual success claim.

## Maintenance

Owner: `training-maintainers`

Review this skill when route conventions, test commands, or supported skill
frontmatter change. Use the same procedure as a manual checklist when an approved
surface cannot load the skill.
