package training.orders;

public final class OrderPricingService {
    private static final long DOMESTIC_SHIPPING_CENTS = 795;
    private static final long INTERNATIONAL_SHIPPING_CENTS = 1995;
    private static final long FREE_DOMESTIC_SHIPPING_THRESHOLD_CENTS = 5000;
    private static final long TAX_BASIS_POINTS = 825;

    public PriceQuote price(OrderRequest request) {
        validate(request);

        long subtotal = 0;
        for (OrderRequest.OrderItem item : request.getItems()) {
            subtotal = Math.addExact(
                    subtotal,
                    Math.multiplyExact((long) item.getQuantity(), item.getUnitPriceCents()));
        }

        long tierDiscount = percentage(subtotal, tierBasisPoints(request.getCustomerTier()));
        long afterTier = subtotal - tierDiscount;
        long couponDiscount = "SAVE10".equals(request.getCouponCode())
                ? percentage(afterTier, 1000)
                : 0;
        long discountedMerchandise = afterTier - couponDiscount;
        long shipping = shipping(request.getDestination(), discountedMerchandise);
        long tax = percentage(discountedMerchandise, TAX_BASIS_POINTS);
        long total = Math.addExact(Math.addExact(discountedMerchandise, shipping), tax);

        return new PriceQuote(
                subtotal,
                tierDiscount,
                couponDiscount,
                shipping,
                tax,
                total);
    }

    private static long percentage(long cents, long basisPoints) {
        return Math.addExact(Math.multiplyExact(cents, basisPoints), 5000) / 10000;
    }

    private static long tierBasisPoints(String customerTier) {
        if ("STANDARD".equals(customerTier)) {
            return 0;
        }
        if ("SILVER".equals(customerTier)) {
            return 500;
        }
        if ("GOLD".equals(customerTier)) {
            return 1000;
        }
        throw new IllegalArgumentException("customerTier must be STANDARD, SILVER, or GOLD");
    }

    private static long shipping(String destination, long discountedMerchandise) {
        if ("DOMESTIC".equals(destination)) {
            return discountedMerchandise >= FREE_DOMESTIC_SHIPPING_THRESHOLD_CENTS
                    ? 0
                    : DOMESTIC_SHIPPING_CENTS;
        }
        if ("INTERNATIONAL".equals(destination)) {
            return INTERNATIONAL_SHIPPING_CENTS;
        }
        throw new IllegalArgumentException("destination must be DOMESTIC or INTERNATIONAL");
    }

    private static void validate(OrderRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("request is required");
        }
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("at least one item is required");
        }
        if (!request.getCouponCode().isEmpty() && !"SAVE10".equals(request.getCouponCode())) {
            throw new IllegalArgumentException("couponCode must be empty or SAVE10");
        }
        for (OrderRequest.OrderItem item : request.getItems()) {
            if (item.getSku() == null || item.getSku().trim().isEmpty()) {
                throw new IllegalArgumentException("item sku is required");
            }
            if (item.getQuantity() <= 0) {
                throw new IllegalArgumentException("item quantity must be positive");
            }
            if (item.getUnitPriceCents() < 0) {
                throw new IllegalArgumentException("item unitPriceCents cannot be negative");
            }
        }
    }
}
