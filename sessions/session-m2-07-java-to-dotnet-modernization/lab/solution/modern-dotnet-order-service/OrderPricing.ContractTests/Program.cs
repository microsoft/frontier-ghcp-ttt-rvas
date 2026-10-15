using System.Text.Json;
using OrderPricing.Api;

var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};
var fixturePath = Path.Combine(AppContext.BaseDirectory, "contracts", "order-pricing-cases.jsonl");
var pricing = new PricingEngine();
var caseCount = 0;

foreach (var line in File.ReadLines(fixturePath))
{
    if (string.IsNullOrWhiteSpace(line))
    {
        continue;
    }

    var contractCase = JsonSerializer.Deserialize<ContractCase>(line, options)
        ?? throw new InvalidOperationException("Fixture line could not be read.");
    var actual = pricing.Price(contractCase.Request);

    Equal(contractCase.Name, nameof(PriceQuote.SubtotalCents), contractCase.Expected.SubtotalCents, actual.SubtotalCents);
    Equal(contractCase.Name, nameof(PriceQuote.TierDiscountCents), contractCase.Expected.TierDiscountCents, actual.TierDiscountCents);
    Equal(contractCase.Name, nameof(PriceQuote.CouponDiscountCents), contractCase.Expected.CouponDiscountCents, actual.CouponDiscountCents);
    Equal(contractCase.Name, nameof(PriceQuote.ShippingCents), contractCase.Expected.ShippingCents, actual.ShippingCents);
    Equal(contractCase.Name, nameof(PriceQuote.TaxCents), contractCase.Expected.TaxCents, actual.TaxCents);
    Equal(contractCase.Name, nameof(PriceQuote.TotalCents), contractCase.Expected.TotalCents, actual.TotalCents);
    caseCount++;
}

Console.WriteLine($"Contract fixture tests passed: {caseCount}");

static void Equal(string caseName, string field, long expected, long actual)
{
    if (expected != actual)
    {
        throw new InvalidOperationException(
            $"{caseName} {field}: expected {expected} but was {actual}");
    }
}

internal sealed record ContractCase(
    string Name,
    OrderRequest Request,
    PriceQuote Expected);
