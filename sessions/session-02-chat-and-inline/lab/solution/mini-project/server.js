/**
 * Mini Project — Express.js Server (Solution)
 */

const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Mini Project API",
    version: "1.0.0",
    endpoints: ["/api/health", "/api/items", "/api/items/:id"],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
