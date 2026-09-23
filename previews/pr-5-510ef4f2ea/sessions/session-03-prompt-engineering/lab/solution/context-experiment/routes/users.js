/**
 * User Routes — Solution
 * =======================
 * Complete CRUD with validation and auth middleware.
 */

const express = require("express");
const router = express.Router();
const { User, users, getNextId } = require("../models/user");
const { requireAuth } = require("../middleware/auth");

// GET / — List all users (public)
router.get("/", (req, res) => {
  res.json(users.map((u) => u.toJSON()));
});

// GET /:id — Get a user by ID (public)
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user.toJSON());
});

// POST / — Create a new user (requires auth)
router.post("/", requireAuth, (req, res) => {
  const { name, email, age } = req.body;
  const user = new User(name, email, age);
  
  const errors = user.validate();
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  user.id = getNextId();
  users.push(user);
  res.status(201).json(user.toJSON());
});

// PUT /:id — Update a user (requires auth)
router.put("/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, age } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (age !== undefined) user.age = age;

  res.json(user.toJSON());
});

// DELETE /:id — Delete a user (requires auth)
router.delete("/:id", requireAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
