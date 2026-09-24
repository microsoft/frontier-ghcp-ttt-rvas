const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');

const bookmarks = new Bookmark();

function validateUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

router.post('/', (req, res) => {
  const { url, title, description, tags } = req.body || {};

  const errors = [];
  if (url === undefined || url === null || url === '') {
    errors.push('url is required');
  } else if (typeof url !== 'string' || !validateUrl(url)) {
    errors.push('url must be an absolute HTTP or HTTPS URL');
  }

  if (title === undefined || title === null || title === '') {
    errors.push('title is required');
  } else if (typeof title !== 'string') {
    errors.push('title must be a string');
  } else if (title.trim() === '') {
    errors.push('title is required');
  } else if (title.length > 200) {
    errors.push('title must be 200 characters or fewer');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string');
  } else if (description !== undefined && description.length > 1000) {
    errors.push('description must be 1000 characters or fewer');
  }

  if (tags !== undefined && !Array.isArray(tags)) {
    errors.push('tags must be an array');
  } else if (tags !== undefined && tags.length > 10) {
    errors.push('tags must contain at most 10 items');
  } else if (
    tags !== undefined
    && tags.some((tag) => typeof tag !== 'string' || tag.trim() === '')
  ) {
    errors.push('tags must contain non-empty strings');
  } else if (tags !== undefined && tags.some((tag) => tag.length > 50)) {
    errors.push('tags must be 50 characters or fewer');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: errors[0] }
    });
  }

  if (bookmarks.findByUrl(url)) {
    return res.status(409).json({
      error: { code: 'CONFLICT', message: 'A bookmark with this URL already exists' }
    });
  }

  const bookmark = bookmarks.create({ url, title, description, tags });
  res.status(201).json({ data: bookmark });
});

module.exports = router;
