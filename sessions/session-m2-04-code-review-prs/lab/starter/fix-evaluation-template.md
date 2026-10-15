# Fix Evaluation Template

## Copilot Review Analysis

Use this template for the local reviews and the private training PR. Preserve
your initial human verdict before running either local command.

## Review runs

| Pass | Command or surface | Diff scope | Result, including no findings |
| --- | --- | --- | --- |
| Initial | `/review` | | |
| Initial | `/security-review` | | |
| Initial | Copilot PR review | | |
| Correction | `/review` | | |
| Correction | `/security-review` | | |

## Finding triage

| Source | File and line | Claimed impact | Reproduction or code reference | Accept, reject, or unresolved | Reason | Fix and regression test |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

Record overlapping findings once and name each source. A maintainability comment
is not automatically a security vulnerability. A zero-findings result is not
proof that the change is secure.

---

### Comment 1

- **File & Line:**
- **Issue Copilot Found:**
- **Copilot's Suggested Fix:**
- **Is the diagnosis accurate?** (Yes / Partial / No)
- **Is the fix correct?** (Yes / Partial / No)
- **Would you apply this fix?** (Apply as-is / Modify then apply / Reject)
- **Notes:**

---

### Comment 2

- **File & Line:**
- **Issue Copilot Found:**
- **Copilot's Suggested Fix:**
- **Is the diagnosis accurate?** (Yes / Partial / No)
- **Is the fix correct?** (Yes / Partial / No)
- **Would you apply this fix?** (Apply as-is / Modify then apply / Reject)
- **Notes:**

---

### Comment 3

- **File & Line:**
- **Issue Copilot Found:**
- **Copilot's Suggested Fix:**
- **Is the diagnosis accurate?** (Yes / Partial / No)
- **Is the fix correct?** (Yes / Partial / No)
- **Would you apply this fix?** (Apply as-is / Modify then apply / Reject)
- **Notes:**

---

_(Copy this block for additional comments)_

---

## Summary

| Metric                                        | Count   |
| --------------------------------------------- | ------- |
| Total Copilot comments                        |         |
| Accurate diagnoses                            |         |
| Correct fixes (apply as written)              |         |
| Partially correct fixes (needed changes)      |         |
| Incorrect or unhelpful comments               |         |
| **False positives** (flagged non-issues)      |         |
| **False negatives** (missed real issues)      |         |

## Issues Copilot Found (of the 6 intentional)

- [ ] Unsafe SQL construction, distinguished from actual SQL execution
- [ ] Password exposure in API response
- [ ] Off-by-one pagination bug
- [ ] Missing error handling
- [ ] Synthetic hardcoded configuration, distinguished from a real credential leak
- [ ] Duplicate code (DRY violation)

## Overall Assessment

**Copilot as a first-pass reviewer (1 to 5):** ___

**Would you recommend automated Copilot review for your team?** (Yes / With limits / No)

**Key observations:**

_(Write your assessment.)_

## Human decision

- Initial human verdict:
- What changed after the local reviews:
- What changed after PR review:
- Final test command and result:
- Remaining risk or unresolved findings:
- Reviewer and final decision:
