package training.orders;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executors;

public final class App {
    private App() {
    }

    public static void main(String[] args) throws IOException {
        int port = Integer.parseInt(System.getenv().containsKey("PORT")
                ? System.getenv("PORT")
                : "8080");
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/health", new JsonHandler("GET", "{\"status\":\"ok\"}"));
        server.createContext("/orders/samples", new JsonHandler("GET", SyntheticOrderCatalog.asJson()));
        server.createContext("/orders/price", new PricingHandler(new OrderPricingService()));
        server.setExecutor(Executors.newFixedThreadPool(4));
        server.start();
        System.out.println("Legacy order service listening on http://localhost:" + port);
    }

    private static final class PricingHandler implements HttpHandler {
        private final OrderPricingService pricingService;

        private PricingHandler(OrderPricingService pricingService) {
            this.pricingService = pricingService;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"POST".equals(exchange.getRequestMethod())) {
                send(exchange, 405, JsonCodec.error("method not allowed"));
                return;
            }
            try {
                String body = readBody(exchange.getRequestBody());
                PriceQuote quote = pricingService.price(JsonCodec.readOrderRequest(body));
                send(exchange, 200, JsonCodec.writeQuote(quote));
            } catch (IllegalArgumentException exception) {
                send(exchange, 400, JsonCodec.error(exception.getMessage()));
            } catch (ArithmeticException exception) {
                send(exchange, 400, JsonCodec.error("order amount is too large"));
            }
        }
    }

    private static final class JsonHandler implements HttpHandler {
        private final String method;
        private final String body;

        private JsonHandler(String method, String body) {
            this.method = method;
            this.body = body;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!method.equals(exchange.getRequestMethod())) {
                send(exchange, 405, JsonCodec.error("method not allowed"));
                return;
            }
            send(exchange, 200, body);
        }
    }

    private static String readBody(InputStream input) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int read;
        while ((read = input.read(buffer)) != -1) {
            output.write(buffer, 0, read);
        }
        return new String(output.toByteArray(), StandardCharsets.UTF_8);
    }

    private static void send(HttpExchange exchange, int status, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.sendResponseHeaders(status, bytes.length);
        OutputStream response = exchange.getResponseBody();
        response.write(bytes);
        response.close();
    }
}
