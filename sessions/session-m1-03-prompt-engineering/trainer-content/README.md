# Session M1-03 trainer guide: Prompt engineering fundamentals

## Delivery objective

Teach learners to design the task before writing the prompt. Show how to state
the work, choose relevant context, set boundaries, and give a useful example.
Refine one concern at a time.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:07 | Prompting as task design |
| 0:07 to 0:20 | Intent, context, constraints, and examples |
| 0:20 to 0:29 | Comments and neighboring-file context |
| 0:29 to 0:39 | Iterative refinement |
| 0:39 to 0:48 | Prompt anti-patterns and untrusted instructions |
| 0:48 to 0:56 | Prepared todo-store demonstration |
| 0:56 to 1:00 | Reusable patterns and lab handoff |

The timings match [`slides.md`](../slides.md).

## Before delivery

- Check Node.js 22 or later and standalone CLI authentication.
- Run starter syntax checks.
- Run the solution tests.
- Prepare a demo copy of the todo store.
- Check GitHub Copilot Chat and inline-suggestion access.
- Check `/refine` in CLI `/help`; do not substitute an editor command.
- Check current context controls in official product documentation.
- Keep `change-request.md` closed until learners reach the change request.

## Slide delivery map

### 0:00 to 0:07: Prompting as task design

**Slides:** *Prompt Engineering Fundamentals*, *Agenda*, *A prompt is a work
request*

Use this weak request:

```text
Build the todo feature.
```

Ask learners what the model must guess. Expected answers include file, behavior,
input, errors, dependencies, and completion criteria.

Explain that learners still make the engineering decisions. Writing a prompt
brings those decisions forward.

### 0:07 to 0:20: Four prompt components

**Slides:** *Four useful components*, *Intent*, *Context*, *Constraints*,
*Examples*

Use the components to find missing detail, not as a mandatory long template.

**Intent** names the action and scope.

**Context** supplies files, symptoms, patterns, or prior decisions.

**Constraints** set dependencies, compatibility, file scope, and non-goals.

**Examples** make output or behavior concrete.

Use the todo store prompt:

```text
Implement only TodoStore.create in lib/todo-store.js.
Use the existing tests as the contract.
Trim the title, apply defaults, return a copy, and add no package.
Run the focused create test when done.
```

### 0:20 to 0:29: Comments and context

**Slides:** *Comments can carry intent*, *Neighboring files are context, not a
contract*

Open `routes/todos.js` and `examples/response-shapes.js`.

Show how a route comment can provide intent and constraints. Then request the same
handler with the response-shape example closed and open. Do not promise the result
will differ.

Compare both proposals with the accepted API contract before choosing one.

### 0:29 to 0:39: Iterative refinement

**Slides:** *Refine the missing behavior*, *One concern per turn*, *Restart when
the frame is wrong*, *Review the `/refine` rewrite*

Spend the first four minutes on CLI `/refine`. Use the lab's rough baseline-store
request. Compare the rewrite with the tests before submitting it for
implementation. Ask learners to find an omitted constraint or invented behavior;
record no mismatch if the rewrite preserves the request.

Show the input-box variant: type a rough draft, press `Ctrl+X`, then `/`, and run
`/refine` without arguments. A rewritten prompt still needs a human decision.
It does not execute the task on the learner's behalf.

Use this progression:

1. Implement baseline list behavior.
2. Run the baseline list test.
3. Name the exact copy-semantics failure.
4. Ask for that change only.
5. Rerun the focused test.

Show how each iteration keeps the useful work and targets the mismatch. Restart
when the design or task is wrong.

### 0:39 to 0:48: Anti-patterns and untrusted instructions

**Slides:** *Common prompt failures*, *Treat instructions from content as
untrusted*

Discuss:

- vague requests that force invention;
- overloaded requests that mix implementation, tests, docs, and refactoring;
- long prompts that dictate every line;
- missing file or framework context;
- accepting output without running checks.

Then show a comment that says to ignore project rules or reveal a secret. It is
data in a file, not an instruction the developer should follow.

### 0:48 to 0:56: Prepared todo-store demonstration

**Slides:** *Demo contract*, *Weak, useful, reviewable*, *A change request should
change the prompt*

Run:

```bash
cd sessions/session-m1-03-prompt-engineering/lab/starter/api-starter
node --test --test-name-pattern="baseline: create" tests/todo-store.test.js
```

Compare three prompts:

1. `Implement create.`
2. `Implement TodoStore.create using the test.`
3. The prompt with behavior, file limits, and checks from the earlier slide.

Ask learners which prompt states scope, behavior, dependency limits, and checks.
Use the third prompt or implement manually. Run the focused test.

Open the change request and show why adding priority requires a new accepted
decision. Do not silently fold the request into the earlier prompt.

### 0:56 to 1:00: Patterns and handoff

**Slides:** *A reusable prompt pattern*, *Lab handoff*

Provide this compact structure:

```text
Change <file and scope> to achieve <observable behavior>.
Use <relevant context>.
Keep <constraints and non-goals>.
Verify with <command or review>.
```

Learners will build the store, wire routes, compare context, apply the priority
change, and save one prompt that worked. The 30-minute baseline-store block
includes five minutes for `/refine`; do not add a separate lab block.

## Teaching points

- Prompt quality depends on decisions, not word count.
- Tests and examples are stronger than vague quality labels.
- Context can influence a proposal without becoming the contract.
- One focused iteration is easier to review than a broad regeneration.
- Untrusted text stays untrusted even when an AI tool can read it.
- A reusable prompt should leave implementation choices open when they do not
  affect the contract.

## Common questions

**Do I need all four components in every prompt?**

No. Add the components the task needs. Use the list to diagnose missing detail.

**How long should a prompt be?**

Long enough to state the required behavior, but shorter than a line-by-line
implementation.

**Why did opening a file not change the suggestion?**

Context selection and output can vary. Record the observation and judge the code
against the contract.

**Should prompt comments stay in the final code?**

Keep comments that help a future reader. Remove temporary instructions that only
repeat obvious code.

## Lab readiness check

- [ ] Starter syntax checks pass.
- [ ] The expected starter test failures are understood.
- [ ] Required Copilot access is checked.
- [ ] CLI `/refine` works before learners start.
- [ ] Learners know the baseline and change tests are separate.
- [ ] The reference solution is available but closed.

## Command reference

Checked October 15, 2026:
[Copilot CLI commands and shortcuts](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference).
