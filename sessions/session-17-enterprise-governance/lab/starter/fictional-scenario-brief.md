# Fictional Scenario Brief: Repository Review Trial

**All names, repositories, tasks, and observations in this scenario are
synthetic.**

## Proposal

A software team wants to run a two-week code-review trial in
`training-review-sandbox`. The repository contains synthetic task records and a
small sample application.

The workflow reviews one synthetic pull request at a time against written
acceptance criteria. An engineering lead makes the final review decision.

## Confirmed scenario facts

| Field | Fact |
| --- | --- |
| Repository | `training-review-sandbox` |
| Duration | Two weeks or 10 reviewed tasks |
| Data | Synthetic task records only |
| Workflow | Review one synthetic pull request at a time |
| Tool boundary | Approved repository assistant only |
| Reviewer | Engineering lead |
| Meter | Trainer-maintained automated-run counter |
| Stop guard | Pause at 20 automated runs |
| Fallback | Human review with the same acceptance checklist |

## Outside scope

- production repositories;
- customer or employee data;
- deployment;
- external MCP servers;
- live administrator-setting changes;
- commercial or licensing conclusions.

## Live evidence requests

The platform administrator must confirm current feature access and relevant
settings before any live use. The data owner must confirm the repository
classification before the scenario moves beyond training.
