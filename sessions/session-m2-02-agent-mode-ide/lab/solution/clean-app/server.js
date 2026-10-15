const express = require('express');
const app = express();

app.use(express.json());

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// FIX: Centralized error handling — catches all unhandled errors
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Clean app running on port ${PORT}`);
});

module.exports = app;
