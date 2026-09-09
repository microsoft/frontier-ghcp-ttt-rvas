# Session 06 Lab — Copilot Spaces & Context Management

**Duration:** 2 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions 01–03 completed  
**Deliverable:** A Copilot Space, custom instructions, and a before-and-after comparison

---

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that Spaces and the selected repository or context sources are approved.

## If access is unavailable

Use the provided project files as a context packet. Answer the comparison questions with and without it, then record how source selection and instructions changed the result.

---

## Lab overview

This lab compares answers with different context. Use Spaces, custom instructions, and prompt files to give Copilot the evidence a task needs.

| Exercise   | Topic                         | Time   |
| ---------- | ----------------------------- | ------ |
| 1          | Creating a Copilot Space      | 30 min |
| 2          | Custom Instructions           | 30 min |
| 3          | Context Comparison Experiment | 30 min |
| 4          | Prompt Files Library          | 30 min |

---

## Exercise 1: Creating a Copilot Space (30 min)

### Objective

Create a Copilot Space for an e-commerce project. Add relevant files and documentation, then assess how they affect Copilot's answers.

### Steps

1. **Review the starter project.** Open `lab/starter/ecommerce-project/`:

   | File                     | Purpose                                 |
   | ------------------------ | --------------------------------------- |
   | `README.md`              | Project overview and setup instructions |
   | `package.json`           | Dependencies and scripts                |
   | `src/models/product.js`  | Product data model with validation      |
   | `src/routes/products.js` | Product API routes                      |
   | `docs/api-spec.md`       | Full API specification with endpoints   |
   | `docs/architecture.md`   | Architecture decisions and patterns     |

2. **Open Copilot Spaces.** In a browser, go to:

   ```
   https://github.com/copilot/spaces
   ```

3. **Create a new Space:**
   - Click **"Create space"**
   - Name: `Ecommerce API Lab`
   - Owner: your personal account
   - Description: `Context for the e-commerce product API training exercise`

4. **Add Space sources.** Add:
   - `docs/api-spec.md` — the API specification
   - `docs/architecture.md` — architecture decisions
   - `src/models/product.js` — the data model
   - `src/routes/products.js` — the route handlers
   - `README.md` — project overview

   > **Check:** Each selected file appears as a Space source.

5. **Add Space instructions.** In the Space settings, add:

   ```
   You are an expert on this e-commerce API. When answering:
   - Reference the API spec in docs/api-spec.md for endpoint details
   - Follow the architecture patterns described in docs/architecture.md
   - Use the validation patterns from src/models/product.js
   - Always suggest error handling following the project's conventions
   ```

6. **Test the Space.** Ask these questions in the Space chat and evaluate the quality:

   | Question                                              | What to evaluate                                            |
   | ----------------------------------------------------- | ----------------------------------------------------------- |
   | "How do I add a new endpoint for product categories?" | Does it reference the API spec and existing route patterns? |
   | "What validation should I add for the price field?"   | Does it reference the product model's existing validation?  |
   | "Write a new route for product search with filtering" | Does it follow the architecture patterns?                   |

   > **Check:** Responses cite or follow the selected code, documents, and conventions. Verify claims against the sources.

7. **Share the Space** (optional). If working with a partner, share the Space with them and have them ask a question.

### Observe

- How did the Space change the response compared with generic Chat?
- Did Copilot cite sources from the Space?
- Did suggestions match the project's existing patterns?

### Troubleshooting

| Problem                                     | Solution                                                                                                        |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Can't find Copilot Spaces                   | Spaces is at `github.com/copilot/spaces`. Requires a Copilot license.                                           |
| Files don't appear as sources               | Make sure the files are in a GitHub repository (not just local). Push the starter project to a repo first.      |
| Copilot gives generic answers despite Space | Check that your custom instructions are saved. Try more specific questions that reference the project's domain. |

---

## Exercise 2: Custom Instructions (30 min)

### Objective

Create `copilot-instructions.md` and reusable prompt files that state your team's coding standards.

### Steps

1. **Open `lab/starter/instructions-lab/`** in VS Code. Review the project:
   - `src/app.js` — a basic Express app
   - `src/utils.js` — utility functions
   - `package.json` — dependencies
   - `.github/` — empty directory (ready for your instructions)

2. **Test without instructions first.** Open Copilot Chat and ask:

   ```
   Add a new endpoint to this Express app that returns a list of users.
   ```

   **Record**:
   - What coding style did Copilot use?
   - Did it add error handling?
   - Did it use any specific patterns?

3. **Create `copilot-instructions.md`.** Create the file at `.github/copilot-instructions.md`:

   ```markdown
   # Project Coding Standards

   ## Language & Style
   - Use CommonJS syntax (require/module.exports) to match the existing project
   - Use async/await for all asynchronous operations. Do not use `.then()` chains.
   - Use const by default, let only when reassignment is needed, never var

   ## Express Patterns
   - All route handlers must use async/await with try/catch
   - Return structured error responses: { "error": { "code": "ERROR_CODE", "message": "..." } }
   - Always validate request body with a dedicated validation function
   - Use HTTP status codes correctly: 200, 201, 400, 404, 500

   ## Naming Conventions
   - Files: kebab-case (user-routes.js)
   - Functions: camelCase (getUserById)
   - Constants: SCREAMING_SNAKE_CASE (MAX_PAGE_SIZE)

   ## Testing
   - Use Node.js's built-in test runner
   - Test files go in test/ with a .test.js extension
   - Every endpoint needs at least: success case, validation error, not-found case
   ```

4. **Test with instructions.** Ask the same question again:

   ```
   Add a new endpoint to this Express app that returns a list of users.
   ```

   > **Check:** The response uses CommonJS, `async`/`await`, structured errors, and the requested naming conventions. Instructions guide output; they do not enforce it.

5. **Create a prompt file.** Create `.github/prompts/new-endpoint.prompt.md`:

   ```markdown
   ---
   description: "Generate a new REST endpoint following team standards"
   ---
   
   Create a new REST endpoint with the following:
   
   1. Route handler with async/await and try/catch
   2. Input validation middleware
   3. Proper HTTP status codes
   4. Structured error responses matching the project format
   5. At least 3 test cases (success, validation error, not-found)
   
   The endpoint should be for: {{ user_description }}
   ```

6. **Create a second prompt file.** Create `.github/prompts/code-review.prompt.md`:

   ```markdown
   ---
   description: "Review code against team standards"
   ---
   
   Review the selected code for:
   
   1. Does it follow our naming conventions (kebab-case files, camelCase functions)?
   2. Are all async operations using await with try/catch?
   3. Are error responses structured as { error: { code, message } }?
   4. Is input validation present for all user-provided data?
   5. Are there any security concerns (injection, XSS, missing auth)?
   
   Flag issues as: 🔴 Critical, 🟡 Warning, 🟢 Suggestion
   ```

7. **Test the prompt file.** In Copilot Chat, use the prompt:
   - Type `/` and look for your custom prompts
   - Select `new-endpoint` and describe: "A product categories endpoint with CRUD operations"

   > **You should see:** The generated code follows all your team standards from the instructions file.

8. **Compare with `lab/solution/instructions-lab/`** to see the reference setup.

### Troubleshooting

| Problem                         | Solution                                                                                                         |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Copilot ignores instructions    | Make sure the file is at exactly `.github/copilot-instructions.md` (not `.github/copilot/instructions.md`).      |
| Prompt files don't appear       | Prompt files must be at `.github/prompts/*.prompt.md`. Check the file extension.                                 |
| Instructions partially followed | Instructions are guidance, not enforcement. Copilot may not follow every rule perfectly. Iterate on the wording. |

---

## Exercise 3: Context Comparison Experiment (30 min)

### Objective

Compare Copilot's output at different context levels. Record the differences.

### Steps

1. **Open `lab/starter/context-comparison.md`.** This is your experiment template.

2. **Choose a prompt.** Use this standard prompt for all experiments:

   ```
   Write an Express middleware function that logs all incoming requests 
   with timestamp, method, URL, response time, and status code. 
   It should support different log levels based on status code 
   (info for 2xx, warn for 4xx, error for 5xx).
   ```

3. **Experiment A: No context.** Open a new, empty file. Paste the prompt into Copilot Chat with no project open.

   **Record in your template:**
   - What assumptions did Copilot make?
   - What logging library did it use (or roll its own)?
   - How complete was the response?

4. **Experiment B: With project context.** Open the `instructions-lab` project (with your `copilot-instructions.md` from Exercise 2). Ask the same prompt.

   **Record:**
   - Did it follow your custom instructions?
   - Did it use the same logging patterns as the existing code?
   - Was the response more tailored?

5. **Experiment C: With Space context.** Go to the Copilot Space from Exercise 1. Ask the same prompt there.

   **Record:**
   - Did it reference the existing project architecture?
   - Were conventions matched more precisely?
   - Did it cite any Space sources?

6. **Experiment D: With prompt file.** Create a one-off prompt file for this task and use it instead of raw Chat.

   **Record:**
   - How did structuring the request as a prompt file change the output?
   - Was the result more consistent and repeatable?

7. **Fill in the comparison table** in `context-comparison.md`:

   | Dimension               | No Context  | Instructions  | Space   | Prompt File   |
   | ----------------------- | ----------- | ------------- | ------- | ------------- |
   | Followed project style? |             |               |         |               |
   | Used correct patterns?  |             |               |         |               |
   | Assumed correct stack?  |             |               |         |               |
   | Required iterations?    |             |               |         |               |
   | Quality score (1–5)     |             |               |         |               |

8. **Write your findings.** Which context produced the most useful result? When would you use each method?

### What to retain

**Context changes the available evidence.** Start with the smallest approved set that supports the task, then review the result against those sources.

### Troubleshooting

| Problem               | Solution                                                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Results look the same | Try a more complex prompt that requires project-specific knowledge. Simple prompts may not show much difference.                       |
| Hard to be objective  | Use specific criteria: import style, error format, and naming conventions. Measure the difference. |

---

## Exercise 4: Prompt Files Library (30 min)

### Objective

Build three reusable prompt files for common workflows.

### Steps

1. **Open `lab/starter/prompt-templates/`** and review the example structure. The directory shows how prompt files are organized.

2. **Build Prompt File 1: Bug Report Investigation.** Create `.github/prompts/investigate-bug.prompt.md`:

   Include what a developer needs to investigate a bug:
   - Steps to reproduce
   - Root cause analysis
   - Suggested fix
   - Test case to prevent regression

   Write a prompt file that structures this investigation. Include placeholders for the bug description.

3. **Build Prompt File 2: API Documentation Generator.** Create `.github/prompts/generate-api-docs.prompt.md`:

   Include:
   - Endpoint description
   - Request/response examples
   - Error codes
   - Authentication requirements

   Write a prompt file that generates documentation from code.

4. **Build Prompt File 3: Migration Checklist.** Create `.github/prompts/migration-checklist.prompt.md`:

   Include:
   - Breaking changes
   - Code modifications required
   - Testing strategy
   - Rollback plan

   Write a prompt file that creates a migration checklist for any dependency upgrade.

5. **Test each prompt file.** Use each one in Copilot Chat to verify it produces useful output:
   - `investigate-bug` — use it on a sample bug scenario
   - `generate-api-docs` — use it on one of the API routes from earlier exercises
   - `migration-checklist` — use it for upgrading Express from v4 to v5

   > **Check:** Each prompt produces output that follows its template. Improve unclear instructions and try again.

6. **Compare with `lab/solution/prompt-templates/`** for reference implementations.

### Troubleshooting

| Problem                            | Solution                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| Prompt files not appearing in Chat | Check path: `.github/prompts/name.prompt.md`. The `.prompt.md` extension is required. |
| Output is too generic              | Add more specific instructions. Include examples of the output format you want.       |
| Prompt file variables not replaced | Use `{{ variable_name }}` syntax for template variables (double curly braces).        |

---

## Lab Wrap-Up

### Deliverables Checklist

- [ ] A Copilot Space created and configured with the e-commerce project
- [ ] `.github/copilot-instructions.md` — project-level custom instructions
- [ ] `.github/prompts/` — at least 2 prompt files (new-endpoint, code-review)
- [ ] `context-comparison.md` — completed comparison template with observations
- [ ] 3 reusable prompt files tested and working

### Key Takeaways for Trainers

1. **Spaces collect shared task evidence.** Add only sources the audience may use.
2. **Custom instructions state repository conventions.** Review them like other repository changes.
3. **Prompt files capture repeatable tasks.** Keep each one specific.
4. **Compare context against the same task.** More context can add noise.
5. **Maintain the sources.** Replace stale documents and remove unused material.

### Next session

In **Session 07**, you will use Copilot in code review for PR summaries, review comments, and suggested fixes.
