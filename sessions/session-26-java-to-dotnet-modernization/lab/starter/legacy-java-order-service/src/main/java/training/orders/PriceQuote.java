package training.orders;

public final class PriceQuote {
    private final long subtotalCents;
    private final long tierDiscountCents;
    private final long couponDiscountCents;
    private final long shippingCents;
    private final long taxCents;
    private final long totalCents;

    public PriceQuote(
            long subtotalCents,
            long tierDiscountCents,
            long couponDiscountCents,
            long shippingCents,
            long taxCents,
            long totalCents) {
        this.subtotalCents = subtotalCents;
        this.tierDiscountCents = tierDiscountCents;
        this.couponDiscountCents = couponDiscountCents;
        this.shippingCents = shippingCents;
        this.taxCents = taxCents;
        this.totalCents = totalCents;
    }

    public long getSubtotalCents() {
        return subtotalCents;
    }

    public long getTierDiscountCents() {
        return tierDiscountCents;
    }

    public long getCouponDiscountCents() {
        return couponDiscountCents;
    }

    public long getShippingCents() {
        return shippingCents;
    }

    public long getTaxCents() {
        return taxCents;
    }

    public long getTotalCents() {
        return totalCents;
    }
}
