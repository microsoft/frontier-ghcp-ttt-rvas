/**
 * Mini Project — Express.js Server
 * =================================
 * A small API server for the @workspace and @terminal lab exercise.
 *
 * This project has an intentional issue that prevents it from starting.
 * Use Copilot Chat with @terminal to diagnose and fix it.
 */

const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Mini Project API",
    version: "1.0.0",
    endpoints: ["/api/health", "/api/items", "/api/items/:id"],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
