---
description: |
  This workflow turns strategic planning findings into actionable GitHub issues.
  It analyzes repository state, creates every needed non-duplicate planning issue,
  and leaves implementation decisions to maintainers in those issues.

on:
  schedule:
    - cron: "0 9 1 * *"
  workflow_dispatch:

permissions:
  actions: read
  attestations: read
  checks: read
  contents: read
  deployments: read
  issues: read
  models: read
  packages: read
  pages: read
  pull-requests: read
  repository-projects: read
  security-events: read
  statuses: read
  copilot-requests: write

network: defaults

safe-outputs:
  noop:
    report-as-issue: false
  create-issue:
    title-prefix: "[plan] "
    max: 20

tools:
  bash: true
  github:
    toolsets: [repos, issues, pull_requests]
    # If in a public repo, setting `lockdown: false` allows
    # reading issues, pull requests and comments from 3rd-parties
    # If in a private repo this has no particular effect.
    lockdown: false
    min-integrity: none # This workflow is allowed to examine and comment on any issues
  web-fetch:

timeout-minutes: 15
source: githubnext/agentics/workflows/plan.md@1c6668b751c51af8571f01204ceffb19362e0f66
---

# Agentic Issue Planner

## Job Description

Your job is to identify the remaining work for the GitHub repository ${{ github.repository }} and create actionable issues for it. Do not create, update, read, or comment on GitHub Discussions.

This repository contains a GitHub Copilot and Agentic Workflows train-the-trainer curriculum published as a MkDocs Material site. Planning should focus on curriculum completeness, session quality, labs, trainer enablement, tracks, site build/deployment reliability, and GitHub automation. Treat `curriculum-plan.md`, `tracks/`, `sessions/session-*`, `mkdocs.yml`, and `.github/workflows/` as core planning inputs.

1. First study the state of the repository, including open issues, pull requests, and closed issues.

   1a. Search open issues and all closed issues for each potential item of work. For potentially similar closed issues, retrieve the issue details and determine why they were closed.

   1b. You can read code, search the web, and use other tools to help you understand the project and its requirements.

2. Identify the work needed to achieve the objectives of the project. Suggest and create an issue if and only if it provides demonstrable incremental value beyond the repository's current state and existing or previously dismissed work. Each item must be independently actionable and contain enough context for maintainers to decide whether to implement it. If incremental value cannot be clearly evidenced, do not create an issue.

   2a. Before creating an issue, search for an equivalent or materially similar issue by title, keywords, and intent. Do not create an issue when:
   - an open issue already covers the work;
   - a closed issue was dismissed, declined, or closed as not planned for the same or materially similar work; or
   - the item is only a duplicate, a restatement, or a sub-part of an existing issue.

   2b. Treat a prior dismissal as a decision not to reopen the topic. Only create a new issue if repository evidence demonstrates a substantive change in requirements or circumstances. In that case, explain the change and link the dismissed issue in the new issue body.

   2c. For every remaining non-duplicate item, create one issue using `create_issue`. Create issues individually, not as a summary or a checklist in another issue. Do not create placeholder, umbrella, or planning-summary issues.

3. Each issue must have:
   - a concise, decision-oriented title;
   - the problem or opportunity and relevant repository evidence;
   - a proposed outcome and clear, bounded scope;
   - acceptance criteria or specific decision questions;
   - priority and dependencies, when supported by evidence; and
   - links to related issues only when they are genuinely related.

4. Do not create a Discussion, post a planning summary, add a comment, or provide `gh` commands instead of creating the issues. The created issues are the sole planning output for maintainers to review and decide whether to implement.
