"""
Calculator Tests — Solution
============================
Reference test suite for the Calculator module.
Trainees should generate something similar using Copilot Chat's /tests command.
"""

import pytest
from calculator import Calculator


@pytest.fixture
def calc():
    """Provide a fresh Calculator instance for each test."""
    return Calculator()


# --- Basic operations ---

class TestAdd:
    def test_positive_numbers(self, calc):
        assert calc.add(2, 3) == 5

    def test_negative_numbers(self, calc):
        assert calc.add(-1, -1) == -2

    def test_mixed_sign(self, calc):
        assert calc.add(-5, 3) == -2

    def test_zeros(self, calc):
        assert calc.add(0, 0) == 0

    def test_floats(self, calc):
        assert calc.add(1.5, 2.5) == 4.0


class TestSubtract:
    def test_basic(self, calc):
        assert calc.subtract(10, 3) == 7

    def test_negative_result(self, calc):
        assert calc.subtract(3, 10) == -7

    def test_zeros(self, calc):
        assert calc.subtract(0, 0) == 0


class TestMultiply:
    def test_basic(self, calc):
        assert calc.multiply(4, 5) == 20

    def test_by_zero(self, calc):
        assert calc.multiply(100, 0) == 0

    def test_negative(self, calc):
        assert calc.multiply(-3, 4) == -12

    def test_both_negative(self, calc):
        assert calc.multiply(-3, -4) == 12


class TestDivide:
    def test_basic(self, calc):
        assert calc.divide(10, 2) == 5.0

    def test_float_result(self, calc):
        assert calc.divide(7, 2) == 3.5

    def test_divide_by_zero(self, calc):
        with pytest.raises(ValueError, match="Cannot divide by zero"):
            calc.divide(10, 0)

    def test_negative(self, calc):
        assert calc.divide(-10, 2) == -5.0


class TestPower:
    def test_basic(self, calc):
        assert calc.power(2, 3) == 8

    def test_zero_exponent(self, calc):
        assert calc.power(5, 0) == 1

    def test_negative_exponent(self, calc):
        assert calc.power(2, -1) == 0.5

    def test_square_root(self, calc):
        assert calc.power(9, 0.5) == 3.0


# --- History ---

class TestHistory:
    def test_empty_history(self, calc):
        assert calc.history() == []

    def test_history_records_operations(self, calc):
        calc.add(1, 2)
        calc.multiply(3, 4)
        history = calc.history()
        assert len(history) == 2
        assert "1 + 2 = 3" in history[0]
        assert "3 * 4 = 12" in history[1]

    def test_history_returns_copy(self, calc):
        calc.add(1, 1)
        history = calc.history()
        history.clear()
        assert len(calc.history()) == 1  # Original not affected

    def test_clear_history(self, calc):
        calc.add(1, 1)
        calc.add(2, 2)
        calc.clear_history()
        assert calc.history() == []

    def test_last_result_empty(self, calc):
        assert calc.last_result() == "No history"

    def test_last_result(self, calc):
        calc.add(10, 20)
        calc.subtract(5, 3)
        assert "5 - 3 = 2" in calc.last_result()


# --- Chaining operations ---

class TestChaining:
    def test_chain_operations(self, calc):
        result1 = calc.add(10, 5)
        result2 = calc.multiply(result1, 2)
        result3 = calc.subtract(result2, 10)
        assert result3 == 20
        assert len(calc.history()) == 3
