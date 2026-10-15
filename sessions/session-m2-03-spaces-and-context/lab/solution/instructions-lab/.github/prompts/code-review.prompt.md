---
description: "Review code against team coding standards"
---

Review the selected code against the team standards:

1. **Imports:** Use ES modules (`import`/`export`); flag `require()`.
2. **Async handling:** Use `await` with `try`/`catch`; flag `.then()` chains.
3. **Errors:** Return `{ error: { code, message } }`; flag inconsistent shapes.
4. **Input:** Validate user-provided data before use; flag omissions.
5. **Names:** Check kebab-case files, camelCase functions, and SCREAMING_SNAKE_CASE constants.
6. **Security:** Look for injection, XSS, and missing authorization checks.
7. **Responses:** Check for `{ data: ... }` envelopes.

Rate each item:

- 🔴 **Critical**: fix before merge
- 🟡 **Warning**: fix when practical; does not block
- 🟢 **Suggestion**: optional improvement

End with the count for each rating.
