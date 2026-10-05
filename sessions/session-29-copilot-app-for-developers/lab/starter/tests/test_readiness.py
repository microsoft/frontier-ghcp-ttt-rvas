import unittest

from readiness_guard import evaluate_readiness


class ReadinessTests(unittest.TestCase):
    def test_ready_when_required_checks_pass_and_blockers_are_resolved(self):
        snapshot = {
            "checks": [{"name": "unit", "required": True, "status": "success"}],
            "review_threads": [{"blocking": True, "resolved": True}],
        }
        self.assertEqual(
            evaluate_readiness(snapshot),
            {"verdict": "READY", "reasons": []},
        )

    def test_failed_required_check_blocks_readiness(self):
        snapshot = {
            "checks": [
                {"name": "unit", "required": True, "status": "success"},
                {"name": "integration", "required": True, "status": "failure"},
            ],
            "review_threads": [],
        }
        self.assertEqual(
            evaluate_readiness(snapshot),
            {
                "verdict": "NOT_READY",
                "reasons": ["CHECK_integration_NOT_SUCCESS"],
            },
        )

    def test_unresolved_blocking_thread_blocks_readiness(self):
        snapshot = {
            "checks": [{"name": "unit", "required": True, "status": "success"}],
            "review_threads": [{"blocking": True, "resolved": False}],
        }
        self.assertEqual(
            evaluate_readiness(snapshot),
            {
                "verdict": "NOT_READY",
                "reasons": ["UNRESOLVED_BLOCKING_REVIEW"],
            },
        )

    def test_missing_review_evidence_is_unknown(self):
        snapshot = {
            "checks": [{"name": "unit", "required": True, "status": "success"}],
        }
        self.assertEqual(
            evaluate_readiness(snapshot),
            {"verdict": "UNKNOWN", "reasons": ["MISSING_REVIEW_EVIDENCE"]},
        )

    def test_missing_checks_are_unknown(self):
        snapshot = {"review_threads": []}
        self.assertEqual(
            evaluate_readiness(snapshot),
            {"verdict": "UNKNOWN", "reasons": ["MISSING_CHECK_EVIDENCE"]},
        )

    def test_reason_codes_are_sorted(self):
        snapshot = {
            "checks": [
                {"name": "zeta", "required": True, "status": "failure"},
                {"name": "alpha", "required": True, "status": "pending"},
            ],
            "review_threads": [{"blocking": True, "resolved": False}],
        }
        result = evaluate_readiness(snapshot)
        self.assertEqual(result["reasons"], sorted(result["reasons"]))


if __name__ == "__main__":
    unittest.main()

