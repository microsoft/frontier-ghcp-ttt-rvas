# Session M4-03 lab: Fix real failing GitHub Actions runs

**Duration:** 2 hours
**Deliverable:** A throwaway repo with three fixed workflows and all runs green, two reviewed security fixes, and a short note on each Copilot diagnosis you proved or rejected

## Lab overview

You push a small Node app with three broken workflows to a new GitHub repository. The runs fail for real. You diagnose each one with Copilot, fix it, and rerun.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Create the repo and watch it fail | 15 min |
| 2 | Dependency and cache failure | 20 min |
| 3 | Matrix failure | 20 min |
| 4 | Two-stage secret and permission failure | 20 min |
| 5 | Fix code scanning alerts and review the patch | 30 min |
| 6 | Reruns and clean up | 15 min |

## Before you start

You need the Copilot CLI, `gh` signed in (`gh auth status`), Git, and Node.js 20 or later. Everything is synthetic. Don't put real secrets in the repo or in a prompt.

Use a **public** repo so Copilot Autofix works for free. In a private repo, Autofix needs GitHub Code Security. Check current docs.

Keep `lab/solution/` closed until you finish a part.

## Part 1: Create the repo and watch it fail

Copy the starter out of the curriculum repo and push it. Run this from the curriculum repo root.

```bash
mkdir -p ~/copilot-labs/session-m4-03
cp -R sessions/session-m4-03-cicd-debugging-autofix/lab/starter/ci-lab-repo/. \
  ~/copilot-labs/session-m4-03/ci-lab
cd ~/copilot-labs/session-m4-03/ci-lab
git init -q -b main && git add -A && git commit -qm "Start"
gh repo create ci-lab-m4-03 --public --source=. --push
```

Pick a different repo name if it's taken. Now watch the runs:

```bash
gh run list --limit 10
gh run watch
```

Expect these results in a minute or two:

| Workflow | Expected |
| --- | --- |
| Build | Fails |
| Test on several Node versions | Fails |
| Label good builds | Fails |
| CodeQL | Passes (alerts come later) |

Open one run in the browser with `gh run view --web`. Find the **trigger**, the **job**, the **runner**, and the failed **step**. Write each in one line in your notes.

**Checkpoint:** three red runs, one per workflow.

## Part 2: Dependency and cache failure

Start with **Build**. Read the failure yourself first.

```bash
gh run list --workflow build.yml --limit 1
gh run view RUN_ID --log-failed
```

Write down the first failing line. Then start Copilot in the clone:

```bash
copilot
```

```text
Read the failed log of the latest Build run with `gh run view --log-failed`.
Give me the most likely cause and one thing that would disprove it.
Don't change any files yet.
```

Treat the answer as a **hypothesis**. Test it locally before you fix anything:

```bash
ls package-lock.json
npm ci
```

Then ask Copilot for the smallest fix on a branch, and read the diff.

```text
Fix the cause on a new branch called fix/build. Change only what's needed.
```

Push the branch, open a pull request, and watch the checks:

```bash
git push -u origin fix/build
gh pr create --fill
gh pr checks --watch
```

**Checkpoint:** the Build check is green. Other checks may still be red.

Name the failure class. Two apply here.

## Part 3: Matrix failure

Look at **Test on several Node versions**. Open the run page. One leg is red and the others are cancelled.

Try **Explain error**. In the pull request, open the menu (the three dots) next to the failed check in the merge box and choose **Explain error**. Or click the failed check and use the button at the top of the run summary page. If you don't see it, check current docs. It may be off for your account.

Does its answer explain why Node 18 fails but 20 and 22 don't? If it doesn't, say what is missing.

Now fix it with the cloud agent if your plan includes it.

1. Open an issue in your repo: "Matrix job fails on Node 18".
2. Paste the first failing line into the issue.
3. Assign the issue to **Copilot**.
4. Wait for the pull request. Read the diff and the checks.

No cloud agent? Fix it in the CLI session instead:

```text
The matrix workflow fails on Node 18. Check package.json and the code, then propose
the smallest correct fix. Don't change the test to hide the failure.
```

You have two options: remove Node 18 from the matrix, or change the code to run on 18. Check `engines` in `package.json` before you choose.

Merge the fix after its checks pass.

**Checkpoint:** every matrix leg is green, and you can say why the fix was right.

## Part 4: Two-stage secret and permission failure

Open **Label good builds**. The first failure is a missing secret. Ask Copilot for the cause and what would disprove it.

```text
Read the failed log of the latest "Label good builds" run. What is the most
likely cause? Don't edit files. Tell me what I'd need to change outside the repo.
```

A secret isn't in the code, so a file fix can't solve it. Add a synthetic value:

```bash
gh secret set DEPLOY_TOKEN --body "synthetic-not-a-real-token"
gh run rerun --failed
gh run watch
```

The run fails again at a **different step**. That's the second failure. Read the new log and repeat: hypothesis, local reasoning, smallest fix.

Let Copilot propose the change. **Reject** any fix that uses `write-all`. The step needs one permission. Push on a branch, open a pull request, and read the checks.

**Checkpoint:** **Label good builds** is green. Your notes say which change fixed which failure.

## Part 5: Fix code scanning alerts and review the patch

`src/server.js` has two deliberate vulnerabilities. CodeQL analyzed `main` in Part 1. Open the **Security** tab of your repo (it may be labeled **Security and quality**), then **Code scanning**. If there are no alerts yet, wait a few minutes and refresh. The alerts you get depend on CodeQL's current rules.

For one alert, open its page and use **Generate fix** (Copilot Autofix). Read the suggested change. It's a **suggestion**, not a commit.

Review it before you apply it:

- Does it fix the cause or only the alert?
- Does valid input still work?
- Did it touch other files?

For the second alert, use the Copilot CLI:

```text
Explain the second code scanning alert in src/server.js. Then fix it with the
smallest change and add a test that fails without the fix.
```

Check both fixes with the reference test. Copy it into your repo and run it. Replace the path with where your curriculum clone lives.

```bash
cp /path/to/curriculum/sessions/session-m4-03-cicd-debugging-autofix/lab/solution/secure-src/security.test.js test/
npm test
```

Both security tests should pass.

Optional: try **agentic autofix**. It must be enabled for your repository, and it only handles alerts on the default branch. Assign an alert to Copilot. It starts an agent session, checks its fix with CodeQL, and opens a draft pull request. It uses AI credits and Actions minutes. Compare its patch with the Autofix suggestion.

**Checkpoint:** both vulnerabilities are fixed, tests pass, and you can say what each fix protects.

## Part 6: Reruns and clean up

Answer these in your notes:

1. A rerun turned a run green with no code change. What does that tell you?
2. Why is "rerun until green" a bad fix?
3. Where did Copilot's first diagnosis miss or go too far?

Then delete the repo:

```bash
gh repo delete ci-lab-m4-03 --yes
```

If `gh` asks for the `delete_repo` scope, run `gh auth refresh -s delete_repo` first. Or delete the repo from its **Settings** page.

## Final deliverable

Keep this before you delete the repo:

1. `gh run list` output showing the latest runs green.
2. Your notes for each of the three workflows: failure class, Copilot's diagnosis, what you tested, and the fix.
3. One line for each security fix: the alert and what the patch does.

## References

- [Troubleshooting workflows](https://docs.github.com/en/actions/how-tos/troubleshoot-workflows)
- [About autofix for code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning)
- [Fixed workflows](solution/fixed-workflows/) and [secure server](solution/secure-src/server.js)
