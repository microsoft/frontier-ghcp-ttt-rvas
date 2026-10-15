// FIX: Data access layer for products — mirrors users pattern
const db = require('../db');

function getAllProducts(filters = {}) {
  let products = [...db.products];
  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }
  if (filters.minPrice) {
    products = products.filter(p => p.price >= parseFloat(filters.minPrice));
  }
  if (filters.maxPrice) {
    products = products.filter(p => p.price <= parseFloat(filters.maxPrice));
  }
  return products;
}

function getProductById(id) {
  return db.products.find(p => p.id === id) || null;
}

function createProduct(data) {
  const product = {
    id: db.nextProductId++,
    name: data.name,
    price: data.price,
    stock: data.stock || 0,
    category: data.category || 'uncategorized'
  };
  db.products.push(product);
  return product;
}

function updateProduct(id, data) {
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) return null;
  db.products[index] = { ...db.products[index], ...data, id };
  return db.products[index];
}

function deleteProduct(id) {
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) return null;
  const deleted = db.products[index];
  db.products.splice(index, 1);
  return deleted;
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
