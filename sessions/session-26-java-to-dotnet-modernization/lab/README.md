# Session 26 Lab: Migrate One Order-Pricing Slice to .NET 10

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07 and the Session 26 trainer content

**Deliverable:** A working .NET 10 order-pricing endpoint, shared contract-test
evidence, architecture notes, an HTTP parity check, and a reviewed migration
backlog

## Lab outcome

Run a Java 8-compatible order service, trace one request through it, and migrate
`POST /orders/price` to an ASP.NET Core Minimal API. The Java and .NET
implementations must pass the same JSON contract cases.

Keep the scope narrow. Do not migrate the health or sample-order routes during the
main exercise.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Preflight and run the Java baseline | 15 min |
| 2 | Extract behavior and architecture | 20 min |
| 3 | Review the shared contract | 15 min |
| 4 | Implement the .NET pricing slice | 35 min |
| 5 | Add and run contract tests | 20 min |
| 6 | Compare HTTP behavior and write the backlog | 15 min |

## Preflight

### Copilot access

Confirm that GitHub Copilot Chat works in the approved coding environment. Ask it
to summarize the open file, then verify that the answer refers to that file.

If GitHub Copilot access is unavailable, **stop the lab**. Resolve the account,
extension, license, or policy issue first. Do not paste the exercise into an
unapproved public assistant.

### Primary environment: Dev Container or Codespaces

Open the repository in its Dev Container or Codespaces.

Run:

```bash
java -version
dotnet --version
git --version
curl --version
```

Expected:

- Java is available. The container uses Java 21 and compiles the legacy project
  for Java 8.
- `dotnet --version` reports a 10.x SDK.
- Git and `curl` are available.

The Maven Wrapper downloads the pinned Maven version on first use. You do not need
a global Maven installation.

### Native setup fallback

Use this route only when the repository container is unavailable.

Install:

- JDK 17 or 21;
- .NET 10 SDK;
- Git;
- `curl` or a comparable HTTP client.

Check:

```bash
java -version
dotnet --list-sdks
```

On macOS or Linux, use `./mvnw`. On Windows, use `mvnw.cmd`. PowerShell learners
can replace `curl` commands with `Invoke-RestMethod`.

Do not change the target framework or Maven compiler level to fit an older local
machine. Fix the environment instead.

### Create a working copy

Run from the repository root:

```bash
mkdir -p ~/copilot-labs/session-26
cp -R sessions/session-26-java-to-dotnet-modernization/lab/starter/. \
  ~/copilot-labs/session-26/
cd ~/copilot-labs/session-26
```

Keep the curriculum files unchanged. Complete the lab in the copied folder.

## Part 1: Run the Java baseline (15 minutes)

Open the legacy project:

```bash
cd ~/copilot-labs/session-26/legacy-java-order-service
./mvnw test
./mvnw package
```

Expected test output:

```text
Contract fixture tests passed: 5
```

Start the service:

```bash
java -jar target/legacy-order-service-1.0.0.jar
```

Keep that terminal open. In a second terminal:

```bash
curl http://localhost:8080/health
curl http://localhost:8080/orders/samples
```

Send a pricing request:

```bash
curl -X POST http://localhost:8080/orders/price \
  -H 'Content-Type: application/json' \
  --data '{"customerTier":"GOLD","destination":"DOMESTIC","couponCode":"SAVE10","items":[{"sku":"SKU-RED","quantity":2,"unitPriceCents":1299},{"sku":"SKU-BLUE","quantity":1,"unitPriceCents":2499}]}'
```

Expected field values:

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

JSON spacing may differ.

### Manual HTTP route

If `curl` is unavailable, use the VS Code REST Client, a browser for the two GET
routes, or PowerShell:

```powershell
$body = @{
  customerTier = "GOLD"
  destination = "DOMESTIC"
  couponCode = "SAVE10"
  items = @(
    @{ sku = "SKU-RED"; quantity = 2; unitPriceCents = 1299 }
    @{ sku = "SKU-BLUE"; quantity = 1; unitPriceCents = 2499 }
  )
} | ConvertTo-Json -Depth 4

Invoke-RestMethod -Method Post `
  -Uri http://localhost:8080/orders/price `
  -ContentType application/json `
  -Body $body
```

**Checkpoint:** The Java tests pass and the service returns the expected pricing
fields.

## Part 2: Extract behavior and architecture (20 minutes)

Copy the notes template:

```bash
cp architecture-notes-template.md architecture-notes.md
```

Read the Java files in this order:

1. `src/main/java/training/orders/App.java`
2. `src/main/java/training/orders/JsonCodec.java`
3. `src/main/java/training/orders/OrderRequest.java`
4. `src/main/java/training/orders/OrderPricingService.java`
5. `src/main/java/training/orders/PriceQuote.java`
6. `src/test/java/training/orders/ContractFixtureTest.java`

Use Copilot for a bounded inspection:

```text
Trace POST /orders/price through this Java project. Return a table with the entry
point, JSON parsing, validation, pricing calculation, response mapping, and test
evidence. Cite file and symbol names. Do not propose .NET code and do not edit.
```

Verify every row against the files.

Complete the request path and pricing-rule tables in `architecture-notes.md`.

Record these accepted behaviors:

- `STANDARD`, `SILVER`, and `GOLD` tier values;
- `SAVE10` coupon behavior;
- domestic and international shipping;
- the domestic free-shipping threshold;
- tax base and rate;
- integer round-half-up;
- invalid input behavior;
- overflow handling.

Then list Java details that do not need to survive:

- `HttpHandler` classes;
- getter methods;
- the hand-written JSON codec;
- the exact package and file layout.

### Review point 1

Explain the route without saying "the service calls the service class." Name what
each step does and which behavior a replacement must preserve.

## Part 3: Review the shared contract (15 minutes)

Open:

```text
~/copilot-labs/session-26/contracts/order-pricing-cases.jsonl
```

Each line is one complete case. Review the five names and expected fields.

Ask Copilot:

```text
Compare OrderPricingService.java with contracts/order-pricing-cases.jsonl.
List the calculation order, rounding formula, shipping threshold, accepted values,
and behavior that is not covered by the fixtures. Do not edit files.
```

Check the answer manually.

Calculate the `round-half-up` case:

```text
subtotal = 101
SILVER discount = round(101 × 5%) = 5
after tier = 96
SAVE10 = round(96 × 10%) = 10
discounted merchandise = 86
shipping = 795
tax = round(86 × 8.25%) = 7
total = 86 + 795 + 7 = 888
```

Add one row to `architecture-notes.md` for behavior not covered by a successful
fixture. Examples include an invalid tier, empty items, or an unsupported coupon.
Do not change the shared fixture yet.

### Review point 2

Before coding, a partner or trainer should be able to answer:

- Why is the coupon based on `after tier`?
- Why does the free-shipping check use discounted merchandise?
- Why is tax not calculated on shipping?
- Which formula produces round-half-up?

## Part 4: Implement the .NET pricing slice (35 minutes)

Open:

```text
~/copilot-labs/session-26/modern-dotnet-order-service/
```

The scaffold contains:

- `OrderPricing.Api/Program.cs`
- `OrderPricing.Api/Pricing.cs`
- `OrderPricing.Api/OrderPricing.Api.csproj`

`Program.cs` already maps:

- `GET /health`
- `POST /orders/price`

Implement only `PricingEngine.Price` and its private helpers.

Use this prompt:

```text
Implement PricingEngine.Price in this .NET 10 scaffold.

Source of truth:
- ../legacy-java-order-service/src/main/java/training/orders/OrderPricingService.java
- ../contracts/order-pricing-cases.jsonl

Requirements:
- preserve the operation order and response fields;
- use integer cents and round-half-up with basis points;
- use checked arithmetic;
- preserve accepted tiers, destinations, coupon behavior, and validation messages;
- use .NET platform APIs only;
- do not add packages;
- do not change Program.cs or the JSON contract.

Return a short plan before editing. After editing, explain how each shared case is
covered.
```

Review the proposed plan. Reject package additions and contract changes.

After Copilot edits the file, inspect it line by line.

Check:

- [ ] Tier discount uses the original subtotal.
- [ ] Coupon discount uses the amount after tier discount.
- [ ] Shipping checks the amount after both discounts.
- [ ] Tax uses discounted merchandise only.
- [ ] Percentage calculations add `5000` before dividing by `10000`.
- [ ] Arithmetic that can overflow is checked.
- [ ] Empty or unknown coupon values match Java behavior.
- [ ] No package reference was added.

Build:

```bash
cd ~/copilot-labs/session-26/modern-dotnet-order-service/OrderPricing.Api
dotnet build
```

If the build fails, fix the specific compiler error. Do not weaken nullable checks
or change the target from `net10.0`.

### Edit-tool recovery

If an edit tool fails after Copilot access passes preflight, type the
implementation from the accepted rules. Copilot access is still required. Manual
editing recovers from an edit-tool failure; it is not a no-access route.

### Review point 3

Ask Copilot to review without editing:

```text
Review the Java and C# pricing implementations for behavior drift. Focus on
operation order, rounding, validation, overflow, shipping threshold, tax base,
and response fields. Return findings with file and symbol names. Do not edit.
```

Resolve each valid finding. Record rejected suggestions and why they did not match
the contract.

## Part 5: Add and run shared contract tests (20 minutes)

Create a package-free console test project:

```bash
cd ~/copilot-labs/session-26/modern-dotnet-order-service
dotnet new console -n OrderPricing.ContractTests --framework net10.0
dotnet add OrderPricing.ContractTests/OrderPricing.ContractTests.csproj \
  reference OrderPricing.Api/OrderPricing.Api.csproj
```

Update the test project so it copies the shared fixture into its output:

```xml
<ItemGroup>
  <ProjectReference Include="../OrderPricing.Api/OrderPricing.Api.csproj" />
  <None Include="../../contracts/order-pricing-cases.jsonl"
        Link="contracts/order-pricing-cases.jsonl"
        CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```

Implement the test executable in
`OrderPricing.ContractTests/Program.cs`.

It must:

1. read every non-empty JSONL line;
2. deserialize the request and expected quote with `System.Text.Json`;
3. call `PricingEngine.Price`;
4. compare all six response fields;
5. throw with the case name and field when a value differs;
6. print the number of passing cases.

Suggested prompt:

```text
Implement this package-free .NET 10 console project as a contract test runner.
Read contracts/order-pricing-cases.jsonl from AppContext.BaseDirectory.
Deserialize each line, call PricingEngine.Price, compare every PriceQuote field,
and throw a clear exception with case name, field, expected, and actual.
Do not add a test framework or any package.
```

Run:

```bash
dotnet run --project OrderPricing.ContractTests
```

Expected:

```text
Contract fixture tests passed: 5
```

Re-run the Java test from the working copy:

```bash
cd ~/copilot-labs/session-26/legacy-java-order-service
./mvnw test
```

Both outputs should report five passing cases.

**Checkpoint:** The Java baseline and .NET replacement consume the same fixture
file and agree on every response field.

## Part 6: Compare HTTP behavior and write the backlog (15 minutes)

Keep the Java service on port 8080. Start the .NET API on port 5080:

```bash
cd ~/copilot-labs/session-26/modern-dotnet-order-service
dotnet run --project OrderPricing.Api -- --urls http://localhost:5080
```

Send the same request to both services:

```bash
REQUEST='{"customerTier":"GOLD","destination":"DOMESTIC","couponCode":"SAVE10","items":[{"sku":"SKU-RED","quantity":2,"unitPriceCents":1299},{"sku":"SKU-BLUE","quantity":1,"unitPriceCents":2499}]}'

curl -s -X POST http://localhost:8080/orders/price \
  -H 'Content-Type: application/json' \
  --data "$REQUEST"

curl -s -X POST http://localhost:5080/orders/price \
  -H 'Content-Type: application/json' \
  --data "$REQUEST"
```

Compare field values. JSON property order or whitespace may differ.

Also send one invalid request:

```bash
curl -i -X POST http://localhost:5080/orders/price \
  -H 'Content-Type: application/json' \
  --data '{"customerTier":"PLATINUM","destination":"DOMESTIC","couponCode":"","items":[{"sku":"SKU-RED","quantity":1,"unitPriceCents":100}]}'
```

Confirm an HTTP 400 response with a clear error.

Copy the backlog template:

```bash
cd ~/copilot-labs/session-26
cp migration-backlog-template.md migration-backlog.md
```

Complete at least four rows. Keep slices small. Each row must state:

- current Java entry point;
- proposed .NET boundary;
- proof required before cutover;
- one risk or dependency.

Include:

- sample-order query;
- health and diagnostics;
- error-contract coverage;
- one operational concern such as concurrency or observability.

Under **Keep in Java for now**, list behavior that has not been characterized.

Under **Remove only after**, require:

- accepted contract evidence;
- HTTP comparison;
- code review;
- deployment and rollback ownership;
- a decision on how callers move to the new route.

## Final Deliverable

Submit or demonstrate:

1. `architecture-notes.md` with the request path and accepted pricing rules.
2. The completed `.NET 10` `PricingEngine`.
3. A package-free .NET contract test executable.
4. Java and .NET output showing five shared cases passed.
5. One matching Java and .NET HTTP response.
6. One .NET HTTP 400 validation example.
7. `migration-backlog.md` with at least four next slices and removal conditions.
8. A short review note listing any Copilot suggestion you rejected.

## Final verification

- [ ] GitHub Copilot access passed preflight.
- [ ] Work happened in a copied lab folder.
- [ ] `./mvnw test` passed five shared cases.
- [ ] The Java service returned the expected gold plus coupon quote.
- [ ] Architecture notes separate behavior from Java structure.
- [ ] The .NET project still targets `net10.0`.
- [ ] No unnecessary package was added.
- [ ] The .NET contract runner passed the same five fixture lines.
- [ ] The Java and .NET HTTP responses matched by value.
- [ ] Invalid .NET input returned HTTP 400.
- [ ] The backlog says what remains in Java and what proof each next slice needs.

## Troubleshooting

| Problem | Check |
| --- | --- |
| `Permission denied: ./mvnw` | Run `chmod +x mvnw`, then retry |
| Maven cannot download on first run | Confirm network or use the instructor-prepared wrapper cache |
| Port 8080 is in use | Set `PORT=8081` for Java and update the request URL |
| .NET SDK cannot target `net10.0` | Use the Dev Container/Codespaces or install .NET 10 |
| Contract test cannot find JSONL | Check the `None Include` path and `CopyToOutputDirectory` |
| Total differs by one cent | Check operation order and round-half-up |
| Domestic shipping is unexpectedly free | Check the threshold after both discounts |
| ASP.NET Core chooses another port | Pass `--urls http://localhost:5080` |

## Solution reference

The reference implementation is in [`solution/`](solution/). Review it after you
have test output or when the trainer ends the implementation timebox. Compare
behavior and evidence before comparing formatting.
