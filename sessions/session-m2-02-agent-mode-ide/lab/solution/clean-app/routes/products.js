// FIX: Same clean pattern as users — routes are thin
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../models/products');
const { validateRequired, validateStringLength, validatePositiveNumber } = require('../middleware/validate');

router.get('/', (req, res) => {
  const products = getAllProducts(req.query);
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = getProductById(parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

router.post('/',
  validateRequired(['name', 'price']),
  validateStringLength('name', 2, 100),
  validatePositiveNumber('price'),
  validatePositiveNumber('stock'),
  (req, res) => {
    const product = createProduct(req.body);
    res.status(201).json(product);
  }
);

router.put('/:id',
  validateStringLength('name', 2, 100),
  validatePositiveNumber('price'),
  validatePositiveNumber('stock'),
  (req, res) => {
    const product = updateProduct(parseInt(req.params.id), req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  }
);

router.delete('/:id', (req, res) => {
  const product = deleteProduct(parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.status(204).send();
});

module.exports = router;
