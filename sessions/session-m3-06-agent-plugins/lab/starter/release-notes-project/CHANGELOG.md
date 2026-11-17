# Changelog

## 2.3.0 (2026-09-30)

**Highlights:** Faster order search and a fix for duplicate invoices.

### Added
- Order search filters by status and date range. (#412)

### Changed
- Search results load 3x faster on large accounts. (#418)

### Fixed
- Duplicate invoices no longer appear after a payment retry. (#421)

### Upgrade notes
- None.

## 2.2.1 (2026-09-12)

**Highlights:** Security patch for the export endpoint.

### Fixed
- Export links expire after 15 minutes. (#401)

### Upgrade notes
- Clients that cache export links must request a new link per download.
