# Session 03 Lab — Prompt Engineering Fundamentals

**Duration:** 2 hours  
**Difficulty:** Beginner  
**Prerequisites:** Sessions 01–02 completed  
**Deliverable:** A prompt engineering cheat sheet + a fully prompted REST API endpoint

---

## Lab Overview

Write structured prompts, build a REST API from comments, see how context affects suggestions, and create a cheat sheet for later sessions.

| Exercise   | Topic                            | Time   |
| ---------- | -------------------------------- | ------ |
| 1          | Prompt Challenge Rounds          | 40 min |
| 2          | Comment-Driven API Development   | 40 min |
| 3          | Context Manipulation Experiments | 20 min |
| 4          | Prompt Cheat Sheet               | 20 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that Copilot Chat and inline suggestions are available.

## If access is unavailable

Write the prompts in the supplied templates, implement the API manually, and have a peer assess each prompt against the acceptance criteria.

---

## Exercise 1: Prompt Challenge Rounds (40 min)

### Objective

Practice writing effective prompts under time pressure. For each challenge, write the best prompt you can, then compare with reference prompts.

### Steps

1. **Open `lab/starter/prompt-challenges.md`.** The file has five timed challenges.

2. **Set a timer for each challenge** (8 minutes each). For each one:
   - Read the challenge description
   - Write a prompt in Copilot Chat (or as a code comment)
   - Evaluate the output against the requirements.
   - Iterate on your prompt if the first output isn't right
   - Record your prompt and the quality of the output (1–5)

3. **Work through all 5 challenges:**

   | #   | Challenge                | Time   |
   | --- | ------------------------ | ------ |
   | 1   | Data validation function | 8 min  |
   | 2   | Error handling wrapper   | 8 min  |
   | 3   | Unit test generation     | 8 min  |
   | 4   | Documentation generation | 8 min  |
   | 5   | Algorithm implementation | 8 min  |

4. **After each challenge, reflect:**
   - Was my first prompt good enough, or did I need to iterate?
   - What information was missing from my initial prompt?
   - How did I improve the prompt on subsequent attempts?

5. **Compare with `lab/solution/prompt-challenges-answers.md`** to see example prompts that meet the requirements.

### Prompt Engineering Tips (apply these!)

| Technique                 | Example                                                 |
| ------------------------- | ------------------------------------------------------- |
| **Be specific**           | "validate email format" NOT "check input"               |
| **Provide constraints**   | "max 20 lines, use regex, return bool"                  |
| **Give examples**         | "e.g., '<user@test.com>' → True, 'invalid' → False"     |
| **State the context**     | "This is a Flask route handler for a REST API"          |
| **Specify output format** | "Return a dict with 'valid' (bool) and 'errors' (list)" |

### Troubleshooting

| Problem                                | Solution                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Time pressure feels too tight          | Focus on getting a working prompt first, then refine. 8 minutes is generous once you practice.                |
| Output doesn't match requirements      | Your prompt is missing constraints. Re-read the challenge, identify what you left out.                        |
| Copilot generates a different approach | Evaluate whether it meets the requirements. The approach may differ from yours. |

---

## Exercise 2: Comment-Driven API Development (40 min)

### Objective

Build a complete CRUD REST API for a todo list using ONLY comment-driven prompting. You'll write comments describing what you want, then let Copilot generate the code.

### Steps

1. **Open the starter project** at `lab/starter/api-starter/`. Review the files:
   - `package.json` — project dependencies
   - `server.js` — minimal Express setup
   - `routes/todos.js` — **this is where you'll work** — it has comment prompts but no code

2. **Install dependencies:**

   ```bash
   cd sessions/session-03-prompt-engineering/lab/starter/api-starter
   npm install
   ```

3. **Open `routes/todos.js`.** You'll see comment blocks describing each endpoint. Your job: position your cursor after each comment block and let Copilot generate the implementation.

4. **Build the API endpoint by endpoint.** Follow this workflow for each one:

   **Step A:** Read the comment prompt already in the file  
   **Step B:** Place your cursor on the blank line after the comment  
   **Step C:** Press `Enter` and wait for Copilot's suggestion  
   **Step D:** Review the suggestion — does it match the comment's requirements?  
   **Step E:** Accept (`Tab`) or refine the comment and try again  

5. **Endpoints to build** (comments are already in the starter file):

   | #   | Method   | Route   | Description                                |
   | --- | -------- | ------- | ------------------------------------------ |
   | 1   | GET      | `/`     | List all todos, optional `?status=` filter |
   | 2   | GET      | `/:id`  | Get a single todo by ID                    |
   | 3   | POST     | `/`     | Create a new todo                          |
   | 4   | PUT      | `/:id`  | Update a todo                              |
   | 5   | DELETE   | `/:id`  | Delete a todo                              |

6. **Test your API:**

   ```bash
   npm start
   ```

   Then in another terminal:

   ```bash
   # Create a todo
   curl -X POST http://localhost:3000/todos \
     -H "Content-Type: application/json" \
     -d '{"title": "Learn prompting", "status": "pending"}'
   
   # List all todos
   curl http://localhost:3000/todos
   
   # Get specific todo
   curl http://localhost:3000/todos/1
   
   # Update a todo
   curl -X PUT http://localhost:3000/todos/1 \
     -H "Content-Type: application/json" \
     -d '{"status": "completed"}'
   
   # Delete a todo
   curl -X DELETE http://localhost:3000/todos/1
   ```

   > **Expected:** Each endpoint returns JSON responses with appropriate status codes (200, 201, 404, 400).

7. **Improve your comments if needed.** If Copilot's first suggestion isn't right:
   - Add more detail to the comment (constraints, edge cases, response format)
   - Add an example: `// Example: GET /todos?status=completed → [{id: 1, ...}]`
   - Specify error handling: `// Return 404 with {error: "Todo not found"} if ID doesn't exist`

8. **Compare with `lab/solution/api-complete/`** to see the reference implementation.

### Troubleshooting

| Problem                           | Solution                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| Copilot doesn't generate anything | Make sure the comment is descriptive. Try: `// GET / - Return all todos from the array as JSON` |
| Generated code has errors         | Check for missing imports or syntax issues. Copilot sometimes forgets middleware.               |
| Port 3000 already in use          | Change PORT in server.js, or kill the other process: `lsof -ti:3000 \| xargs kill`              |

---

## Exercise 3: Context Manipulation Experiments (20 min)

### Objective

Discover how opening and closing files in VS Code changes Copilot's suggestions. Copilot uses "neighboring tabs" as context.

### Steps

1. **Open `lab/starter/context-experiment/models/user.js`** in VS Code. Read it — it defines a User model with specific field names and validation rules.

2. **Open `lab/starter/context-experiment/routes/users.js`** in a second tab. This file is nearly empty — just comment prompts.

3. **Experiment 1: With context.** With `models/user.js` open in a neighboring tab, place your cursor in `routes/users.js` after the first comment and let Copilot suggest code.

   > **Expected:** Copilot generates route handlers that reference the User model's fields (`name`, `email`, `age`) by name, and possibly imports the model file.

4. **Close `models/user.js`** (close the tab, don't just switch away).

5. **Experiment 2: Without context.** Delete the code Copilot generated. Position your cursor again and let Copilot suggest new code.

   > **Expected:** Without the model file open, Copilot generates more generic code — different field names, possibly a different data structure.

6. **Document the difference.** Note:
   - Did field names change?
   - Did the import/require change?
   - Was the validation logic different?

7. **Experiment 3: Add middleware context.** Now open `middleware/auth.js` alongside `routes/users.js`. Let Copilot suggest code for the protected routes.

   > **Expected:** With the auth middleware visible, Copilot is more likely to add authentication checks to routes.

8. **Complete all route handlers** with both `models/user.js` and `middleware/auth.js` open. Compare with `lab/solution/context-experiment/`.

### What to remember

**The files you have open can influence Copilot's suggestions.** This is the "neighboring tabs" effect. Teach trainees to open relevant files before asking Copilot to generate code.

### Troubleshooting

| Problem                    | Solution                                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Can't see a difference     | Try a more complex prompt. The effect is stronger when the model file has unique field names or patterns.                   |
| Copilot ignores open files | Copilot prioritizes the current file. Make sure the model has distinctive patterns (unique field names, custom validation). |

---

## Exercise 4: Prompt Cheat Sheet (20 min)

### Objective

Create a personal prompt engineering cheat sheet for later labs.

### Steps

1. **Open `lab/starter/cheat-sheet-template.md`** in VS Code.

2. **Fill in each section** based on what you learned in Exercises 1–3. The template covers:

   | Section            | What to document                                     |
   | ------------------ | ---------------------------------------------------- |
   | Inline suggestions | Best comment formats for triggering good completions |
   | Chat prompts       | Prompt structures that worked well in Session 02     |
   | Comment-driven dev | Patterns from Exercise 2 that produced clean code    |
   | Context tricks     | What you learned in Exercise 3 about open files      |
   | Anti-patterns      | Prompts that consistently produce bad results        |
   | Favorite prompts   | Your top 5 go-to prompts                             |

3. **Include at least 3 concrete examples** for each section. Write the actual prompt you would use instead of generic advice.

4. **Add a "Trainer Tips" section** with advice you'd give trainees about prompting.

5. **Save your cheat sheet.** You'll update this in future sessions as you learn more.

   > **By the end:** A filled-in cheat sheet with real examples. Keep it as a reference and share it with trainees if useful.

### Troubleshooting

| Problem                   | Solution                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| Don't know what to write  | Go back to Exercise 1 and review which prompts worked best. Pull examples from your Chat history. |
| Cheat sheet feels generic | Add specific code examples, not just descriptions. Show the prompt AND the expected output.       |

---

## Wrap-up

### Deliverables Checklist

- [ ] `prompt-challenges.md` — All 5 challenges attempted with your prompts recorded
- [ ] `api-starter/routes/todos.js` — All 5 CRUD endpoints built via comment-driven prompting
- [ ] Context experiment notes — documented how open files affected suggestions
- [ ] `cheat-sheet-template.md` — Completed prompt engineering cheat sheet

### Trainer notes

1. **Prompt structure matters more than length.** State the task, context, and constraints.
2. **Comments can guide inline suggestions.** Write behavior and boundaries before the code.
3. **Choose context deliberately.** Open the files that show the pattern you need.
4. **Refine when the output misses a requirement.** Name the missing behavior, then evaluate the next response.
5. **Update the cheat sheet with working examples.**

### Next session

In **Session 05**, you will use agent mode for multi-step coding work. The same clear prompts and constraints apply.
