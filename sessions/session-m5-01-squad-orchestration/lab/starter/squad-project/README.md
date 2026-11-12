# Squad lab project

A small Express API with a users resource. You use it as the target for a Squad team in Session M5-01.

## Run it

```bash
npm install
npm test
npm start
```

The tests pass before the lab starts.

## Endpoints

- `GET /api/health`: health check
- `GET /api/users`: list users
- `POST /api/users`: create a user (`{ name, email }`)
- `DELETE /api/users/:id`: delete a user

All routes live in `src/routes/api.js`. The lab asks the team to extend that file twice, so you can see how Squad handles two jobs that touch the same code.
