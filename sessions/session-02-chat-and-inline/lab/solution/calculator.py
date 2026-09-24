"""Reference calculator for the Session 02 Chat lab."""


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
        if not values:
            raise ValueError("Values and weights must not be empty")
        total_weight = sum(weights)
        if total_weight == 0:
            raise ValueError("Total weight must not be zero")
        weighted_sum = sum(value * weight for value, weight in zip(values, weights))
        result = weighted_sum / total_weight
        self._history.append(f"weighted average = {result}")
        return result

    def history(self) -> list[str]:
        return self._history.copy()
