"""
Calculator Module
=================
A fully working calculator with history tracking.
Your task: use Copilot Chat (/tests) to generate unit tests for this module.
"""


class Calculator:
    """A basic calculator with operation history."""

    def __init__(self):
        self._history = []

    def add(self, a: float, b: float) -> float:
        """Add two numbers."""
        result = a + b
        self._history.append(f"{a} + {b} = {result}")
        return result

    def subtract(self, a: float, b: float) -> float:
        """Subtract b from a."""
        result = a - b
        self._history.append(f"{a} - {b} = {result}")
        return result

    def multiply(self, a: float, b: float) -> float:
        """Multiply two numbers."""
        result = a * b
        self._history.append(f"{a} * {b} = {result}")
        return result

    def divide(self, a: float, b: float) -> float:
        """Divide a by b. Raises ValueError if b is zero."""
        if b == 0:
            raise ValueError("Cannot divide by zero")
        result = a / b
        self._history.append(f"{a} / {b} = {result}")
        return result

    def power(self, base: float, exponent: float) -> float:
        """Raise base to the power of exponent."""
        result = base ** exponent
        self._history.append(f"{base} ^ {exponent} = {result}")
        return result

    def history(self) -> list[str]:
        """Return a copy of the operation history."""
        return self._history.copy()

    def clear_history(self) -> None:
        """Clear all operation history."""
        self._history.clear()

    def last_result(self) -> str:
        """Return the most recent operation, or 'No history' if empty."""
        if not self._history:
            return "No history"
        return self._history[-1]
