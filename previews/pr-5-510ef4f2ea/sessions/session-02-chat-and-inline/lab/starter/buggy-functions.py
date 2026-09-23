"""
Buggy Functions — Debug with Copilot Chat
==========================================
This file has 3 functions with intentional bugs.
Use Copilot Chat (/fix, conversational debugging, or inline fix) to find and fix them.

Run this file to see the errors:
    python buggy-functions.py
"""


def binary_search(sorted_list, target):
    """Search for a target value in a sorted list. Return its index, or -1 if not found.
    
    Bug: This function has a logic error that causes it to return wrong results.
    """
    low = 0
    high = len(sorted_list)  # BUG: should be len(sorted_list) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            low = mid  # BUG: should be mid + 1
        else:
            high = mid  # BUG: should be mid - 1
    
    return -1


def remove_duplicates(items):
    """Return a new list with duplicates removed, preserving order.
    The original list should NOT be modified.
    
    Bug: This function modifies the original list.
    """
    seen = set()
    # BUG: modifying the list in-place instead of creating a new one
    i = 0
    while i < len(items):
        if items[i] in seen:
            items.pop(i)  # BUG: mutates the original list
        else:
            seen.add(items[i])
            i += 1
    return items


def parse_csv_line(line):
    """Parse a single CSV line into a list of fields.
    Handles quoted fields that may contain commas.
    
    Example: 'John,Doe,"New York, NY",30' -> ['John', 'Doe', 'New York, NY', '30']
    
    Bug: This function doesn't handle quoted commas correctly.
    """
    # BUG: simple split doesn't handle quoted commas
    fields = line.split(",")
    return [field.strip().strip('"') for field in fields]


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
    original_copy = original.copy()  # Save a copy to check mutation
    deduped = remove_duplicates(original)
    original_unchanged = original == original_copy
    status = "✓" if deduped == [1, 2, 3, 4, 5] and original_unchanged else f"✗ (original {'changed' if not original_unchanged else 'ok'}, result={deduped})"
    print(f"remove_duplicates: {deduped} (original unchanged) {status}")
    
    # Test 3: parse_csv_line
    csv_line = 'John,Doe,"New York, NY",30'
    parsed = parse_csv_line(csv_line)
    expected_parsed = ["John", "Doe", "New York, NY", "30"]
    status = "✓" if parsed == expected_parsed else f"✗ (got {parsed})"
    print(f"parse_csv_line: {parsed} {status}")
