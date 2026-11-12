# Session M1-01 lab: Review inline suggestions

**Duration:** 2 hours

**Deliverable:** A completed and tested `utils.py`, the focused test suite, and
your notes in `lab-notes.md`

## Lab overview

You complete one Python utility module in stages. The tests define the expected
behavior. Inspect each suggestion, settle one ambiguous word-parsing rule, then
review a parameter rename as a separate change. Use synthetic data only.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prepare the project and inspect the failing baseline | 15 min |
| 2 | Complete two functions | 30 min |
| 3 | Resolve the word-parsing ambiguity | 30 min |
| 4 | Add the profile summary and apply the rename | 30 min |
| 5 | Review the diff and run all tests | 15 min |

You need Python 3.10 or later, a terminal, an editor with GitHub Copilot, and
`git`. Writing the code by hand skips the inline-suggestion practice.

## Part 1: Prepare the project (15 minutes)

```bash
cd sessions/session-m1-01-intro-to-copilot/lab/starter
python -m py_compile utils.py test_utils.py
python -m unittest -v
```

The syntax check passes. The five tests fail because the functions return
nothing yet.

Read `utils.py`, `test_utils.py`, `change-request.md`, and `lab-notes.md`. Keep
the solution closed until the final comparison.

**Checkpoint:** You can name the expected result for every test.

## Part 2: Complete two functions (30 minutes)

Start with `normalize_username`.

1. Read its docstring and focused test.
2. Place the cursor in the function body.
3. Request or wait for an inline suggestion.
4. Read the whole suggestion, then accept, revise, or reject it.
5. Run:

   ```bash
   python -m unittest -v test_utils.UtilityTests.test_normalize_username
   ```

Repeat for `is_palindrome`:

```bash
python -m unittest -v \
  test_utils.UtilityTests.test_palindrome_ignores_spacing_and_case
```

Note both decisions in `lab-notes.md`.

**Checkpoint:** Two focused tests pass. The module has no new dependency.

## Part 3: Resolve the word-parsing ambiguity (30 minutes)

Before implementing "count words," decide whether an apostrophe splits a word.
Read `test_word_frequency_preserves_apostrophes`. The rule is:

> Keep an apostrophe inside a word. `don't` counts as one word.

Complete `word_frequency` with that rule. A plain `split()` or punctuation
removal can break it. If you can't follow a suggested expression, ask Copilot to
explain it before you accept it.

```bash
python -m unittest -v \
  test_utils.UtilityTests.test_word_frequency_preserves_apostrophes \
  test_utils.UtilityTests.test_word_frequency_does_not_change_input
```

Update the ambiguity section in `lab-notes.md`.

**Checkpoint:** Both tests pass, and the input string stays unchanged.

## Part 4: Add the summary and apply the rename (30 minutes)

Complete `profile_summary`, then run its test:

```bash
python -m unittest -v test_utils.UtilityTests.test_profile_summary
```

Open `change-request.md` and rename the first parameter from `username` to
`handle`.

If Next Edit Suggestions are available, review each predicted change on its own.
It can miss a caller, so search after the rename:

```bash
grep -R --include='*.py' "username" .
```

The search should find no stale parameter or caller. Run the focused test again.

**Checkpoint:** The rename changed the parameter and caller, and the output is
the same.

## Part 5: Review the diff (15 minutes)

```bash
git --no-pager diff -- utils.py test_utils.py lab-notes.md
python -m unittest -v
```

If the working tree has other changes, review only these three files.

## Final deliverable

1. `utils.py` implements all four functions.
2. `test_utils.py` passes all five tests.
3. `lab-notes.md` records your suggestion decisions, the apostrophe decision,
   the rename search, and the final test result.
