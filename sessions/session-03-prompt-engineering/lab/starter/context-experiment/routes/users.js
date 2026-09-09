/**
 * User Routes — Context Experiment
 * ==================================
 * 
 * EXPERIMENT: Try generating these route handlers with and without
 * models/user.js open in a neighboring tab. Notice the difference!
 * 
 * Step 1: Open models/user.js in another tab, then let Copilot fill these in
 * Step 2: Close models/user.js, delete the generated code, and try again
 * Step 3: Compare the two versions
 */

const express = require("express");
const router = express.Router();

// TODO: Import the User model and data store from ../models/user.js
// (Let Copilot suggest this import — does it get the path right?)


// GET / — List all users
// Return the users array as JSON


// GET /:id — Get a user by ID
// Return 404 if not found


// POST / — Create a new user
// Validate using the User model's validate() method
// Return 400 with errors if validation fails
// Return 201 with the new user if valid


// PUT /:id — Update a user
// Only update fields that are provided in the request body
// Return 404 if user not found


// DELETE /:id — Delete a user
// Return 404 if user not found
// Return 204 on success


module.exports = router;
