"""Calculator project used throughout the Session 02 Chat lab."""


class Calculator:
    """Perform calculations and keep a readable operation history."""

    def __init__(self) -> None:
        self._history: list[str] = []

    def add(self, left: float, right: float) -> float:
        result = left + right
        self._history.append(f"{left} + {right} = {result}")
        return result

    def divide(self, dividend: float, divisor: float) -> float:
        if divisor == 0:
            raise ValueError("Cannot divide by zero")
        result = dividend / divisor
        self._history.append(f"{dividend} / {divisor} = {result}")
        return result

    def weighted_average(self, values: list[float], weights: list[float]) -> float:
        """Return the weighted average for matching value and weight lists."""
        if len(values) != len(weights):
            raise ValueError("Values and weights must have the same length")
        weighted_sum = sum(value * weight for value, weight in zip(values, weights))
        return weighted_sum / len(values)

    def history(self) -> list[str]:
        return self._history.copy()
