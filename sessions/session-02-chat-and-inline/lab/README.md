# Session 02 Lab — Copilot Chat & Inline Suggestions

**Duration:** 2 hours  
**Difficulty:** Beginner  
**Prerequisites:** Session 01 completed (Copilot installed and configured)  
**Deliverable:** A debugged and tested module, plus documented model comparison observations

---

## Lab Overview

Use Copilot Chat to explain unfamiliar code, debug broken functions, generate tests, explore workspace-aware features, and compare approved model options.

| Exercise   | Topic                        | Time   |
| ---------- | ---------------------------- | ------ |
| 1          | Code Explanation & Debugging | 40 min |
| 2          | Test Generation              | 30 min |
| 3          | Workspace & Terminal Chat    | 30 min |
| 4          | Model Comparison             | 20 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that Copilot Chat and model selection are available in your IDE.

## If access is unavailable

Complete the debugging, testing, and context exercises against the supplied files. Record the prompt you would have used and peer-review the proposed change.

---

## Exercise 1: Code Explanation & Debugging (40 min)

### Objective

Use Copilot Chat to inspect unfamiliar code, then debug three deliberately broken functions.

### Part A: Code Explanation (15 min)

1. **Open `lab/starter/mystery-code.py`** in VS Code. This file contains working but complex code that may be unfamiliar to you.

2. **Select all the code** in the file (`Ctrl+A` / `Cmd+A`).

3. **Open Copilot Chat** using one of these methods:
   - Click the Copilot Chat icon in the sidebar
   - Press `Ctrl+Alt+I` / `Cmd+Alt+I`
   - Use inline chat: `Ctrl+I` / `Cmd+I`

4. **Ask Copilot to explain the code.** Type in the Chat panel:

   ```
   /explain What does this code do? Break it down function by function.
   ```

   > **Expected:** A detailed explanation of each function, the data structures used, and the overall purpose of the module.

5. **Ask follow-up questions** to understand the code better:
   - `What algorithm is the find_shortest_path function using?`
   - `What is the time complexity of each function?`
   - `Are there any edge cases this code doesn't handle?`

6. **Try inline chat for a single function.** Select just the `memoize` function, press `Ctrl+I`, and type:

   ```
   Explain how this decorator works and when I'd use it.
   ```

   > **Checkpoint:** You should now understand what each function does. Write a one-sentence summary of the module's purpose in your own words.

### Part B: Debugging (25 min)

1. **Open `lab/starter/buggy-functions.py`.** This file has 3 functions with intentional bugs.

2. **Try to run the file first** to see the errors:

   ```bash
   cd sessions/session-02-chat-and-inline/lab/starter
   python buggy-functions.py
   ```

   > **Expected:** Errors or incorrect output for one or more functions.

3. **Debug each function using Copilot Chat.** For each broken function:

   **Method 1: /fix command**
   - Select the function
   - Type `/fix` in Chat
   - Review the suggested fix

   **Method 2: Conversational debugging**
   - Paste the error message into Chat
   - Ask: `This function is supposed to [expected behavior], but it's [actual behavior]. What's wrong?`

   **Method 3: Inline fix**
   - Select the broken function
   - Press `Ctrl+I` and type: `Fix the bug in this function`

4. **Fix all 3 bugs.** The bugs are:
    - `binary_search`: Logic error — returns wrong result
    - `remove_duplicates`: Mutation error — modifies data unexpectedly
    - `parse_csv_line`: Edge case — fails with quoted commas

5. **Verify your fixes:**

    ```bash
    python buggy-functions.py
    ```

    > **Expected output:**
>
    > ```
    > binary_search: Found 7 at index 3 ✓
    > remove_duplicates: [1, 2, 3, 4, 5] (original unchanged) ✓
    > parse_csv_line: ['John', 'Doe', 'New York, NY', '30'] ✓
    > ```

6. **Compare with `lab/solution/buggy-functions.py`** to see the reference fixes.

### Troubleshooting

| Problem                  | Solution                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| Chat doesn't see my code | Make sure the file is open and active. Use `#file:buggy-functions.py` to reference it explicitly. |
| /fix doesn't work        | Select the function first, then type `/fix`. The selection provides context.                      |
| Chat gives a wrong fix   | Give more context: describe the expected vs. actual behavior. Paste the error message.            |

---

## Exercise 2: Test Generation (30 min)

### Objective

Use Copilot Chat to draft unit tests for an existing module, then review and improve them.

### Steps

1. **Open `lab/starter/calculator.py`** in VS Code. This is a fully working calculator module with no tests.

2. **Generate tests using the /tests command.** Select the entire file, then in Chat:

   ```
   /tests Generate full unit tests for this calculator module using pytest.
   ```

   > **Expected:** Copilot generating a test file with multiple test functions covering the calculator's operations.

3. **Save the generated tests.** Create a new file called `starter/test_calculator.py` and paste the generated tests.

4. **Review the generated tests.** Check:
   - Are edge cases covered (division by zero, empty history)?
   - Are there both positive and negative test cases?
   - Do the test names clearly describe what they test?
   - Is there a test for the `history` feature?

5. **Ask Chat to add missing tests.** If you see gaps:

   ```
   These tests are missing coverage for:
   - Division by zero
   - The history() method
   - Chaining operations
   Add those test cases.
   ```

6. **Run the tests** (if pytest is installed):

   ```bash
   cd sessions/session-02-chat-and-inline/lab/starter
   pip install pytest
   pytest test_calculator.py -v
   ```

   > **Expected:** All tests passing with verbose output showing each test name.

7. **Compare with `lab/solution/test_calculator.py`** to see the reference test suite.

### Troubleshooting

| Problem                   | Solution                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| pytest not installed      | Run `pip install pytest` first. Or use `python -m pytest`.                                                                     |
| Tests import fails        | Make sure `test_calculator.py` is in the same directory as `calculator.py`.                                                    |
| Generated tests are wrong | Fix them and record what Chat missed. Trainers need to see those limits. |

---

## Exercise 3: Workspace & Terminal Chat (30 min)

### Objective

Use `@workspace` to answer questions about a multi-file project, and `@terminal` to troubleshoot a failing build.

### Part A: @workspace (15 min)

1. **Open the mini-project folder.** In VS Code, open the folder `lab/starter/mini-project/` (or open the files within it).

2. **Ask @workspace about the project.** In Copilot Chat, try these queries:

   ```
   @workspace What does this project do? Describe the architecture.
   ```

   > **Expected:** Chat analyzing all files in the project and describing the Express.js server, its routes, and overall structure.

3. **Ask specific questions:**

   ```
   @workspace What endpoints are defined in this project?
   ```

   ```
   @workspace What npm packages does this project depend on?
   ```

   ```
   @workspace Are there any security concerns in this codebase?
   ```

4. **Notice how @workspace differs from regular Chat.** Without `@workspace`, Chat sees the active file. With it, Chat searches the project.

   > **Checkpoint:** You should be able to describe what the mini-project does, its routes, and dependencies without reading every file manually.

### Part B: @terminal (15 min)

1. **Try to start the mini-project.** Open a terminal and run:

   ```bash
   cd sessions/session-02-chat-and-inline/lab/starter/mini-project
   npm install
   npm start
   ```

   > **Expected:** An error. The project has an intentional build issue.

2. **Use @terminal to diagnose.** In Copilot Chat:

   ```
   @terminal The npm start command failed. What's wrong and how do I fix it?
   ```

   > **Expected:** Chat reading the terminal output and identifying the issue.

3. **Apply the fix** suggested by Chat. Then try `npm start` again.

4. **Test the running server** (if the fix works):

   ```bash
   curl http://localhost:3000/api/health
   ```

   > **Expected output:** `{"status":"ok","timestamp":"..."}`

5. **Compare with `lab/solution/mini-project/`** to see the fixed version.

### Troubleshooting

| Problem                       | Solution                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| @workspace doesn't find files | Make sure the mini-project files are inside your VS Code workspace (not just a single file open). |
| @terminal not available       | Ensure you have a terminal open with recent output. `@terminal` reads from the active terminal.   |
| Node.js not installed         | Install Node.js from <https://nodejs.org/>. Or focus on Part A only.                              |

---

## Exercise 4: Model Comparison (20 min)

### Objective

Where customer policy permits a comparison choice, compare responses to the same synthetic question; otherwise compare an assisted response with a manual solution.

### Steps

1. **Open `lab/starter/model-comparison-template.md`** to record your observations.

2. **Check the customer-approved options.** Ask the customer administrator which comparison choices, if any, are approved for this exercise. Use current official documentation and customer policy rather than assuming a catalog.

3. **Ask a coding question with Model A.** Use this prompt:

   ```
   Write a Python function that finds the longest common subsequence of two strings. Include comments explaining the approach.
   ```

   Copy the response into the template under "Model A".

4. **Use a second approved comparison choice.** If none is approved or shown, use a manual implementation as the comparison baseline.

5. **Ask the exact same question with Model B.** Copy the response into the template under "Model B".

6. **Compare the responses.** Fill in the comparison table in the template:
   - Which was more concise?
   - Which had better comments/explanations?
   - Which code is more readable?
   - Did they use different algorithms?

7. **Try a non-coding question.** Ask both models:

   ```
   Explain the difference between concurrency and parallelism. Give a real-world analogy.
   ```

   Note differences in explanation style.

8. **Document your recommendation.** In the template, write which model you'd recommend for different tasks.

   > **By the end:** A filled-in template comparing two models across multiple dimensions, with a recommendation for which to use when.

### Troubleshooting

| Problem                       | Solution                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| No comparison choice is shown | Do not infer why. Use the manual baseline and record that the customer policy did not authorize a second comparison. |
| Can't find the model selector | Look for a dropdown near the chat input. In some versions it's a settings icon.      |
| Responses look identical      | Try a more specific question: ask for architecture advice or code review feedback.   |

---

## Wrap-up

### Deliverables Checklist

- [ ] `mystery-code.py` — Explained (notes in Chat or journal)
- [ ] `buggy-functions.py` — All 3 bugs fixed and verified
- [ ] `test_calculator.py` — Generated test suite (saved and reviewed)
- [ ] `mini-project/` — Build issue diagnosed and fixed
- [ ] `model-comparison-template.md` — Completed model comparison

### Trainer notes

1. **Chat helps with debugging.** Use `/fix` or a focused question, then verify the result.
2. **Use `@workspace` for unfamiliar codebases.** It is useful for cross-file questions and onboarding.
3. **Review generated tests.** They are a draft, not proof of coverage.
4. **Compare approved model options.** Record the differences you can observe.
5. **Give Chat relevant context.** A selected function, error message, or workspace search can improve the answer.

### Next session

In **Session 03**, you will practice prompts that state the task, context, and constraints clearly.
