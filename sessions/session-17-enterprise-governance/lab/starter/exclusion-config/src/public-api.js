// src/public-api.js
// This file represents a public-facing API — safe for Copilot to access

const express = require('express');
const router = express.Router();

// GET /api/products — list all products
router.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Widget Pro', price: 29.99, category: 'tools' },
    { id: 2, name: 'Gadget Plus', price: 49.99, category: 'electronics' },
    { id: 3, name: 'Thingamajig', price: 9.99, category: 'accessories' },
  ];
  res.json({ data: products });
});

// GET /api/products/:id — get a single product
router.get('/products/:id', (req, res) => {
  // TODO: implement product lookup
  res.status(501).json({ error: 'Not implemented' });
});

// POST /api/products — create a new product
router.post('/products', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  // TODO: implement product creation
  res.status(201).json({ data: { id: 4, name, price, category } });
});

module.exports = router;
