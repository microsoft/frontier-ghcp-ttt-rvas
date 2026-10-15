const express = require('express');
const app = express();

app.use(express.json());

// BUG: No error handling for malformed JSON
// BUG: No centralized error handling
// BUG: Routes are registered inline instead of modular

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// Hardcoded port — should use environment variable
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
