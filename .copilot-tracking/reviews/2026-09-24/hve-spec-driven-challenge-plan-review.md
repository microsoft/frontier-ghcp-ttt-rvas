<!-- markdownlint-disable-file -->

# HVE spec-driven challenge plan review

## Metadata

* Plan: `.copilot-tracking/plans/2026-09-24/hve-spec-driven-challenge-plan.instructions.md`
* Reviewer: GitHub Copilot
* Date: 2026-09-24

## Request fulfillment

| Request | Status | Evidence |
|---------|--------|----------|
| Create a feature branch | Complete | `feature/hve-spec-driven-development-track` |
| Add an HVE spec-driven track and challenge | Complete | `tracks/hve-challenge.md` and `sessions/session-20-hve-challenge/` |
| Keep the HVE showcase read-only | Complete | Source checkout is clean on `main` |
| Adapt the useful workflow parts | Complete | Session 20 follows the repository session contract |
| Map source scenarios to track tasks | Complete | Lab source-demo-to-task map covers demos 01 through 07 |
| Avoid local package downloads | Complete | Existing dependencies and remote ACR validation only |
| Containerize the solution | Complete | Tested multi-stage Azure Linux container with non-root runtime |

## Validation

* Starter: 1 test passed
* Reference solution: 13 tests passed
* Session format validator: `Ready`
* Node session and slide checks: passed
* ACR build `dth`: `Succeeded` with `--no-push`
* Build dependency audits: zero vulnerabilities
* Source HVE repository: clean
* Target whitespace check: passed

## Remaining checks

* Full Python collection is blocked because the active test interpreter lacks
  `jinja2`; the other installed interpreter lacks `pytest`.
* Markdown lint is blocked because `markdownlint-cli2` is not installed.
* Strict MkDocs is blocked because neither existing Python environment includes
  `mkdocs`.
* VS Code reports a duplicate-healthcheck diagnostic even though the Dockerfile
  contains one `HEALTHCHECK` and ACR accepted the image. This is an inherited
  image metadata warning, not a duplicate instruction in the file.

## Overall status

Complete with CI-only documentation and site checks remaining. No local package
installation is required or permitted for this branch.