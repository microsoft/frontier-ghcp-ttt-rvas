---
description: "Audit technical content for hallucinated URLs, library names, CLI commands, versions, and claims that may have drifted since authoring."
---

# Fact-Check Technical Content

You are running a **technical accuracy audit** on documentation, training
materials, or curriculum content. Your goal is to catch hallucinations and
stale references before they reach learners or customers.

This prompt is **reusable across any technical content** — not just GitHub
Copilot materials. Invoke it periodically or whenever upstream tools ship
breaking changes.

---

## Inputs

If not specified, ask:

1. **Scope** — file paths, glob patterns, or "all markdown in `sessions/`"
2. **Severity filter** — `all` (default), `breaking-only`, or `links-only`

---

## What to check

For every file in scope, flag anything matching these categories:

### 1. URLs and links

- **Dead links** — URLs that return 4xx/5xx or redirect to a generic 404 page.
- **Fabricated URLs** — domains or paths that look plausible but don't exist
  (e.g. `product.example.com/trust`, `docs.tool.dev/api/v3`). Verify by
  fetching or searching.
- **Stale docs links** — URLs that resolve but point to deprecated/archived
  pages with a banner like "This page has moved" or "No longer maintained."
- **Wrong fragment anchors** — `page#section` where the anchor doesn't exist.

### 2. Package and library names

- **Non-existent packages** — npm, PyPI, crate, gem, or other registry
  names that don't resolve. Search the registry.
- **Wrong scope/org** — e.g. `@wrong-org/real-package` vs the actual
  published scope.
- **Renamed packages** — packages that were renamed or transferred to a
  different org (still installable under the old name via redirect, but
  docs show the new name).
- **Deprecated packages** — explicitly marked deprecated on the registry
  with a recommended replacement.

### 3. CLI commands and flags

- **Non-existent subcommands** — e.g. `tool subcommand` where that
  subcommand was never added or was removed.
- **Fabricated flags** — flags like `--request-review` that don't exist
  on the command. Verify against `--help` output or official docs.
- **Removed/renamed commands** — commands that existed in a prior version
  but have since been removed, renamed, or moved behind a different binary.
- **Wrong syntax** — positional argument order, missing required args,
  deprecated option style (e.g. single-dash long options).

### 4. Version numbers and stats

- **Pinned versions** — content that claims "version X.Y.Z" when the
  current release is significantly different. Flag if >2 minor versions
  behind or if a major version bump occurred.
- **Fabricated version numbers** — versions that were never released
  (check release history / changelog).
- **Stale statistics** — star counts, download numbers, contributor counts,
  market share claims that are >6 months old. Note: flag for review, don't
  auto-correct (stats change daily).
- **Date claims** — "as of [date]" that is >6 months old, or dates that
  don't match reality (e.g. "released in 2024" when it was actually 2023).

### 5. API and configuration references

- **Non-existent config keys** — settings, environment variables, or
  config file fields that don't exist in the tool's schema.
- **Wrong file paths/names** — referencing a config file at a path that
  the tool doesn't recognize (e.g. `.tool/config.yml` when the tool reads
  `.toolrc`).
- **Deprecated API endpoints** — REST/GraphQL endpoints that have been
  versioned out or removed.
- **Wrong HTTP methods or payloads** — POST when it should be PUT, wrong
  request body shape.

### 6. Feature and product claims

- **Features attributed to wrong product/tier** — e.g. claiming a feature
  is in the free tier when it requires paid.
- **Non-existent features** — capabilities that were announced but never
  shipped, or that the AI hallucinated entirely.
- **Status claims** — "GA" when it's still Preview, "deprecated" when it's
  still active, "coming soon" for something already shipped.
- **Capability overstatement** — claiming a tool "does X automatically"
  when it only assists or suggests.

### 7. Keyboard shortcuts and UI paths

- **Wrong key combinations** — shortcuts that don't match the current
  version of the software (e.g. Ctrl+Shift+I vs Ctrl+Alt+I).
- **Outdated menu paths** — UI navigation that refers to renamed or
  reorganized menus/panels.
- **Platform-specific errors** — showing macOS shortcuts without noting
  they differ on Windows/Linux, or vice versa.

---

## How to verify

Use these strategies in order of reliability:

1. **Fetch the URL** — use web fetch tools to check if links resolve.
2. **Search official docs** — for CLI commands, config keys, and features.
3. **Search package registries** — npm, PyPI, crates.io, rubygems.org.
4. **Check GitHub repos** — for release tags, file existence, README claims.
5. **Search changelogs** — for version history, deprecation notices, renames.
6. **Cross-reference multiple sources** — if only one blog post mentions
   something but official docs don't, it may be hallucinated or deprecated.

**When in doubt, flag it.** It's better to surface a false positive for human
review than to let a hallucination through.

---

## Output format

Produce a single report with this structure:

```markdown
# Fact-Check Report — {date}

## Summary
- Files scanned: N
- Issues found: N (P0: N, P1: N, P2: N)
- Categories: {breakdown}

## P0 — Breaking / Embarrassing
Issues that would cause a learner to fail, a trainer to lose credibility,
or a command to error out.

| # | File:Line | Category | Claim | Problem | Suggested fix | Confidence |
|---|-----------|----------|-------|---------|---------------|------------|

## P1 — Stale / Misleading
Content that technically works but is outdated, uses deprecated names,
or could confuse someone checking official docs.

| # | File:Line | Category | Claim | Problem | Suggested fix | Confidence |
|---|-----------|----------|-------|---------|---------------|------------|

## P2 — Cosmetic / Low-risk
Minor version drift, soft stats, minor naming inconsistencies.

| # | File:Line | Category | Claim | Problem | Suggested fix | Confidence |
|---|-----------|----------|-------|---------|---------------|------------|

## Clusters
Claims repeated across multiple files that should be fixed as a batch.

## Unable to verify
Claims where no authoritative source could be found to confirm OR deny.
These need human judgment.
```

### Severity criteria

| Level | Definition | Examples |
|-------|-----------|----------|
| **P0** | Learner will hit an error, trainer will be publicly wrong, or content references something that doesn't exist | Dead URL in a lab step, non-existent CLI command, fabricated package name |
| **P1** | Content is outdated or misleading but doesn't cause hard failure | Deprecated flag that still works, old version number, renamed feature |
| **P2** | Minor drift unlikely to cause confusion | Star count off by 20%, date off by a month, minor formatting of paths |

### Confidence levels

For each finding, state your confidence:

- **HIGH** — verified by fetching/searching, clear evidence
- **MEDIUM** — strong signals but couldn't get definitive confirmation
- **LOW** — suspicious but unable to verify (surface for human review)

---

## Rules

- **Never silently skip a file.** If a file has no issues, say so explicitly.
- **Never invent fixes.** If you're unsure of the correct replacement, say
  `[NEEDS RESEARCH]` and describe what to look up.
- **Verbatim quotes only.** Include the exact text from the file, not a
  paraphrase.
- **Include line numbers.** Every finding must reference a specific location.
- **Don't fix anything in this phase.** This prompt is read-only analysis.
  Fixes are a separate step requiring human approval.
- **Account for change over time.** Something correct 6 months ago may be
  wrong today. Check the CURRENT state, not what was true at authoring time.
- **Prefer official sources.** A blog post from 2023 doesn't override
  current official docs. Changelogs > blog posts > community forums.
- **Flag patterns, not just instances.** If the same wrong URL appears in
  5 files, report it once as a cluster with all locations listed.
