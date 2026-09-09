# Database MCP Server — Solution Notes

## Access and cost preflight

The database contains synthetic data. Before connecting a client, the customer administrator must approve local MCP use and the client configuration. Set a customer-defined metered-work stop guard. Check current official GitHub documentation and customer policy for access and metering details.

If MCP is unavailable, run the listed queries locally with SQLite and compare them with this schema.

## Expected schema

| Table | Columns | Records |
| --- | --- | --- |
| `customers` | id, name, email, city, joined_date | 8 |
| `products` | id, name, category, price, stock, description | 15 |
| `orders` | id, customer_id, order_date, total_amount, status | 8 |
| `order_items` | id, order_id, product_id, quantity, unit_price | 12 |

```sql
SELECT name, category, price FROM products ORDER BY price DESC LIMIT 5;

SELECT category, COUNT(*) as count, AVG(price) as avg_price
FROM products GROUP BY category ORDER BY count DESC;

SELECT o.id, c.name, o.order_date, o.total_amount, o.status
FROM orders o JOIN customers c ON o.customer_id = c.id
ORDER BY o.order_date DESC;

SELECT status, COUNT(*) as order_count, SUM(total_amount) as total_revenue
FROM orders GROUP BY status;

SELECT DISTINCT c.name, c.city, COUNT(o.id) as order_count
FROM customers c JOIN orders o ON c.id = o.customer_id
GROUP BY c.id ORDER BY order_count DESC;
```

Orders #3 and #7 intentionally have `total_amount` values that differ from their `order_items` totals. You should report that discrepancy.
