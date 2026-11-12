# Session M2-02 trainer guide: Agent mode in the IDE

## Teaching goal

Learners leave knowing which mode to use, what agent mode can touch, how to steer it, and how it differs from the CLI and the cloud agent.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:10 | Four modes |
| 0:10 to 0:22 | What agent mode can touch |
| 0:22 to 0:35 | Steering |
| 0:35 to 0:43 | Agent mode vs CLI vs cloud agent |
| 0:43 to 0:55 | Demo |
| 0:55 to 1:00 | Pros, cons, mistakes, lab handoff |

## Preparation

- Use a current VS Code with GitHub Copilot Chat. Mode names and settings change often, so open the mode picker and check what you see.
- Run the lab once on a scratch copy of `lab/starter/notes-api/`. Keep `lab/solution/notes-api/` open for comparison.
- For the TODO demo, push the scratch copy to a private repo you own. Install the GitHub Pull Requests extension and check that the lightbulb shows **Delegate to coding agent**. If it doesn't, check that the cloud agent is enabled for the repo and for your plan.
- Have a small MCP server ready only if you want to show an MCP tool. It is not needed for the lab.

## Four modes (0:00 to 0:10)

| Mode | Use it when |
| --- | --- |
| Ask | You want an answer, an explanation, or a review of an idea. Nothing changes. |
| Edit | You know which files to change and want a quick, contained edit. |
| Agent | The task spans files and needs commands, such as running tests. |
| Plan | The task is big or unclear. You want a reviewed plan before any edit. |

Key line: **pick the smallest mode that does the job.** Ask is cheaper to review than Agent.

Edit mode and the mode list have changed between VS Code releases. Show what your build offers. Tell learners to check the current docs if their picker differs.

## What agent mode can touch (0:10 to 0:22)

**Tool use** in plain words: the model can't open a file or run a command. It asks the editor to do it, the editor does it, and the result goes back to the model. Agent mode repeats this until the task is done.

Walk through the tool kinds: read, search, edit, terminal, MCP. Open the tools picker and switch one off to show you control the list.

**Trust** in plain words: what the agent can change or reach without asking you.

- Files: edited in place. Git makes it recoverable.
- Terminal: commands run with your permissions. VS Code asks first.
- MCP: servers can reach other systems. Add only servers you trust.
- Untrusted text: a README, issue, or web page can contain instructions aimed at the model. This is **prompt injection**. Tell learners to read what the agent fetched, not just what it wrote.

## Steering (0:22 to 0:35)

1. **Plan first.** Use Plan mode, or write "Plan only. Don't edit files." Edit the plan, then say go.
2. **Write a good prompt.** Goal, the behavior you want, where to work, how to check it ("run `npm test`").
3. **Watch the tool calls.** Expand them. If it reads the wrong files, stop and redirect.
4. **Review the diff.** Open each changed file. Keep or undo per file or per change.
5. **Checkpoints.** Chat keeps a restore point for each request. Restore to go back and try another prompt. Check the current docs for the exact UI.
6. **Terminal approval.** Read each command. Allow once for unfamiliar ones. Auto-approving a safe command like `npm test` is reasonable. Auto-approving everything is the mistake. Setting names change, so look them up in the docs.

Say this once: tests are the agent's feedback. A project with tests gets better results.

## Agent mode vs CLI vs cloud agent (0:35 to 0:43)

| | IDE agent mode | Copilot CLI (M2-01) | Cloud agent (M3-02) |
| --- | --- | --- | --- |
| Where it runs | Your machine, in VS Code | Your machine, in a terminal | GitHub's environment |
| Your role | Watch and review as it works | Watch and review as it works | Review the pull request |
| Output | Edits in your working tree | Edits in your working tree | A branch and a pull request |
| Strength | Diff view, checkpoints, editor context | Scripts, terminal tasks, any editor | Hand-off while you do other work |

The loop is the same in all three. The **place** and **your involvement** change. Rule of thumb: start in the IDE for work you want to watch. Use the cloud agent for tasks you can describe fully and review later.

## Demo (0:43 to 0:55)

Use `lab/starter/notes-api/`.

1. Open Chat in **Ask** mode. Paste the lab prompt. Read the answer. Nothing changes on disk.
2. Switch to **Agent** mode in a new chat with the same prompt. Expand the tool calls. Approve `npm test` when asked.
3. Open the diff. Point out one thing the plan or Ask answer didn't mention.
4. Restore the checkpoint to show undo.
5. Put your cursor on the TODO in `src/routes/notes.js`, open the lightbulb, and show **Delegate to coding agent**. Don't wait for the PR.

## Pros, cons, and tips

| Pros | Cons |
| --- | --- |
| Handles multi-file changes in one request | Can change more than you asked |
| Runs tests and reacts to failures | Long runs make big diffs |
| Works on your real project and context | Can build on a wrong assumption |
| Every change is visible and undoable | Slower than Ask for small questions |

**Tips**

- Say what "done" means: "all tests pass, README updated".
- Ask for a plan, then edit the plan, then go.
- Commit before a big run. Git is the real undo.
- Give a short list of files to start from with `#file` references.
- Keep requests small. Two small runs beat one huge one.
- Add repository instructions (M1-03) for conventions it keeps getting wrong.

## Common mistakes

- **Vague prompt.** "Add tags" leaves the agent to guess limits and format.
- **Skipping the plan** on a task that touches five files.
- **Accepting all** without reading the diff.
- **Auto-approving every command.**
- **Doing everything in one chat.** Long chats lose focus. Start a new one per task.
- **Using Agent for a question.** Use Ask.
- **No tests**, so neither of you can tell if it worked.

## Lab notes

- The Ask vs Agent comparison is qualitative. Ask learners what each output gave them and what it left out. Don't count messages or edits.
- Part 6 changes a requirement on purpose (lowercase tags). It shows how to steer after a diff.
- Part 7 needs a GitHub repo. Learners without one read the lightbulb step and skip the PR.
- The finished project is `lab/solution/notes-api/`. Learners' code will differ. Compare behavior and tests, not lines.

## References

- [Use agent mode in VS Code](https://code.visualstudio.com/docs/copilot/agents/overview)
- [Chat in VS Code](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
- [Copilot smart actions: implement TODO comments](https://code.visualstudio.com/docs/copilot/copilot-smart-actions)
- [Using Copilot cloud agent in your IDE](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-cloud-agent-in-your-ide)
- Session M2-01 (Copilot CLI) and Session M3-02 (cloud agent)
