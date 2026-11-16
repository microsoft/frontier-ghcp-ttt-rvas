// All money is in integer cents.
const discountCodes = { SAVE10: 10, SAVE25: 25 };

function discountedUnitPrice(unitCents, code) {
  const percent = discountCodes[code] || 0;
  return Math.round((unitCents * (100 - percent)) / 100);
}

function orderTotal(items, code) {
  return items.reduce(
    (total, item) => total + discountedUnitPrice(item.unitCents, code) * item.quantity,
    0
  );
}

function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

module.exports = { orderTotal, formatCents };
