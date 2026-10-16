# Code changes to make

## Instructions

Apply the changes below to `review-project` on a new `feature/add-user-management` branch. Each change intentionally introduces a review issue.

**Important:** Apply the changes exactly as written so reviewers can assess the intended defects.

---

### Change 1: Construct SQL from untrusted input

Add this code to `src/api.js` (after the items routes):

```javascript
// User search endpoint
app.get('/api/users/search', (req, res) => {
  const query = req.query.q;
  // WARNING: This is intentionally vulnerable. For lab purposes only
  const searchQuery = `SELECT * FROM users WHERE name LIKE '%${query}%'`;
  // Simulate: in a real app this would execute against a database
  res.json({ query: searchQuery, results: [] });
});
```

**Review issue:** Untrusted input is interpolated into SQL text and echoed in the
response. This lab has no database connection, so it does not demonstrate
exploitable SQL execution. Reviewers must distinguish that fact from the risk of
copying this construction into a database-backed route.

---

### Change 2: Return password in API response

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

### Change 3: Off-by-one error in pagination

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

### Change 4: Missing error handling

Add this endpoint to `src/api.js`:

```javascript
app.post('/api/users', async (req, res) => {
  // WARNING: No try/catch. Unhandled promise rejection
  const userData = JSON.parse(req.body.data);
  const user = { id: users.length + 1, ...userData };
  users.push(user);
  res.status(201).json(user);
});
```

**Issue:** No try/catch around JSON.parse. If `req.body.data` is not valid JSON (or not a string), the server crashes with an unhandled exception.

---

### Change 5: Hardcoded secret

Add this near the top of `src/api.js`:

```javascript
const JWT_SECRET = 'training-only-not-a-real-secret';
const API_KEY = 'training-only-not-a-real-api-key';
```

**Review issue:** These synthetic placeholders model hardcoded configuration.
They are not live credentials and are unused in this exercise. Do not claim an
actual credential leak or add real credentials. Discuss how real configuration
should be supplied only when that becomes part of the application.

---

### Change 6: Duplicate code

Add this endpoint to `src/api.js` (duplicates the items list logic):

```javascript
app.get('/api/products', (req, res) => {
  // This is nearly identical to GET /api/items. Violates DRY
  const products = [
    { id: 1, name: 'Widget', price: 9.99 },
    { id: 2, name: 'Gadget', price: 24.99 },
    { id: 3, name: 'Doohickey', price: 4.99 }
  ];
  res.json(products);
});
```

**Issue:** Data and logic are duplicated because the items array already exists.

---

## After making changes

1. Keep the patch uncommitted. Write your human review first.
2. Run `/review`, then `/security-review`, against the same local diff.
3. Triage both results in `fix-evaluation-template.md`. Record misses and rejected claims.
4. Follow the main lab's private training PR steps. Do not merge intentional defects.
