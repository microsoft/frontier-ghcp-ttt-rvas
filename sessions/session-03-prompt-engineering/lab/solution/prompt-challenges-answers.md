# Prompt Challenge Answers — Reference Prompts

These prompts show one way to give Copilot enough detail. Your wording may differ. Check whether the resulting code meets the requirements.

---

## Challenge 1: Data Validation Function

### Example Prompt (Chat)

```
Write a Python function called validate_registration that takes a dictionary with keys 
'name', 'email', 'age', 'password'. Validate each field:
- name: non-empty string
- email: must contain '@' and at least one '.' after the '@'
- age: integer between 18 and 120 inclusive
- password: minimum 8 characters, at least one uppercase letter, at least one digit

Return {"valid": True, "errors": []} if all pass, or {"valid": False, "errors": ["descriptive error messages"]} listing each failed validation.

Include type hints and a docstring with examples.
```

### Why this prompt helps

- **Specific field requirements** — Copilot knows exactly what to validate
- **Output format defined** — returns the exact structure needed
- **Edge cases implied** — "non-empty", "between 18 and 120 inclusive"
- **Asks for type hints and docstring** — gets professional output

### Expected Output

```python
import re

def validate_registration(data: dict) -> dict:
    """Validate user registration data.
    
    Args:
        data: Dictionary with keys 'name', 'email', 'age', 'password'
        
    Returns:
        Dictionary with 'valid' (bool) and 'errors' (list of strings)
        
    Examples:
        >>> validate_registration({"name": "Alice", "email": "alice@test.com", "age": 25, "password": "Secret1!"})
        {'valid': True, 'errors': []}
    """
    errors = []
    
    # Name validation
    if not isinstance(data.get("name"), str) or not data["name"].strip():
        errors.append("Name must be a non-empty string")
    
    # Email validation
    email = data.get("email", "")
    if not isinstance(email, str) or "@" not in email:
        errors.append("Email must contain '@'")
    elif "." not in email.split("@")[-1]:
        errors.append("Email must have a '.' in the domain")
    
    # Age validation
    age = data.get("age")
    if not isinstance(age, int) or age < 18 or age > 120:
        errors.append("Age must be an integer between 18 and 120")
    
    # Password validation
    password = data.get("password", "")
    if len(password) < 8:
        errors.append("Password must be at least 8 characters")
    if not any(c.isupper() for c in password):
        errors.append("Password must contain at least one uppercase letter")
    if not any(c.isdigit() for c in password):
        errors.append("Password must contain at least one digit")
    
    return {"valid": len(errors) == 0, "errors": errors}
```

---

## Challenge 2: Error Handling Wrapper

### Example Prompt (Chat)

```
Write a Python decorator called safe_execute that:
1. Takes a 'default' parameter (the value to return on error) and an optional 'reraise' bool (default False)
2. Wraps any function with try/except
3. On exception: logs the error using Python's logging module (level ERROR, include function name and exception), returns the default value
4. If reraise=True, re-raises the exception after logging
5. Preserves the wrapped function's __name__ and __doc__ using functools.wraps

Example usage:
@safe_execute(default=[], reraise=False)
def risky_function():
    ...
```

### Why this prompt helps

- **Numbered requirements** — clear, unambiguous checklist
- **Usage example** — shows the decorator syntax Copilot should produce
- **Specific library calls** — `logging`, `functools.wraps`

---

## Challenge 3: Unit Test Generation

### Example Prompt (Chat)

```
Write full pytest tests for this merge_sorted_lists function using @pytest.mark.parametrize when useful:

[paste the function]

Cover these cases:
1. Two normal sorted lists: [1,3,5] + [2,4,6]
2. Empty first list: [] + [1,2,3]
3. Empty second list: [1,2,3] + []
4. Both empty: [] + []
5. Single element lists: [1] + [2]
6. Lists with duplicates: [1,2,2] + [2,3,3]
7. Lists with negative numbers: [-3,-1] + [-2,0,1]
8. Already interleaved: [1,2,3] + [4,5,6]
9. Same elements: [1,1,1] + [1,1,1]

Group similar test cases with parametrize. Include clear test IDs.
```

### Why this prompt helps

- **Explicit test cases** — Copilot doesn't have to invent scenarios
- **Specific coverage areas** — negatives, duplicates, empties
- **Requests parametrize** — gets DRY test code
- **Asks for test IDs** — readable test output

---

## Challenge 4: Documentation Generation

### Example Prompt (Chat)

```
Generate Markdown API documentation for this Python class. Include:
- One-paragraph overview of what the class does and when to use it
- Constructor section: parameters with types, defaults, and descriptions
- Method reference for each PUBLIC method: signature, parameters, return value, one usage example
- A "Caveats" section noting limitations (this is synchronous and not thread-safe)
- Format: use tables for parameters, code blocks for examples

[paste the class]
```

### Why this prompt helps

- **Output format specified** — Markdown, tables, code blocks
- **Scope defined** — PUBLIC methods only (skips `_process_next`)
- **Domain knowledge added** — points out it's synchronous and not thread-safe
- **Structure specified** — overview, constructor, methods, caveats

---

## Challenge 5: Algorithm Implementation

### Example Prompt (Comment-driven)

```python
# Implement the Levenshtein (edit) distance algorithm using bottom-up dynamic programming.
# 
# Function: edit_distance(s1: str, s2: str) -> int
# Returns: minimum number of single-character edits (insert, delete, substitute)
#          needed to transform s1 into s2
#
# Approach: Build a (len(s1)+1) x (len(s2)+1) matrix where dp[i][j] represents
# the edit distance between s1[:i] and s2[:j].
#
# Base cases: dp[i][0] = i (delete all chars), dp[0][j] = j (insert all chars)
# Recurrence: dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1] + (0 if match else 1))
#
# Edge cases: handle empty strings
# Time: O(m*n), Space: O(m*n)
```

### Why this prompt helps

- **Algorithm named explicitly** — Levenshtein, not "edit distance" alone
- **Approach specified** — bottom-up DP, matrix construction
- **Mathematical recurrence given** — Copilot follows the formula precisely
- **Complexity stated** — signals the expected implementation quality

---

## Patterns in these prompts

| Pattern               | Example                                                 |
| --------------------- | ------------------------------------------------------- |
| **Name the thing**    | "function called validate_registration"                 |
| **Specify I/O**       | "takes a dict, returns {"valid": bool, "errors": list}" |
| **List requirements** | Numbered list of behaviors                              |
| **Give examples**     | Input → expected output                                 |
| **State constraints** | "max 20 lines", "use regex", "O(n) time"                |
| **Name the approach** | "bottom-up DP", "binary search"                         |
| **Ask for extras**    | "include type hints, docstring, inline comments"        |
