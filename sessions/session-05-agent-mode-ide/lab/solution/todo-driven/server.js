const express = require('express');
const app = express();

app.use(express.json());

const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = statusCode === 500 ? 'An unexpected error occurred' : err.message;

  res.status(statusCode).json({
    error: {
      code,
      message
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Todo-driven app running on port ${PORT}`);
});

module.exports = app;
