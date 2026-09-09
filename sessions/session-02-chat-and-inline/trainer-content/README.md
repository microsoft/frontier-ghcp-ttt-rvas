# Session 02 — Copilot Chat & Inline Suggestions

## Trainer Content Guide

**Module:** 1 — Copilot Fundamentals  
**Difficulty:** Beginner  
**Prerequisites:** Session 01 (Introduction to GitHub Copilot)  
**Duration:** 1 hour (trainer content) + 2 hours (lab)  
**Last Updated:** April 2026

---

## Session Overview

Session 01 introduced Copilot and inline completions. This session focuses on Copilot Chat: its surfaces, slash commands, participants, context, approved model choices, and CLI handoff.

**Session focus:** Inline completions suggest code as you type. With Chat, you state the task and guide the conversation.

---

## Time Allocation

| Section                                              | Duration   | Type           |
| ---------------------------------------------------- | ---------- | -------------- |
| 1. Recap & Context Setting                           | 3 min      | Lecture        |
| 2. The Four Chat Surfaces                            | 10 min     | Lecture + Demo |
| 3. Chat Participants: @workspace, @terminal, @vscode | 8 min      | Lecture + Demo |
| 4. Slash Commands Deep Dive                          | 8 min      | Lecture + Demo |
| 5. Context Management: #file, #selection, #editor    | 7 min      | Lecture + Demo |
| 6. Model Selection & Cost Awareness                  | 7 min      | Lecture        |
| 7. Conversational Workflows                          | 7 min      | Lecture + Demo |
| 8. Copilot CLI                                       | 5 min      | Demo           |
| 9. Live Demo: Debugging with Chat                    | 5 min      | Live Demo      |
| 10. Wrap-Up & Lab Preview                            | 3 min      | Lecture        |
| **Total**                                            | **63 min** | —              |

> **Trainer note:** This is a dense session. Sections 2–5 cover Chat surfaces and tools. Sections 6–8 cover how to use them. Section 9 combines the skills in one demo. If time is short, trim Section 6 (model selection) and cover it in the lab.

---

## Section 1: Recap & Context Setting (3 minutes)

### Trainer Talking Points

> "In Session 01, we learned what Copilot is, how it works under the hood, and we experienced inline code completions — Copilot predicting the next line of code as you type. That's one way to interact with Copilot, and it's great for flow-state coding."

> "Today we're going to learn the other major way: **Copilot Chat**. If inline completions are like having a co-pilot who fills in what you're about to write, Chat is like having a colleague sitting next to you that you can turn to and say, 'Hey, can you explain this? Can you fix this? Can you write tests for this?'"

> "By the end of this session, you'll know every way to talk to Copilot, every tool at your disposal, and how to choose the right approach for the right task."

### Slide Suggestion

- Two-column comparison:
  - Left: "Inline Completions — Reactive, Type-driven, At the cursor"
  - Right: "Copilot Chat — Proactive, Conversation-driven, Anywhere in the workflow"

### Transition

> "Map the places where Chat lives in VS Code."

---

## Section 2: The Four Chat Surfaces (10 minutes)

### Core Explanation

Copilot Chat is available in four VS Code surfaces. Each fits different work. Learners need to know when to use each one.

#### Surface 1: Sidebar Chat (the Chat Panel)

**How to open:** Click the Copilot icon in the sidebar, or press `Ctrl+Alt+I` (Cmd+Alt+I on Mac).

**What it looks like:** A full-height panel on the left or right side of the editor, similar to a messaging app.

**When to use it:**

- Extended conversations with back-and-forth
- Complex questions that require multiple follow-ups
- Tasks where you want to see your code and the conversation side by side
- Using chat participants like @workspace for project-wide questions
- Any time you want conversation history preserved within the session

**Trainer talking points:**

> "The sidebar is your primary Chat surface. Think of it as your ongoing conversation with Copilot about your project. It preserves conversation history within the session, so you can iterate: ask a question, get an answer, refine, ask again."

> "You can have multiple Chat threads running simultaneously. Each thread has its own context and history. Use the '+' button to start a new thread, or switch between existing ones."

**Demo:** Open the sidebar, type "What does this project do?", show the response. Then ask a follow-up: "What programming languages are used?" Show how context carries over.

#### Surface 2: Inline Chat

**How to open:** Select some code in the editor, then press `Ctrl+I` (Cmd+I on Mac). Or right-click and select "Copilot" → "Start Inline Chat."

**What it looks like:** A compact input field that appears directly in the editor, right next to your code.

**When to use it:**

- Quick edits to selected code ("refactor this," "add error handling")
- Explanations of a specific block of code ("explain this regex")
- Generating code at a specific location ("add a validation function here")
- Any task that's focused on a specific piece of code

**Trainer talking points:**

> "Inline Chat is for focused, code-specific work. Select code, ask Copilot to change it, then review the result in the editor. You can accept, reject, or modify it without leaving the editor."

> "The key difference from sidebar Chat: inline Chat is *context-anchored*. It automatically knows which code you're referring to because you selected it. No need to explain 'in the function on line 42' — Copilot can see exactly what you're looking at."

**Demo:** Select a function, press Ctrl+I, type "add input validation," show the diff that appears. Accept or reject the changes.

#### Surface 3: Quick Chat

**How to open:** Press `Ctrl+Shift+Alt+L` (Cmd+Shift+Option+L on Mac), or use the Command Palette (Ctrl+Shift+P) and search for "Quick Chat."

**What it looks like:** A compact overlay at the top of the editor, similar to the Command Palette.

**When to use it:**

- Quick one-off questions ("what's the shortcut for X?", "how do I convert a string to an int in Go?")
- Questions where you don't need conversation history
- Times when you want to stay in the editor and not open a full panel

**Trainer talking points:**

> "Quick Chat is like the Command Palette for AI questions. Pop it up, ask something fast, get an answer, dismiss it. No panel rearrangement, no context switch. It's perfect for 'what was that syntax again?' moments."

> "Quick Chat does not preserve history. Dismissing it ends the conversation, which keeps the surface lightweight."

**Demo:** Open Quick Chat, ask "How do I reverse a list in Python?", show the answer, dismiss.

#### Surface 4: Terminal Chat

**How to open:** In the VS Code terminal, press `Ctrl+I` (Cmd+I on Mac) while the terminal is focused.

**What it looks like:** An input field in the terminal panel.

**When to use it:**

- Getting help with terminal commands ("how do I find all Python files modified today?")
- Debugging terminal errors ("what does this error mean?")
- Generating complex CLI commands ("write a curl command to POST JSON to this endpoint")
- Understanding command output

**Trainer talking points:**

> "Terminal Chat brings Copilot into the command line. When you get an error in the terminal, or you need a complex command, you don't have to switch to a browser and search — just ask Copilot right there in the terminal."

> "When you ask for a command, Copilot can insert it directly into the terminal for you to review and execute. It won't run commands automatically — you always have the final say."

**Demo:** In the terminal, press Ctrl+I, type "find all files larger than 10MB in this directory," show the suggested command.

### Summary Table

| Surface    | Shortcut             | Best For                           | History     |
| ---------- | -------------------- | ---------------------------------- | ----------- |
| Sidebar    | Ctrl+Alt+I           | Extended conversations, @workspace | ✅ Preserved |
| Inline     | Ctrl+I (in editor)   | Code-specific edits, explanations  | Ephemeral   |
| Quick Chat | Ctrl+Shift+Alt+L     | Fast one-off questions             | ❌ Dismissed |
| Terminal   | Ctrl+I (in terminal) | CLI help, error debugging          | Ephemeral   |

### Common Trainee Question

**Q: "When should I use Chat vs. inline completions?"**

> A: "Use inline completions when you're *writing* code — you're in the flow, you know what you want, and you want Copilot to predict the next few lines. Use Chat when you want to *talk about* code — explain it, fix it, refactor it, generate tests, or ask questions. In practice, you'll switch between them constantly."

### Transition

> "Next, look at participants, which direct Copilot to specific sources of context."

---

## Section 3: Chat Participants — @workspace, @terminal, @vscode (8 minutes)

### Core Explanation

Chat participants are special prefixes you can use in your messages to direct Copilot to use specific knowledge sources or capabilities. Think of them as channels — each participant gives Copilot access to a different scope of information.

#### @workspace

**What it does:** Gives Copilot access to your entire workspace/project — all files, folder structure, and code.

**How it works:** When you mention @workspace, Copilot uses a combination of embedding-based search, file structure analysis, and other retrieval techniques to find relevant code across your project. It doesn't load every file into context — it intelligently searches and retrieves the most relevant files.

**When to use it:**

- "Where is the database connection configured?" — finding code across the project
- "What API endpoints does this project expose?" — understanding project structure  
- "How does the authentication flow work?" — tracing cross-file logic
- "Explain the architecture of this project" — big-picture questions
- Any question where the answer spans multiple files

**Trainer talking points:**

> "Without @workspace, Copilot sees only what's in your current file and open tabs. With @workspace, it can search your entire project. This is the difference between asking a colleague who can only see your screen versus one who has the full codebase open."

> "Important nuance: @workspace doesn't dump your entire codebase into the model's context — that would exceed the context window. Instead, it searches for the most relevant files, retrieves them, and includes them in the prompt. The quality of the answer depends on whether the retrieval found the right files."

**Demo:**

Open a multi-file project. In sidebar Chat:

```
@workspace How is error handling implemented across this project? Show me the patterns used.
```

Show how Copilot references multiple files in its response, with code snippets from different parts of the project.

#### @terminal

**What it does:** Gives Copilot access to the terminal — its state, recent commands, and output.

**When to use it:**

- "What does this error mean?" — after a terminal error
- "How do I fix this build failure?" — debugging terminal output
- "What command should I run next?" — workflow guidance

**Trainer talking points:**

> "@terminal is your lifeline when things break in the terminal. Instead of copying an error message, searching Stack Overflow, and trying to figure out what went wrong, just type '@terminal explain the last error' and Copilot will analyze the terminal output and tell you what happened and how to fix it."

**Demo:**

Run a command that produces an error (e.g., `npm install` in a directory with a broken package.json). Then in Chat:

```
@terminal What went wrong? How do I fix it?
```

#### @vscode

**What it does:** Gives Copilot knowledge about VS Code itself — settings, keybindings, extensions, and editor features.

**When to use it:**

- "How do I change the font size?" — VS Code configuration
- "What extensions do you recommend for Python?" — extension discovery
- "How do I create a custom keybinding for running tests?" — editor customization
- "How do I set up tasks.json for this project?" — VS Code project configuration

**Trainer talking points:**

> "@vscode turns Copilot into a VS Code expert. Instead of searching through settings menus or documentation, ask Copilot directly. It can even modify your settings for you if you're in agent mode."

> "This is especially useful for new VS Code users who don't know the setting names. Instead of searching for 'how to wrap text automatically in VS Code' on Google, just ask '@vscode how do I enable word wrap?'"

**Demo:**

```
@vscode How do I enable auto-save in VS Code?
```

Show how Copilot provides the exact setting name and instructions.

### Combining Participants with Questions

> "You can use participants as part of natural questions:
>
> - `@workspace Where is the main entry point for this app?`
> - `@terminal Why did my last test run fail?`
> - `@vscode How do I set up Python virtual environments in VS Code?`
> The participant tells Copilot *where to look*; your question tells it *what to find*."

### Common Trainee Question

**Q: "Can I combine participants? Like @workspace and @terminal together?"**

> A: "No — you use one participant per message. But you can reference files alongside any participant using #file syntax (which we'll cover next). And in practice, Copilot's default context includes both the editor and terminal in many cases."

### Transition

> "Participants tell Copilot *where* to look. Slash commands tell Copilot *what to do*. Let's cover those next."

---

## Section 4: Slash Commands Deep Dive (8 minutes)

### Core Explanation

Slash commands are shortcuts for common Copilot tasks. Instead of typing a full natural-language prompt, you can use a slash command to invoke a pre-built action.

**Trainer talking point:**

> "Think of slash commands as keyboard shortcuts for your Copilot conversations. You *could* type 'Please explain what this code does step by step,' but `/explain` does the same thing instantly."

#### /explain

**What it does:** Explains the selected code or a concept in detail.

**When to use it:**

- Understanding unfamiliar code (code review, legacy code, open-source libraries)
- Learning how an algorithm works
- Getting a plain-English description of a complex function

**Usage patterns:**

```
/explain          ← Explain the selected code or current file
/explain regex    ← Explain a specific concept
```

**Trainer talking points:**

> "/explain is your first tool when you encounter unfamiliar code. Select a function, type /explain, and Copilot walks you through it line by line. This is invaluable during code reviews — you can quickly understand what a PR does without reading every line yourself."

> "Pro tip: /explain is also great for learning. If you encounter a design pattern or algorithm you don't know, select the code and ask Copilot to explain it. It's like having a tutor who can explain any code in any language."

**Demo:** Select a complex function (e.g., a recursive algorithm or a regex), use /explain, walk through the output.

#### /fix

**What it does:** Analyzes the selected code for bugs and suggests fixes.

**When to use it:**

- Fixing compiler/linter errors
- Debugging runtime issues
- Correcting logical errors

**Usage patterns:**

```
/fix                    ← Fix the selected code
/fix the null pointer   ← Fix a specific issue you've identified
```

**Trainer talking points:**

> "/fix is your debugging partner. Select code that's broken, type /fix, and Copilot will identify the issue and propose a corrected version. It's particularly good at fixing syntax errors, null reference issues, off-by-one errors, and missing imports."

> "Important caveat: /fix works best when the bug is local — something wrong in the selected code. For bugs that span multiple files or involve complex state, you'll want to use sidebar Chat with @workspace instead."

**Demo:** Show a function with an intentional bug (e.g., off-by-one error in a loop). Select it, use /fix, show the correction.

#### /tests

**What it does:** Generates unit tests for the selected code.

**When to use it:**

- Writing tests for existing functions
- Bootstrapping a test suite for a new module
- Generating edge case tests

**Usage patterns:**

```
/tests                              ← Generate tests for selected code
/tests using pytest                 ← Specify a test framework
/tests include edge cases           ← Request specific test types
```

**Trainer talking points:**

> "/tests is one of the most immediately valuable commands. Select a function, type /tests, and Copilot generates a full test suite with multiple test cases, including happy path, edge cases, and error cases. It automatically uses the right test framework for your language (Jest for JS/TS, pytest for Python, JUnit for Java, etc.)."

> "Generated tests give you a starting point. Review them carefully. Copilot can miss business-specific edge cases or test the wrong behavior."

**Demo:** Select a utility function, use /tests, show the generated test file. Point out what's good and what might need adjustment.

#### /doc

**What it does:** Generates documentation for the selected code.

**When to use it:**

- Adding docstrings to functions and classes
- Generating JSDoc/TSDoc comments
- Documenting modules and APIs

**Usage patterns:**

```
/doc              ← Generate documentation for selected code
/doc in JSDoc     ← Specify documentation format
```

**Trainer talking points:**

> "/doc drafts documentation for selected code. Select a function, type /doc, and review the docstring it produces, including parameter descriptions, return types, exceptions, and examples."

> "This is especially useful for teams that enforce documentation standards — Copilot consistently generates documentation in the right format for your language."

**Demo:** Select an undocumented function, use /doc, show the generated docstring.

#### /new

**What it does:** Creates a new file or project from a description.

**When to use it:**

- Scaffolding a new component, module, or service
- Creating configuration files
- Starting a new project from scratch

**Usage patterns:**

```
/new create a React component for a user profile card
/new express API server with CORS and rate limiting
/new Python CLI tool that processes CSV files
```

**Trainer talking points:**

> "/new is your scaffolding tool. Describe what you want, and Copilot generates a complete file or project structure. It's particularly good for boilerplate-heavy tasks — creating React components, Express servers, configuration files, etc."

> "Unlike the other slash commands that operate on selected code, /new creates something from scratch. Use it when you're starting a new piece of code rather than modifying existing code."

**Demo:** Use `/new create a simple REST API endpoint in Python using Flask that returns a list of users` and show the generated code.

### Slash Commands Summary Table

| Command   | Action          | Input                        | Best For                      |
| --------- | --------------- | ---------------------------- | ----------------------------- |
| /explain  | Explain code    | Selected code or concept     | Understanding unfamiliar code |
| /fix      | Fix bugs        | Broken code                  | Debugging                     |
| /tests    | Generate tests  | Code to test                 | Test creation                 |
| /doc      | Generate docs   | Undocumented code            | Documentation                 |
| /new      | Create new code | Natural language description | Scaffolding                   |

### Common Trainee Question

**Q: "Can I customize slash commands or create my own?"**

> A: "Currently, the slash commands are built-in and can't be customized. However, you can achieve similar results with natural language prompts in Chat. And in Session 11, we'll learn about custom agents — which can define specialized behaviors that go far beyond what slash commands offer."

### Transition

> "Slash commands tell Copilot what to *do*. But sometimes you need to tell it what to *look at* — beyond just the code you've selected. That's where context references come in."

---

## Section 5: Context Management — #file, #selection, #editor (7 minutes)

### Core Explanation

Context references let you explicitly point Copilot at specific files, code selections, or the current editor state. They're like saying "look at THIS" during a conversation.

**Trainer talking points:**

> "One of the biggest mistakes new Copilot users make is assuming Copilot can see everything they can see. It can't. By default, Chat sees your current file and your conversation history. If you want Copilot to consider another file, you need to explicitly reference it."

#### #file — Reference a Specific File

**What it does:** Includes the contents of a specific file in the Chat context.

**How to use it:** Type `#file:` followed by the filename. VS Code will show a file picker.

**Examples:**

```
Look at #file:config.py — is there a security issue with how the API key is stored?

Compare the error handling in #file:api/users.js with #file:api/orders.js
```

**When to use it:**

- Asking about code in a different file from the one you're editing
- Comparing two files
- Asking Copilot to generate code consistent with an existing file's patterns
- Providing additional context for a complex question

**Trainer talking points:**

> "#file lets you add the relevant files to a project question. Without it, Copilot may guess at the project structure. With it, Copilot can use the implementation you provide."

> "You can reference multiple files in a single message. For example: 'Based on #file:models/user.py and #file:models/order.py, create a new model for products.' This gives Copilot concrete examples of your patterns to follow."

**Demo:** In sidebar Chat, ask a question that requires context from a file you're not currently editing. Show the difference between asking without #file (vague answer) and with #file (specific, accurate answer).

#### #selection — Reference Selected Code

**What it does:** Includes the currently selected text in the Chat context.

**How to use it:** Select code in the editor, then reference it with `#selection` in Chat.

**When to use it:**

- When you want to ask about specific code without using inline Chat
- When combining selected code with other context references

**Trainer talking points:**

> "#selection is useful when you want to discuss specific code in sidebar Chat rather than inline Chat. Select the code, switch to the sidebar, and use #selection to bring it into the conversation."

#### #editor — Reference the Visible Editor

**What it does:** Includes the visible content of the active editor (what's on screen) in the Chat context.

**When to use it:**

- When the relevant code is what you're currently looking at
- When you want Copilot to see your current view without selecting specific code

**Trainer talking points:**

> "#editor includes whatever is currently visible in your editor. It's a quick way to say 'look at what I'm looking at right now' without selecting anything."

### Context Management Best Practices

> "Here are the rules of thumb for context management:
>
> 1. **More context = better answers.** Don't be stingy with #file references. If a file is relevant, include it.
> 2. **Relevant context > lots of context.** Don't include every file in your project. Include the ones that matter for your question.
> 3. **Use @workspace for broad questions.** If you're asking 'where is X used?' or 'how does the auth flow work?', @workspace searches the whole project for you.
> 4. **Use #file for specific questions.** If you're asking 'does this function handle errors correctly?', include the specific file with #file.
> 5. **Combine context types.** You can use #file references alongside @workspace in the same message."

### Common Trainee Question

**Q: "Does adding more files slow down the response?"**

> A: "Slightly, because more context means a larger prompt. But the trade-off is almost always worth it — a slightly slower but accurate answer beats a fast but wrong one. The real limitation is the model's context window — if you include too many files, some content might be truncated."

### Transition

> "Now that you know all the Chat surfaces, participants, commands, and context tools, let's talk about a strategic decision: which AI model should power your Chat experience?"

---

## Section 6: Model Selection & Cost Awareness (7 minutes)

### Core Explanation

One of Copilot's most powerful (and underused) features is model selection. You can choose which AI model processes your Chat requests.

**Trainer talking points:**

> "Remember from Session 01 that Copilot supports multiple models from different providers. In Chat, you can switch between them on a per-conversation basis. This matters because different models have different strengths — and different usage costs."

#### Current model and metering guidance

Do not teach a fixed model catalog, feature matrix, or metering rule. Before a demonstration, the customer administrator must confirm the models and controls approved for that organization. Use the [current supported-model documentation](https://docs.github.com/en/copilot/reference/ai-models/supported-models), the [current billing documentation](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing), and customer policy.

> "Use the customer-approved default unless the administrator has approved a different choice for this exercise. Set a customer-defined metered-work stop guard before experimenting, and never infer access from another organization."

#### Safe comparison exercise

If the customer policy permits comparing responses, use the same synthetic prompt and record observable differences in clarity, correctness, and required review. Do not make a recommendation based on a presumed catalog or cost. If no comparison choice is exposed, compare an assisted answer with a manual solution instead.

### No-access fallback

Run the explanation and review activities with the synthetic files only. Learners write the intended prompt, produce a manual answer, and peer-review it against the acceptance criteria.

### Common Trainee Question

**Q: "Does the model choice affect inline completions too?"**

> A: "No. Inline completions use a specialized, speed-optimized model that's always active. Model selection only applies to Chat, agent mode, and cloud agent interactions."

### Transition

> "You now know the tools. Let's talk about how to use them effectively — the patterns and strategies for getting the most out of Copilot Chat."

---

## Section 7: Conversational Workflows (7 minutes)

### Core Explanation

Using Chat effectively is about more than knowing commands — it's about developing conversation strategies that lead to good results.

**Trainer talking points:**

> "A common mistake is treating Chat like a search engine: ask one question, get one answer, then stop. Use the conversation to refine the request over several messages."

#### Pattern 1: Start Broad, Then Narrow

Start with a general question to orient, then drill into specifics.

**Example conversation:**

```
You: @workspace How is authentication handled in this project?

Copilot: [Provides overview of auth architecture, mentions JWT, middleware, etc.]

You: Show me the JWT validation middleware in detail.

Copilot: [Shows the specific middleware code with explanation]

You: This doesn't handle token expiration. Can you add expiration checking?

Copilot: [Generates updated code with expiration handling]
```

> "Notice the progression: understand → inspect → improve. Each message builds on the previous one."

#### Pattern 2: Provide Examples

When you want output in a specific format, show Copilot an example.

**Example:**

```
You: I need a function to validate a phone number. Here's how our other validators look:

def validate_email(email: str) -> ValidationResult:
    """Validates an email address and returns a ValidationResult."""
    if not email:
        return ValidationResult(valid=False, error="Email is required")
    ...

Follow this same pattern — same function signature, same error format, same docstring style.
```

> "Show Copilot an existing pattern when it needs to follow local conventions. Then review the result against the codebase."

#### Pattern 3: Constrain the Output

Tell Copilot what you DON'T want, not just what you do.

**Example:**

```
You: Write a function to parse CSV files. Requirements:
- Use the built-in csv module only (no pandas)
- Handle missing values by replacing with None
- Return a list of dictionaries
- Don't use any deprecated Python features
```

> "Constraints prevent Copilot from going in unexpected directions. Without constraints, it might use pandas (which you don't want to add as a dependency), or it might use a deprecated API. Be explicit about boundaries."

#### Pattern 4: Iterative Refinement

Don't accept the first response — refine it.

**Example:**

```
You: Write a retry decorator for API calls.

Copilot: [Generates a basic retry decorator]

You: Good start, but add exponential backoff with jitter, a maximum of 5 retries, and only retry on 429 and 5xx status codes.

Copilot: [Generates improved version]

You: Add logging for each retry attempt, and make the max_retries configurable.

Copilot: [Generates final version]
```

> "Three iterations got us from a basic decorator to a production-quality one. Don't settle for 'good enough' on the first try."

#### Anti-Patterns to Avoid

| Anti-Pattern                              | Problem                                            | Better Approach                                                                     |
| ----------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| "Write me a web server"                   | Too vague — Copilot doesn't know your requirements | "Write a FastAPI server with 3 endpoints: GET /users, POST /users, GET /users/{id}" |
| Pasting entire error logs without context | Too much noise, Copilot can't focus                | "I'm getting a NullPointerException on line 42 of UserService.java when..."         |
| Starting a new thread for every question  | Loses conversation context                         | Stay in the same thread for related questions                                       |
| Never using @workspace                    | Copilot can only see your current file             | Use @workspace for cross-file questions                                             |

### Common Trainee Question

**Q: "How long should I stay in one Chat thread vs. starting a new one?"**

> A: "Stay in the same thread as long as you're working on the same topic. Context accumulates — each message adds to what Copilot knows about your current task. Start a new thread when you switch to an unrelated topic, because accumulated context from the previous topic would just be noise."

### Transition

> "Chat surfaces, participants, and commands work in the IDE. But what about the terminal? Copilot has a dedicated CLI experience too."

---

## Section 8: Copilot CLI (5 minutes)

### Core Explanation

The CLI is covered in Session 04 via the standalone `copilot` CLI.

### Common Trainee Question

**Q: "Is the CLI as capable as Chat in the IDE?"**

> A: "The CLI supports agent mode, custom agents, agent skills, and Copilot memory. For pure coding tasks, the IDE is better because it has the editor context. But for terminal-native workflows — DevOps, system administration, git operations — the CLI is often faster and more natural."

### Transition

> "Now let's put it all together. I'm going to demo a real-world scenario that uses multiple Chat features: debugging a bug."

---

## Section 9: Live Demo — Debugging with Chat (5 minutes)

### Demo Script

**Trainer: Set up this demo before the session.** Create a small Python file with an intentional bug that's not immediately obvious.

#### Setup: The Buggy Code

Create a file called `calculator.py`:

```python
def calculate_average(numbers):
    """Calculate the average of a list of numbers."""
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

def calculate_weighted_average(values, weights):
    """Calculate the weighted average."""
    if len(values) != len(weights):
        raise ValueError("Values and weights must have the same length")
    
    weighted_sum = 0
    for i in range(len(values)):
        weighted_sum += values[i] * weights[i]
    
    return weighted_sum / len(values)  # BUG: should divide by sum of weights
```

#### Demo Flow

> "I have a calculator module, and something's wrong with the weighted average. My tests are telling me the output is incorrect, but I'm not sure where the bug is."

**Step 1: Use /explain to understand the code**

Select the `calculate_weighted_average` function and type:

```
/explain
```

> "Let me first make sure I understand what this function is supposed to do... OK, Copilot explains it. Now let me ask it to look for bugs."

**Step 2: Use /fix to find the bug**

```
/fix — this function returns incorrect results for inputs like values=[10, 20], weights=[0.3, 0.7]
```

> "Copilot identified the bug! Line 17 divides by the number of values, but a weighted average should divide by the sum of the weights. It's suggesting we change `len(values)` to `sum(weights)`. That's exactly right."

Accept the fix.

**Step 3: Generate tests to verify**

Select the fixed function:

```
/tests include edge cases
```

> "Now Copilot generates tests that cover the normal case, equal weights, single value, and the edge case where weights sum to 1.0 versus when they don't. This gives us confidence the fix is correct."

**Step 4: Document the fix**

```
/doc
```

> "Finally, let's make sure the documentation reflects the correct behavior."

### Key Teaching Moment

> "Notice the workflow: **explain** (understand) → **fix** (correct) → **test** (verify) → **doc** (document). This is a pattern you'll use constantly with Copilot. And the whole thing took about two minutes — without Copilot, you might spend 20 minutes debugging, especially if the bug is subtle."

### Transition

> "That demo gives you a taste of how Chat fits into real development workflows. In the lab, you'll practice these patterns extensively."

---

## Section 10: Wrap-Up & Lab Preview (3 minutes)

### Summary

> "Review what we covered today:
>
> 1. **Four Chat surfaces:** Sidebar (extended conversations), Inline (code-specific edits), Quick Chat (fast questions), Terminal (CLI help).
>
> 2. **Chat participants:** @workspace (search the whole project), @terminal (terminal context), @vscode (editor help).
>
> 3. **Slash commands:** /explain (understand code), /fix (debug), /tests (generate tests), /doc (generate docs), /new (scaffold code).
>
> 4. **Context references:** #file (include specific files), #selection (include selected code), #editor (include visible code).
>
> 5. **Model selection:** Choose the right model for the task. Auto for most work, specific models for specific needs.
>
> 6. **Conversational patterns:** Start broad then narrow, provide examples, constrain output, iterate.
>
> 7. **Copilot CLI:** covered in Session 04 with the standalone `copilot` CLI."

### Lab Preview

> "In the lab, you'll get hands-on with all of these:
>
> - Use Copilot Chat to explain unfamiliar code
> - Debug three intentionally broken functions using /fix and Chat
> - Generate unit tests with /tests
> - Use @workspace to answer cross-project questions
> - Use @terminal to troubleshoot a failing build
> - Switch models and compare response quality
> - Try the Copilot CLI
>
> Take your time and experiment. Build familiarity with these tools."

### Preview of Session 03

> "In Session 03, we'll tackle the skill that makes everything we learned today work even better: **prompt engineering**. You'll learn why 'how you ask' matters as much as 'what you ask,' and you'll develop techniques for getting consistently excellent results from Copilot."

---

## Appendix: Additional Resources for Trainers

### Quick Reference — Chat Commands and Participants

| Type            | Syntax     | Purpose                |
| --------------- | ---------- | ---------------------- |
| **Participant** | @workspace | Search entire project  |
| **Participant** | @terminal  | Terminal context       |
| **Participant** | @vscode    | VS Code help           |
| **Command**     | /explain   | Explain code           |
| **Command**     | /fix       | Fix bugs               |
| **Command**     | /tests     | Generate tests         |
| **Command**     | /doc       | Generate documentation |
| **Command**     | /new       | Scaffold new code      |
| **Context**     | #file:name | Include specific file  |
| **Context**     | #selection | Include selected code  |
| **Context**     | #editor    | Include visible editor |

### Keyboard Shortcuts Reference

| Action              | Windows/Linux        | Mac                  |
| ------------------- | -------------------- | -------------------- |
| Sidebar Chat        | Ctrl+Alt+I           | Cmd+Alt+I            |
| Inline Chat         | Ctrl+I               | Cmd+I                |
| Quick Chat          | Ctrl+Shift+Alt+L     | Cmd+Shift+Option+L   |
| Terminal Chat       | Ctrl+I (in terminal) | Cmd+I (in terminal)  |
| Submit message      | Enter                | Enter                |
| New line in message | Shift+Enter          | Shift+Enter          |
| Clear conversation  | Click "New Chat" (+) | Click "New Chat" (+) |

### Trainer Preparation Checklist

- [ ] Prepared the buggy `calculator.py` demo file (Section 9)
- [ ] Verified all four Chat surfaces work on your machine
- [ ] Tested @workspace with a multi-file project
- [ ] Reviewed Session 04 handoff note for the standalone `copilot` CLI
- [ ] Prepared a project with intentional terminal errors for @terminal demo
- [ ] Tested model switching — verified at least 2 different models are available
- [ ] Practiced the debugging demo end-to-end (explain → fix → test → doc)
- [ ] Reviewed lab exercises and completed them yourself

### Common Advanced Questions (Trainers Should Know)

**Q: "Does Chat conversation history affect future sessions?"**

> A: "Chat history is session-scoped — when you close VS Code or start a new conversation thread, the history is gone. If you want Copilot to 'remember' things across sessions, use custom instructions (.github/copilot-instructions.md) or Copilot Memory (if enabled). We cover both in later sessions."

**Q: "Can I use Chat to modify files directly?"**

> A: "In Chat mode, suggestions are shown in the conversation — you can copy-paste or click 'Apply' to insert code. In agent mode (Session 05), Copilot modifies files directly. The distinction is: Chat suggests, Agent mode acts."

**Q: "How does Copilot decide what to include in context?"**

> A: "Copilot uses a combination of heuristics: the current file is always included, recently opened files are prioritized, files with similar names or imports are considered, and the model's context window limits how much total context can be included. This is why explicit context references (#file, @workspace) are so important — they override the heuristics with your intent."
