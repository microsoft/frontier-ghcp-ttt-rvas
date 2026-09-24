package training.orders;

import java.util.Collections;
import java.util.List;

public final class OrderRequest {
    private final String customerTier;
    private final String destination;
    private final String couponCode;
    private final List<OrderItem> items;

    public OrderRequest(String customerTier, String destination, String couponCode, List<OrderItem> items) {
        this.customerTier = customerTier;
        this.destination = destination;
        this.couponCode = couponCode == null ? "" : couponCode;
        this.items = Collections.unmodifiableList(items);
    }

    public String getCustomerTier() {
        return customerTier;
    }

    public String getDestination() {
        return destination;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public static final class OrderItem {
        private final String sku;
        private final int quantity;
        private final long unitPriceCents;

        public OrderItem(String sku, int quantity, long unitPriceCents) {
            this.sku = sku;
            this.quantity = quantity;
            this.unitPriceCents = unitPriceCents;
        }

        public String getSku() {
            return sku;
        }

        public int getQuantity() {
            return quantity;
        }

        public long getUnitPriceCents() {
            return unitPriceCents;
        }
    }
}
