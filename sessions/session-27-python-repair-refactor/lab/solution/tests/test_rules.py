import pytest

from inventory_reconciliation.rules import severity_for, status_for


@pytest.mark.parametrize(
    ("variance", "expected"),
    [(0, "MATCH"), (-1, "SHORT"), (1, "OVER")],
)
def test_status_for_variance(variance: int, expected: str):
    assert status_for(variance) == expected


@pytest.mark.parametrize(
    ("variance", "expected"),
    [(0, "none"), (5, "review"), (-5, "review"), (6, "urgent"), (-6, "urgent")],
)
def test_severity_boundary(variance: int, expected: str):
    assert severity_for(variance) == expected
