const express = require('express');
const router = express.Router();
const db = require('../db');

// CODE SMELL: Nearly identical structure to users.js — massive duplication
// CODE SMELL: Same validation patterns, same error handling issues

// GET all products
router.get('/', (req, res) => {
  let products = db.products;
  if (req.query.category) {
    products = products.filter(p => p.category === req.query.category);
  }
  if (req.query.minPrice) {
    products = products.filter(p => p.price >= parseFloat(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    products = products.filter(p => p.price <= parseFloat(req.query.maxPrice));
  }
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = db.products.find(p => p.id === id);
  if (!product) {
    // Yet another different error format
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(product);
});

// POST create product
router.post('/', (req, res) => {
  const { name, price, stock, category } = req.body;

  // Validation — duplicated pattern from users.js
  if (!name) {
    res.status(400).send('Product name is required');
    return;
  }
  if (name.length < 2 || name.length > 100) {
    res.status(400).send('Name must be 2-100 characters');
    return;
  }
  if (price === undefined || price === null) {
    res.status(400).send('Price is required');
    return;
  }
  if (typeof price !== 'number' || price < 0) {
    res.status(400).send('Price must be a positive number');
    return;
  }
  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    res.status(400).send('Stock must be a non-negative number');
    return;
  }

  const newProduct = {
    id: db.nextProductId++,
    name,
    price,
    stock: stock || 0,
    category: category || 'uncategorized'
  };

  db.products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = db.products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    res.status(404).send('Product not found');
    return;
  }

  // Repeated validation — same as POST
  const { name, price, stock } = req.body;
  if (name && (name.length < 2 || name.length > 100)) {
    res.status(400).send('Name must be 2-100 characters');
    return;
  }
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    res.status(400).send('Price must be a positive number');
    return;
  }

  db.products[productIndex] = { ...db.products[productIndex], ...req.body };
  res.json(db.products[productIndex]);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = db.products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    res.status(404).send('Not found');
    return;
  }
  db.products.splice(productIndex, 1);
  res.status(204).send();
});

module.exports = router;
