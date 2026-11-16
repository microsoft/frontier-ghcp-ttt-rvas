---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M2-07: Migrate a Legacy Java Service to Modern .NET'
---

<!-- _class: lead -->

# Migrate a legacy Java service to modern .NET

## Preserve behavior one vertical slice at a time

Session M2-07 | Copilot in Practice | Advanced | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| Define the migration boundary | 8 min |
| Read the Java request path | 8 min |
| Extract behavior and contract cases | 10 min |
| Compare Java and .NET 10 | 16 min |
| Use Copilot with review gates | 10 min |
| Prepared demo and lab handoff | 8 min |

---

# The method in six steps

1. **Pick one slice** that you can finish and check.
2. **Run the legacy code** and watch what it does.
3. **Trace the path** from request to response.
4. **Capture behavior** as test cases both versions can run.
5. **Rebuild the slice** with the platform's own features.
6. **Compare results** before you remove anything.

The lab applies these steps to one pricing route. The steps work for any service.

---

# A rewrite hides the unknowns

| Whole-service rewrite | Vertical-slice migration |
| --- | --- |
| Scope grows before behavior is known | One slice defines the boundary |
| New code becomes the assumed truth | Existing behavior is captured first |
| Cutover checks arrive late | Each slice is checked before replacement |
| Java structure leaks into C# | Target design follows the contract |

Record unknown behavior before you expand the slice.

---

# Choose a slice you can finish

A good first slice:

- has **one entry point**, such as a route, a job, or a message handler;
- carries **real rules**, not just plumbing;
- can run **alongside** the old code;
- can be checked with **inputs and outputs**.

Everything outside the slice stays in Java for now.

**In the lab:** `POST /orders/price`. Health and sample routes stay in Java.

---

# Run the legacy service first

Before you read a file:

1. build it;
2. run its tests;
3. start it;
4. send it one request.

Running code answers questions that reading cannot. It also gives you a baseline that proves the old behavior still works on your machine.

**In the lab:** `./mvnw test`, then `./mvnw package`, then `java -jar`.

---

# Trace the request path

Follow one request from the edge to the response. Write down each hop.

```text
entry point
  → parse and validate input
  → business logic
  → map to response
  → status code
```

Note where errors leave the path and what the caller sees.

Ask Copilot to build this map. You check it against the code.

On a large codebase, a skill such as `acquire-codebase-knowledge` can draw the first map. It guesses at intent, so you still check it.

---

# Classify what you find

| Finding | Type | Action |
| --- | --- | --- |
| Observable output, status, or rule | External behavior | Preserve |
| Order of calculation steps | Business rule | Preserve and test |
| Framework or server choice | Transport choice | Replace |
| Getters, builders, class layout | Language structure | Redesign |
| Unknown load or timing | Open question | Record |

**Do not turn incidental structure into a requirement.**

---

# Order and rounding are part of the contract

Business rules often hide in sequence and arithmetic. Check:

- the **order** of steps. Moving one changes the result.
- the **rounding** mode and where it happens.
- the **number type**. Use integers or decimals for money, never binary floating point.
- the **base** each rule applies to.

**In the lab:** subtotal, tier discount, coupon, shipping, tax. Money stays in integer cents. Half-up rounding uses `(amount × rate + 5000) / 10000`.

---

# Shared fixtures hold accepted behavior

Write cases as data, so both implementations run the same file.

```json
{"name":"round-half-up",
 "request":{"customerTier":"SILVER", "couponCode":"SAVE10", "...":"..."},
 "expected":{"totalCents":888}}
```

Each case should name the risk it guards. Collect cases while you **discover** behavior, not after you migrate.

**In the lab:** five cases in one JSONL file read by the Java and .NET tests.

---

# Fixtures cover only what you put in them

Shared cases check the paths you chose. Also review:

- invalid input and missing fields;
- empty or extreme values;
- unsupported options;
- overflow behavior;
- method, path, status, and error body.

Where a case is missing, **write the gap down** or add the case.

---

# Map responsibilities, not classes

| Java | .NET 10 |
| --- | --- |
| `HttpHandler` | Minimal API route |
| Request class with getters | Request record |
| Service class | Plain class registered for injection |
| Response class | Response record |
| Test `main` | Test executable or test project |

The target can be smaller than the source. Move the job, not the file.

---

# Java and .NET, side by side

| Idea | Java baseline | .NET 10 |
| --- | --- | --- |
| Minimal API | `HttpServer`, one `HttpHandler` per route, body read and written by hand | `app.MapPost(path, lambda)`. The framework binds JSON to a record and injects services. |
| Vertical slice | Route, parsing, rules, errors, and test | The same unit moves as a whole |
| Fixtures as data | A hand-written codec reads each line | `System.Text.Json` reads the same file |
| Integer arithmetic | `long` math | `long` math, with `checked` to fail on overflow |

---

# Keep the transport layer thin

```csharp
app.MapPost("/path",
    (Request request, Service service) =>
{
    try
    {
        return Results.Ok(service.Run(request));
    }
    catch (ArgumentException exception)
    {
        return Results.BadRequest(new { error = exception.Message });
    }
});
```

The route binds input, calls the service, and maps the outcome to a status. The rules live in the service, where tests reach them.

---

# Tests need the shared file

A Java test can take a path from a system property. A .NET executable runs from `bin/`, so the build must **copy the fixture** next to it.

```xml
<None Include="../../contracts/cases.jsonl"
      Link="contracts/cases.jsonl"
      CopyToOutputDirectory="PreserveNewest" />
```

- `None Include`: a file the compiler ignores but the project tracks
- `Link`: where it appears under the output folder
- `CopyToOutputDirectory`: copy it on build

The test reads it from `AppContext.BaseDirectory`.

---

# Prefer the platform to extra packages

The target needs:

- ASP.NET Core Minimal APIs;
- built-in dependency injection;
- `System.Text.Json`;
- C# records;
- a console test executable.

Add a package only when the platform lacks the feature. Each one is code you now own.

---

# Copilot starts with inspection

```text
Trace <the route> through the Java code.
Return entry point, parsing, validation, business logic,
response mapping, and tests with file and symbol names.
Do not propose .NET code yet.
```

The first prompt builds a map. It does not ask for a rewrite.

---

# Ask for the behavior rules

```text
Compare the Java business logic with the shared test cases.
List operation order, rounding, thresholds, accepted values,
and behavior no case covers.
Do not change files.
```

Check each claim against the code and the test output.

---

# Bound the implementation prompt

```text
Implement <the service method> in the .NET 10 scaffold.
Preserve the shared JSON contract.
Use integer arithmetic and platform APIs.
Do not add packages or change the endpoint shape.
```

Name the limits so you can check that Copilot stayed inside them.

---

# Review generated code before running it

Check:

- field and JSON names;
- order of operations;
- arithmetic type and overflow;
- thresholds and the base each rule uses;
- added dependencies.

Generated code is a draft.

---

# A clean migration can still be wrong

Both lines look reasonable:

```csharp
var couponDiscount = Percentage(subtotal, 1000);
var couponDiscount = Percentage(afterTier, 1000);
```

Only one matches the old behavior. A shared case catches the difference. Reading the code might not.

**Tests catch what a code review misses.**

---

# Verification has layers

```text
legacy tests
      +
new tests on the same cases
      +
same request sent to both services
      +
human review of uncovered edges
```

No single layer proves the whole service.

---

# Prepared demo

1. Run the Java contract cases.
2. Send one request that combines several rules.
3. Show the Java request path.
4. Break the rule order in the .NET code on purpose.
5. Watch the shared case fail.
6. Restore the accepted code and rerun.

A failing case shows why the cases come first.

---

# Plan the next slices

| Priority | Slice | Check before removal |
| --- | --- | --- |
| P0 | Core business rules | Contract and HTTP parity |
| P1 | Read-only routes | Response contract |
| P1 | Health and operations | Operational contract |
| P2 | Error matrix | Status and error cases |
| P2 | Concurrency and load | Measured target |

Keep the Java behavior until tests and review support its replacement.

---

# Environment

Use the repository Dev Container or Codespaces:

- Java 21 compiling Java 8-compatible source
- Maven 3.9.9 through `mvnw`
- .NET 10 SDK

Native alternative: JDK 17 or 21, .NET 10 SDK, Git, and `curl`.

---

<!-- _class: divider -->

# Lab handoff

Apply the method to the order-pricing route: inspect the Java service, implement the .NET slice, run the shared cases, and compare HTTP responses. Short migration notes are optional.

**Complete one route and show its test results.**
