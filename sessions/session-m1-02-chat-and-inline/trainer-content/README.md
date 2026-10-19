# Session m1-02 trainer guide: Copilot Chat & inline suggestions

## Delivery objective

Show the context available in each Chat surface. Use the same tests and review
standards throughout the calculator exercise.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:06 | Inline suggestions and Chat |
| 0:06 to 0:16 | Choose a Chat surface |
| 0:16 to 0:27 | Select context deliberately |
| 0:27 to 0:37 | Explain, fix, test, and document |
| 0:37 to 0:45 | Conversational refinement |
| 0:45 to 0:52 | Model and metering decisions |
| 0:52 to 1:00 | Prepared debugging demo and lab handoff |

The timings match [`slides.md`](../slides.md).

## Before delivery

- Run the starter suite and check for one expected failure.
- Run the solution suite and check for eight passing tests.
- Check which Chat surfaces learners may use in the selected editor.
- Check current context-reference and shortcut syntax in official documentation.
- Check whether a model comparison is permitted.
- Prepare screenshots for demo recovery. They do not replace learner access.

Avoid fixed model catalogs, prices, keyboard shortcuts, or claims that a surface
always sees a particular context source.

## Slide delivery map

### 0:00 to 0:06: Inline suggestions and Chat

**Slides:** *Copilot Chat & Inline Suggestions*, *Agenda*, *Two interaction modes*

Remind learners that Session m1-01 used suggestions at the cursor. Now show how
to ask for work in a conversation. Both paths still require a task, review, and
checks.

### 0:06 to 0:16: Choose a surface

**Slides:** *Choose the surface by the work*, *Sidebar and inline Chat*, *Quick and
terminal context*

Use the current editor to show the available surfaces. Teach the decision:

- use sidebar Chat for a multi-step thread;
- use inline Chat for a selected edit;
- use a lightweight surface for a short question;
- use terminal context for recent command output.

Do not make the shortcut the lesson. Product controls change.

### 0:16 to 0:27: Select context

**Slides:** *Context should be explicit*, *Workspace, file, selection, terminal*

Open the calculator project. Compare:

```text
Fix this.
```

with:

```text
The weighted-average test expects 95 but receives 140. Inspect the selected method
and the focused test. Identify the defect without changing other methods.
```

Point out that the second request names the symptom, expected behavior, scope,
and failing test.

Explain the role of:

- selected code for a local question;
- named files for a specific cross-file question;
- workspace search for architecture or usage;
- terminal output for a recent failure.

### 0:27 to 0:37: Common task actions

**Slides:** *Explain before changing*, *Fix narrowly*, *Generated tests need review*

Demonstrate the current equivalents of explain, fix, tests, and documentation
actions. They are shortcuts, not separate quality standards.

For generated tests, ask:

- Does the test state accepted behavior?
- Would it fail for the original defect?
- Did it add a package or invent a requirement?
- Is the expected value independently correct?

### 0:37 to 0:45: Conversational refinement

**Slides:** *Refine one concern at a time*, *Know when to restart*

Use this sequence:

1. Explain the current formula.
2. Identify the denominator defect.
3. Fix only the denominator.
4. Add tests for accepted edge cases.
5. Review the whole method.

Continue a thread while the task and assumptions remain stable. Start a new thread
when stale context is steering the answer.

### 0:45 to 0:52: Model and metering decisions

**Slides:** *Compare against the task*, *Access policy*

Use the default model allowed by policy unless the exercise permits another
choice. If comparison is allowed, send the same synthetic prompt and judge the
responses against the same tests. Otherwise, compare with the reference solution.

Do not infer access, cost, or data behavior from a label.

### 0:52 to 1:00: Prepared debugging demo

**Slides:** *Demo: weighted average*, *Failure to fix*, *Lab handoff*

Commands:

```bash
cd sessions/session-m1-02-chat-and-inline/lab/starter
python -m unittest -v
```

Demo sequence:

1. Read the failing test.
2. Ask for an explanation without a fix.
3. Ask for a diagnosis constrained to `weighted_average`.
4. Review the one-method diff.
5. Run the focused test.
6. Ask workspace context to summarize behavior and coverage.
7. Open the change request but leave it for the lab.

## Teaching points

- A surface changes interaction and available context.
- Naming the context reduces guessing.
- A shortcut can draft work, but accepted behavior still comes from the task and
  tests.
- Generated tests can encode the wrong requirement.
- Model comparison is useful only when the task, prompt, and checks stay constant.
- Read the terminal output yourself rather than relying on its summary.

## Common questions

**Should I keep every task in one thread?**

Keep related work together. Start fresh when assumptions or topic change.

**Why did workspace context miss a file?**

Search and retrieval may miss relevant files. Check citations and name the files
when you know the scope.

**Can Chat fix the project without tests?**

It can propose a change. Without checks, confidence stays low.

**What if a shortcut is absent?**

Use a direct prompt with the same task and context.

## Lab readiness check

- [ ] The starter failure is reproducible.
- [ ] Required Copilot Chat access is checked.
- [ ] The permitted comparison path is known.
- [ ] Learners know where to record prompts and check results.
- [ ] The change request remains closed until Part 5.
