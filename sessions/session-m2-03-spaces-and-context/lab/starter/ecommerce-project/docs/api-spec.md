# E-commerce API specification

## Base URL

```
http://localhost:3000/api
```

## Authentication

Authentication is not implemented. All endpoints are public.

## Error response format

All errors follow this structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description",
    "details": ["field-level errors (optional)"]
  }
}
```

### Error codes

| Code               | HTTP Status  | Meaning                        |
| ------------------ | ------------ | ------------------------------ |
| `VALIDATION_ERROR` | 400          | Request body failed validation |
| `NOT_FOUND`        | 404          | The resource does not exist    |
| `INTERNAL_ERROR`   | 500          | Unexpected server error        |

## Endpoints

### Products

#### List products

```
GET /api/products
```

**Query parameters:**

| Param      | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| `category` | string | Filter by category                                |
| `status`   | string | Filter by status (active, inactive, discontinued) |
| `minPrice` | number | Minimum price                                      |
| `maxPrice` | number | Maximum price                                      |
| `search`   | string | Search names and descriptions                     |

**Response (200):**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse",
      "price": 29.99,
      "category": "electronics",
      "stock": 150,
      "status": "active",
      "createdAt": "2026-04-16T10:00:00.000Z",
      "updatedAt": "2026-04-16T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### Get product

```
GET /api/products/:id
```

**Response (200):**

```json
{
  "data": { ... }
}
```

**Response (404):**

```json
{
  "error": { "code": "NOT_FOUND", "message": "Product not found" }
}
```

#### Create product

```
POST /api/products
Content-Type: application/json
```

**Request body:**

| Field         | Type    | Required   | Constraints                    |
| ------------- | ------- | ---------- | ------------------------------ |
| `name`        | string  | Yes        | 1 to 200 chars                    |
| `description` | string  | No         |                                |
| `price`       | number  | Yes        | 0 to 999999.99                    |
| `category`    | string  | No         | Must be valid category         |
| `stock`       | integer | No         | >= 0, default 0                |
| `status`      | string  | No         | active, inactive, discontinued |

**Valid categories:** electronics, clothing, books, home, sports, toys

**Response (201):** Created product
**Response (400):** Validation errors

#### Update product

```
PUT /api/products/:id
Content-Type: application/json
```

Partial updates are accepted. The endpoint updates only supplied fields.

**Response (200):** Updated product
**Response (404):** Product not found

#### Delete product

```
DELETE /api/products/:id
```

**Response (204):** No content
**Response (404):** Product not found

#### Low-stock report

```
GET /api/products/low-stock
```

Lists products that the warehouse team should reorder.

**Query parameters:**

| Param       | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| `threshold` | integer | Include products with `stock <= threshold`. Must be 0 or more. Default: 10 |

**Rules:**

- Only products with status `active` appear. Inactive and discontinued products never do.
- Sort by `stock`, lowest first. Break ties by `name`.
- A `threshold` that is not a whole number of 0 or more returns `400` with code `VALIDATION_ERROR`.

**Response (200):**

```json
{
  "data": [ { "id": 4, "name": "USB-C Cable", "stock": 8, "status": "active" } ],
  "total": 1,
  "threshold": 10
}
```
