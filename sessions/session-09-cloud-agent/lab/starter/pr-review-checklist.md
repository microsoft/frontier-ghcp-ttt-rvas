# PR Review Checklist for Agent-Generated Code

Use this checklist to review PRs created by the Copilot cloud agent or another coding agent.

## Correctness

- [ ] **Does the code do what the issue requests?** Compare the PR against its acceptance criteria.
- [ ] **Do existing tests still pass?** Check the PR's CI status.
- [ ] **Are there tests for new behavior?**
- [ ] **Do the tests cover edge cases?** Check empty input, nulls, and boundaries.

## Code Quality

- [ ] **Does the code match the project's style?** Check naming, formatting, and patterns.
- [ ] **Is the solution reasonable?** Would you accept it from a teammate?
- [ ] **Are all changes necessary?** The agent should modify only what the issue requires.
- [ ] **Is dead or commented-out code absent?**

## Security

- [ ] **No hardcoded secrets or credentials?**
- [ ] **Is input validation present?** Validate user input before use.
- [ ] **Are SQL injection and command injection risks absent?**
- [ ] **Do error messages avoid internal details?** Check stack traces and file paths.

## Dependencies

- [ ] **No unnecessary new dependencies added?**
- [ ] **If dependencies were added, are they maintained and appropriate?**
- [ ] **Do package versions use appropriate ranges?**

## Documentation

- [ ] **Does the PR description explain the changes?**
- [ ] **Code comments where logic is non-obvious?**
- [ ] **README updated if behavior changed?**

## Agent-Specific Checks

- [ ] **Did the agent complete the task?**
- [ ] **Does the commit history make sense?**
- [ ] **Are all APIs real?** Check for functions or methods that do not exist.
- [ ] **Are file paths correct?**

---

## Review Decision

After checking all items:

| Decision            | When                                       | Action                                                  |
| ------------------- | ------------------------------------------ | ------------------------------------------------------- |
| **Approve**         | All criteria are met and the code is ready | Merge the PR                                            |
| **Request Changes** | Fixable issues remain                      | Leave specific comments and request a revision          |
| **Close**           | The approach is fundamentally wrong        | Close the PR, rewrite the issue, and reassign           |
