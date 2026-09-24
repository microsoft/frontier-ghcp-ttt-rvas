namespace OrderPricing.Api;

public sealed record OrderItem(string Sku, int Quantity, long UnitPriceCents);

public sealed record OrderRequest(
    string CustomerTier,
    string Destination,
    string? CouponCode,
    IReadOnlyList<OrderItem> Items);

public sealed record PriceQuote(
    long SubtotalCents,
    long TierDiscountCents,
    long CouponDiscountCents,
    long ShippingCents,
    long TaxCents,
    long TotalCents);

public sealed class PricingEngine
{
    public PriceQuote Price(OrderRequest request)
    {
        throw new NotImplementedException("Migrate the Java pricing behavior and preserve the shared contract cases.");
    }
}
