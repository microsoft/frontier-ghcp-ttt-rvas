# Squad Lab Project

A small Node.js Express API for the Squad orchestration lab.

## Access and cost preflight

Use Enterprise Cloud as the governance baseline. Verify current GitHub documentation and customer policy before a live exercise. For metered work, set a customer-owned stop guard.

## No-access fallback

Use the task brief and decision log to complete the API changes and review them manually.

## Start the project

```bash
npm install
npm start
```

## Endpoints

- `GET /api/health` — Health check
- `GET /api/users` — List all users
- `POST /api/users` — Create a user (body: `{ name, email }`)
- `DELETE /api/users/:id` — Delete a user

## Testing

```bash
npm test
```
