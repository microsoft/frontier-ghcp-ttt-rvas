package training.orders;

import java.io.BufferedReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public final class ContractFixtureTest {
    private ContractFixtureTest() {
    }

    public static void main(String[] args) throws Exception {
        Path fixture = Paths.get(System.getProperty("contract.fixture"));
        OrderPricingService service = new OrderPricingService();
        int cases = 0;

        try (BufferedReader reader = Files.newBufferedReader(fixture, StandardCharsets.UTF_8)) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) {
                    continue;
                }
                String name = JsonCodec.readString(line, "name");
                OrderRequest request = JsonCodec.readOrderRequest(JsonCodec.readObject(line, "request"));
                String expected = JsonCodec.readObject(line, "expected");
                PriceQuote actual = service.price(request);

                assertEquals(name, "subtotalCents", JsonCodec.readLong(expected, "subtotalCents"), actual.getSubtotalCents());
                assertEquals(name, "tierDiscountCents", JsonCodec.readLong(expected, "tierDiscountCents"), actual.getTierDiscountCents());
                assertEquals(name, "couponDiscountCents", JsonCodec.readLong(expected, "couponDiscountCents"), actual.getCouponDiscountCents());
                assertEquals(name, "shippingCents", JsonCodec.readLong(expected, "shippingCents"), actual.getShippingCents());
                assertEquals(name, "taxCents", JsonCodec.readLong(expected, "taxCents"), actual.getTaxCents());
                assertEquals(name, "totalCents", JsonCodec.readLong(expected, "totalCents"), actual.getTotalCents());
                cases++;
            }
        }

        System.out.println("Contract fixture tests passed: " + cases);
    }

    private static void assertEquals(String caseName, String field, long expected, long actual) {
        if (expected != actual) {
            throw new AssertionError(
                    caseName + " " + field + ": expected " + expected + " but was " + actual);
        }
    }
}
