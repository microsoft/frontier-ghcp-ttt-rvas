/**
 * Order Service — processes and manages customer orders.
 * This module has NO tests — that's the lab exercise.
 */

// In-memory order store
const orders = new Map();
let nextOrderId = 1;

// Discount tiers
const DISCOUNT_TIERS = {
  bronze: 0.05,   // 5% off
  silver: 0.10,   // 10% off
  gold: 0.15,     // 15% off
  platinum: 0.20  // 20% off
};

/**
 * Create a new order.
 * @param {number} userId - ID of the ordering user
 * @param {object[]} items - Array of { productName, quantity, unitPrice }
 * @returns {object} The created order with calculated total
 * @throws {Error} If userId is invalid or items are malformed
 */
function createOrder(userId, items) {
  if (!userId || typeof userId !== 'number' || userId <= 0) {
    throw new Error('Valid userId is required');
  }
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('At least one item is required');
  }

  for (const item of items) {
    if (!item.productName || typeof item.productName !== 'string') {
      throw new Error('Each item must have a productName');
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
      throw new Error(`Invalid quantity for ${item.productName}`);
    }
    if (item.unitPrice === undefined || typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
      throw new Error(`Invalid unitPrice for ${item.productName}`);
    }
  }

  const subtotal = calculateSubtotal(items);
  const order = {
    id: nextOrderId++,
    userId,
    items: items.map(i => ({ ...i })),
    subtotal,
    discount: 0,
    total: subtotal,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.set(order.id, order);
  return { ...order };
}

/**
 * Calculate the subtotal for a list of items.
 * @param {object[]} items - Array of { quantity, unitPrice }
 * @returns {number} Subtotal rounded to 2 decimal places
 */
function calculateSubtotal(items) {
  const subtotal = items.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);
  return Math.round(subtotal * 100) / 100;
}

/**
 * Apply a discount to an order.
 * @param {number} orderId - Order ID
 * @param {string} tier - Discount tier: 'bronze', 'silver', 'gold', or 'platinum'
 * @returns {object} Updated order with discount applied
 * @throws {Error} If order not found, invalid tier, or discount already applied
 */
function applyDiscount(orderId, tier) {
  const order = orders.get(orderId);
  if (!order) {
    throw new Error(`Order not found: ${orderId}`);
  }
  if (order.discount > 0) {
    throw new Error('Discount already applied to this order');
  }
  const rate = DISCOUNT_TIERS[tier];
  if (rate === undefined) {
    throw new Error(`Invalid discount tier: ${tier}. Valid tiers: ${Object.keys(DISCOUNT_TIERS).join(', ')}`);
  }

  order.discount = Math.round(order.subtotal * rate * 100) / 100;
  order.total = Math.round((order.subtotal - order.discount) * 100) / 100;
  return { ...order };
}

/**
 * Get an order by ID.
 * @param {number} orderId
 * @returns {object|null} The order or null
 */
function getOrder(orderId) {
  const order = orders.get(orderId);
  return order ? { ...order } : null;
}

/**
 * Get all orders for a user.
 * @param {number} userId
 * @returns {object[]} Array of orders
 */
function getOrdersByUser(userId) {
  const result = [];
  for (const order of orders.values()) {
    if (order.userId === userId) {
      result.push({ ...order });
    }
  }
  return result;
}

/**
 * Update order status.
 * @param {number} orderId
 * @param {string} status - 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
 * @returns {object} Updated order
 * @throws {Error} If order not found or invalid status transition
 */
function updateOrderStatus(orderId, status) {
  const order = orders.get(orderId);
  if (!order) {
    throw new Error(`Order not found: ${orderId}`);
  }
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }
  // Prevent backwards transitions (except cancel)
  const statusIndex = validStatuses.indexOf(status);
  const currentIndex = validStatuses.indexOf(order.status);
  if (status !== 'cancelled' && statusIndex <= currentIndex) {
    throw new Error(`Cannot transition from ${order.status} to ${status}`);
  }
  if (order.status === 'cancelled') {
    throw new Error('Cannot update a cancelled order');
  }
  if (order.status === 'delivered') {
    throw new Error('Cannot update a delivered order');
  }

  order.status = status;
  return { ...order };
}

/**
 * Calculate order statistics for a user.
 * @param {number} userId
 * @returns {object} { totalOrders, totalSpent, averageOrderValue }
 */
function getUserOrderStats(userId) {
  const userOrders = getOrdersByUser(userId);
  if (userOrders.length === 0) {
    return { totalOrders: 0, totalSpent: 0, averageOrderValue: 0 };
  }
  const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
  return {
    totalOrders: userOrders.length,
    totalSpent: Math.round(totalSpent * 100) / 100,
    averageOrderValue: Math.round((totalSpent / userOrders.length) * 100) / 100
  };
}

/**
 * Reset all orders (for testing).
 */
function resetOrders() {
  orders.clear();
  nextOrderId = 1;
}

module.exports = {
  createOrder,
  calculateSubtotal,
  applyDiscount,
  getOrder,
  getOrdersByUser,
  updateOrderStatus,
  getUserOrderStats,
  resetOrders,
  DISCOUNT_TIERS
};
