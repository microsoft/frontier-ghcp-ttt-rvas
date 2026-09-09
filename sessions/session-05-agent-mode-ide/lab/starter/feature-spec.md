# Feature Spec: Add Authentication to the API

## Overview

Add JWT authentication to the `auth-base` Express API. Its endpoints are public. Users must register, sign in, and send a JWT to access protected routes.

## Requirements

### New Endpoints

| Method   | Route                | Auth Required   | Description                               |
| -------- | -------------------- | --------------- | ----------------------------------------- |
| POST     | `/api/auth/register` | No              | Create a user with a username and password |
| POST     | `/api/auth/login`    | No              | Sign in and receive a JWT token            |

### Protect Existing Endpoints

All existing routes under `/api/items` must require a valid JWT token in the `Authorization: Bearer <token>` header.

### Auth Behavior

- **Registration:** Accept `username` (string, 3–30 chars) and `password` (string, min 8 chars). Hash the password before storing. Return 201 with user info (no password). Return 409 if username already exists.
- **Login:** Accept `username` and `password`. Verify credentials. Return 200 with a JWT token (expires in 1 hour). Return 401 if credentials are invalid.
- **Protected routes:** Check for `Authorization: Bearer <token>` header. Verify the token. Return 401 if missing or invalid. Attach decoded user info to `req.user`.

### Technical Constraints

- Use `jsonwebtoken` for JWT signing/verification
- Use `bcryptjs` for password hashing
- Store users in-memory (no database)
- JWT secret: read `JWT_SECRET` from the environment (default: `"dev-secret-change-me"`)
- Token expiration: one hour

### Files to Create/Modify

- `routes/auth.js` — new file for register/login routes
- `middleware/auth.js` — new file for JWT verification middleware
- `server.js` — register the authentication routes and middleware

### Do NOT Change

- The existing `/api/items` routes — keep their behavior identical
- The existing data model for items
