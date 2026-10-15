"""Evaluate synthetic pull-request evidence without changing repository state."""


def evaluate_readiness(snapshot: dict) -> dict:
    """Return a stable readiness verdict and reason codes."""
    reasons = []
    checks = snapshot.get("checks", [])

    for check in checks:
        if check.get("required") and check.get("status") != "success":
            reasons.append(f"CHECK_{check.get('name', 'UNKNOWN')}_NOT_SUCCESS")

    verdict = "NOT_READY" if reasons else "READY"
    return {"verdict": verdict, "reasons": sorted(reasons)}

