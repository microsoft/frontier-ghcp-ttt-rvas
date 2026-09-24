# Reference solution

This solution treats the weekly status workflow as draft only. The first manual run
excludes one invalid source record. An approved input change fixes the record, and
the same automation runs again so the reviewer can compare evidence.

| File | Purpose |
| --- | --- |
| `automation-contract.md` | Approved workflow boundary |
| `run-evidence.json` | Completed evidence packet |
| `run-output.md` | Reviewed status draft |
| `run-evidence-2.json` | Evidence after the approved input change |
| `run-output-2.md` | Second reviewed status draft |
| `approval-record.md` | Human decision |
| `stakeholder-update.md` | Final communication |
