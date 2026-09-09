# E-Commerce API Specification

## Base URL

```
http://localhost:3000/api
```

## Authentication

Authentication is not implemented. All endpoints are public.

## Error Response Format

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

### Error Codes

| Code               | HTTP Status  | Meaning                        |
| ------------------ | ------------ | ------------------------------ |
| `VALIDATION_ERROR` | 400          | Request body failed validation |
| `NOT_FOUND`        | 404          | The resource does not exist    |
| `INTERNAL_ERROR`   | 500          | Unexpected server error        |

## Endpoints

### Products

#### List Products

```
GET /api/products
```

**Query Parameters:**

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

#### Get Product

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

#### Create Product

```
POST /api/products
Content-Type: application/json
```

**Request Body:**

| Field         | Type    | Required   | Constraints                    |
| ------------- | ------- | ---------- | ------------------------------ |
| `name`        | string  | Yes        | 1–200 chars                    |
| `description` | string  | No         |                                |
| `price`       | number  | Yes        | 0–999999.99                    |
| `category`    | string  | No         | Must be valid category         |
| `stock`       | integer | No         | >= 0, default 0                |
| `status`      | string  | No         | active, inactive, discontinued |

**Valid categories:** electronics, clothing, books, home, sports, toys

**Response (201):** Created product
**Response (400):** Validation errors

#### Update Product

```
PUT /api/products/:id
Content-Type: application/json
```

Partial updates are accepted. The endpoint updates only supplied fields.

**Response (200):** Updated product
**Response (404):** Product not found

#### Delete Product

```
DELETE /api/products/:id
```

**Response (204):** No content
**Response (404):** Product not found
