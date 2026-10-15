import unittest

from calculator import Calculator


class CalculatorTests(unittest.TestCase):
    def setUp(self) -> None:
        self.calculator = Calculator()

    def test_add_records_history(self) -> None:
        self.assertEqual(self.calculator.add(2, 3), 5)
        self.assertEqual(self.calculator.history(), ["2 + 3 = 5"])

    def test_divide_rejects_zero(self) -> None:
        with self.assertRaisesRegex(ValueError, "Cannot divide by zero"):
            self.calculator.divide(4, 0)

    def test_history_returns_copy(self) -> None:
        self.calculator.add(1, 1)
        history = self.calculator.history()
        history.clear()
        self.assertEqual(len(self.calculator.history()), 1)

    def test_weighted_average_uses_total_weight(self) -> None:
        self.assertEqual(
            self.calculator.weighted_average([80, 100], [1, 3]),
            95,
        )

    def test_weighted_average_rejects_length_mismatch(self) -> None:
        with self.assertRaisesRegex(ValueError, "same length"):
            self.calculator.weighted_average([80], [1, 2])

    def test_weighted_average_rejects_empty_input(self) -> None:
        with self.assertRaisesRegex(ValueError, "must not be empty"):
            self.calculator.weighted_average([], [])

    def test_weighted_average_rejects_zero_total_weight(self) -> None:
        with self.assertRaisesRegex(ValueError, "must not be zero"):
            self.calculator.weighted_average([80, 100], [1, -1])

    def test_weighted_average_records_history(self) -> None:
        self.calculator.weighted_average([80, 100], [1, 3])
        self.assertEqual(self.calculator.history(), ["weighted average = 95.0"])


if __name__ == "__main__":
    unittest.main()
