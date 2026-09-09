/**
 * Todo API Server — Starter
 * ==========================
 * Minimal Express.js setup. The routes are in routes/todos.js.
 */

const express = require("express");
const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Mount todo routes
app.use("/todos", todoRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Todo API",
    endpoints: [
      "GET    /todos",
      "GET    /todos/:id",
      "POST   /todos",
      "PUT    /todos/:id",
      "DELETE /todos/:id",
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
