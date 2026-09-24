# Session 01 Lab: Review Inline Suggestions

**Duration:** 2 hours

**Difficulty:** Beginner

**Prerequisites:** Python 3.10 or later

**Deliverable:** A completed and tested `utils.py`, the focused test suite, and a
decision record in `lab-notes.md`

## Lab overview

You will complete one Python utility module in stages. The tests define the
observable behavior. You will inspect each proposed implementation, settle one
ambiguous word-parsing rule, and then apply a parameter rename as a separate
reviewed change.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prepare the project and inspect the failing baseline | 15 min |
| 2 | Complete two bounded functions | 30 min |
| 3 | Resolve the word-parsing ambiguity | 30 min |
| 4 | Add the profile summary and apply the rename | 30 min |
| 5 | Review the diff and verify the deliverable | 15 min |

## Before you start

Use only synthetic data. Confirm the repository and editor are approved for the
exercise.

For the live path, confirm GitHub Copilot access in the selected editor. If access
is unavailable or not approved, use the **manual fallback**: write the code
yourself, compare it with `lab/solution/`, and record the same accept, revise, or
reject decisions in `lab-notes.md`.

You need:

- Python 3.10 or later;
- a terminal;
- an editor;
- GitHub Copilot only for the live path.

## Part 1: Prepare the project (15 minutes)

Open the starter directory:

```bash
cd sessions/session-01-intro-to-copilot/lab/starter
python -m py_compile utils.py test_utils.py
python -m unittest -v
```

The syntax check should pass. The five tests should fail because the functions do
not return results yet.

Read `utils.py`, `test_utils.py`, `change-request.md`, and `lab-notes.md`. Do not
open the solution until you need the fallback or final comparison.

**Checkpoint:** You can name the expected result for every test before requesting
a suggestion.

## Part 2: Complete two bounded functions (30 minutes)

Start with `normalize_username`.

1. Read its docstring and focused test.
2. Place the cursor in the function body.
3. Request or wait for an inline suggestion.
4. Read the complete proposal before accepting it.
5. Accept, revise, or reject it.
6. Run:

   ```bash
   python -m unittest -v test_utils.UtilityTests.test_normalize_username
   ```

Repeat the process for `is_palindrome`:

```bash
python -m unittest -v \
  test_utils.UtilityTests.test_palindrome_ignores_spacing_and_case
```

Record both decisions in `lab-notes.md`.

**Checkpoint:** Two focused tests pass. The module has no new dependency.

## Part 3: Resolve the word-parsing ambiguity (30 minutes)

The phrase "count words" is incomplete. It does not define whether an apostrophe
splits a word.

Read `test_word_frequency_preserves_apostrophes`. The accepted rule is:

> Preserve an apostrophe when it appears inside a word. `don't` counts as one
> word.

Use that decision to complete `word_frequency`. A simple `split()` or punctuation
removal may violate the rule. Ask for an explanation if the proposed expression is
hard to review.

Run:

```bash
python -m unittest -v \
  test_utils.UtilityTests.test_word_frequency_preserves_apostrophes \
  test_utils.UtilityTests.test_word_frequency_does_not_change_input
```

Update the ambiguity section in `lab-notes.md`.

**Checkpoint:** Both word-frequency tests pass, and the input string remains
unchanged.

## Part 4: Add the summary and apply the rename (30 minutes)

Complete `profile_summary` and run its focused test:

```bash
python -m unittest -v test_utils.UtilityTests.test_profile_summary
```

Now open `change-request.md`. Rename the first parameter from `username` to
`handle`.

If Next Edit Suggestions are available, review each predicted change separately.
Do not assume every caller was found. Search after the rename:

```bash
grep -R --include='*.py' "username" .
```

The search should find no stale parameter or caller. Run the focused test again.

**Checkpoint:** The rename changed the parameter and caller without changing the
output.

## Part 5: Review and verify (15 minutes)

Inspect the complete change:

```bash
git --no-pager diff -- utils.py test_utils.py lab-notes.md
python -m unittest -v
```

If the working tree contains other changes, limit the review to the three lab
files.

## Final deliverable

1. `utils.py` implements all four functions.
2. `test_utils.py` passes all five tests.
3. `lab-notes.md` records the access path, suggestion decisions, ambiguity
   decision, rename search, and final test result.

## Verification

- [ ] `python -m py_compile utils.py test_utils.py` succeeds.
- [ ] `python -m unittest -v` passes five tests.
- [ ] `grep -R --include='*.py' "username" .` finds no stale parameter or caller.
- [ ] No dependency or unrelated file was added.
- [ ] The final diff matches the stated behavior.
