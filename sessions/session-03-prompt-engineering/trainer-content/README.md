# Session 03 Trainer Guide: Prompt Engineering Fundamentals

## Delivery objective

Teach prompting as task design. Learners should be able to state the work, choose
relevant context, set boundaries, give a useful example, and refine one concern at
a time.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:07 | Prompting is specification at conversation scale |
| 0:07–0:20 | Intent, context, constraints, and examples |
| 0:20–0:29 | Comments and neighboring-file context |
| 0:29–0:39 | Iterative refinement |
| 0:39–0:48 | Prompt anti-patterns and untrusted instructions |
| 0:48–0:56 | Prepared todo-store demonstration |
| 0:56–1:00 | Reusable patterns and lab handoff |

The timings match [`slides.md`](../slides.md).

## Before delivery

- Confirm Node.js 20 or later is available.
- Run starter syntax checks.
- Run the solution tests.
- Prepare a demo copy of the todo store.
- Confirm the live or manual path.
- Verify current context controls in official product documentation.
- Keep `change-request.md` closed until the lab evolution stage.

## Slide delivery map

### 0:00–0:07: Prompting as task design

**Slides:** *Prompt Engineering Fundamentals*, *Agenda*, *A prompt is a work
request*

Use this weak request:

```text
Build the todo feature.
```

Ask learners what the model must guess. Expected answers include file, behavior,
input, errors, dependencies, and completion criteria.

Prompting does not remove engineering decisions. It makes those decisions visible
earlier in the interaction.

### 0:07–0:20: Four prompt components

**Slides:** *Four useful components*, *Intent*, *Context*, *Constraints*,
*Examples*

Teach the components as a diagnostic tool, not a mandatory long template.

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

### 0:20–0:29: Comments and context

**Slides:** *Comments can carry intent*, *Neighboring files are context, not a
contract*

Open `routes/todos.js` and `examples/response-shapes.js`.

Show how a route comment can provide intent and constraints. Then request the same
handler with the response-shape example closed and open. Do not promise the result
will differ.

The accepted API contract still decides which proposal to keep.

### 0:29–0:39: Iterative refinement

**Slides:** *Refine the missing behavior*, *One concern per turn*, *Restart when
the frame is wrong*

Use this progression:

1. Implement baseline list behavior.
2. Run the baseline list test.
3. Name the exact copy-semantics failure.
4. Ask for that change only.
5. Rerun the focused test.

An iteration should preserve the useful work and target the mismatch. Restart when
the design or task frame is wrong.

### 0:39–0:48: Anti-patterns and untrusted instructions

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

### 0:48–0:56: Prepared todo-store demonstration

**Slides:** *Demo contract*, *Weak, useful, reviewable*, *A change request should
change the prompt*

Run:

```bash
cd sessions/session-03-prompt-engineering/lab/starter/api-starter
node --test --test-name-pattern="baseline: create" tests/todo-store.test.js
```

Compare three prompts:

1. `Implement create.`
2. `Implement TodoStore.create using the test.`
3. The complete bounded prompt from the earlier slide.

Review which prompt states scope, behavior, dependency limits, and verification.
Use the third prompt or implement manually. Run the focused test.

Open the change request and show why adding priority requires a new accepted
decision. Do not silently fold the request into the earlier prompt.

### 0:56–1:00: Patterns and handoff

**Slides:** *A reusable prompt pattern*, *Lab handoff*

Provide this compact structure:

```text
Change <file and scope> to achieve <observable behavior>.
Use <relevant context>.
Keep <constraints and non-goals>.
Verify with <command or review>.
```

Learners will build the store, wire routes, compare context, apply the priority
change, and save one prompt that worked.

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

Long enough to prevent material guessing, but shorter than a line-by-line
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
- [ ] The live or manual path is declared.
- [ ] Learners know the baseline and change tests are separate.
- [ ] The reference solution is available but closed.
