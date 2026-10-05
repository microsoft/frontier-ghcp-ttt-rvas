# Captured evidence 03: Implementation session

## Change summary

The session changed `readiness_guard/readiness.py`.

```diff
 def evaluate_readiness(snapshot: dict) -> dict:
     reasons = []
-    checks = snapshot.get("checks", [])
+    if "checks" not in snapshot:
+        return {"verdict": "UNKNOWN", "reasons": ["MISSING_CHECK_EVIDENCE"]}
+    if "review_threads" not in snapshot:
+        return {"verdict": "UNKNOWN", "reasons": ["MISSING_REVIEW_EVIDENCE"]}
+
+    checks = snapshot["checks"]
     for check in checks:
         if check.get("required") and check.get("status") != "success":
             reasons.append(f"CHECK_{check.get('name', 'UNKNOWN')}_NOT_SUCCESS")
+
+    for thread in snapshot["review_threads"]:
+        if thread.get("blocking") and not thread.get("resolved"):
+            reasons.append("UNRESOLVED_BLOCKING_REVIEW")
```

The return statement still sorts the reasons and selects `NOT_READY` when the list
is not empty.

## Session claim

All six focused tests pass. The session did not add dependencies or modify fixtures.
