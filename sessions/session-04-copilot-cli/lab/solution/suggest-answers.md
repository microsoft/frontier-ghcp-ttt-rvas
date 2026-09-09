# Suggest Challenges — Expected Answers

Reference commands for the five suggest challenges. Copilot may suggest valid alternatives. Check that the command performs the task correctly and safely.

---

## Challenge 1: Find Large Python Files

**Task:** Find all Python files (`.py`) larger than 1MB in the current directory tree.

**Expected command:**

```bash
find . -name "*.py" -size +1M
```

**Acceptable alternatives:**

```bash
# With human-readable output
find . -name "*.py" -size +1M -exec ls -lh {} \;

# Using du for size
find . -name "*.py" -exec du -h {} + | awk '$1 ~ /M|G/ && $1+0 >= 1'
```

**What makes it correct:** Uses `find`, filters by `.py` extension, and uses `-size +1M` (the `+` means "greater than," `M` is megabytes).

**Common Copilot mistakes:** Sometimes suggests `1MB` instead of `1M` (wrong syntax for `find`), or uses `ls -la | grep .py` which doesn't check size.

---

## Challenge 2: Recent Commits by Author

**Task:** Show commits from the last 7 days by a specific author.

**Expected command:**

```bash
git log --since="7 days ago" --author="octocat"
```

**Acceptable alternatives:**

```bash
# With oneline format
git log --oneline --since="7 days ago" --author="octocat"

# Using date instead of relative time
git log --after="2026-04-09" --author="octocat"

# With stats
git log --stat --since="1 week ago" --author="octocat"
```

**What makes it correct:** Uses `git log`, `--since` or `--after` for time filtering, and `--author` for author filtering.

**Common Copilot mistakes:** Sometimes omits the `--since` flag and suggests piping through `grep` for dates, which is less reliable.

---

## Challenge 3: Branch, Commit, and Push

**Task:** Create branch `feature/cli-lab`, commit all changes, and push — in one line.

**Expected command:**

```bash
git checkout -b feature/cli-lab && git add . && git commit -m "add CLI lab files" && git push -u origin feature/cli-lab
```

**Acceptable alternatives:**

```bash
# Using git switch (modern syntax)
git switch -c feature/cli-lab && git add -A && git commit -m "add CLI lab files" && git push -u origin feature/cli-lab

# With --set-upstream shorthand
git checkout -b feature/cli-lab && git add . && git commit -m "add CLI lab files" && git push --set-upstream origin feature/cli-lab
```

**What makes it correct:** Creates branch, stages files, commits with message, pushes with upstream tracking — all chained with `&&` so each step only runs if the previous succeeds.

**Common Copilot mistakes:** Sometimes uses `;` instead of `&&` (which continues even on failure), or forgets `-u` for upstream tracking on the first push.

---

## Challenge 4: Top 10 Largest Files

**Task:** Find the top 10 largest files with human-readable sizes.

**Expected command:**

```bash
find . -type f -exec du -h {} + | sort -rh | head -10
```

**Acceptable alternatives:**

```bash
# Using du directly
du -ah . | sort -rh | head -10

# Excluding common large directories
find . -type f -not -path './node_modules/*' -not -path './.git/*' -exec du -h {} + | sort -rh | head -10

# With more detail
find . -type f -printf '%s %p\n' | sort -rn | head -10 | numfmt --to=iec --field=1
```

**What makes it correct:** Finds files (not directories), gets sizes, sorts numerically in reverse, and limits to 10 results.

**Common Copilot mistakes:** Sometimes includes directories in the output (missing `-type f`), or uses `sort -r` without `-h` for human-readable sort, which would sort "9K" above "1M."

---

## Challenge 5: List Assigned Issues

**Task:** List all open issues assigned to you in `octo-org/octo-repo`.

**Expected command:**

```bash
gh issue list --repo octo-org/octo-repo --assignee @me --state open
```

**Acceptable alternatives:**

```bash
# With JSON output for scripting
gh issue list --repo octo-org/octo-repo --assignee @me --state open --json number,title,labels

# With limit
gh issue list --repo octo-org/octo-repo --assignee @me --state open --limit 50
```

**What makes it correct:** Uses `gh issue list`, specifies the repo with `--repo`, uses `@me` for the authenticated user, and filters to `open` state.

**Common Copilot mistakes:** Sometimes uses the GitHub API directly (`gh api`) instead of the simpler `gh issue list` command, or uses a username instead of `@me`.

---

## Scoring the results

| Score                  | Meaning                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| 5/5 first-try accurate | Copilot nailed all 5 without refinement — impressive                     |
| 4/5                    | Solid — one needed minor adjustment                                      |
| 3/5                    | Good baseline — some commands needed iteration                           |
| 2/5                    | Descriptions may have been too vague — practice specificity              |
| 1/5                    | Try being more explicit about what you want (constraints, flags, format) |
