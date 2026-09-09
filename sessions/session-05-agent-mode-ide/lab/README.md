# Session 05 Lab — Agent Mode in the IDE

**Duration:** 2 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions 01–03 completed  
**Deliverable:** An agent-built feature, a refactored codebase, and comparison notes

---

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that IDE agent mode is enabled for the account, repository, and editor. Use the least-capable approved mode that can complete each task.

## If access is unavailable

Use the brief to make each change manually. Keep a task plan, run the same tests, and compare the result with the solution.

---

## Lab overview

Use agent mode on four bounded tasks. Scaffold a project from a spec, refactor an existing app, compare Chat with Agent mode, and redirect work through TODO comments.

| Exercise   | Topic                                  | Time   |
| ---------- | -------------------------------------- | ------ |
| 1          | Agent Mode Basics: Scaffold a Project | 30 min |
| 2          | Multi-file Refactoring with Agent Mode | 30 min |
| 3          | Agent Mode vs. Chat Comparison         | 30 min |
| 4          | TODO Code Actions and Course Correction | 30 min |

---

## Exercise 1: Agent Mode Basics — Scaffold a Project (30 min)

### Objective

Use agent mode to create an Express.js REST API from a plain-language project brief. Do not write the implementation yourself.

### Steps

1. **Open `lab/starter/project-brief.md`** in VS Code. It describes a Todo API with CRUD operations, validation, and error handling.

2. **Open Copilot Chat** and switch to **Agent mode**:
   - Click the mode dropdown at the top of the Chat panel
   - Select **"Agent"** (not "Ask" or "Edit")
   - You should see the agent mode indicator in the Chat panel

   > **Check:** The Chat panel shows Agent mode and its available tools.

3. **Give the agent your project brief.** Paste or reference the brief:

   ```
   Read the file project-brief.md in the current directory. Create the complete project it describes. 
   Set up the folder structure, install dependencies, write all the code, and make sure it runs.
   ```

4. **Review the agent's work as it proceeds.** It should:
   - Create the project directory structure
   - Generate `package.json` with the required dependencies
   - Write `server.js`, route files, middleware, and tests
   - Run `npm install` in the terminal
   - Run tests or start the server to verify the result when appropriate

   > **Check:** The agent proposes multiple file edits and terminal commands. Approve only actions you understand and that the brief requires.

5. **Review the result.** Check:
   - Did it create all the files mentioned in the brief?
   - Does `package.json` have the right dependencies?
   - Does the server start? Run: `npm start`
   - Do the tests pass? Run: `npm test`

6. **Test the API manually:**

   ```bash
   # In a new terminal, with the server running:
   curl -X POST http://localhost:3000/api/todos \
     -H "Content-Type: application/json" \
     -d '{"title": "Test agent mode", "priority": "high"}'

   curl http://localhost:3000/api/todos

   curl http://localhost:3000/api/todos/1
   ```

   > **Expected:** POST returns 201 with the created todo. GET returns 200 with the list. GET by ID returns the specific todo.

7. **Compare with `lab/solution/todo-api/`** to see the reference implementation.

### Observe

- How did the agent **plan** before acting? Did it describe its approach?
- How many **iterations** did it take? Did it fix errors on its own?
- Did it run any **terminal commands** (npm install, npm test)?
- What **files** did it choose to create? Was the structure reasonable?

### Troubleshooting

| Problem                                    | Solution                                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Agent mode isn't available                 | Ensure you're using VS Code with Copilot Chat extension. Check the mode dropdown at the top of the Chat panel.       |
| Agent creates files in the wrong directory | Be explicit in your prompt: "Create the project in a folder called `todo-api` inside the current working directory." |
| npm install fails                          | The agent may have used packages you don't have. Let it try to fix the issue, or manually review `package.json`.     |
| Server won't start                         | Check whether port 3000 is in use. Identify the owning process, then stop only that process before restarting.        |
| Agent gets stuck in a loop                 | Click "Cancel" in the Chat panel, then provide a more specific instruction to get it unstuck.                        |

---

## Exercise 2: Multi-File Refactoring with Agent Mode (30 min)

### Objective

Give the agent a messy codebase and ask it to refactor related files. It should extract middleware, separate concerns, and add error handling.

### Steps

1. **Open `lab/starter/messy-app/`.** The Express app works, but its structure needs work:
   - All route logic, validation, and DB calls are crammed into route files
   - No error handling middleware
   - No input validation layer
   - Duplicated code between `routes/users.js` and `routes/products.js`
   - Hardcoded values scattered throughout

   ```bash
   cd sessions/session-05-agent-mode-ide/lab/starter/messy-app
   npm install
   npm start
   ```

   > **Check:** The app starts on port 3000.

2. **Open the messy-app folder in VS Code.** Open at least `server.js`, `routes/users.js`, and `routes/products.js` to see the problems.

3. **Switch to Agent mode** in Copilot Chat.

4. **Give the agent refactoring instructions:**

   ```
   This Express app works but has serious code quality issues. Refactor it:
   
   1. Extract input validation into a middleware folder (middleware/validate.js)
   2. Move database operations into a data access layer (models/users.js, models/products.js)
   3. Add centralized error handling middleware (middleware/errorHandler.js)
   4. Remove all duplicated code between the route files
   5. Add proper HTTP status codes and error responses
   6. Keep the API behavior identical: the same routes and responses
   
   Keep the API contract unchanged. Existing clients should see the same behavior.
   ```

5. **Review the refactor as it proceeds.** It should:
   - Create new files for middleware and models
   - Move code from route files into the new structure
   - Update imports and references
   - Keep all routes working

   > **Check:** The agent creates and changes the files needed for the refactor. Review every changed file.

6. **Verify the refactoring didn't break anything:**

   ```bash
   npm start
   
   # Test users
   curl http://localhost:3000/api/users
   curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"name": "Jane", "email": "jane@test.com"}'

   # Test products
   curl http://localhost:3000/api/products
   curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{"name": "Widget", "price": 9.99}'
   ```

   > **Expected:** All endpoints return the same data as before.

7. **Evaluate the refactoring quality:**
   - Are concerns properly separated? (routes → models → middleware)
   - Is duplicated code eliminated?
   - Is error handling centralized?
   - Compare with `lab/solution/clean-app/`

### Observe

- Did the agent understand the **existing code** before making changes?
- Did it refactor **incrementally** or all at once?
- Did it **test** its changes (start the server, run requests)?
- Did any behavior change unintentionally?

### Troubleshooting

| Problem                        | Solution                                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Agent only partially refactors | Give a follow-up: "You still have validation logic in routes/users.js. Move it to middleware/validate.js." |
| API behavior changes           | Compare curl outputs before/after. If responses differ, tell the agent exactly what changed.               |
| Agent creates too many files   | Review whether each file is needed. Some agents split code too far.                                         |
| Import paths are wrong         | Common issue. Tell the agent: "The import in routes/users.js is broken. Fix the path to models/users.js." |

---

## Exercise 3: Agent Mode vs. Chat Comparison (30 min)

### Objective

Complete the same task in Chat mode and Agent mode. Compare the output and the effort involved.

### Steps

1. **Read `lab/starter/feature-spec.md`.** It describes adding JWT authentication to an existing Express API. Read the requirements carefully.

2. **Open `lab/starter/auth-base/`** in VS Code. It is a working API without authentication:

   ```bash
   cd sessions/session-05-agent-mode-ide/lab/starter/auth-base
   npm install
   npm start
   ```

   > **Check:** The server starts and all routes are public.

3. **Attempt 1: Chat Mode (15 min).** Switch Copilot to **Ask** mode (not Agent). Use Chat to add auth:
   - Ask Chat how to add JWT auth to an Express app
   - Copy-paste code suggestions into the right files
   - Manually create new files as needed
   - Manually install packages (`npm install jsonwebtoken bcryptjs`)
   - Track how many back-and-forth exchanges you need

   **Record what happened:**
   - How many Chat messages did it take?
   - How many files did you manually create/edit?
   - How many times did you copy-paste?
   - Did it work on the first try?

4. **Reset the project.** Undo your changes (or copy from `auth-base/` again):

   ```bash
   git -C "$(git rev-parse --show-toplevel)" checkout -- sessions/session-05-agent-mode-ide/lab/starter/auth-base/
   # or copy the original files back
   ```

5. **Attempt 2: Agent Mode (15 min).** Switch Copilot to **Agent** mode. Give it the feature spec:

   ```
   Read feature-spec.md in the starter directory. Implement the authentication feature
   it describes in the auth-base project. Install any needed packages, create all
   necessary files, and make sure the server starts correctly.
   ```

   **Record what happened:**
   - How many prompts did you give?
   - How many files did the agent create/edit?
   - Did you need to intervene?
   - Did it work on the first try?

6. **Test both implementations** (whichever is current):

   ```bash
   # Register a user
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "secure123"}'

   # Login to get a token
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "secure123"}'

   # Use the token to access a protected route
   curl http://localhost:3000/api/items \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"

   # Try without token (should fail)
   curl http://localhost:3000/api/items
   ```

   > **Expected:** Register returns 201. Login returns a JWT token. Protected route returns 200 with token, 401 without.

7. **Compare with `lab/solution/auth-complete/`** and write your comparison notes.

### Comparison Template

| Dimension                        | Chat Mode   | Agent Mode   |
| -------------------------------- | ----------- | ------------ |
| Prompts/messages sent            |             |              |
| Files manually created           |             |              |
| Copy-paste operations            |             |              |
| Terminal commands run manually   |             |              |
| Errors encountered               |             |              |
| Time to working solution         |             |              |
| Code quality (1–5)               |             |              |
| Would I use this approach again? |             |              |

### Troubleshooting

| Problem                                     | Solution                                                                                     |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Can't reset the project                     | Copy the starter files from a teammate, or use `git stash` before starting.                  |
| JWT token is malformed                      | Check that the secret in `auth.js` matches between sign and verify.                          |
| Protected routes return 401 even with token | Check the Authorization header format: `Bearer <space> <token>`. No quotes around the token. |

---

## Exercise 4: TODO Code Actions & Course Correction (30 min)

### Objective

Use TODO comments to mark delegated work. Then redirect the agent when requirements change.

### Steps

1. **Open `lab/starter/todo-driven/`** in VS Code. This project has strategic TODO comments throughout:

   ```bash
   cd sessions/session-05-agent-mode-ide/lab/starter/todo-driven
   npm install
   ```

2. **Review the TODO comments.** Open each file and find the TODOs:
   - `routes/tasks.js` — 4 TODO comments for CRUD endpoints
   - `utils/validator.js` — 3 TODO comments for validation functions
   - `server.js` — 1 TODO for error handling middleware

3. **Switch to Agent mode** in Copilot Chat.

4. **Delegate the TODOs to the agent:**

   ```
   This project has TODO comments throughout the codebase marking work that needs 
   to be done. Find all the TODO comments and implement what they describe.
   Start with utils/validator.js, then routes/tasks.js, then server.js.
   ```

5. **Review the TODO work one file at a time.** After the first file is complete, inspect it before the agent moves on.

   > **Check:** The agent finds the TODOs, implements the described behavior, and follows the requested file order.

6. **Practice a course correction.** After the agent finishes `validator.js`, redirect it:

   ```
   Wait — for the task routes, I want you to use async/await with try/catch 
   instead of callbacks. Also, add rate limiting to the POST and PUT routes.
   ```

   > **You should see:** The agent adjusting its approach based on your mid-task feedback.

7. **Try another redirect.** If the error handling needs to change:

   ```
   Actually, the error handler should return errors in this format:
   { "error": { "code": "VALIDATION_ERROR", "message": "..." } }
   Not just a plain string message.
   ```

8. **Verify everything works:**

   ```bash
   npm start

   # Create a task
   curl -X POST http://localhost:3000/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Learn TODO actions", "description": "Practice delegating", "priority": "medium"}'

   # List tasks
   curl http://localhost:3000/api/tasks

   # Test validation (should fail — missing title)
   curl -X POST http://localhost:3000/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"description": "No title here"}'
   ```

   > **Expected:** Valid requests succeed (200/201). Invalid requests return structured error responses.

9. **Compare with `lab/solution/todo-driven/`** to see the reference implementation.

### Key Skills Practiced

| Skill                    | What you did                                                      |
| ------------------------ | ----------------------------------------------------------------- |
| **Delegation**           | Used TODO comments to define work for the agent                   |
| **Sequencing**           | Told the agent which file to work on first                        |
| **Course correction**    | Changed requirements during the task                              |
| **Constraint injection** | Added new requirements (async/await, rate limiting, error format) |

### Troubleshooting

| Problem                                | Solution                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Agent ignores some TODOs               | Point it at the specific file: "There's still a TODO in server.js on line 15. Implement it."                  |
| Agent doesn't follow course correction | Be more explicit: "Stop what you're doing. In routes/tasks.js, change ALL route handlers to use async/await." |
| Rate limiting not working              | Ensure `express-rate-limit` was installed. Check that the middleware is applied to the right routes.          |
| Error format doesn't match             | Show the agent the exact JSON format you want with a concrete example.                                        |

---

## Lab Wrap-Up

### Deliverables Checklist

- [ ] **Exercise 1:** A working Todo API scaffolded entirely by agent mode
- [ ] **Exercise 2:** A refactored `messy-app` with proper separation of concerns
- [ ] **Exercise 3:** Completed comparison template (Chat vs. Agent)
- [ ] **Exercise 4:** All TODO comments resolved, with evidence of course correction

### Key Takeaways for Trainers

1. **Keep control of the task.** You direct the agent and review its work.
2. **Watch the evidence.** File choices, tool use, and revisions show what needs review.
3. **Redirect early.** Restate the constraint and request a revised plan.
4. **Use agent mode for related files.** Chat works well for a small, local change.
5. **TODOs can define a handoff.** Turn them into clear acceptance criteria before you delegate.

### Next session

In **Session 06**, you will use Spaces, custom instructions, and prompt files to provide relevant context.
