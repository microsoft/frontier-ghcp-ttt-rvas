# Capstone Starter: Bookmark Creation

This starter exposes a health check. The issue adds only `POST /api/bookmarks`.

## Install

```bash
npm install
```

## Establish the baseline

The health check passes before implementation:

```bash
npm test -- --runTestsByPath tests/health.test.js
```

The full suite starts red because the Bookmark route is missing:

```bash
npm test
```

Implement the accepted specification without adding a dependency or endpoint.
The full suite is the completion check.
