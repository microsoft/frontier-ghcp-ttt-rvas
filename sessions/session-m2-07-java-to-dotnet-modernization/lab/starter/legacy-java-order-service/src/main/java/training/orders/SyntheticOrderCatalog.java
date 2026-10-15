package training.orders;

public final class SyntheticOrderCatalog {
    private SyntheticOrderCatalog() {
    }

    public static String asJson() {
        return "["
                + "{\"id\":\"ORD-1001\",\"customerTier\":\"STANDARD\",\"destination\":\"DOMESTIC\","
                + "\"couponCode\":\"\",\"items\":[{\"sku\":\"SKU-RED\",\"quantity\":2,\"unitPriceCents\":1299}]},"
                + "{\"id\":\"ORD-1002\",\"customerTier\":\"GOLD\",\"destination\":\"DOMESTIC\","
                + "\"couponCode\":\"SAVE10\",\"items\":[{\"sku\":\"SKU-RED\",\"quantity\":2,"
                + "\"unitPriceCents\":1299},{\"sku\":\"SKU-BLUE\",\"quantity\":1,\"unitPriceCents\":2499}]}"
                + "]";
    }
}
