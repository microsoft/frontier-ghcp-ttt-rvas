package training.orders;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class JsonCodec {
    private static final Pattern ITEM_PATTERN = Pattern.compile(
            "\\{\\s*\"sku\"\\s*:\\s*\"([^\"]+)\"\\s*,\\s*"
                    + "\"quantity\"\\s*:\\s*(\\d+)\\s*,\\s*"
                    + "\"unitPriceCents\"\\s*:\\s*(\\d+)\\s*\\}");

    private JsonCodec() {
    }

    public static OrderRequest readOrderRequest(String json) {
        String tier = readString(json, "customerTier");
        String destination = readString(json, "destination");
        String coupon = readOptionalString(json, "couponCode");
        String itemsJson = readArray(json, "items");
        Matcher matcher = ITEM_PATTERN.matcher(itemsJson);
        List<OrderRequest.OrderItem> items = new ArrayList<OrderRequest.OrderItem>();
        while (matcher.find()) {
            items.add(new OrderRequest.OrderItem(
                    matcher.group(1),
                    Integer.parseInt(matcher.group(2)),
                    Long.parseLong(matcher.group(3))));
        }
        return new OrderRequest(tier, destination, coupon, items);
    }

    public static String writeQuote(PriceQuote quote) {
        return "{"
                + "\"subtotalCents\":" + quote.getSubtotalCents() + ","
                + "\"tierDiscountCents\":" + quote.getTierDiscountCents() + ","
                + "\"couponDiscountCents\":" + quote.getCouponDiscountCents() + ","
                + "\"shippingCents\":" + quote.getShippingCents() + ","
                + "\"taxCents\":" + quote.getTaxCents() + ","
                + "\"totalCents\":" + quote.getTotalCents()
                + "}";
    }

    public static String error(String message) {
        return "{\"error\":\"" + escape(message) + "\"}";
    }

    public static String readObject(String json, String key) {
        return readDelimited(json, key, '{', '}');
    }

    public static long readLong(String json, String key) {
        Matcher matcher = Pattern.compile(
                "\"" + Pattern.quote(key) + "\"\\s*:\\s*(-?\\d+)")
                .matcher(json);
        if (!matcher.find()) {
            throw new IllegalArgumentException("missing numeric field: " + key);
        }
        return Long.parseLong(matcher.group(1));
    }

    public static String readString(String json, String key) {
        String value = readOptionalString(json, key);
        if (value == null) {
            throw new IllegalArgumentException("missing string field: " + key);
        }
        return value;
    }

    private static String readOptionalString(String json, String key) {
        Matcher matcher = Pattern.compile(
                "\"" + Pattern.quote(key) + "\"\\s*:\\s*\"([^\"]*)\"")
                .matcher(json);
        return matcher.find() ? matcher.group(1) : "";
    }

    private static String readArray(String json, String key) {
        return readDelimited(json, key, '[', ']');
    }

    private static String readDelimited(String json, String key, char open, char close) {
        Matcher matcher = Pattern.compile("\"" + Pattern.quote(key) + "\"\\s*:\\s*\\Q" + open + "\\E")
                .matcher(json);
        if (!matcher.find()) {
            throw new IllegalArgumentException("missing field: " + key);
        }
        int start = matcher.end() - 1;
        int depth = 0;
        boolean inString = false;
        for (int index = start; index < json.length(); index++) {
            char current = json.charAt(index);
            if (current == '"' && (index == 0 || json.charAt(index - 1) != '\\')) {
                inString = !inString;
            }
            if (inString) {
                continue;
            }
            if (current == open) {
                depth++;
            } else if (current == close) {
                depth--;
                if (depth == 0) {
                    return json.substring(start, index + 1);
                }
            }
        }
        throw new IllegalArgumentException("unterminated field: " + key);
    }

    private static String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
