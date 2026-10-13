# Squad Lab Project

This small Node.js Express API supports the Squad orchestration lab.

The required issue adds bounded validation to `POST /api/users`. The starter has
the baseline route and tests. It does not contain the validation result.

## Access and cost preflight

Use Enterprise Cloud as the governance baseline. Before a live exercise, verify
current GitHub documentation and customer policy. Set a customer-owned stop guard
for metered work.

GitHub Copilot and Squad are required for the lab. If either is unavailable, stop
the lab.

## Start the project

```bash
npm install
npm start
```

## Endpoints

- `GET /api/health`: Health check
- `GET /api/users`: List all users
- `POST /api/users`: Create a user (body: `{ name, email }`)
- `DELETE /api/users/:id`: Delete a user

## Testing

```bash
npm test
```

The baseline tests should pass before Issue 001 begins.
