/**
 * Utility functions for the review project.
 *
 * THIS FILE SHOWS WHAT A MERGE CONFLICT LOOKS LIKE.
 * It is NOT runnable — it exists so trainers can show trainees
 * what conflict markers look like and walk through resolution.
 *
 * The conflict is between:
 *   Branch A (merged to main): added formatDate()
 *   Branch B (open PR):        improved formatPrice() with currency code support
 */

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

<<<<<<< HEAD (Branch A — already merged to main)
// Simple price formatter — no currency code support
function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

// New function added by Branch A
function formatDate(date, locale = 'en-US') {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

module.exports = { formatPrice, generateSlug, paginate, formatDate };
=======
// Improved price formatter with currency code support (Branch B)
function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(price);
}

module.exports = { formatPrice, generateSlug, paginate };
>>>>>>> feature/price-formatting (Branch B — open PR)

/*
 * RESOLUTION: Keep BOTH the improved formatPrice from Branch B
 * AND the new formatDate from Branch A. The correct merged version is:
 *
 *   function formatPrice(price, currency = 'USD') {
 *     return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
 *   }
 *
 *   function formatDate(date, locale = 'en-US') {
 *     return new Date(date).toLocaleDateString(locale, {
 *       year: 'numeric', month: 'short', day: 'numeric'
 *     });
 *   }
 *
 *   module.exports = { formatPrice, generateSlug, paginate, formatDate };
 *
 * This is what the Copilot cloud agent should propose.
 */
