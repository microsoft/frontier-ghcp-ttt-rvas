# Expected output

Your wording will differ. Check the structure and the choices.

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

## Check

- #437, #441 and #443 are left out (dependency bump, refactor, typo).
- #440 appears under both Changed and Upgrade notes.
- The version and date came from you. A good run asks for them.
- Older entries are unchanged.

## After the outcome-focused revision

The entry above is the first-run reference. After the Part 5 revision, the entry should lead with outcomes and keep the same facts.

| PR-focused | Outcome-focused |
| --- | --- |
| Cache product lookups for 60 seconds. (#445) | Product pages load faster: median load time dropped from 480 ms to 190 ms. (#445) |

The first-run entry already reads this way in places. Keep lines that work. The entry must still name the `state` to `status` rename, the 3.0 deadline, and the deprecation warning. Don't add benefits the PR descriptions don't support.

[`release-notes/evals/evals.json`](release-notes/evals/evals.json) is the starting eval set. It has no run results. Before the second run, add the outcome expectation from lab Part 5.

## Test prompts and expected behavior

| Prompt | Expected |
| --- | --- |
| "Write release notes for the PRs in merged-prs.md. Version 2.4.0, dated 2026-10-21." | The skill loads and the entry follows the format above. |
| "Write a commit message for the CSV export change." | The skill stays out. |
| "What changed recently?" | Ambiguous. Note whether it loads, then decide if the description needs a trigger phrase. |
| "Write release notes for the PRs in merged-prs.md." | The skill loads and asks for the missing version and date before drafting. |
