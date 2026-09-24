# Session 26 starter

The starter contains three pieces:

- `legacy-java-order-service/` is the complete Java 8-compatible baseline.
- `contracts/order-pricing-cases.jsonl` is the shared behavior contract.
- `modern-dotnet-order-service/` is a partial .NET 10 scaffold.

Run the Java baseline first:

```bash
cd legacy-java-order-service
./mvnw test
./mvnw package
java -jar target/legacy-order-service-1.0.0.jar
```

In another terminal:

```bash
curl http://localhost:8080/health
curl http://localhost:8080/orders/samples
curl -X POST http://localhost:8080/orders/price \
  -H 'Content-Type: application/json' \
  --data '{"customerTier":"GOLD","destination":"DOMESTIC","couponCode":"SAVE10","items":[{"sku":"SKU-RED","quantity":2,"unitPriceCents":1299},{"sku":"SKU-BLUE","quantity":1,"unitPriceCents":2499}]}'
```

The .NET scaffold compiles only after you implement `PricingEngine.Price` in
`modern-dotnet-order-service/OrderPricing.Api/Pricing.cs`.
