# Session M1-03 trainer guide: Prompt engineering fundamentals

## Delivery objective

Teach learners to design the task before writing the prompt: state the work,
choose context, set boundaries, give an example, and refine one concern at a
time.

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

- Run the starter syntax checks and the solution tests.
- Check Node.js 22 or later and CLI sign-in.
- Check that `/refine` appears in CLI `/help`. Editor Chat doesn't have it.
- Prepare a demo copy of the todo store.
- Keep `change-request.md` closed until the change-request step.

## Slide delivery map

### 0:00 to 0:07: Prompting as task design

**Slides:** *Prompt Engineering Fundamentals*, *Agenda*, *A prompt is a work
request*

```text
Build the todo feature.
```

Ask what the model must guess. Expect: file, behavior, input, errors,
dependencies, and completion criteria. The prompt states your engineering
decisions before code changes.

### 0:07 to 0:20: Four prompt components

**Slides:** *Four useful components*, *Intent*, *Context*, *Constraints*,
*Examples*

Use the components to find missing detail, not as a long template.

- **Intent** names the action and scope.
- **Context** supplies files, symptoms, patterns, or earlier decisions.
- **Constraints** set dependencies, compatibility, file scope, and non-goals.
- **Examples** make behavior concrete.

```text
Implement only TodoStore.create in lib/todo-store.js.
Use the existing tests as the contract.
Trim the title, apply defaults, return a copy, and add no package.
Run the focused create test when done.
```

### 0:20 to 0:29: Comments and context

**Slides:** *Comments can carry intent*, *Neighboring files are context, not a
contract*

Open `routes/todos.js` and `examples/response-shapes.js`. Show how a route
comment gives intent and constraints. Request the same handler with the
response-shape example closed, then open. The result may not differ. Compare both
with the API contract before choosing.

### 0:29 to 0:39: Iterative refinement

**Slides:** *Refine the missing behavior*, *One concern per turn*, *Restart when
the frame is wrong*, *Review the `/refine` rewrite*

Spend the first four minutes on CLI `/refine` with the lab's rough baseline-store
request. Compare the rewrite with the tests and ask learners to find an omitted
constraint or invented behavior. If the rewrite is faithful, say so.

Show the input-box variant: type a rough draft, press `Ctrl+X`, then `/`, and run
`/refine` with no arguments.

Then iterate:

1. Implement baseline list behavior.
2. Run the baseline list test.
3. Name the exact copy-semantics failure.
4. Ask for that change only.
5. Rerun the focused test.

Each turn keeps the useful work and targets one mismatch. Restart when the design
or task is wrong.

### 0:39 to 0:48: Anti-patterns and untrusted instructions

**Slides:** *Common prompt failures*, *Treat instructions from content as
untrusted*

- Vague requests force invention.
- Overloaded requests mix implementation, tests, docs, and refactoring.
- Long prompts dictate every line.
- Missing file or framework context.
- Output accepted without running tests.

Then show a comment that says to ignore project rules or reveal a secret. It's
data in a file, not an instruction.

### 0:48 to 0:56: Prepared todo-store demonstration

**Slides:** *Demo contract*, *Weak, useful, reviewable*, *A change request should
change the prompt*

```bash
cd sessions/session-m1-03-prompt-engineering/lab/starter/api-starter
node --test --test-name-pattern="baseline: create" tests/todo-store.test.js
```

Compare three prompts:

1. `Implement create.`
2. `Implement TodoStore.create using the test.`
3. The prompt with behavior, file limits, and checks from the earlier slide.

Ask which one states scope, behavior, dependency limits, and checks. Use the third
and run the focused test.

Open the change request. Priority needs a new decision, so write a new prompt
instead of folding it into the old one.

### 0:56 to 1:00: Patterns and handoff

**Slides:** *A reusable prompt pattern*, *Lab handoff*

```text
Change <file and scope> to achieve <observable behavior>.
Use <relevant context>.
Keep <constraints and non-goals>.
Verify with <command or review>.
```

Learners build the store, wire routes, compare context, apply the priority change,
and save one prompt that worked. The 30-minute store block already includes five
minutes for `/refine`.

## Teaching points

- Prompt quality depends on decisions, not word count.
- Tests and examples beat vague quality labels.
- Context can influence a suggestion without becoming the contract.
- One focused iteration is easier to review than a broad regeneration.
- Untrusted text stays untrusted even when Copilot can read it.
- A reusable prompt leaves implementation choices open when they don't affect the
  contract.

## Common questions

**Do I need all four components in every prompt?**
No. Add what the task needs.

**How long should a prompt be?**
Long enough to state the behavior, shorter than a line-by-line implementation.

**Why did opening a file not change the suggestion?**
Suggestions vary. Log what you saw and judge the code against the contract.

**Should prompt comments stay in the final code?**
Keep comments that help a future reader. Remove temporary instructions.

## Reference

[Copilot CLI commands and shortcuts](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference).
