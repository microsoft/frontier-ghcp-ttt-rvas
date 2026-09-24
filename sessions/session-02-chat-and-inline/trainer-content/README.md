# Session 02 Trainer Guide: Copilot Chat & Inline Suggestions

## Delivery objective

Show how Chat surfaces change the available context, not the standard of evidence.
Use one calculator defect from explanation through final verification.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:06 | Inline suggestions and Chat |
| 0:06–0:16 | Choose a Chat surface |
| 0:16–0:27 | Select context deliberately |
| 0:27–0:37 | Explain, fix, test, and document |
| 0:37–0:45 | Conversational refinement |
| 0:45–0:52 | Model and metering decisions |
| 0:52–1:00 | Prepared debugging demo and lab handoff |

The timings match [`slides.md`](../slides.md).

## Before delivery

- Run the starter suite and confirm one expected failure.
- Run the solution suite and confirm eight passing tests.
- Confirm the approved Chat surfaces in the selected editor.
- Verify current context-reference and shortcut syntax in official documentation.
- Confirm whether a model comparison is permitted.
- Prepare screenshots or the manual fallback.

Avoid fixed model catalogs, prices, keyboard shortcuts, or claims that a surface
always sees a particular context source.

## Slide delivery map

### 0:00–0:06: Inline suggestions and Chat

**Slides:** *Copilot Chat & Inline Suggestions*, *Agenda*, *Two interaction modes*

Session 01 used suggestions at the cursor. This session adds explicit
conversation. Both paths still require a task, review, and checks.

### 0:06–0:16: Choose a surface

**Slides:** *Choose the surface by the work*, *Sidebar and inline Chat*, *Quick and
terminal context*

Use the current editor to show the available surfaces. Teach the decision:

- use sidebar Chat for a multi-step thread;
- use inline Chat for a selected edit;
- use a lightweight surface for a short question;
- use terminal context for recent command output.

Do not make the shortcut the lesson. Product controls change.

### 0:16–0:27: Select context

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

The second request names the symptom, expected behavior, scope, and evidence.

Explain the role of:

- selected code for a local question;
- named files for a bounded cross-file question;
- workspace search for architecture or usage;
- terminal output for a recent failure.

### 0:27–0:37: Common task actions

**Slides:** *Explain before changing*, *Fix narrowly*, *Generated tests need review*

Demonstrate the current equivalents of explain, fix, tests, and documentation
actions. They are shortcuts, not separate quality standards.

For generated tests, ask:

- Does the test state accepted behavior?
- Would it fail for the original defect?
- Did it add a package or invent a requirement?
- Is the expected value independently correct?

### 0:37–0:45: Conversational refinement

**Slides:** *Refine one concern at a time*, *Know when to restart*

Use this sequence:

1. Explain the current formula.
2. Identify the denominator defect.
3. Fix only that line of behavior.
4. Add tests for accepted edge cases.
5. Review the whole method.

Continue a thread while the task and assumptions remain stable. Start a new thread
when stale context is steering the answer.

### 0:45–0:52: Model and metering decisions

**Slides:** *Compare against the task*, *Access policy*

Use the approved default unless the exercise permits another choice. If comparison
is allowed, send the same synthetic prompt and judge the responses against the
same tests. If it is not allowed, compare with the manual reference.

Do not infer access, cost, or data behavior from a label.

### 0:52–1:00: Prepared debugging demo

**Slides:** *Demo: weighted average*, *Failure to fix*, *Lab handoff*

Commands:

```bash
cd sessions/session-02-chat-and-inline/lab/starter
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
- Explicit context reduces guessing.
- A shortcut can draft work, but accepted behavior still comes from the task and
  tests.
- Generated tests can encode the wrong requirement.
- Model comparison is useful only when the task, prompt, and checks stay constant.
- Terminal context summarizes evidence; it is not the evidence itself.

## Common questions

**Should I keep every task in one thread?**

Keep related work together. Start fresh when assumptions or topic change.

**Why did workspace context miss a file?**

Search and retrieval are not guaranteed to select every relevant file. Verify
citations and use explicit file context when scope is known.

**Can Chat fix the project without tests?**

It can propose a change. Without checks, confidence stays low.

**What if a shortcut is absent?**

Use a direct prompt with the same task and context.

## Lab readiness check

- [ ] The starter failure is reproducible.
- [ ] The live or manual route is declared.
- [ ] The permitted comparison path is known.
- [ ] Learners know where to record prompts and verification.
- [ ] The change request remains closed until Part 5.
