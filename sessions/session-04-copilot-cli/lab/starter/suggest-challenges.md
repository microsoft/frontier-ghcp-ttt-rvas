# Suggest Challenges

Use the standalone `copilot` CLI for each task below. Ask in interactive mode or with `copilot -p "Suggest a command to ..."`, review the suggestion before running it, and record whether it meets the requirements.

---

## Challenge 1: Find Large Python Files

**Task:** Find all Python files (`.py`) in the current directory tree that are larger than 1MB.

**Run:**

```bash
copilot -p "Suggest a shell command to find all Python files larger than 1MB in the current directory"
```

Tell Copilot this should be a **shell** command.

**Expected approach:** Should use `find` with `-name "*.py"` and `-size +1M`

**Suggested command:** ___  
**Does it work?**___  
**Did you need to refine?** ___

---

## Challenge 2: Recent Commits by Author

**Task:** Show all commits from the last 7 days written by a specific author (use your own name or "octocat").

**Run:**

```bash
copilot -p "Suggest a git command to show commits from the last 7 days by author octocat"
```

Tell Copilot this should be a **git** command.

**Expected approach:** Should use `git log --since="7 days ago" --author="octocat"`

**Suggested command:** ___  
**Does it work?**___  
**Did you need to refine?** ___

---

## Challenge 3: Branch, Commit, and Push

**Task:** Create a new branch called `feature/cli-lab`, make a commit with message "add CLI lab files", and push the branch — all in one line.

**Run:**

```bash
copilot -p "Suggest a git command to create a new branch called feature/cli-lab, commit all changes with message 'add CLI lab files', and push the branch to origin"
```

Tell Copilot this should be a **git** command.

**Expected approach:** Should chain commands with `&&`: `git checkout -b feature/cli-lab && git add . && git commit -m "add CLI lab files" && git push -u origin feature/cli-lab`

**Suggested command:** ___  
**Does it work?**___  
**Did you need to refine?** ___

> **Safety note:** Don't actually run this command unless you want to create the branch! Review the suggestion first.

---

## Challenge 4: Top 10 Largest Files

**Task:** Find the top 10 largest files in the current directory tree, showing their sizes in human-readable format.

**Run:**

```bash
copilot -p "Suggest a shell command to find the top 10 largest files in the current directory tree with human-readable sizes"
```

Tell Copilot this should be a **shell** command.

**Expected approach:** Could use `find . -type f -exec du -h {} + | sort -rh | head -10` or `du -ah . | sort -rh | head -10`

**Suggested command:** ___  
**Does it work?**___  
**Did you need to refine?** ___

---

## Challenge 5: List Assigned Issues

**Task:** List all open issues assigned to you in a GitHub repository (use `octo-org/octo-repo` as the example repo).

**Run:**

```bash
copilot -p "Suggest a gh command to list all open issues assigned to me in octo-org/octo-repo"
```

Tell Copilot this should be a **gh** command.

**Expected approach:** Should use `gh issue list --repo octo-org/octo-repo --assignee @me --state open`

**Suggested command:** ___  
**Does it work?**___  
**Did you need to refine?** ___

---

## Summary

After the five challenges:

1. How accurate were the first suggestions (without refinement)? ___/5
2. Which command type (shell, git, gh) had the best suggestions? ___
3. When you refined your description, what made the biggest difference? ___
4. Would you trust AI-suggested commands you'll run on a production server? Why or why not? ___
