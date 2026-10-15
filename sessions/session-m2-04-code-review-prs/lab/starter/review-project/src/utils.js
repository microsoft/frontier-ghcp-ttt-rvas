/**
 * Utility functions for the review project.
 */

function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize)
  };
}

module.exports = { formatPrice, generateSlug, paginate };
