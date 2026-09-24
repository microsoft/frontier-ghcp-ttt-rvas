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
    private const long DomesticShippingCents = 795;
    private const long InternationalShippingCents = 1995;
    private const long FreeDomesticShippingThresholdCents = 5000;
    private const long TaxBasisPoints = 825;

    public PriceQuote Price(OrderRequest request)
    {
        Validate(request);

        var subtotal = request.Items.Aggregate(
            0L,
            (current, item) => checked(current + checked(item.Quantity * item.UnitPriceCents)));
        var tierDiscount = Percentage(subtotal, TierBasisPoints(request.CustomerTier));
        var afterTier = subtotal - tierDiscount;
        var couponDiscount = request.CouponCode == "SAVE10"
            ? Percentage(afterTier, 1000)
            : 0;
        var discountedMerchandise = afterTier - couponDiscount;
        var shipping = Shipping(request.Destination, discountedMerchandise);
        var tax = Percentage(discountedMerchandise, TaxBasisPoints);
        var total = checked(discountedMerchandise + shipping + tax);

        return new PriceQuote(
            subtotal,
            tierDiscount,
            couponDiscount,
            shipping,
            tax,
            total);
    }

    private static long Percentage(long cents, long basisPoints) =>
        checked(cents * basisPoints + 5000) / 10000;

    private static long TierBasisPoints(string customerTier) => customerTier switch
    {
        "STANDARD" => 0,
        "SILVER" => 500,
        "GOLD" => 1000,
        _ => throw new ArgumentException("customerTier must be STANDARD, SILVER, or GOLD")
    };

    private static long Shipping(string destination, long discountedMerchandise) =>
        destination switch
        {
            "DOMESTIC" when discountedMerchandise >= FreeDomesticShippingThresholdCents => 0,
            "DOMESTIC" => DomesticShippingCents,
            "INTERNATIONAL" => InternationalShippingCents,
            _ => throw new ArgumentException("destination must be DOMESTIC or INTERNATIONAL")
        };

    private static void Validate(OrderRequest request)
    {
        ArgumentNullException.ThrowIfNull(request);

        if (request.Items is null || request.Items.Count == 0)
        {
            throw new ArgumentException("at least one item is required");
        }

        var coupon = request.CouponCode ?? string.Empty;
        if (coupon is not ("" or "SAVE10"))
        {
            throw new ArgumentException("couponCode must be empty or SAVE10");
        }

        foreach (var item in request.Items)
        {
            if (string.IsNullOrWhiteSpace(item.Sku))
            {
                throw new ArgumentException("item sku is required");
            }

            if (item.Quantity <= 0)
            {
                throw new ArgumentException("item quantity must be positive");
            }

            if (item.UnitPriceCents < 0)
            {
                throw new ArgumentException("item unitPriceCents cannot be negative");
            }
        }
    }
}
