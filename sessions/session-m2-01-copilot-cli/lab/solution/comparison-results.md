# CLI vs IDE comparison: Review guide

Use your table in `lab/starter/comparison-tasks.md` to compare the task you chose.
The lab requires one comparison; the other tasks are optional practice.
Record actual timings, corrections, and check results. There is no expected winner.

## Task 1: Explain a complex regex

**The regex:** `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`

Judge whether each explanation matches the regex, not how thorough it sounds.
Note any correction needed and whether follow-up questions resolved it.

## Task 2: Generate a log processing script

Compare the script's output with the task requirements before rating it.
Include the time spent correcting and testing it, not just generating it.
Programmatic mode (`-p`) can return a script to stdout; the IDE lets you inspect
and edit it in a file. Neither workflow makes an untested script ready to use.

## Task 3: Debug a failing test

Compare test results, the scope of each fix, and the corrections each needed.
Explain whether file navigation or terminal output helped you trace the defect.

## The decision framework

Choose from the results you checked. For example:

> "In this run, [surface] needed fewer corrections because [reason]. I would choose
> [surface] for this task when [condition]."

Visual navigation may favor the IDE; terminal automation may favor the CLI.
These are reasons to try a surface, not guarantees about speed or correctness.
