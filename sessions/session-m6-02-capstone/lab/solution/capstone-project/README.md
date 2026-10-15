# Bookmark Creation Reference

This project implements only `POST /api/bookmarks`. It uses in-memory storage and
the dependencies supplied in `package.json`.

## Verify

```bash
npm install
npm test
```

The tests cover the health baseline, successful creation, field defaults,
validation, and duplicate URLs.

Authentication, persistence, every other Bookmark endpoint, deployment, and tool
configuration remain deferred.
