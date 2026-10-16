# Session m2-03: Copilot Spaces & context management

**Module:** Copilot in Practice
**Difficulty:** Intermediate
**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-02
**Duration:** 3 hours (1 hr trainer content + 2 hr lab)

## Overview

Give Copilot the context a task needs. Learners use one Storefront API to select Space sources, add repository instructions, compare context levels, and store reusable prompts.
They inspect CLI `/env` and `/instructions` to find and correct a stale
module-style instruction before implementation.

## Learning outcomes

- Create Copilot Spaces for team workflows
- Write project-level and user-level custom instructions
- Create reusable prompt files for team standards
- Explain how instructions, Spaces, and Memory work together
- Review and update context as a project changes
- Distinguish instruction discovery, file scope, and observed model behavior
- Choose the smallest source set that supports a task and check claims against it

## Session materials

| Resource                | Location                               |
| ----------------------- | -------------------------------------- |
| Lab exercises           | [`lab/`](lab/)                         |
| Lab starter files       | `lab/starter/`         |
| Lab solution files      | `lab/solution/`       |

## Key topics

- Copilot Spaces: selected context sources
- `.github/copilot-instructions.md`: project-level instructions
- `.github/prompts/*.md`: reusable prompt files
- VS Code instruction settings
- Context selection as a policy-approved workflow
- Before/after context comparison
- Runtime instruction inspection in the standalone CLI; stop if it is unavailable
