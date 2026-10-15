# Deployment requirements

`copilot-webapp` is a Node.js Express API with staging and production environments.

| Environment | URL | Trigger | Approval |
| --- | --- | --- | --- |
| Staging | `https://staging.example.com` | Push to `main` after CI | Automatic |
| Production | `https://api.example.com` | Successful staging deployment | `deployers` team |

Use `NODE_ENV=staging` or `NODE_ENV=production`. Read `DATABASE_URL` and `API_KEY` from `STAGING_DATABASE_URL`, `STAGING_API_KEY`, `PROD_DATABASE_URL`, and `PROD_API_KEY` GitHub Secrets.

Build with `npm ci --production`, run `npm run build` when it exists, and package a tarball or zip. Each deployment uploads the artifact, applies migrations when present, restarts the application, calls `GET /health` and expects `{ "status": "ok" }`, waits 30 seconds, then checks health again.

Keep the previous three artifacts. If production health fails, redeploy the last known-good artifact and notify the team through a workflow annotation.

- Never log or echo secret values.
- Use GitHub Environments for environment-specific secrets.
- Pin production action versions to SHA hashes.
- Set `permissions: contents: read` at workflow level.
