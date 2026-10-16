# Repair log

Copy this file to `repair-log-working.md`.

| Order | Failure | Error or output | Hypothesis | Small change | Check command | Result |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `SYN-01` |  |  |  |  |  |
| 2 | `SYN-02` |  |  |  |  |  |
| 3 | `IMP-01` |  |  |  |  |  |
| 4 | `IMP-02` |  |  |  |  |  |
| 5 | `LOG-01` |  |  |  |  |  |
| 6 | `LOG-02` |  |  |  |  |  |
| 7 | `LOG-03` |  |  |  |  |  |
| 8 | `STATE-01` |  |  |  |  |  |
| 9 | `DESIGN-01` |  |  |  |  |  |

## Assumptions checked

- [ ] Expected output files remained unchanged.
- [ ] Each repair addressed one named failure.
- [ ] Added tests cover a boundary or past defect.
- [ ] Refactoring started only after tests passed.

## Code intelligence before refactoring

- CLI version and configured Python server:
- `/lsp test python` result:
- Actual definition/reference operation or log entry:
- `severity_for` definition and returned references:
- Locations checked against the source:
- Inline duplicate rule found outside those references:
- Accepted `/plan` and checks protecting each move:
- Final test and fixture comparison results:

Do not infer that a rule has no duplicate just because LSP found no other callers.
