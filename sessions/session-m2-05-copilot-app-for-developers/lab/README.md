# Session M2-05 lab: Fix a bug in the app and open a PR

**Duration:** 2 hours
**Deliverable:** A fixed `checkout-pricing` repo, a pull request (or a local branch) you reviewed, and a short comparison note

## Lab overview

You fix a pricing bug in a small sample repo. You work in the GitHub Copilot app the way a developer would: scope in a chat, plan in a session, run two sessions side by side, review the diff, and open a PR. Then you do one more small task in the CLI or your IDE and compare.

Everything is real. You use a **throwaway GitHub repo** you create for this lab, so nothing touches your team's code. The data is synthetic.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Create the throwaway repo and issue | 15 min |
| 2 | Scope the bug in a chat | 10 min |
| 3 | Fix it in a Plan-mode session | 25 min |
| 4 | Run a second session in parallel | 15 min |
| 5 | Review the result | 20 min |
| 6 | Open and check the PR | 20 min |
| 7 | Compare with another surface | 15 min |

Command names in the app change. If a command below isn't in your picker, type `/` and look. **Check `/help` in your version** and use the closest match.

## Part 1: Create the throwaway repo and issue

You need Git, Python 3.10 or later, the `gh` CLI signed in to GitHub, and the Copilot app.

```bash
mkdir -p ~/copilot-labs/session-m2-05
cp -R sessions/session-m2-05-copilot-app-for-developers/lab/starter \
  ~/copilot-labs/session-m2-05/checkout-pricing
cd ~/copilot-labs/session-m2-05/checkout-pricing
python -m unittest discover -s tests          # 4 failures expected
git init -b main && git add -A && git commit -m "Start"
gh repo create checkout-pricing-lab --private --source . --push
gh issue create --title "Order totals are wrong" --body-file issue-brief.md
```

In the app, click **+** next to **Sessions** and connect the folder (**Open local folder**) or the GitHub repo (**Add GitHub repository**).

**No GitHub repo?** Skip `gh repo create` and `gh issue create`. Do everything locally. You can't open a PR in Part 6, so review the branch diff instead.

**Checkpoint:** Four tests fail. The repo and issue exist, and the app shows the project in the sidebar.

## Part 2: Scope the bug in a chat

Open **Chats** (not a project session). A chat has no branch and no worktree, so it can't change your files. Ask:

```text
Here is the issue: <paste issue-brief.md>. Which of these four symptoms
share a root cause? What would you ask the author before coding?
```

Chats can't read your repo unless you attach files. Use `/attach-files` or `@` to add `shop/pricing.py`.

Write down one question you would send the issue author. Don't answer it. The rules in the issue are enough.

**Checkpoint:** You can say which symptoms look like one bug and which look separate.

## Part 3: Fix it in a Plan-mode session

1. Click **+** next to **Sessions** and pick the `checkout-pricing` project.
2. Set **Environment** to **This computer**.
3. Set **Workspace** to **New worktree**. Keep the base branch `main`.
4. Set the mode to **Plan**. Pick a model. Leave **Tool permissions** on **Ask every time** or **Assisted**.
5. Reference the issue and prompt:

```text
Fix #1 (type # and pick the issue). Don't edit the tests. Run
python -m unittest discover -s tests before you say you're done.
```

Read the plan before you approve. Check three things: does it mention all four symptoms, does it say it will leave the tests alone, and does it plan to run the tests? If not, reply in the session and ask it to revise.

Approve the plan and watch. Approve or deny each tool request. Note any command you wouldn't have run yourself.

**Checkpoint:** The session reports passing tests. You have **not** merged or pushed anything yet.

## Part 4: Run a second session in parallel

While you review Part 3, start a second session:

1. **+** next to **Sessions**, same project, **Workspace: New worktree**, mode **Interactive**.
2. Prompt: `Add a short "Usage" section to README.md that shows how to call order_total.`

Now look at what the app created. In a terminal (the `/terminal` command opens one in the app):

```bash
cd ~/copilot-labs/session-m2-05/checkout-pricing
git worktree list
git branch
```

You should see your original checkout plus **two more folders**, each on its own branch. Open each folder's `git status`. The README change appears in only one of them. Your original checkout is untouched.

Two questions to answer in your note:

- Which files does each session see? Does the second one see the first one's fix?
- What would have happened if both sessions had edited `pricing.py` and you merged both?

**Checkpoint:** You can point to the folder and branch of each session, and `git worktree list` shows them.

## Part 5: Review the result

Don't trust the summary. Check the work.

1. Open the Part 3 session's changes and read the **whole diff**.
2. Run the tests yourself, from that session's worktree folder (or with `/terminal`):

   ```bash
   python -m unittest discover -s tests -v
   ```
3. Run `/review` on the session. Read its findings. Decide which you accept.
4. Optional: run `/rubber-duck` and ask it to critique the change. It uses a different model from your session, so it may disagree.
5. Look for these common problems:
   - The tests changed.
   - The function signature changed.
   - A new dependency or unrelated file appeared.
   - The fix special-cases the test values instead of fixing the rule.

Compare the diff with [`solution/README.md`](solution/README.md) and [`solution/shop/pricing.py`](solution/shop/pricing.py). Yours doesn't need to match.

If something is wrong, tell the session what to fix and repeat. Don't edit by hand unless it's faster.

**Checkpoint:** You can name one thing the agent did well and one thing you changed or would change. Tests pass when you run them.

## Part 6: Open and check the PR

In the Part 3 session, run `/pr-open` or ask: `Open a pull request for these changes.` The app creates a branch, pushes it, and opens the PR using the repo's PR template if it has one.

Then check on GitHub (or in the app's **Pull requests** view):

- The PR links to the issue. If it doesn't, add `Closes #1` to the description.
- The `tests` workflow runs and passes.
- The diff on GitHub matches what you reviewed.

If checks fail, try `/pr-fix-checks`. If you leave a review comment on the diff, try `/pr-resolve-comments`. Both need an open PR.

Merge the PR (`/pr-merge`, the app's merge button, or GitHub). Then open the Part 4 session, ask it to rebase or merge `main`, and check that the README change still works with the merged fix.

**No GitHub repo?** Run `git log main..HEAD` and `git diff main` in the worktree instead. Skip the merge.

**Checkpoint:** A PR exists with a passing check, or a local branch with a diff you reviewed.

## Part 7: Compare with another surface

Do one more small task **outside the app**, in the Copilot CLI (`copilot`) or your IDE's agent mode. Use the `checkout-pricing` folder on a new branch:

```text
Reject negative quantities in order_total with a ValueError. Add a test.
```

Write a note of five sentences or fewer in `comparison.md`:

- Which surface did you use, and how long did the task take?
- What did you review, and how?
- What was easier or harder than in the app?
- When would you pick each one?

See [`solution/README.md`](solution/README.md) for a sample note.

**Checkpoint:** `comparison.md` exists and names one real difference you saw.

## Final deliverable

1. The `checkout-pricing` repo with the fix merged, or the fix on a local branch.
2. The PR link, or your `git diff main` output.
3. Your answers from Part 4 (two questions) and the `/review` findings you accepted or rejected.
4. `comparison.md`.

## Clean up

Delete the throwaway repo when you're done: `gh repo delete checkout-pricing-lab` (needs the `delete_repo` scope). Archive or delete the sessions in **Settings → Sessions → Manage sessions**. That also frees the worktree disk space.

## References

- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Managing issues and pull requests with the app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)
- [Slash commands for the app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
- [`git worktree`](https://git-scm.com/docs/git-worktree)
