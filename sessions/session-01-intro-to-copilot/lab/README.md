# Session 01 Lab — Introduction to GitHub Copilot

**Duration:** 2 hours  
**Difficulty:** Beginner  
**Prerequisites:** A GitHub account with Copilot access enabled by the applicable customer policy.
**Deliverable:** A multi-function utility module generated with Copilot assistance, plus a personal effectiveness journal

---

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that Copilot is enabled for your account and IDE.

## If access is unavailable

Complete the starter exercises manually, then compare your implementation with the supplied solution or a trainer demonstration.

---

## Lab Overview

Install GitHub Copilot, configure VS Code, and use inline suggestions for Python, JavaScript, and TypeScript. Record where a suggestion helped and where your review changed the result.

| Exercise   | Topic                         | Time   |
| ---------- | ----------------------------- | ------ |
| 1          | Setup & First Suggestions     | 30 min |
| 2          | Multi-Language Exploration    | 30 min |
| 3          | Next Edit Suggestions (NES)   | 30 min |
| 4          | Copilot Effectiveness Journal | 30 min |

---

## Exercise 1: Setup & First Suggestions (30 min)

### Objective

Install the GitHub Copilot extension, configure key settings, and write a Python utility module using Copilot's inline suggestions.

### Steps

1. **Open VS Code** and go to the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).

2. **Search for "GitHub Copilot"** and install both:
   - **GitHub Copilot** (the inline suggestion engine)
   - **GitHub Copilot Chat** (the conversational assistant)

3. **Sign in to GitHub** when prompted. You should see the Copilot icon (a small sparkle) in the VS Code status bar at the bottom.

   > **Expected:** A Copilot icon in the status bar showing "Ready". If it shows a warning, click it to troubleshoot your authentication.

4. **Configure Copilot settings.** Open Settings (`Ctrl+,` / `Cmd+,`) and search for `copilot`. Review these settings:

   | Setting                                      | Recommended Value      | What It Does                  |
   | -------------------------------------------- | ---------------------- | ----------------------------- |
   | `github.copilot.enable`                      | `true` (all languages) | Enables inline suggestions    |
   | `github.copilot.nextEditSuggestions.enabled` | `true`                 | Enables Next Edit Suggestions |
   | `editor.inlineSuggest.enabled`               | `true`                 | Shows inline completions      |

   > **Checkpoint:** Take a screenshot of your settings showing Copilot is enabled. You'll reference this later.

5. **Open the starter file.** Open `lab/starter/utils.py` in VS Code.

6. **Let Copilot complete the functions.** Place your cursor at the end of the docstring in the first function (`celsius_to_fahrenheit`) and press `Enter`. Copilot should suggest an implementation.

   - **To accept a suggestion:** Press `Tab`
   - **To see alternative suggestions:** Press `Alt+]` (next) or `Alt+[` (previous)
   - **To reject a suggestion:** Press `Escape`
   - **To accept a single word:** Press `Ctrl+Right Arrow`

7. **Complete all 5 functions** in `utils.py` using Copilot suggestions. For each one:
   - Read the docstring to understand the expected behavior
   - Let Copilot suggest the implementation
   - Review the suggestion. Does it match the docstring?
   - Accept, modify, or reject as needed

   > **Expected:** Copilot proposes implementations from the function name and docstring. Review each one; some need edits.

8. **Test your code.** Open a terminal (`Ctrl+`` `) and run:

   ```bash
   cd sessions/session-01-intro-to-copilot/lab/starter
   python -c "from utils import *; print(celsius_to_fahrenheit(100)); print(is_palindrome('racecar'))"
   ```

   > **Expected output:**
   >
   > ```
   > 212.0
   > True
   > ```

9. **Compare with the solution.** Open `lab/solution/utils.py` to see the reference implementation.

### Troubleshooting

| Problem                    | Solution                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| No suggestions appear      | Check the Copilot status bar icon. Click it to see diagnostics. Ensure you're signed in.   |
| Suggestions are slow       | Copilot uses a cloud model — check your network connection.                                |
| Suggestions are wrong      | That is expected. Review and edit. Try adding more descriptive comments above the function. |
| "Copilot is not available" | Verify current official GitHub documentation and the customer administrator policy, then use the manual fallback. |

---

## Exercise 2: Multi-Language Exploration (30 min)

### Objective

Experience how Copilot adapts to different programming languages by writing functions in JavaScript and TypeScript.

### Steps

1. **Open `lab/starter/string-helpers.js`** in VS Code.

2. **Complete the JavaScript functions.** Place your cursor inside each function body and let Copilot suggest implementations. There are 4 functions to complete:
   - `capitalize(str)` — capitalize the first letter of each word
   - `truncate(str, maxLength)` — truncate a string and add "..."
   - `slugify(str)` — convert a string to a URL-friendly slug
   - `countWords(str)` — count the number of words in a string

3. **Observe Copilot's JavaScript patterns.** Notice:
   - Does Copilot use arrow functions or traditional functions?
   - Does it use modern JS features (template literals, destructuring)?
   - How does it handle edge cases (empty strings, null)?

   > **Expected:** Copilot proposes JavaScript that may use modern syntax such as arrow functions and template literals.

4. **Open `lab/starter/math-helpers.ts`** in VS Code.

5. **Complete the TypeScript functions.** Notice how Copilot uses the type annotations to generate more accurate code:
   - `clamp(value, min, max)` — restrict a value to a range
   - `lerp(start, end, t)` — linear interpolation
   - `isPrime(n)` — check if a number is prime
   - `factorial(n)` — compute factorial

6. **Compare JavaScript vs. TypeScript suggestions.** For the TypeScript file:
   - Are the suggestions more precise because of type annotations?
   - Does Copilot add type guards or checks?
   - Does the return type influence the implementation?

   > **Expected:** Type annotations give Copilot more context and can make its TypeScript suggestions more specific.

7. **Test the JavaScript functions** (if Node.js is installed):

   ```bash
   cd sessions/session-01-intro-to-copilot/lab/starter
   node -e "const s = require('./string-helpers'); console.log(s.slugify('Hello World Test'));"
   ```

   > **Expected output:** `hello-world-test`

8. **Compare with solutions** in `lab/solution/string-helpers.js` and `lab/solution/math-helpers.ts`.

### Troubleshooting

| Problem                                    | Solution                                                                                              |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| TypeScript errors in the editor            | This is expected for starter files — focus on the Copilot suggestions, not the type-checker.          |
| Copilot suggests Python syntax in JS files | Make sure the file extension is `.js` or `.ts`. Copilot uses the file type to determine the language. |
| Node.js not installed                      | Testing is optional. Focus on the Copilot experience and compare with the solution files.             |

---

## Exercise 3: Next Edit Suggestions (NES) (30 min)

### Objective

Enable and explore Next Edit Suggestions. Copilot can predict where you will edit next and suggest follow-up changes.

### Steps

1. **Verify NES is enabled.** Open Settings (`Ctrl+,`) and search for `nextEditSuggestions`. Ensure `github.copilot.nextEditSuggestions.enabled` is set to `true`.

2. **Open `lab/starter/refactor-me.py`** in VS Code. This file has intentionally inconsistent naming and patterns that NES can help fix.

3. **Rename the first variable.** Find the variable `usrNm` on line 5 and rename it to `username`. After you make this change:

   - **Look for a decorative gutter icon** (sparkle or lightbulb) on a nearby line — this is NES suggesting a related edit elsewhere in the file.
   - **Press `Tab`** to accept the suggested follow-up edit.
   - NES should automatically suggest renaming `usrNm` in other locations.

   > **Expected:** After renaming `usrNm` to `username` in one place, NES suggests the same rename in other parts of the file where `usrNm` is used.

4. **Continue the refactoring chain.** After accepting each NES suggestion, look for the next one:
   - Rename `usrEml` → `user_email`
   - Rename `usrAge` → `user_age`
   - Rename `calcTtl` → `calculate_total`
   - Rename `getUsrInfo` → `get_user_info`

5. **Observe NES with style changes.** Now change the string formatting on line 15 from concatenation to an f-string:

   ```python
   # Before
   msg = "Hello, " + username + "! You are " + str(user_age) + " years old."
   # After  
   msg = f"Hello, {username}! You are {user_age} years old."
   ```

   > **Expected:** NES suggesting similar f-string conversions elsewhere in the file.

6. **Try adding a type hint.** Add a type hint to the first function parameter:

   ```python
   def get_user_info(username: str) -> dict:
   ```

   Watch if NES suggests adding type hints to other function signatures.

7. **Review the final result.** Compare your refactored file with `lab/solution/refactor-me.py`.

### Troubleshooting

| Problem                                | Solution                                                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| No NES suggestions appear              | Make sure the setting is enabled. NES works best with clear patterns (renames, repeated edits). Try making a more obvious change. |
| NES suggests unwanted changes          | Press `Escape` to dismiss. NES learns from your accept/reject patterns within the session.                                        |
| Can't tell NES from normal completions | NES suggestions appear at lines OTHER than your cursor position. They have a distinctive gutter indicator.                        |

---

## Exercise 4: Copilot Effectiveness Journal (30 min)

### Objective

Record what Copilot did well and where your review made a difference.

### Steps

1. **Open `lab/starter/journal-template.md`** in VS Code.

2. **Fill in Section 1: Setup Experience.** Document:
   - How long did installation take?
   - Were there any blockers?
   - What was your first impression of Copilot suggestions?

3. **Complete the timed comparison (Section 2).** You'll write a small function twice:

   **Task:** Write a function that validates an email address (basic validation — contains `@` and a domain with a `.`).

   - **Round 1 — Without Copilot:** Disable Copilot (click the status bar icon → "Disable Completions"). Write the function manually. Record the time.
   - **Round 2 — With Copilot:** Re-enable Copilot. Write the same function in a new file. Record the time.

   > **Tip:** Use a simple timer (phone or `time` command) to track how long each round takes.

4. **Fill in Section 3: Language Comparison.** Rate Copilot's effectiveness for each language you tried (Python, JavaScript, TypeScript).

5. **Fill in Section 4: Trainer Takeaways.** Answer:
   - What would you tell a trainee who says "Copilot writes all my code for me"?
   - When would you recommend NOT using Copilot?
   - What's one thing that surprised you?

6. **Save your journal.** Use it as a personal reference in later sessions.

   > **By the end:** A completed journal with timing data, language comparisons, and trainer-perspective reflections.

### Troubleshooting

| Problem                          | Solution                                                                                                                         |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Can't disable Copilot            | Click the Copilot icon in the status bar → select "Disable Completions" (or use the command palette: `GitHub Copilot: Disable`). |
| Don't know how to validate email | That is the point. Document your problem-solving process both with and without Copilot.                                           |

---

## Wrap-up

### Deliverables Checklist

- [ ] `utils.py` — 5 Python functions completed with Copilot
- [ ] `string-helpers.js` — 4 JavaScript functions completed with Copilot
- [ ] `math-helpers.ts` — 4 TypeScript functions completed with Copilot
- [ ] `refactor-me.py` — Refactored with NES assistance
- [ ] `journal-template.md` — Completed effectiveness journal

### Trainer notes

1. **Copilot proposes; you decide.** Review the suggestion before you accept it.
2. **Context matters.** Function names, docstrings, and type annotations influence suggestions.
3. **NES can suggest a related edit.** Treat it as a separate change to review.
4. **Language coverage varies.** Test the languages your team uses.
5. **Review is part of the workflow.** Always check a suggestion before accepting it.

### Next session

In **Session 02**, you will use Copilot Chat to explain code, debug functions, and generate tests.
