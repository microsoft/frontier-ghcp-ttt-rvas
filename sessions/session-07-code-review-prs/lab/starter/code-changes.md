# Code Changes to Make

## Instructions

Apply the changes below to `review-project` on a new `feature/add-user-management` branch. Each change intentionally introduces a review issue.

**Important:** Apply the changes exactly as written so reviewers can assess the intended defects.

---

### Change 1: Add User Route with SQL Injection Vulnerability

Add this code to `src/api.js` (after the items routes):

```javascript
// User search endpoint
app.get('/api/users/search', (req, res) => {
  const query = req.query.q;
  // WARNING: This is intentionally vulnerable — for lab purposes only
  const searchQuery = `SELECT * FROM users WHERE name LIKE '%${query}%'`;
  // Simulate: in a real app this would execute against a database
  res.json({ query: searchQuery, results: [] });
});
```

**Issue:** SQL injection — user input is interpolated directly into a query string.

---

### Change 2: Return Password in API Response

Add this user data and endpoint to `src/api.js`:

```javascript
const users = [
  { id: 1, username: 'admin', email: 'admin@test.com', password: 'hashed_pw_123', role: 'admin' },
  { id: 2, username: 'jane', email: 'jane@test.com', password: 'hashed_pw_456', role: 'user' }
];

app.get('/api/users', (req, res) => {
  // WARNING: Returns full user objects including passwords
  res.json(users);
});
```

**Issue:** Password field exposed in API response (even if hashed, it's sensitive data).

---

### Change 3: Off-by-One Error in Pagination

Modify the `paginate` function in `src/utils.js`:

```javascript
function paginate(items, page, pageSize) {
  const start = page * pageSize;  // BUG: should be (page - 1) * pageSize
  const end = start + pageSize;
  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize)
  };
}
```

**Issue:** When page=1, it skips the first `pageSize` items (starts at index `pageSize` instead of 0).

---

### Change 4: Missing Error Handling

Add this endpoint to `src/api.js`:

```javascript
app.post('/api/users', async (req, res) => {
  // WARNING: No try/catch — unhandled promise rejection
  const userData = JSON.parse(req.body.data);
  const user = { id: users.length + 1, ...userData };
  users.push(user);
  res.status(201).json(user);
});
```

**Issue:** No try/catch around JSON.parse. If `req.body.data` is not valid JSON (or not a string), the server crashes with an unhandled exception.

---

### Change 5: Hardcoded Secret

Add this near the top of `src/api.js`:

```javascript
const JWT_SECRET = 'my-super-secret-key-2026';
const API_KEY = 'sk-proj-abc123def456ghi789';
```

**Issue:** Secrets hardcoded in source code — should be in environment variables.

---

### Change 6: Duplicate Code

Add this endpoint to `src/api.js` (duplicates the items list logic):

```javascript
app.get('/api/products', (req, res) => {
  // This is nearly identical to GET /api/items — violates DRY
  const products = [
    { id: 1, name: 'Widget', price: 9.99 },
    { id: 2, name: 'Gadget', price: 24.99 },
    { id: 3, name: 'Doohickey', price: 4.99 }
  ];
  res.json(products);
});
```

**Issue:** Duplicated data and logic — the items array already exists.

---

## After Making Changes

1. Review the diff, then commit only the intended files: `git add src/api.js src/utils.js && git commit -m "Add user management feature"`
2. Push: `git push -u origin feature/add-user-management`
3. Open a PR: `gh pr create --title "Add user management" --body "Adds user endpoints"`
4. Request Copilot review from the PR page, if the approved workflow allows it.
