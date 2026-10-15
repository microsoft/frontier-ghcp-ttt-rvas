"""Evaluate synthetic pull-request evidence without changing repository state."""


def evaluate_readiness(snapshot: dict) -> dict:
    """Return a stable readiness verdict and reason codes."""
    if "checks" not in snapshot:
        return {"verdict": "UNKNOWN", "reasons": ["MISSING_CHECK_EVIDENCE"]}
    if "review_threads" not in snapshot:
        return {"verdict": "UNKNOWN", "reasons": ["MISSING_REVIEW_EVIDENCE"]}

    reasons = []
    for check in snapshot["checks"]:
        if check.get("required") and check.get("status") != "success":
            reasons.append(f"CHECK_{check.get('name', 'UNKNOWN')}_NOT_SUCCESS")

    for thread in snapshot["review_threads"]:
        if thread.get("blocking") and not thread.get("resolved"):
            reasons.append("UNRESOLVED_BLOCKING_REVIEW")

    return {
        "verdict": "NOT_READY" if reasons else "READY",
        "reasons": sorted(reasons),
    }

