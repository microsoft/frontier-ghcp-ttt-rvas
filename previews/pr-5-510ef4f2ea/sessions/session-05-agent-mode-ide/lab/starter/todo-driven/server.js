const express = require('express');
const app = express();

app.use(express.json());

const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);

// TODO: Add centralized error handling middleware
// It should catch any errors thrown by route handlers and return a
// structured JSON response: { "error": { "code": "ERROR_TYPE", "message": "..." } }
// Use appropriate HTTP status codes (400 for validation, 404 for not found, 500 for server errors)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Todo-driven app running on port ${PORT}`);
});

module.exports = app;
