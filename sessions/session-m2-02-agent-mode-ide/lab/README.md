# Session M2-02 lab: Add a feature with agent mode

**Duration:** 2 hours
**Deliverable:** Your `notes-api` with the tags feature, a short Ask vs Agent comparison, and a TODO delegated to the cloud agent

## Lab overview

You start with a small, working notes API and add tags to it. You do it once in Ask mode to see what it gives you, then in Agent mode with a plan first. You review the diff, ask for a fix, and hand a TODO comment to the cloud agent.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Set up the project | 10 min |
| 2 | Ask vs Agent on the same prompt | 20 min |
| 3 | Plan first | 15 min |
| 4 | Build in agent mode | 25 min |
| 5 | Review the diff and undo | 20 min |
| 6 | Ask for a fix | 10 min |
| 7 | Delegate a TODO | 15 min |
| 8 | Compare and wrap up | 5 min |

## Before you start

You need VS Code with GitHub Copilot Chat, Node.js 20 or later, and Git. Mode names and buttons change between VS Code releases. If something differs from this guide, check the current VS Code docs.

## Part 1: Set up the project

```bash
mkdir -p ~/copilot-labs/session-m2-02
cp -R sessions/session-m2-02-agent-mode-ide/lab/starter/notes-api ~/copilot-labs/session-m2-02/
cd ~/copilot-labs/session-m2-02/notes-api
git init -q && git add -A && git commit -qm "Start"
npm install && npm test
code .
```

Four tests pass. Open `src/routes/notes.js`, `src/store.js`, and `src/validate.js` and read them for two minutes.

In Copilot Chat, open the mode picker and the tools picker. Note which modes you have and which tool groups you can switch off.

**Checkpoint:** `npm test` passes and you can see the mode and tools pickers.

## Part 2: Ask vs Agent on the same prompt

Use this prompt in both modes. It is specific on purpose.

```text
Add tags to notes. A note gets an optional `tags` list of up to 5 strings,
each 1 to 20 lowercase letters, digits, or hyphens. The list defaults to
empty. Accept tags on create and update, validate them, and add a `?tag=`
filter to GET /api/notes. Add tests and update the README.
```

1. Set the mode to **Ask** and send it. Read the answer. Don't apply anything.
2. Run `git status`. Nothing should have changed.
3. Open a **new chat**, switch to **Agent**, and send the same prompt. Let it start, but when it asks to run a command, **stop here**. Read the command, then click Cancel or don't allow it.
4. Run `git restore . && git clean -fd` to return to the starting point.

Answer in `comparison.md` (3 to 5 lines):

- What did Ask give you that you could act on?
- What did Agent do that Ask couldn't?
- Which files did each one mention or touch?

**Checkpoint:** `comparison.md` exists, and `git status` is clean.

## Part 3: Plan first

Open a new chat. Switch to **Plan** mode if your build has it. If not, use Agent mode and start with "Plan only. Don't edit any files."

Send the same prompt. When the plan comes back, read it and edit it. Pick at least one change:

- Add "validate tags in `src/validate.js`, not in the route".
- Add "write tests before changing the code".
- Remove a step you don't want.

Tell Copilot to use the revised plan.

**Checkpoint:** you changed the plan before any file was edited.

## Part 4: Build in agent mode

If you used Plan mode, start the plan from there. Otherwise tell Agent mode to go ahead with the plan.

While it works:

- Expand the tool calls. Note which files it reads and searches before it edits.
- Read each terminal command before you allow it. Allow `npm test`. If it wants to install a package or delete files, say no and ask why.
- Let it run the tests and react to any failure.

**Checkpoint:** Agent reports the tests pass, and `npm test` also passes when you run it yourself.

## Part 5: Review the diff and undo

Open Source Control and read the diff file by file. For each file, ask:

- Does this change belong to the request?
- Is anything missing, such as a test for a bad tag or an update to the README?
- Did it touch something you didn't ask for?

Write down one thing you would change. Then:

1. In chat, find the checkpoint for your request and restore it. Check that your files go back to the starting point.
2. Redo the request, or use the redo option, to get the changes back.
3. Keep the changes with the keep or accept control, file by file.

Commit when you're happy: `git add -A && git commit -m "Add tags"`.

**Checkpoint:** you read every changed file, and you used restore at least once.

## Part 6: Ask for a fix

Change a requirement. Tags like `Work` and `work` should be the same tag. Ask in the same chat:

```text
Tags should be case-insensitive. Normalize them to lowercase when a note
is created or updated, and make ?tag= match case-insensitively. Add a test.
Run npm test.
```

Check the new diff. Did it change `validate.js` to reject uppercase tags? That conflicts with the new rule. If it did, say what is wrong and ask it to fix that.

**Checkpoint:** a note created with `["Work"]` is stored as `["work"]`, `?tag=WORK` finds it, and the tests pass.

## Part 7: Delegate a TODO

`src/routes/notes.js` ends with a TODO comment:

```js
// TODO: Add GET /export that returns all notes as CSV ...
```

You need the GitHub Pull Requests extension and a GitHub repository you own with the cloud agent enabled. Never use a repository that holds real work or data.

1. Create a private repo and push your project to it.
2. Put the cursor on the TODO comment. Open the lightbulb (code action) and choose **Delegate to coding agent**.
3. If asked about local changes, push them so the agent starts from your current code.
4. Open the pull request link Copilot gives you. Don't wait for it to finish. Come back in Part 8 or after the lab.

If you can't use the cloud agent, read the lightbulb options and note what they offer. Skip the rest of this part.

**Checkpoint:** a cloud agent session exists for your repo, or you noted why you skipped.

## Part 8: Compare and wrap up

Add three lines to `comparison.md`:

- What did planning first change?
- What would you do differently with the same prompt next time?
- Which of these would you give to the CLI, to agent mode, and to the cloud agent? Give one reason each.

If the cloud agent pull request is ready, review it like any other pull request.

## Final deliverable

1. Your `notes-api` with the tags feature and passing tests, including the case-insensitive fix.
2. `comparison.md` with your Ask vs Agent notes and your closing lines.
3. The cloud agent session or pull request from the TODO, or a note on why you skipped it.

Compare with `lab/solution/notes-api/`. The solution doesn't include the lowercase fix or the CSV export, so your code may go further.

## References

- [Use agent mode in VS Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- [Copilot smart actions](https://code.visualstudio.com/docs/copilot/copilot-smart-actions)
- [Using Copilot cloud agent in your IDE](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-cloud-agent-in-your-ide)
