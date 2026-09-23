const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');

const bookmarks = new Bookmark();

// Validation helper
function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// GET /api/bookmarks — list all bookmarks (with optional filtering)
router.get('/', (req, res) => {
  const { tag, search } = req.query;
  const results = bookmarks.getAll({ tag, search });
  res.json({ data: results, count: results.length });
});

// GET /api/bookmarks/:id — get a single bookmark
router.get('/:id', (req, res) => {
  const bookmark = bookmarks.findById(req.params.id);
  if (!bookmark) {
    return res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'Bookmark not found' }
    });
  }
  res.json({ data: bookmark });
});

// POST /api/bookmarks — create a new bookmark
router.post('/', (req, res) => {
  const { url, title, description, tags } = req.body;

  // Validation
  const errors = [];
  if (!url) errors.push('url is required');
  if (url && !validateUrl(url)) errors.push('url must be a valid URL');
  if (!title) errors.push('title is required');
  if (title && title.length > 200) errors.push('title must be 200 characters or fewer');
  if (description && description.length > 1000) errors.push('description must be 1000 characters or fewer');
  if (tags && !Array.isArray(tags)) errors.push('tags must be an array');
  if (tags && tags.length > 10) errors.push('maximum 10 tags allowed');

  if (errors.length > 0) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: errors.join('; ') }
    });
  }

  // Check for duplicate URL
  if (bookmarks.findByUrl(url)) {
    return res.status(409).json({
      error: { code: 'CONFLICT', message: 'A bookmark with this URL already exists' }
    });
  }

  const bookmark = bookmarks.create({ url, title, description, tags });
  res.status(201).json({ data: bookmark });
});

// PATCH /api/bookmarks/:id — update a bookmark
router.patch('/:id', (req, res) => {
  const { url, title, description, tags } = req.body;

  // Validation
  const errors = [];
  if (url !== undefined && !validateUrl(url)) errors.push('url must be a valid URL');
  if (title !== undefined && title.length > 200) errors.push('title must be 200 characters or fewer');
  if (description !== undefined && description.length > 1000) errors.push('description must be 1000 characters or fewer');
  if (tags !== undefined && !Array.isArray(tags)) errors.push('tags must be an array');

  if (errors.length > 0) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: errors.join('; ') }
    });
  }

  const bookmark = bookmarks.update(req.params.id, { url, title, description, tags });
  if (!bookmark) {
    return res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'Bookmark not found' }
    });
  }

  res.json({ data: bookmark });
});

// DELETE /api/bookmarks/:id — delete a bookmark
router.delete('/:id', (req, res) => {
  const deleted = bookmarks.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'Bookmark not found' }
    });
  }
  res.status(204).send();
});

module.exports = router;
