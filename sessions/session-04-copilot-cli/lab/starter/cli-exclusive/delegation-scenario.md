# Delegation Scenario

Use the CLI's `/delegate` and `/fleet` commands to distribute work across agents. Review the scope and results from each agent before you accept any changes.

---

## Scenario: Project Quality Audit

Your team is taking over the `agent-tasks` project and needs a quality assessment. Split independent checks when parallel work saves time.

---

## Part 1: Delegate to Cloud Agent (`/delegate`)

Push a documentation improvement task to the Copilot cloud agent on GitHub:

```
/delegate Review the agent-tasks project README.md (if it exists) or create one. It should include: project description, setup instructions, API endpoint documentation with example requests/responses, and testing instructions. Create a PR with the improvements.
```

**What to observe:**

- Does Copilot create a branch on GitHub?
- Does it open a draft PR?
- How does the PR description look?

> **Note:** This requires your project to be pushed to a GitHub remote. If you're working locally, observe the attempt and note what `/delegate` tries to do.

---

## Part 2: Fleet Parallel Analysis (`/fleet`)

Run a multi-part code analysis using parallel subagents:

```
/fleet Perform a full audit of the agent-tasks project:
1. Analyze src/app.js for security vulnerabilities (SQL injection, XSS, missing input validation, rate limiting gaps)
2. Analyze src/utils.js for correctness issues (edge cases that would cause runtime errors, missing null checks)
3. Review tests/ for coverage gaps (untested endpoints, missing edge case tests, no error path testing)
```

**What to observe:**

- [ ] Did `/fleet` spawn 3 separate subagents?
- [ ] Can you see them working in parallel via `/tasks`?
- [ ] How does the combined result compare to asking each question sequentially?
- [ ] Did any subagent find issues the others missed?

---

## Part 3: Check Status (`/tasks`)

While the fleet is working (or after it completes):

```
/tasks
```

**Record:**

- Number of subagents spawned: ___
- Status of each: ___
- Total time for parallel execution: ___
- Estimated time if done sequentially: ___

---

## Reflection

1. When would you use `/delegate` (cloud agent) vs. `/fleet` (local subagents)? ___
2. What types of tasks benefit most from parallel execution? ___
3. Could you use these in a CI/CD pipeline? How? ___
