# Acme E-Commerce API

An Express.js REST API for an e-commerce product catalog with a modular architecture.

## Access and cost preflight

Use Enterprise Cloud as the governance baseline. Verify current official GitHub documentation and the customer administrator policy before a live exercise. For metered work, use a customer-defined stop guard.

## No-access fallback

Run the repository locally. Complete the API exercise and review manually.

## Quick Start

```bash
npm install
npm start
```

The server runs at `http://localhost:3000`.

## Project Structure

```
ecommerce-project/
├── src/
│   ├── models/       # Data models and validation
│   ├── routes/       # API route handlers
│   └── middleware/    # Express middleware
├── docs/
│   ├── api-spec.md   # API specification
│   └── architecture.md # Architecture decisions
└── package.json
```

## API Endpoints

| Method   | Route               | Description                            |
| -------- | ------------------- | -------------------------------------- |
| GET      | `/api/products`     | List all products (supports filtering) |
| GET      | `/api/products/:id` | Get product by ID                      |
| POST     | `/api/products`     | Create a new product                   |
| PUT      | `/api/products/:id` | Update a product                       |
| DELETE   | `/api/products/:id` | Delete a product                       |

## Coding Standards

- Use ES module imports.
- Use `async`/`await`.
- Structured error responses
- Input validation on all endpoints
