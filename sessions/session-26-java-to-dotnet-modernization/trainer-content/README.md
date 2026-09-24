# Session 26 Trainer Guide: Migrate a Legacy Java Service to Modern .NET

## Delivery objective

Teach learners to migrate behavior, not syntax. They inspect a runnable Java
service, define the pricing contract, move one complete HTTP slice to .NET 10,
and prove that both implementations agree on the same JSON cases.

The slice stays narrow. A successful session ends with one reviewed route and a
backlog for the rest of the service, not a rewrite plan built on untested
assumptions.

> [!IMPORTANT]
> Verify GitHub Copilot access before delivery. If a learner cannot use Copilot in
> the approved coding environment, **stop the lab for that learner**. Do not replace
> the session with an unreviewed public tool or personal account.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Define the migration boundary |
| 0:08–0:18 | Read the Java request path |
| 0:18–0:30 | Extract behavior and contract cases |
| 0:30–0:42 | Map the slice to .NET 10 |
| 0:42–0:52 | Use Copilot without surrendering decisions |
| 0:52–1:00 | Prepared demo and lab handoff |

## Trainer preflight

Prefer the repository Dev Container or Codespaces.

Run:

```bash
java -version
dotnet --version
cd sessions/session-26-java-to-dotnet-modernization/lab/starter/legacy-java-order-service
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

Also prepare the completed .NET solution:

```bash
cd ../../solution/modern-dotnet-order-service
dotnet build
dotnet run --project OrderPricing.ContractTests
```

Do not rely on a network connection during the teaching segment after the Maven
Wrapper has downloaded Maven and its plugins. The code itself uses only JDK and
.NET platform APIs.

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

This is a vertical slice because it includes the entry point, contract, domain
logic, failure behavior, and verification. Moving only the calculation class would
leave the risky edges behind.

Keep these Java routes in place:

- `GET /health`
- `GET /orders/samples`

They become backlog candidates. This makes the migration boundary visible and
keeps the lab inside two hours.

### 2. Separate contract from structure

The Java service contains classes and JDK HTTP plumbing. Those are implementation
choices. The contract is smaller:

- method and path;
- request JSON fields;
- accepted values;
- calculation order;
- rounding rule;
- response JSON fields;
- status codes and error shape.

Ask learners to mark each finding as one of:

| Classification | Example | Migration treatment |
| --- | --- | --- |
| External behavior | `GOLD` gives a 10% tier discount | Preserve |
| Calculation rule | coupon runs after tier discount | Preserve and test |
| Transport choice | JDK `HttpServer` | Replace with Minimal API |
| Language structure | getters and nested item class | Redesign in C# |
| Unknown behavior | concurrent request limit | Record, do not invent |

This classification stops mechanical translation. Copilot may reproduce a Java
shape in C#, but familiar-looking code is not proof of parity.

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

Changing the order changes the result. Floating-point arithmetic can also change
the result. The `round-half-up` fixture exists to catch both mistakes.

### 4. Treat fixtures as executable migration evidence

Open `lab/starter/contracts/order-pricing-cases.jsonl`.

Each line contains:

- a case name;
- one request;
- the expected response fields.

JSON Lines keeps each case readable and lets the Java 8 baseline consume the file
without adding a JSON package. The .NET test executable uses `System.Text.Json`.

The five cases cover:

| Case | Main risk |
| --- | --- |
| `standard-domestic` | baseline shipping and tax |
| `silver-free-domestic-shipping` | threshold after discount |
| `gold-save10-domestic` | discount order |
| `gold-international` | international shipping |
| `round-half-up` | integer rounding |

Contract fixtures do not replace all tests. They prove the selected shared
behavior. Validation errors and HTTP behavior still need focused checks.

### 5. Map responsibilities to .NET

Use a small mapping:

| Java baseline | .NET 10 target | Review question |
| --- | --- | --- |
| `App` and `HttpHandler` | Minimal API route | Are method, path, status, and JSON stable? |
| `OrderRequest` | C# records | Do names and null rules match? |
| `OrderPricingService` | `PricingEngine` | Are operation order and overflow checks preserved? |
| `PriceQuote` | response record | Are all fields present and in cents? |
| `ContractFixtureTest` | console contract test project | Does it read the same fixture file? |

The target has one API project and one package-free executable test project.
Minimal APIs and `System.Text.Json` come with ASP.NET Core and .NET.

Do not add:

- an object mapper;
- a validation framework;
- a mediator package;
- a database abstraction;
- a repository interface for fixture data.

Those additions hide the lesson under scaffolding.

## Copilot working agreement

Copilot works best with a sharp boundary. Do not ask it to infer the business
contract.

### Good prompt sequence

Start with inspection:

```text
Trace POST /orders/price through the Java starter. Return a table with the entry
point, parsing, validation, pricing rules, response mapping, and tests. Cite file
and symbol names. Do not propose .NET code yet.
```

Then check behavior:

```text
Compare the Java pricing code with contracts/order-pricing-cases.jsonl. List the
calculation order, rounding rule, shipping threshold, accepted values, and any
behavior not covered by a fixture. Do not change files.
```

Only then implement:

```text
Implement PricingEngine.Price in the .NET 10 scaffold. Preserve the shared JSON
contract exactly. Use integer cents, checked arithmetic, and platform APIs only.
Do not add packages or change the endpoint shape.
```

Finish with review:

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
- tests generated from the .NET implementation instead of the accepted fixtures;
- deletion of the Java path before the replacement has evidence.

## Prepared demonstration

Use the verified starter and solution.

### Step 1: establish the Java behavior

Run:

```bash
cd sessions/session-26-java-to-dotnet-modernization/lab/starter/legacy-java-order-service
./mvnw test
./mvnw package
java -jar target/legacy-order-service-1.0.0.jar
```

Send the `gold-save10-domestic` request. Point out the response:

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

Open these files in order:

1. `App.java`
2. `JsonCodec.java`
3. `OrderRequest.java`
4. `OrderPricingService.java`
5. `PriceQuote.java`
6. `ContractFixtureTest.java`

Show that the HTTP handler is thin. Most behavior sits in the pricing service and
the fixture-backed test.

### Step 3: show a plausible wrong migration

In a temporary demo copy, change the .NET coupon calculation to use `subtotal`
instead of `afterTier`.

Run:

```bash
dotnet run --project OrderPricing.ContractTests
```

The `gold-save10-domestic` case should fail. This is the point of the session:
clean C# can still be wrong.

Restore the reference code. Run the test again and show all five cases passing.

### Step 4: compare HTTP results

Run the .NET API on port 5080:

```bash
dotnet run --project OrderPricing.Api -- --urls http://localhost:5080
```

Send the same request to ports 8080 and 5080. Compare the JSON field values.

Do not claim full service parity. The demo proves one route and five accepted
pricing cases.

## Review points

Pause the lab at these points.

### Review point 1: architecture notes

Learners should identify:

- one HTTP entry point;
- one parsing boundary;
- one domain calculation;
- one response mapping;
- one existing contract test.

If the notes describe only classes, ask which observable behavior each class
supports.

### Review point 2: contract before code

Learners should explain the `round-half-up` case without reading the expected
value from the fixture. Ask them to calculate the tier and coupon discounts in
order.

### Review point 3: generated change

Before learners accept Copilot output, ask:

- Did it add packages?
- Did it change JSON names?
- Did it use floating point?
- Did it preserve checked arithmetic?
- Did it move the shipping threshold?
- Did it calculate tax on shipping?

### Review point 4: parity evidence

The final evidence must include:

- Java contract test output;
- .NET contract test output;
- one matching HTTP response;
- a migration backlog with proof required for each next slice.

## Migration backlog model

Use a slice-first backlog:

| Priority | Slice | Proof before cutover |
| --- | --- | --- |
| P0 | Order pricing | Shared contract cases, validation checks, HTTP comparison |
| P1 | Sample-order query | Response contract and synthetic catalog checks |
| P1 | Health and diagnostics | Agreed status contract and operational owner |
| P2 | Error consistency | Status and JSON error matrix |
| P2 | Load and concurrency | Measured target and repeatable test |

The backlog should also say what remains in Java. An honest backlog has boundaries,
unknowns, and removal conditions.

## Common mistakes

**The learner translates every Java class.** Bring them back to the route and
contract. A class-by-class rewrite preserves structure that may not matter.

**The .NET output is off by one cent.** Check the operation order and the `+ 5000`
round-half-up step.

**Free shipping triggers too early.** The threshold uses merchandise after both
discounts.

**Tax includes shipping.** The accepted Java behavior taxes discounted merchandise
only.

**The generated API adds packages.** Remove them unless the learner can name a
requirement that platform APIs cannot meet.

**Tests pass because expected values were copied from new code.** The shared fixture
is the accepted source. Do not regenerate it from the migration.

## Lab handoff

Learners:

1. run and inspect the Java baseline;
2. complete the architecture notes;
3. review the shared contract cases;
4. implement the .NET pricing engine;
5. add package-free contract tests;
6. compare Java and .NET HTTP responses;
7. write the next migration backlog.

**Success means one route has evidence.** The rest of the Java service stays in
place until its own slices have contracts and review.
