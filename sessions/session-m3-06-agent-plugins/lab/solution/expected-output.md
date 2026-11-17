# Expected output

Your wording will differ. Check the structure and the choices.

## Part 1: inventory

`/plugin list` shows no `release-kit`. `/skills list` has no `release-notes`. `/agent` has no `release-reviewer`.

## Part 3: skill output

Same checks as M3-05:

```markdown
## 2.4.0 (2026-10-21)

**Highlights:** CSV export for order history and faster product pages.

### Added
- Export up to 10,000 orders as CSV from the Orders page. (#433)

### Changed
- Product pages load faster: median load time dropped from 480 ms to 190 ms. (#445)
- `GET /orders?state=` is now `?status=`. The old name still works until 3.0. (#440)

### Fixed
- Refunds over $1,000 no longer use the pre-discount total for tax. Affects invoices created since 2.2.0. (#436)

### Upgrade notes
- Switch API clients from `?state=` to `?status=` before 3.0. The old name logs a deprecation warning.
```

- #437, #441 and #443 are left out.
- #440 appears under Changed and under Upgrade notes.

## Part 3: reviewer output

With #437 added under Changed and the #440 upgrade note removed, a good review has two findings:

- `#437` is a dependency bump and doesn't belong in a user-facing section. Remove the line.
- `#440` is a breaking change with no entry under **Upgrade notes**. Add the action: switch clients to `?status=`.

Asked to fix the entry, the agent declines and suggests the `release-notes` skill.

## Plugin names

| Item | Name you see |
| --- | --- |
| Plugin ID | `release-kit@team-tools` |
| Agent | `release-kit:release-reviewer` |
| Skill | `release-notes` |

## Part 6: rollout answers

1. Copilot installs `release-kit` if it's missing and turns it on in that repository only.
2. Yes. Repository defaults can be turned off with an explicit entry in the teammate's own repository-local settings.
3. The organization. Managed settings that require or block a plugin win, and local settings can't change them.
4. Settings files use the `plugin@marketplace` ID. A rename breaks every reference to it.
