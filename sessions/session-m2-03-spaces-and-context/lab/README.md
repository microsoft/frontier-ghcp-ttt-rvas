# Session M2-03 lab: Build a Space, then compare context

**Duration:** 2 hours
**Deliverable:** One working Copilot Space, a short instructions file, and a filled-in comparison of four runs of the same task

## Lab overview

You add one endpoint to a small Storefront API four times. Each run gets different context. You score the results and see which mechanism supplied what.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Set up the project and a private repository | 15 min |
| 2 | Build the Space | 25 min |
| 3 | Run the task with no context, then with the Space | 25 min |
| 4 | Write the instructions | 20 min |
| 5 | Run with instructions, then with both | 25 min |
| 6 | Compare and decide | 10 min |

Stretch tasks at the end are optional and sit outside the 2 hours.

## Before you start

You need:

- a GitHub account with Copilot, and access to [Copilot Spaces](https://github.com/copilot/spaces);
- the standalone Copilot CLI from Session M2-01;
- Git, the `gh` CLI (signed in), and Node.js 18 or later.

Use only the synthetic Storefront files in this lab. Put them in a **private** repository on your personal account. Don't add real company code or data to the Space.

## Part 1: Set up

Make two copies of the project. The full copy goes to GitHub and feeds the Space. The bare copy has only `src/` and `package.json`. You run every task in the bare copy, so Copilot can't read the docs on its own.

```bash
mkdir -p ~/copilot-labs/session-m2-03
cd ~/copilot-labs/session-m2-03
cp -R <path-to-repo>/sessions/session-m2-03-spaces-and-context/lab/starter/ecommerce-project storefront-api
cp <path-to-repo>/sessions/session-m2-03-spaces-and-context/lab/starter/context-comparison.md .

cd storefront-api
git init -q -b main && git add -A && git commit -qm "Start"
gh repo create storefront-api-lab --private --source . --push

cd ..
mkdir bare-api && cp -R storefront-api/src storefront-api/package.json bare-api/
cd bare-api
npm install
printf 'node_modules\n' > .gitignore
git init -q -b main && git add -A && git commit -qm "Bare start"
```

Open `storefront-api/docs/api-spec.md` and read the **Low-stock report** section. Your task needs that behavior, and the code doesn't contain it.

**Checkpoint:** `storefront-api-lab` exists on GitHub with `docs/` on `main`. `bare-api` has no `docs/` folder.

## Part 2: Build the Space

Go to [github.com/copilot/spaces](https://github.com/copilot/spaces).

1. Click **Create space**. Name it `Storefront API reference`. Choose your personal account as owner.
2. Add **Instructions**. Paste the text from `lab/solution/space-setup.md`, or write your own in five lines or fewer.
3. Click **Add sources**, then **Add files and repositories**. Pick `storefront-api-lab` and add these four **files**, not the repository:
   - `docs/api-spec.md`
   - `docs/architecture.md`
   - `src/models/product.js`
   - `src/routes/products.js`
4. Leave the Space private.

Why files and not the repository? Copilot loads a file into the context window in full, for every question. It searches a repository and pulls only what looks relevant. For a few key documents, files are more predictable. For a large docs tree, a repository is the better source.

### Test the Space

Ask in the Space chat:

```text
What is the default low-stock threshold, and which products does the report exclude?
```

You should get a threshold of 10, with inactive and discontinued products excluded, taken from `api-spec.md`.

### Watch a source refresh

GitHub files in a Space follow the **`main` branch** of their repository. Check it:

1. In `storefront-api`, change the default threshold in `docs/api-spec.md` from 10 to 20. Commit and push to `main`.
2. Ask the same question in the Space. The change may take a moment to show up. If it doesn't, check the current docs.
3. Change the threshold back to 10 and push again.

This helps when docs change. It hurts when someone pushes a bad change. **A Space is only as current and as correct as `main`.**

**Checkpoint:** The Space answers from the spec, and you saw one answer change after a push.

## Part 3: Run the task twice

Use this exact prompt every time:

```text
Add GET /api/products/low-stock that lists products running low on stock.
Put it in its own route file and add tests. Run the tests.
```

For each run: branch from `main`, start a **fresh** Copilot session, paste the prompt, save the diff, and go back to `main`.

### Run 1: no context

```bash
cd ~/copilot-labs/session-m2-03/bare-api
git switch -c run-1-none
copilot
```

Paste the prompt. Allow file writes and `npm` commands when asked. When it finishes, exit and save the result:

```bash
git add -A && git commit -qm "Run 1" && git diff main > ../run-1.diff
git switch main
```

### Run 2: with the Space

The CLI's built-in GitHub MCP server doesn't include Spaces tools by default. Enable them for the session:

```bash
git switch -c run-2-space
copilot --add-github-mcp-toolset copilot_spaces
```

Paste the prompt with one extra line:

```text
Use my Copilot Space "Storefront API reference" for behavior and conventions.
```

Look for a `get_copilot_space` tool call. If Copilot doesn't make one, repeat the request and name the Space owner.

Save the diff as `run-2.diff` the same way, then `git switch main`.

If your CLI can't reach Spaces, check the current docs. As a fallback, ask the prompt in the Space chat on github.com and paste the code it returns into the bare copy. The surface differs, so note that in your comparison.

**Checkpoint:** You have `run-1.diff` and `run-2.diff`. Fill in the first two columns of `context-comparison.md`.

## Part 4: Write the instructions

Instructions load **every time**, without you asking. Keep them short, so they don't crowd out the task.

In `bare-api`, create two files. Write them yourself first. Open `lab/solution/.github/` only to compare.

**`.github/copilot-instructions.md`** applies to the whole repository. Include:

- language style: ES modules, file naming;
- how responses and errors are shaped;
- how to test: the framework, how to start the app, the command to run;
- one thing to avoid, such as new dependencies.

Aim for 12 lines or fewer. Use short imperative bullets. Skip anything the code already shows clearly.

**`.github/instructions/routes.instructions.md`** applies only to matching files. It needs frontmatter:

```markdown
---
applyTo: "src/routes/**/*.js"
---
```

Add two or three rules that matter only in route files. `applyTo` takes glob patterns, such as `src/routes/**/*.js` or `**/*.ts,**/*.tsx`.

Commit both files on `main`:

```bash
git add -A && git commit -qm "Add instructions"
```

**Checkpoint:** Two files under `.github/`, committed on `main`. Neither repeats the low-stock spec.

## Part 5: Run with instructions, then with both

### Run 3: instructions only

```bash
git switch -c run-3-instructions
copilot
```

Paste the plain prompt, with **no** Space line. Save `run-3.diff` and `git switch main`.

### Run 4: instructions and Space

```bash
git switch -c run-4-both
copilot --add-github-mcp-toolset copilot_spaces
```

Paste the prompt with the Space line. Save `run-4.diff` and `git switch main`.

**Checkpoint:** Four diffs. Fill in the last two columns of your comparison.

## Part 6: Compare and decide

Fill in the last two sections of `context-comparison.md`:

1. **What changed between runs.** Name one behavior the Space fixed and one the instructions fixed.
2. **Which context would you keep.** For each line below, pick Space, repository instructions, path-specific instructions, prompt file, or nothing:
   - "Our API returns `{ data }` envelopes."
   - "The spec for the low-stock report."
   - "Use `node:test` in this repo."
   - "Summarize this stack trace."
   - "Review a PR with our checklist, when I ask."

Compare your table with `lab/solution/expected-comparison.md`. Model output varies, so your runs may differ. Rerun a prompt if a result looks odd.

## Stretch tasks

Pick one if you finish early.

- **See what the CLI loaded.** Run `/instructions` in the Copilot CLI to list the instruction files it found, and switch one off. Run `/env` to see what else is loaded. Check the current CLI docs for details.
- **Prompt file.** In VS Code, create `.github/prompts/low-stock-report.prompt.md` that holds the task prompt, and run it from chat. Prompt-file support differs by tool, so check the current docs.
- **Stale instruction.** Add a rule to `routes.instructions.md` that contradicts the code, such as "use CommonJS". Rerun and see what happens. Delete it.
- **Share a Space.** Create a Space under an organization you can use and compare its sharing options with your personal one.

## Final deliverable

1. A private `storefront-api-lab` repository and a **Space** with four file sources and short instructions.
2. `.github/copilot-instructions.md` and one `.instructions.md` file with an `applyTo` pattern.
3. Four diffs (`run-1.diff` to `run-4.diff`).
4. A filled-in `context-comparison.md`, including your choices from Part 6.

## References

- [About GitHub Copilot Spaces](https://docs.github.com/en/copilot/concepts/prompting-and-context/spaces)
- [Creating GitHub Copilot Spaces](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/copilot-spaces/create-copilot-spaces)
- [Using Copilot Spaces in your IDE](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/extend-copilot-with-tools-and-context/use-copilot-spaces)
- [Adding custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
