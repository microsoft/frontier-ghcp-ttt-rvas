/**
 * Todo API Server — Solution
 */

const express = require("express");
const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/todos", todoRoutes);

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
