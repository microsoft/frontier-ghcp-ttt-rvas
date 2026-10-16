# Storefront Product API

An Express.js REST API for an e-commerce product catalog with a modular architecture.

## Quick start

```bash
npm install
npm start
```

The server runs at `http://localhost:3000`.

## Project structure

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

## API endpoints

| Method   | Route               | Description                            |
| -------- | ------------------- | -------------------------------------- |
| GET      | `/api/products`     | List all products (supports filtering) |
| GET      | `/api/products/:id` | Get product by ID                      |
| POST     | `/api/products`     | Create a new product                   |
| PUT      | `/api/products/:id` | Update a product                       |
| DELETE   | `/api/products/:id` | Delete a product                       |

## Coding standards

- Use ES module imports.
- Use `async`/`await`.
- Return structured errors.
- Validate input on all endpoints.
