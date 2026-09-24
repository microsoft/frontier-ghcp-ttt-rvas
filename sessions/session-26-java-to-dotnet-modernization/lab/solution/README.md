# Session 26 reference solution

The reference solution implements the .NET 10 vertical slice and runs a
package-free contract test executable against
`../starter/contracts/order-pricing-cases.jsonl`.

```bash
cd modern-dotnet-order-service
dotnet build
dotnet run --project OrderPricing.ContractTests
dotnet run --project OrderPricing.Api -- --urls http://localhost:5080
```

In another terminal:

```bash
curl http://localhost:5080/health
curl -X POST http://localhost:5080/orders/price \
  -H 'Content-Type: application/json' \
  --data '{"customerTier":"GOLD","destination":"DOMESTIC","couponCode":"SAVE10","items":[{"sku":"SKU-RED","quantity":2,"unitPriceCents":1299},{"sku":"SKU-BLUE","quantity":1,"unitPriceCents":2499}]}'
```

Stop the API with `Ctrl+C` when the check is complete.
