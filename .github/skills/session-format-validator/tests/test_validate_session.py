import importlib.util
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[4]
SCRIPT = ROOT / ".github/skills/session-format-validator/scripts/validate_session.py"
SPEC = importlib.util.spec_from_file_location("validate_session", SCRIPT)
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


class SessionValidatorTests(unittest.TestCase):
    def test_published_session_is_ready(self):
        result = VALIDATOR.validate(ROOT / "sessions/session-18-spec-kit")

        self.assertEqual(result["status"], "ready")
        self.assertEqual(result["findings"], [])

    def test_published_hve_challenge_is_ready(self):
        result = VALIDATOR.validate(ROOT / "sessions/session-20-hve-challenge")

        self.assertEqual(result["status"], "ready")
        self.assertEqual(result["findings"], [])

    def test_missing_session_stops_at_directory(self):
        result = VALIDATOR.validate(ROOT / "sessions/session-20-spec-frameworks")

        self.assertEqual(result["status"], "needs-work")
        self.assertEqual(len(result["findings"]), 1)
        self.assertEqual(result["findings"][0]["message"], "Session directory does not exist.")

    def test_template_returns_findings_without_raising(self):
        result = VALIDATOR.validate(ROOT / "track-template/session-template")

        self.assertEqual(result["status"], "needs-work")
        self.assertTrue(
            any(
                "Cannot validate curriculum registration" in item["message"]
                for item in result["findings"]
            )
        )


if __name__ == "__main__":
    unittest.main()
