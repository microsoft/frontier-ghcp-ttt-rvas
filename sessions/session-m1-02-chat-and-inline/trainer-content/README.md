# Session M1-02 trainer guide: Copilot Chat & inline suggestions

## Delivery objective

Show the context each Chat surface sees. Hold every answer to the same tests.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:06 | Inline suggestions and Chat |
| 0:06 to 0:15 | Choose a Chat surface |
| 0:15 to 0:29 | What each context supplies |
| 0:29 to 0:39 | Explain, fix, test, and document |
| 0:39 to 0:45 | Conversational refinement |
| 0:45 to 0:52 | Pros, cons, tips, and optional model comparison |
| 0:52 to 1:00 | Prepared debugging demo and lab handoff |

The timings match [`slides.md`](../slides.md).

## Before delivery

- Run the starter suite (one expected failure) and the solution suite (eight
  passing tests).
- Check which Chat surfaces your editor offers and the current context-reference
  syntax.
- Use **VS Code**. Say that labels, commands, and shortcuts vary by version, and
  tell learners to check their version. Teach the controls on screen, not fixed
  shortcuts or model lists.

## Slide delivery map

### 0:00 to 0:06: Inline suggestions and Chat

**Slides:** *Copilot Chat & Inline Suggestions*, *Agenda*, *Two interaction modes*

M1-01 used suggestions at the cursor. Chat asks for work in a conversation. Both
need a task, review, and tests.

### 0:06 to 0:15: Choose a surface

**Slides:** *Choose the surface by the work*, *Sidebar and inline Chat*, *Quick and
terminal context*

- Sidebar Chat for a multi-step thread.
- Inline Chat for an edit to selected code.
- A lightweight surface for a short question.
- Terminal context for recent command output.

### 0:15 to 0:29: What each context supplies

**Slides:** *Context should be explicit*, *What each context supplies*, *Context in
practice*

Compare:

```text
Fix this.
```

with:

```text
The weighted-average test expects 95 but receives 190. Inspect the selected method
and the focused test. Identify the defect without changing other methods.
```

The second names the symptom, expected behavior, scope, and failing test.

Walk the table on the *What each context supplies* slide. For each row, show what
Chat received (the references in the reply) and what it didn't:

- **Open file:** attached automatically. Ask about a function in another file and
  watch it guess.
- **Selection:** the focus. It doesn't bring callers or tests.
- **`#file`:** the whole named file. In current VS Code, type `#` and pick the
  file. Try it with `test_calculator.py`.
- **`#codebase`:** search results, not the whole repo. Check the citations. The
  old `@workspace` participant is deprecated; the current VS Code docs use
  `#codebase`.
- **Terminal:** the last command and its output. It can't know what you wanted.
- **`#problems`:** editor diagnostics. A failing unit test doesn't appear there.

Names and defaults vary by version. Tell learners to **check their version**.

### 0:29 to 0:39: Common task actions

**Slides:** *Explain before changing*, *Fix narrowly*, *Generated tests need review*

Demonstrate the explain, fix, tests, and documentation actions. For generated
tests, ask:

- Does the test state accepted behavior?
- Would it fail for the original defect?
- Did it add a package or invent a requirement?
- Is the expected value correct?

### 0:39 to 0:45: Conversational refinement

**Slides:** *Refine one concern at a time*, *Know when to restart*

1. Explain the current formula.
2. Identify the denominator defect.
3. Fix only the denominator.
4. Add tests for accepted edge cases.
5. Review the whole method.

Continue a thread while the task and assumptions hold. Start a new thread when
stale context steers the answer.

### 0:45 to 0:52: Pros, cons, tips, and optional model comparison

**Slides:** *Chat: pros and cons*, *Tips*, *Optional: compare two models*

Spend about five minutes on pros, cons, and tips. Ask learners which con they hit
in the demo.

The model comparison is optional. If learners have two models, run the same
synthetic prompt with the same context and judge both against the same tests. If
they have one, skip it. Don't assign a replacement.

### 0:52 to 1:00: Prepared debugging demo

**Slides:** *Demo: weighted average*, *Failure to fix*, *Lab handoff*

```bash
cd sessions/session-m1-02-chat-and-inline/lab/starter
python -m unittest -v
```

1. Read the failing test.
2. Ask for an explanation without a fix.
3. Ask for a diagnosis limited to `weighted_average`.
4. Review the one-method diff.
5. Run the focused test.
6. Ask workspace context to summarize behavior and coverage.
7. Open the change request but leave it for the lab.

## Teaching points

- A surface changes the interaction and the available context.
- Naming the context reduces guessing.
- Generated tests can encode the wrong requirement.
- Compare models only if learners have two, and only when task, prompt, and
  tests stay constant.
- Read the terminal output yourself.

## Common questions

**Should I keep every task in one thread?**
Keep related work together. Start fresh when the topic or assumptions change.

**Why did workspace context miss a file?**
Retrieval can miss files. Check citations and name the files when you know them.

**Can Chat fix the project without tests?**
It can propose a change. Without tests, you can't tell if it works.

**What if a shortcut or label is missing?**
Check the version. Use a direct prompt with the same task and context.
