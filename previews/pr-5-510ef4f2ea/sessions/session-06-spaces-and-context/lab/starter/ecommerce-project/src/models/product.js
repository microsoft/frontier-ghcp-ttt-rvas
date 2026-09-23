const VALID_CATEGORIES = ['electronics', 'clothing', 'books', 'home', 'sports', 'toys'];
const VALID_STATUSES = ['active', 'inactive', 'discontinued'];

/**
 * Product data model.
 * All products must pass validation before being stored.
 */
class Product {
  constructor({ name, description, price, category, stock, status }) {
    this.id = null; // Set by the store
    this.name = name;
    this.description = description || '';
    this.price = parseFloat(price);
    this.category = category;
    this.stock = parseInt(stock) || 0;
    this.status = status || 'active';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static validate(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate || data.name !== undefined) {
      if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push('name is required and must be a non-empty string');
      } else if (data.name.length > 200) {
        errors.push('name must be 200 characters or fewer');
      }
    }

    if (!isUpdate || data.price !== undefined) {
      const price = parseFloat(data.price);
      if (isNaN(price) || price < 0) {
        errors.push('price must be a non-negative number');
      }
      if (price > 999999.99) {
        errors.push('price must be less than 1,000,000');
      }
    }

    if (data.category !== undefined && !VALID_CATEGORIES.includes(data.category)) {
      errors.push(`category must be one of: ${VALID_CATEGORIES.join(', ')}`);
    }

    if (data.stock !== undefined) {
      const stock = parseInt(data.stock);
      if (isNaN(stock) || stock < 0) {
        errors.push('stock must be a non-negative integer');
      }
    }

    if (data.status !== undefined && !VALID_STATUSES.includes(data.status)) {
      errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    return errors;
  }
}

export { Product, VALID_CATEGORIES, VALID_STATUSES };
