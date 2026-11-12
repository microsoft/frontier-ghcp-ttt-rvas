# Session M2-07 lab: Migrate one order-pricing slice to .NET 10

**Duration:** 2 hours

**Deliverable:** A working .NET 10 order-pricing endpoint, shared contract-test
output, and an HTTP parity check. Short migration notes are optional.

## Lab outcome

Run a Java 8-compatible order service, trace one request through it, and migrate
`POST /orders/price` to an ASP.NET Core Minimal API. The Java and .NET
implementations must pass the same JSON contract cases.

Keep the scope narrow. Don't migrate the health or sample-order routes.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Run the Java baseline | 15 min |
| 2 | Extract behavior and architecture | 15 min |
| 3 | Review the shared contract | 15 min |
| 4 | Implement the .NET pricing slice | 40 min |
| 5 | Add and run contract tests | 20 min |
| 6 | Compare HTTP behavior | 15 min |

## You need

Open the repository in its Dev Container or Codespaces, with GitHub Copilot Chat
working. Check:

```bash
java -version
dotnet --version
git --version
curl --version
```

- Java is available. The container uses Java 21 and compiles the legacy project for Java 8.
- `dotnet --version` reports a 10.x SDK.
- Git and `curl` are available.

The Maven Wrapper downloads the pinned Maven version on first use.

### Native setup alternative

Without the container, install JDK 17 or 21, the .NET 10 SDK, Git, and `curl` or
a comparable HTTP client. Check `java -version` and `dotnet --list-sdks`.

On macOS or Linux, use `./mvnw`. On Windows, use `mvnw.cmd`. In PowerShell, use
`Invoke-RestMethod` instead of `curl`. Don't change the target framework or Maven
compiler level to fit an older machine.

### Create a working copy

From the repository root:

```bash
mkdir -p ~/copilot-labs/session-m2-07
cp -R sessions/session-m2-07-java-to-dotnet-modernization/lab/starter/. \
  ~/copilot-labs/session-m2-07/
cd ~/copilot-labs/session-m2-07
```

Complete the lab in the copied folder.

## Part 1: Run the Java baseline (15 minutes)

```bash
cd ~/copilot-labs/session-m2-07/legacy-java-order-service
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

Expected field values (JSON spacing may differ):

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

### Without `curl`

Use the VS Code REST Client, a browser for the two GET routes, or PowerShell:

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

**Checkpoint:** The Java tests pass and the service returns the expected pricing fields.

## Part 2: Extract behavior and architecture (15 minutes)

Optional: `cp architecture-notes-template.md migration-notes.md` and use it for
the tables below.

Read the Java files in this order:

1. `src/main/java/training/orders/App.java`
2. `src/main/java/training/orders/JsonCodec.java`
3. `src/main/java/training/orders/OrderRequest.java`
4. `src/main/java/training/orders/OrderPricingService.java`
5. `src/main/java/training/orders/PriceQuote.java`
6. `src/test/java/training/orders/ContractFixtureTest.java`

Ask Copilot to inspect only this request path:

```text
Trace POST /orders/price through this Java project. Return a table with the entry
point, JSON parsing, validation, pricing calculation, response mapping, and test
evidence. Cite file and symbol names. Do not propose .NET code and do not edit.
```

Check every row against the files before using it. If you keep notes, fill in
the request path and pricing-rule tables.

Record these behaviors:

- `STANDARD`, `SILVER`, and `GOLD` tier values;
- `SAVE10` coupon behavior;
- domestic and international shipping;
- the domestic free-shipping threshold;
- tax base and rate;
- integer round-half-up;
- invalid input behavior;
- overflow handling.

Java details such as `HttpHandler` classes, getters, the hand-written JSON codec,
and the package layout don't need to survive.

### Review point 1

Explain the route step by step. Say what each step does and which behavior a
replacement must preserve.

## Part 3: Review the shared contract (15 minutes)

Open `~/copilot-labs/session-m2-07/contracts/order-pricing-cases.jsonl`. Each line
is one complete case. Review the five names and expected fields.

```text
Compare OrderPricingService.java with contracts/order-pricing-cases.jsonl.
List the calculation order, rounding formula, shipping threshold, accepted values,
and behavior that is not covered by the fixtures. Do not edit files.
```

Check the answer by hand. Calculate the `round-half-up` case:

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

Note any behavior no successful fixture covers, such as an invalid tier, empty
items, or an unsupported coupon. Don't change the shared fixture yet.

### Review point 2

Before coding, you should be able to tell a partner:

- Why is the coupon based on `after tier`?
- Why does the free-shipping check use discounted merchandise?
- Why isn't tax calculated on shipping?
- Which formula produces round-half-up?

## Part 4: Implement the .NET pricing slice (35 minutes)

Open `~/copilot-labs/session-m2-07/modern-dotnet-order-service/`. The scaffold has
`OrderPricing.Api/Program.cs`, `Pricing.cs`, and `OrderPricing.Api.csproj`.
`Program.cs` already maps `GET /health` and `POST /orders/price`.

Implement only `PricingEngine.Price` and its private helpers.

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

Review the plan. Reject package additions and contract changes. After Copilot
edits the file, inspect it line by line:

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
cd ~/copilot-labs/session-m2-07/modern-dotnet-order-service/OrderPricing.Api
dotnet build
```

If the build fails, fix the specific compiler error. Don't weaken nullable checks
or change the target from `net10.0`. If the edit tool fails, type the
implementation from the accepted rules.

### Review point 3

Ask Copilot to review without editing:

```text
Review the Java and C# pricing implementations for behavior drift. Focus on
operation order, rounding, validation, overflow, shipping threshold, tax base,
and response fields. Return findings with file and symbol names. Do not edit.
```

Check each finding and fix the ones the contract supports. Note rejected
suggestions and why they didn't match it.

## Part 5: Add and run shared contract tests (20 minutes)

Create a package-free console test project:

```bash
cd ~/copilot-labs/session-m2-07/modern-dotnet-order-service
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

In `OrderPricing.ContractTests/Program.cs`, the test executable must:

1. read every non-empty JSONL line;
2. deserialize the request and expected quote with `System.Text.Json`;
3. call `PricingEngine.Price`;
4. compare all six response fields;
5. throw with the case name and field when a value differs;
6. print the number of passing cases.

```text
Implement this package-free .NET 10 console project as a contract test runner.
Read contracts/order-pricing-cases.jsonl from AppContext.BaseDirectory.
Deserialize each line, call PricingEngine.Price, compare every PriceQuote field,
and throw a clear exception with case name, field, expected, and actual.
Do not add a test framework or any package.
```

```bash
dotnet run --project OrderPricing.ContractTests
```

Expected:

```text
Contract fixture tests passed: 5
```

Re-run the Java test from the working copy:

```bash
cd ~/copilot-labs/session-m2-07/legacy-java-order-service
./mvnw test
```

Both should report five passing cases.

**Checkpoint:** The Java baseline and .NET replacement read the same fixture file
and agree on every response field.

## Part 6: Compare HTTP behavior (15 minutes)

Keep the Java service on port 8080. Start the .NET API on port 5080:

```bash
cd ~/copilot-labs/session-m2-07/modern-dotnet-order-service
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

Compare field values. JSON property order and whitespace may differ.

Send one invalid request:

```bash
curl -i -X POST http://localhost:5080/orders/price \
  -H 'Content-Type: application/json' \
  --data '{"customerTier":"PLATINUM","destination":"DOMESTIC","couponCode":"","items":[{"sku":"SKU-RED","quantity":1,"unitPriceCents":100}]}'
```

Expect an HTTP 400 response with a clear error.

**Optional next slices.** In `migration-notes.md`, list up to three slices to
migrate next, such as the sample-order query, health, or error responses. For
each, name the Java entry point and the check needed before the Java code goes
away. Everything you haven't traced stays in Java.

## Final deliverable

1. The completed .NET 10 `PricingEngine`.
2. A package-free .NET contract test executable.
3. Java and .NET output showing five shared cases passed.
4. One matching Java and .NET HTTP response, and one .NET HTTP 400 validation example.
5. Optional: `migration-notes.md` and a line on any Copilot suggestion you rejected.

## Troubleshooting

| Problem | Check |
| --- | --- |
| `Permission denied: ./mvnw` | Run `chmod +x mvnw`, then retry |
| Maven cannot download on first run | Check the network or use the trainer-prepared wrapper cache |
| Port 8080 is in use | Set `PORT=8081` for Java and update the request URL |
| .NET SDK cannot target `net10.0` | Use the Dev Container/Codespaces or install .NET 10 |
| Contract test cannot find JSONL | Check the `None Include` path and `CopyToOutputDirectory` |
| Total differs by one cent | Check operation order and round-half-up |
| Domestic shipping is unexpectedly free | Check the threshold after both discounts |
| ASP.NET Core chooses another port | Pass `--urls http://localhost:5080` |

## Solution reference

The reference implementation is in [`solution/`](solution/). Compare behavior and
test results before formatting.
