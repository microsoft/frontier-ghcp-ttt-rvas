/**
 * seed-data.js — Populates the database with sample data.
 * Run: node seed-data.js (after setup-db.js)
 */

const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'data', 'app.db'));

// Clear existing data
db.exec('DELETE FROM order_items');
db.exec('DELETE FROM orders');
db.exec('DELETE FROM products');
db.exec('DELETE FROM customers');

// Seed customers
const insertCustomer = db.prepare(
  'INSERT INTO customers (name, email, city, joined_date) VALUES (?, ?, ?, ?)'
);

const customers = [
  ['Alice Johnson', 'alice@example.com', 'New York', '2024-01-15'],
  ['Bob Smith', 'bob@example.com', 'London', '2024-02-20'],
  ['Carol Williams', 'carol@example.com', 'Tokyo', '2024-03-10'],
  ['David Brown', 'david@example.com', 'Berlin', '2024-04-05'],
  ['Eve Davis', 'eve@example.com', 'Paris', '2024-05-12'],
  ['Frank Miller', 'frank@example.com', 'Sydney', '2024-06-01'],
  ['Grace Lee', 'grace@example.com', 'Toronto', '2024-07-18'],
  ['Henry Wilson', 'henry@example.com', 'Singapore', '2024-08-25']
];

for (const c of customers) {
  insertCustomer.run(...c);
}
console.log(`✅ Inserted ${customers.length} customers`);

// Seed products
const insertProduct = db.prepare(
  'INSERT INTO products (name, category, price, stock, description) VALUES (?, ?, ?, ?, ?)'
);

const products = [
  ['Wireless Mouse', 'Electronics', 29.99, 150, 'Ergonomic wireless mouse with USB receiver'],
  ['Mechanical Keyboard', 'Electronics', 89.99, 75, 'Cherry MX Blue switches, RGB backlight'],
  ['USB-C Hub', 'Electronics', 49.99, 200, '7-in-1 hub with HDMI, USB-A, SD card reader'],
  ['Standing Desk', 'Furniture', 499.99, 30, 'Electric height-adjustable standing desk'],
  ['Monitor Arm', 'Furniture', 129.99, 60, 'Dual monitor arm, fits 13-32 inch screens'],
  ['Hiking Boots', 'Outdoor', 159.99, 45, 'Waterproof leather hiking boots'],
  ['Camping Tent', 'Outdoor', 249.99, 20, '3-person tent, 4-season rated'],
  ['Trail Backpack', 'Outdoor', 89.99, 80, '45L backpack with rain cover'],
  ['Running Shoes', 'Sports', 119.99, 100, 'Lightweight running shoes with carbon plate'],
  ['Yoga Mat', 'Sports', 39.99, 200, 'Non-slip TPE yoga mat, 6mm thick'],
  ['Python Cookbook', 'Books', 44.99, 50, 'Comprehensive Python programming recipes'],
  ['Clean Code', 'Books', 39.99, 65, 'A Handbook of Agile Software Craftsmanship'],
  ['Desk Lamp', 'Furniture', 69.99, 90, 'LED desk lamp with adjustable color temperature'],
  ['Water Bottle', 'Outdoor', 24.99, 300, 'Insulated stainless steel, 32oz'],
  ['Noise-Canceling Headphones', 'Electronics', 299.99, 40, 'ANC headphones with 30hr battery']
];

for (const p of products) {
  insertProduct.run(...p);
}
console.log(`✅ Inserted ${products.length} products`);

// Seed orders
const insertOrder = db.prepare(
  'INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES (?, ?, ?, ?)'
);

const insertOrderItem = db.prepare(
  'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)'
);

const orders = [
  { customerId: 1, date: '2024-09-01', total: 119.98, status: 'delivered', items: [[1, 1, 29.99], [2, 1, 89.99]] },
  { customerId: 2, date: '2024-09-05', total: 499.99, status: 'delivered', items: [[4, 1, 499.99]] },
  { customerId: 3, date: '2024-09-10', total: 339.98, status: 'shipped', items: [[6, 1, 159.99], [7, 1, 249.99]] },  // total should be 409.98 — intentional for teaching
  { customerId: 1, date: '2024-09-15', total: 299.99, status: 'shipped', items: [[15, 1, 299.99]] },
  { customerId: 4, date: '2024-09-20', total: 84.98, status: 'pending', items: [[11, 1, 44.99], [10, 1, 39.99]] },
  { customerId: 5, date: '2024-09-25', total: 159.99, status: 'delivered', items: [[9, 1, 119.99], [10, 1, 39.99]] },
  { customerId: 6, date: '2024-10-01', total: 629.98, status: 'pending', items: [[4, 1, 499.99], [13, 1, 69.99], [5, 1, 129.99]] },  // total should be 699.97
  { customerId: 7, date: '2024-10-05', total: 89.99, status: 'delivered', items: [[8, 1, 89.99]] }
];

for (const order of orders) {
  const result = insertOrder.run(order.customerId, order.date, order.total, order.status);
  const orderId = result.lastInsertRowid;
  for (const [productId, qty, price] of order.items) {
    insertOrderItem.run(orderId, productId, qty, price);
  }
}
console.log(`✅ Inserted ${orders.length} orders with items`);

db.close();
console.log('\n🎉 Database seeded successfully!');
console.log('   Run queries with: npm run query -- "SELECT * FROM products LIMIT 5"');
