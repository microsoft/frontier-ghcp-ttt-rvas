import unittest

from utils import is_palindrome, normalize_username, profile_summary, word_frequency


class UtilityTests(unittest.TestCase):
    def test_normalize_username(self) -> None:
        self.assertEqual(normalize_username("  River Team  "), "river-team")

    def test_palindrome_ignores_spacing_and_case(self) -> None:
        self.assertTrue(is_palindrome("Never odd or even"))

    def test_word_frequency_preserves_apostrophes(self) -> None:
        self.assertEqual(
            word_frequency("Don't stop. Don't guess."),
            {"don't": 2, "stop": 1, "guess": 1},
        )

    def test_word_frequency_does_not_change_input(self) -> None:
        source = "One, two, two."
        self.assertEqual(word_frequency(source), {"one": 1, "two": 2})
        self.assertEqual(source, "One, two, two.")

    def test_profile_summary(self) -> None:
        self.assertEqual(
            profile_summary("river-team", [" Python ", "Testing"]),
            "river-team: python, testing",
        )


if __name__ == "__main__":
    unittest.main()
