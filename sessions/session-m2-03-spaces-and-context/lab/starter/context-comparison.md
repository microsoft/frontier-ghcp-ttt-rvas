# Context comparison experiment

## Runtime instruction inspection

- CLI version and working directory:
- Project instruction sources shown by `/env` and `/instructions`:
- File-match scopes shown by the client:
- Stale module-style claim:
- Current contract and route used to check it:
- Correction made to the copied training note:
- Sources shown after restarting:
- Behavior observed in the low-stock task:

Do not copy tokens, personal instruction text, or unrelated environment details
into this record.

## Task used in every experiment

> Add request-logging middleware to the Storefront API. Record timestamp, method, URL, response time, and status code. Use info for 2xx, warn for 4xx, and error for 5xx. Add no logging package.

---

## Experiment A: No context

**Setup:** An empty file with no project open.

**Copilot's response:**
_(paste the response here)_

**Observations:**

- Logging library used:
- Import style (CJS/ESM):
- Error handling present:
- Assumptions made:

**Quality score (1 to 5):** ___

---

## Experiment B: With custom instructions

**Setup:** The Storefront API is open and includes `.github/copilot-instructions.md`.

**Copilot's response:**
_(paste the response here)_

**Observations:**

- Did it follow custom instructions?
- Did its import style match the instructions?
- Did its error format match the instructions?
- Other differences from Experiment A:

**Quality score (1 to 5):** ___

---

## Experiment C: With Copilot Space

**Setup:** Ask in the Copilot Space from Exercise 1.

**Copilot's response:**
_(paste the response here)_

**Observations:**

- Did it reference Space sources?
- Did it follow the architecture patterns?
- Consistency with project codebase:
- Cited files:

**Quality score (1 to 5):** ___

---

## Experiment D: With prompt file

**Setup:** Use a prompt file with structured instructions.

**Copilot's response:**
_(paste the response here)_

**Observations:**

- Did the output follow the prompt template?
- Was it more consistent than raw Chat?
- Missing elements:

**Quality score (1 to 5):** ___

---

## Comparison summary

| Dimension               | No Context  | Instructions  | Space   | Prompt File   |
| ----------------------- | ----------- | ------------- | ------- | ------------- |
| Followed project style? |             |               |         |               |
| Used correct patterns?  |             |               |         |               |
| Assumed correct stack?  |             |               |         |               |
| Required iterations?    |             |               |         |               |
| Quality score (1 to 5)     |             |               |         |               |

## Findings

Which smallest context set produced a project-correct result, and why?

_(Write your findings here.)_
