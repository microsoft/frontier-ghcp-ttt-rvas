import { Router } from 'express';
import { Product } from '../models/product.js';

const router = Router();

// In-memory store
const products = [
  new Product({ name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, category: 'electronics', stock: 150 }),
  new Product({ name: 'Running Shoes', description: 'Lightweight trail shoes', price: 89.99, category: 'sports', stock: 75 }),
  new Product({ name: 'JavaScript Guide', description: 'Comprehensive JS reference', price: 39.99, category: 'books', stock: 200 }),
];
products.forEach((p, i) => p.id = i + 1);
let nextId = 4;

// GET /api/products — list with optional filters
router.get('/', async (req, res) => {
  try {
    let result = [...products];

    if (req.query.category) {
      result = result.filter(p => p.category === req.query.category);
    }
    if (req.query.status) {
      result = result.filter(p => p.status === req.query.status);
    }
    if (req.query.minPrice) {
      result = result.filter(p => p.price >= parseFloat(req.query.minPrice));
    }
    if (req.query.maxPrice) {
      result = result.filter(p => p.price <= parseFloat(req.query.maxPrice));
    }
    if (req.query.search) {
      const term = req.query.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    res.json({ data: result, total: result.length });
  } catch (err) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err.message } });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Product not found' } });
    }
    res.json({ data: product });
  } catch (err) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err.message } });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const errors = Product.validate(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: errors } });
    }

    const product = new Product(req.body);
    product.id = nextId++;
    products.push(product);
    res.status(201).json({ data: product });
  } catch (err) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err.message } });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Product not found' } });
    }

    const errors = Product.validate(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: errors } });
    }

    products[index] = { ...products[index], ...req.body, id: products[index].id, updatedAt: new Date().toISOString() };
    res.json({ data: products[index] });
  } catch (err) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err.message } });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Product not found' } });
    }
    products.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err.message } });
  }
});

export default router;
