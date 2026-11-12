# Merged since 2.3.0

Synthetic data for the lab.

| PR | Title | Label | Description |
| --- | --- | --- | --- |
| #433 | Add CSV export for order history | feature | Users can export up to 10,000 orders as CSV from the Orders page. |
| #436 | Fix wrong tax on refunds over $1,000 | bug | Refunds above $1,000 used the pre-discount total. Affects invoices created since 2.2.0. |
| #437 | Bump express to 4.21.2 | dependencies | Routine update. No API change. |
| #440 | Rename `GET /orders?state=` to `?status=` | breaking | `state` still works until 3.0 and logs a deprecation warning. |
| #441 | Refactor order service into modules | chore | Internal only. No behavior change. |
| #443 | Fix typo in settings page | docs | Corrects "Notfications" to "Notifications". |
| #445 | Cache product lookups for 60 seconds | performance | Cuts median product page load from 480 ms to 190 ms. |
