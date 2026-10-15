# Deployment Conventions

## When to use

Use for approved environment configuration, deployment changes, releases, or dependencies that affect deployment.

## Environment

Use `SCREAMING_SNAKE_CASE` names such as `DATABASE_URL`, `API_KEY`, and `PORT`. Document required values in `.env.example`; never hardcode secrets.

## Before deployment

- [ ] `npm test` passes.
- [ ] `npm run lint` has no errors.
- [ ] Target-environment variables and migrations are ready.
- [ ] No secret is in source.
- [ ] README, version, and changelog changes are reviewed.

## Rollback and monitoring

Redeploy the previous known-good version when a deployment fails. Check logs, health endpoint `/api/health`, key API responses, error rate, and response time. Record the failure and update the checklist when needed.

**Confidence:** medium
