"""
Buggy Functions — Solution
===========================
All 3 bugs fixed. See inline comments for what changed.
"""

import csv
import io


def binary_search(sorted_list, target):
    """Search for a target value in a sorted list. Return its index, or -1 if not found."""
    low = 0
    high = len(sorted_list) - 1  # FIX: use len - 1 to stay in bounds

    while low <= high:
        mid = (low + high) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            low = mid + 1  # FIX: advance past mid
        else:
            high = mid - 1  # FIX: move below mid

    return -1


def remove_duplicates(items):
    """Return a new list with duplicates removed, preserving order.
    The original list is NOT modified.
    """
    seen = set()
    result = []  # FIX: create a NEW list instead of modifying the original
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result


def parse_csv_line(line):
    """Parse a single CSV line into a list of fields.
    Handles quoted fields that may contain commas.
    """
    # FIX: use Python's csv module to handle quoted fields properly
    reader = csv.reader(io.StringIO(line))
    for row in reader:
        return [field.strip() for field in row]
    return []


# --- Test code ---

if __name__ == "__main__":
    # Test 1: binary_search
    numbers = [1, 3, 5, 7, 9, 11, 13]
    result = binary_search(numbers, 7)
    expected = 3
    status = "✓" if result == expected else f"✗ (got {result})"
    print(f"binary_search: Found 7 at index {result} {status}")

    # Test 2: remove_duplicates
    original = [1, 2, 3, 2, 4, 3, 5]
    original_copy = original.copy()
    deduped = remove_duplicates(original)
    original_unchanged = original == original_copy
    status = "✓" if deduped == [1, 2, 3, 4, 5] and original_unchanged else f"✗"
    print(f"remove_duplicates: {deduped} (original unchanged) {status}")

    # Test 3: parse_csv_line
    csv_line = 'John,Doe,"New York, NY",30'
    parsed = parse_csv_line(csv_line)
    expected_parsed = ["John", "Doe", "New York, NY", "30"]
    status = "✓" if parsed == expected_parsed else f"✗ (got {parsed})"
    print(f"parse_csv_line: {parsed} {status}")
