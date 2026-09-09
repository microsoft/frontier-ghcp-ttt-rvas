# Prompt Challenge Rounds

**Instructions:** Spend eight minutes on each challenge. Write a prompt in Copilot Chat or as a code comment, evaluate the output against the requirements, revise it if needed, and record the result.

---

## Challenge 1: Data Validation Function (8 min)

**Task:** Write a prompt that makes Copilot generate a Python function to validate user registration data.

**Requirements the function must meet:**

- Accept a dictionary with keys: `name`, `email`, `age`, `password`
- Validate: name is non-empty string, email contains `@` and `.`, age is 18–120, password is 8+ chars with at least one digit and one uppercase letter
- Return a dictionary: `{"valid": True/False, "errors": ["list of error messages"]}`

**Your prompt:**

```
(Write your prompt here)
```

**Output quality (1-5):** ___  
**Did you need to iterate?** Yes / No  
**What would you change about your prompt?**

> _Notes_

---

## Challenge 2: Error Handling Wrapper (8 min)

**Task:** Write a prompt that makes Copilot generate a Python decorator that adds error handling to any function.

**Requirements:**

- Catch any exception the wrapped function throws
- Log the error (use Python's `logging` module)
- Return a default value (passed as a decorator parameter) instead of crashing
- Preserve the original function's name and docstring
- Optionally re-raise the exception based on a `reraise` parameter

**Your prompt:**

```
(Write your prompt here)
```

**Output quality (1-5):** ___  
**Did you need to iterate?** Yes / No  
**What would you change about your prompt?**

> _Notes_

---

## Challenge 3: Unit Test Generation (8 min)

**Task:** Write a prompt that makes Copilot generate thorough pytest tests for this function:

```python
def merge_sorted_lists(list1: list[int], list2: list[int]) -> list[int]:
    """Merge two sorted lists into a single sorted list."""
    result = []
    i = j = 0
    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1
    result.extend(list1[i:])
    result.extend(list2[j:])
    return result
```

**Requirements:**

- At least 8 test cases
- Cover: normal case, empty lists, single elements, duplicates, negative numbers, already merged
- Use parametrize for similar test cases

**Your prompt:**

```
(Write your prompt here)
```

**Output quality (1-5):** ___  
**Did you need to iterate?** Yes / No  
**What would you change about your prompt?**

> _Notes_

---

## Challenge 4: Documentation Generation (8 min)

**Task:** Write a prompt that makes Copilot generate clear API documentation for this class:

```python
class TaskQueue:
    def __init__(self, max_workers=4):
        self._queue = []
        self._max_workers = max_workers
        self._active = 0
    
    def enqueue(self, task_fn, priority=0):
        self._queue.append((priority, task_fn))
        self._queue.sort(key=lambda x: -x[0])
        self._process_next()
    
    def _process_next(self):
        if self._active < self._max_workers and self._queue:
            self._active += 1
            _, task = self._queue.pop(0)
            task()
            self._active -= 1
    
    def pending(self):
        return len(self._queue)
    
    def active(self):
        return self._active
```

**Requirements:**

- Markdown format
- Include: overview, constructor params, each public method with params/return/example
- Note any caveats or limitations

**Your prompt:**

```
(Write your prompt here)
```

**Output quality (1-5):** ___  
**Did you need to iterate?** Yes / No  
**What would you change about your prompt?**

> _Notes_

---

## Challenge 5: Algorithm Implementation (8 min)

**Task:** Write a prompt that makes Copilot generate a Python function for the Levenshtein (edit) distance algorithm.

**Requirements:**

- Function signature: `def edit_distance(s1: str, s2: str) -> int`
- Use dynamic programming (bottom-up approach)
- Include a docstring with explanation of the algorithm
- Handle edge cases (empty strings)
- Be efficient (O(m*n) time and space)
- Include 2–3 inline comments explaining key steps

**Your prompt:**

```
(Write your prompt here)
```

**Output quality (1-5):** ___  
**Did you need to iterate?** Yes / No  
**What would you change about your prompt?**

> _Notes_

---

## Reflection

**Which challenge was hardest to prompt for? Why?**

> _Answer_

**What did you learn about prompting?**

> _Answer_

**What pattern did your best prompts have in common?**

> _Answer_
