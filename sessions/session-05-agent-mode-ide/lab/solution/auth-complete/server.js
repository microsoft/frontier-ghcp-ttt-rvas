const express = require('express');
const app = express();

app.use(express.json());

const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/api');
const { authenticateToken } = require('./middleware/auth');

// Public routes — no auth required
app.use('/api/auth', authRouter);

// Protected routes — JWT required
app.use('/api/items', authenticateToken, itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth-complete API running on port ${PORT}`);
});

module.exports = app;
