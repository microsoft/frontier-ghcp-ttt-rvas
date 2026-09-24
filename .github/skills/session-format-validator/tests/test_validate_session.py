import importlib.util
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[4]
SCRIPT = ROOT / ".github/skills/session-format-validator/scripts/validate_session.py"
SPEC = importlib.util.spec_from_file_location("validate_session", SCRIPT)
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


class SessionValidatorTests(unittest.TestCase):
    def validate_lab_text(self, content):
        with tempfile.TemporaryDirectory() as directory:
            lab = Path(directory) / "lab"
            lab.mkdir()
            (lab / "README.md").write_text(content, encoding="utf-8")
            return VALIDATOR.validate_lab_readiness(Path(directory))

    def test_published_session_is_ready(self):
        result = VALIDATOR.validate(ROOT / "sessions/session-18-spec-kit")

        self.assertEqual(result["status"], "ready")
        self.assertEqual(result["findings"], [])

    def test_published_hve_session_is_ready(self):
        result = VALIDATOR.validate(ROOT / "sessions/session-28-hve-core-challenge")

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

    def test_lab_accepts_required_access_and_stop_instruction(self):
        findings = self.validate_lab_text(
            """# Lab

## Required preflight

Confirm that GitHub Copilot access is available and you are signed in.

If GitHub Copilot access fails, stop. Do not continue until access is available.

## Deliverable

Submit the reviewed result.
"""
        )

        self.assertEqual(findings, [])

    def test_unavailable_without_an_access_stop_or_fallback_is_rejected(self):
        findings = self.validate_lab_text(
            """# Lab

## Preflight

The optional reporting tool may be unavailable.

## Deliverable

Submit the reviewed result.
"""
        )

        self.assertEqual(len(findings), 1)
        self.assertIn("Missing access policy", findings[0]["message"])

    def test_lab_accepts_intentional_fallback_guidance(self):
        findings = self.validate_lab_text(
            """# Lab

## Setup

Use the supplied files.

If the live tool is unavailable, use the manual route.

## Final Deliverable

Submit the reviewed result.
"""
        )

        self.assertEqual(findings, [])

    def test_lab_rejects_missing_access_policy(self):
        findings = self.validate_lab_text(
            """# Lab

## Before you start

Open the supplied files.

## Deliverables

Submit the reviewed result.
"""
        )

        self.assertEqual(len(findings), 1)
        self.assertIn("Missing access policy", findings[0]["message"])


if __name__ == "__main__":
    unittest.main()
