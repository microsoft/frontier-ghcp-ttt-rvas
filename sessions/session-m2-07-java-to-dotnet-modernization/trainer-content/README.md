# Session M2-07 trainer guide: Migrate a legacy Java service to modern .NET

## Delivery objective

Teach learners to preserve behavior during migration. They inspect a runnable
Java service and define the pricing contract before moving one HTTP slice to
.NET 10. Then they compare both implementations with the same JSON cases.

Keep the slice narrow: one reviewed route. The rest of the service stays in Java.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Define the migration boundary |
| 0:08 to 0:16 | Read the Java request path |
| 0:16 to 0:26 | Extract behavior and contract cases |
| 0:26 to 0:42 | Compare Java and .NET 10 |
| 0:42 to 0:52 | Use Copilot without surrendering decisions |
| 0:52 to 1:00 | Prepared demo and lab handoff |

## Trainer preflight

Use the repository Dev Container or Codespaces.

```bash
java -version
dotnet --version
cd sessions/session-m2-07-java-to-dotnet-modernization/lab/starter/legacy-java-order-service
./mvnw test
./mvnw package
```

Expected Java test output:

```text
Contract fixture tests passed: 5
```

The container should report the .NET 10 SDK. The Java runtime may be newer than
Java 8 because Maven compiles the baseline with `source` and `target` set to `8`.

Prepare two terminals:

```bash
# Terminal 1
java -jar target/legacy-order-service-1.0.0.jar
```

```bash
# Terminal 2
curl http://localhost:8080/health
curl http://localhost:8080/orders/samples
```

Also build the completed .NET solution:

```bash
cd ../../solution/modern-dotnet-order-service
dotnet build
dotnet run --project OrderPricing.ContractTests
```

After the Maven Wrapper downloads Maven and its plugins, the demo needs no
network. The code uses only JDK and .NET platform APIs.

## Teaching model

### 1. Migrate a route, not a codebase

Use the HTTP route as the migration boundary:

```text
POST /orders/price
        |
        v
JSON parsing and validation
        |
        v
Pricing rules
        |
        v
JSON response
```

This vertical slice includes the entry point, contract, domain logic, failure
behavior, and verification. Moving only the calculation class would leave the
risky edges behind.

Keep `GET /health` and `GET /orders/samples` in Java as backlog candidates. That
keeps the boundary clear and the lab inside two hours.

### 2. Separate contract from structure

The Java classes and JDK HTTP plumbing are implementation choices. The contract is
smaller:

- method and path;
- request JSON fields and accepted values;
- calculation order and rounding rule;
- response JSON fields;
- status codes and error shape.

Ask learners to classify each finding:

| Classification | Example | Migration treatment |
| --- | --- | --- |
| External behavior | `GOLD` gives a 10% tier discount | Preserve |
| Calculation rule | coupon runs after tier discount | Preserve and test |
| Transport choice | JDK `HttpServer` | Replace with Minimal API |
| Language structure | getters and nested item class | Redesign in C# |
| Unknown behavior | concurrent request limit | Record, don't invent |

Copilot may reproduce Java structure in C#. Behavior tests establish parity.

### 3. Use integer money and explicit rounding

The service stores money in cents. Percentage calculations use basis points:

```text
rounded cents = (amount in cents × basis points + 5000) / 10000
```

This is integer round-half-up for non-negative amounts.

The operation order is fixed:

1. sum line items;
2. apply the customer-tier discount;
3. apply `SAVE10` to the remaining merchandise amount;
4. decide shipping from the discounted merchandise amount;
5. calculate tax on discounted merchandise;
6. add discounted merchandise, shipping, and tax.

Changing the order changes the result, and so does floating-point arithmetic. The
`round-half-up` fixture catches both mistakes.

### 4. Test both implementations with the same fixtures

Open `lab/starter/contracts/order-pricing-cases.jsonl`. Each line holds a case
name, one request, and the expected response fields.

JSON Lines keeps each case readable and lets the Java 8 baseline read the file
without a JSON package. The .NET test executable uses `System.Text.Json`.

| Case | Main risk |
| --- | --- |
| `standard-domestic` | baseline shipping and tax |
| `silver-free-domestic-shipping` | threshold after discount |
| `gold-save10-domestic` | discount order |
| `gold-international` | international shipping |
| `round-half-up` | integer rounding |

The fixtures cover shared pricing behavior only. Validation errors and HTTP
behavior need focused checks.

### 5. Compare Java and .NET (16 minutes)

Learners may not know .NET. Walk through five ideas with the side-by-side slides.
Open `Program.cs` from the scaffold next to `App.java`.

| Idea | Java baseline | .NET 10 | Say this |
| --- | --- | --- | --- |
| Minimal API | `HttpServer` with a handler class per route that reads and writes JSON by hand | `app.MapPost("/orders/price", ...)` in `Program.cs` | The framework binds the JSON body to a record and injects `PricingEngine`. `try/catch` maps errors to HTTP 400. |
| Vertical slice | Route, parsing, rules, errors, and fixture test | The same pieces, in one API project and one test project | Migrate all of it together, not only the calculation class. |
| JSONL contract fixtures | `ContractFixtureTest` reads the file path from a `contract.fixture` system property | The test project reads the same file | One object per line. Both languages read the same cases, so the fixture, not the C#, defines the result. |
| Basis points | Integer formula with `+ 5000` | Same formula with checked arithmetic | 1 basis point is 0.01%. `SILVER` is 500. Work `SILVER` on 101 cents: (101 × 500 + 5000) / 10000 = 5. |
| `None Include` and `CopyToOutputDirectory` | Not needed | In the test `.csproj` | The test runs from `bin/`. `None Include` tracks a non-code file, `Link` sets its path in the output, and `CopyToOutputDirectory` copies it on build. The test reads it from `AppContext.BaseDirectory`. A "cannot find JSONL" error usually means this item is wrong. |

Then map the pieces:

| Java baseline | .NET 10 target | Review question |
| --- | --- | --- |
| `App` and `HttpHandler` | Minimal API route | Are method, path, status, and JSON stable? |
| `OrderRequest` | C# records | Do names and null rules match? |
| `OrderPricingService` | `PricingEngine` | Are operation order and overflow checks preserved? |
| `PriceQuote` | response record | Are all fields present and in cents? |
| `ContractFixtureTest` | console contract test project | Does it read the same fixture file? |

The target is one API project and one package-free executable test project.
Minimal APIs and `System.Text.Json` ship with ASP.NET Core and .NET.

Don't add an object mapper, a validation framework, a mediator package, a database
abstraction, or a repository interface for fixture data. This slice doesn't need them.

## Copilot working agreement

Give Copilot a specific route and contract. Don't ask it to infer the business contract.

Inspect:

```text
Trace POST /orders/price through the Java starter. Return a table with the entry
point, parsing, validation, pricing rules, response mapping, and tests. Cite file
and symbol names. Do not propose .NET code yet.
```

Check behavior:

```text
Compare the Java pricing code with contracts/order-pricing-cases.jsonl. List the
calculation order, rounding rule, shipping threshold, accepted values, and any
behavior not covered by a fixture. Do not change files.
```

Implement:

```text
Implement PricingEngine.Price in the .NET 10 scaffold. Preserve the shared JSON
contract exactly. Use integer cents, checked arithmetic, and platform APIs only.
Do not add packages or change the endpoint shape.
```

Review:

```text
Review the Java and .NET pricing implementations for behavior drift. Focus on
operation order, rounding, validation, overflow, shipping threshold, tax base,
and response fields. Return findings before editing.
```

### Reject these patterns

- "Convert this project to .NET."
- generated packages without a stated need;
- a new contract because the C# model looks cleaner;
- decimal or floating-point calculations without a parity decision;
- tests generated from the .NET implementation instead of the shared fixtures;
- deleting the Java path before tests and review support the replacement.

## Prepared demonstration

### Step 1: establish the Java behavior

```bash
cd sessions/session-m2-07-java-to-dotnet-modernization/lab/starter/legacy-java-order-service
./mvnw test
./mvnw package
java -jar target/legacy-order-service-1.0.0.jar
```

Send the `gold-save10-domestic` request. The response:

```json
{
  "subtotalCents": 5097,
  "tierDiscountCents": 510,
  "couponDiscountCents": 459,
  "shippingCents": 795,
  "taxCents": 341,
  "totalCents": 5264
}
```

### Step 2: trace the request

Open in order: `App.java`, `JsonCodec.java`, `OrderRequest.java`,
`OrderPricingService.java`, `PriceQuote.java`, `ContractFixtureTest.java`.

The HTTP handler is thin. Most behavior sits in the pricing service and the
fixture-backed test.

### Step 3: show a plausible wrong migration

In a temporary demo copy, change the .NET coupon calculation to use `subtotal`
instead of `afterTier`, then run:

```bash
dotnet run --project OrderPricing.ContractTests
```

The `gold-save10-domestic` case fails. Clean C# can still produce the wrong result.

Restore the reference code, run the test again, and show all five cases passing.

### Step 4: compare HTTP results

```bash
dotnet run --project OrderPricing.Api -- --urls http://localhost:5080
```

Send the same request to ports 8080 and 5080 and compare the JSON field values.
This shows one HTTP request and five pricing cases, not full service parity.

## Review points

Pause the lab at these points.

1. **Request path.** Learners identify one HTTP entry point, one parsing
   boundary, one domain calculation, one response mapping, and one contract test.
   If they describe only classes, ask which observable behavior each class
   supports.
2. **Contract before code.** Learners explain the `round-half-up` case without
   reading the expected value. Ask them to calculate the tier and coupon discounts
   in order.
3. **Generated change.** Before learners accept Copilot output, ask: Did it add
   packages? Change JSON names? Use floating point? Drop checked arithmetic? Move
   the shipping threshold? Tax shipping?
4. **Compare test and HTTP results.** Require the Java contract test output, the
   .NET contract test output, and one matching HTTP response.

## Migration backlog model

| Priority | Slice | Checks before cutover |
| --- | --- | --- |
| P0 | Order pricing | Shared contract cases, validation checks, HTTP comparison |
| P1 | Sample-order query | Response contract and synthetic catalog checks |
| P1 | Health and diagnostics | Agreed status contract and operational owner |
| P2 | Error consistency | Status and JSON error matrix |
| P2 | Load and concurrency | Measured target and repeatable test |

Learners may list up to three next slices and what must pass before the Java path
goes. This is optional and the lab doesn't require it.

## Common mistakes

**The learner translates every Java class.** Return to the route and contract.

**The .NET output is off by one cent.** Check the operation order and the `+ 5000`
round-half-up step.

**Free shipping triggers too early.** The threshold uses merchandise after both discounts.

**Tax includes shipping.** The Java behavior taxes discounted merchandise only.

**The generated API adds packages.** Remove them unless the learner can name a
requirement platform APIs can't meet.

**Tests pass because expected values were copied from new code.** The shared fixture
is the source. Don't regenerate it from the migration.

## Lab handoff

Learners run and inspect the Java baseline, review the shared contract cases,
implement the .NET pricing engine, add package-free contract tests, and compare
Java and .NET HTTP responses. Migration notes are optional.

**One route must pass the contract and HTTP checks.** The rest of the Java service stays
until its own slices have contracts and review.
