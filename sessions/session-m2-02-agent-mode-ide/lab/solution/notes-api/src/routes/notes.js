const express = require('express');
const store = require('../store');
const { validateNote } = require('../validate');

const router = express.Router();

router.get('/', (req, res) => {
  const { q, tag } = req.query;
  let notes = store.list();
  if (q) {
    const needle = q.toLowerCase();
    notes = notes.filter(
      (n) => n.title.toLowerCase().includes(needle) || n.body.toLowerCase().includes(needle)
    );
  }
  if (tag) {
    notes = notes.filter((n) => n.tags.includes(tag));
  }
  res.json(notes);
});

router.get('/:id', (req, res) => {
  const note = store.get(Number(req.params.id));
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

router.post('/', (req, res) => {
  const errors = validateNote(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const { title, body, tags } = req.body;
  res.status(201).json(store.create({ title, body, tags }));
});

router.put('/:id', (req, res) => {
  const errors = validateNote(req.body, { partial: true });
  if (errors.length) return res.status(400).json({ errors });
  const { title, body, tags } = req.body;
  const changes = {};
  if (title !== undefined) changes.title = title;
  if (body !== undefined) changes.body = body;
  if (tags !== undefined) changes.tags = tags;
  const note = store.update(Number(req.params.id), changes);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

router.delete('/:id', (req, res) => {
  const note = store.remove(Number(req.params.id));
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// TODO: Add GET /export that returns all notes as CSV (columns: id,title,body,createdAt).
// Quote any field that contains a comma, a quote, or a newline.

module.exports = router;
