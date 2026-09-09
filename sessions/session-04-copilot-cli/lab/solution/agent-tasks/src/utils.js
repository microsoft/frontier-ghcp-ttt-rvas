/**
 * Utility functions for the task management API.
 * Refactored with input validation, JSDoc, and defensive coding.
 */

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string, or empty string for falsy input.
 * @throws {TypeError} If the argument is not a string.
 */
function capitalize(str) {
  if (str === undefined || str === null || str === '') return '';
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof str}`);
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to a URL-friendly slug.
 * Removes special characters, replaces spaces/underscores with hyphens,
 * and trims leading/trailing hyphens.
 * @param {string} text - The text to slugify.
 * @returns {string} The slugified string.
 * @throws {TypeError} If the argument is not a string.
 */
function slugify(text) {
  if (typeof text !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof text}`);
  }
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncates a string to a maximum length, adding "..." if truncated.
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length (must be >= 4 to allow for "...").
 * @returns {string} The truncated string.
 * @throws {TypeError} If str is not a string or maxLength is not a number.
 */
function truncate(str, maxLength) {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string for first argument, got ${typeof str}`);
  }
  if (typeof maxLength !== 'number' || !Number.isInteger(maxLength)) {
    throw new TypeError(`Expected an integer for maxLength, got ${typeof maxLength}`);
  }
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Parses a CSV string into an array of objects.
 * The first line is treated as headers, subsequent lines as data rows.
 * @param {string} csvString - The CSV content to parse.
 * @returns {Object[]} An array of objects keyed by header names.
 * @throws {TypeError} If the argument is not a string.
 */
function parseCSV(csvString) {
  if (typeof csvString !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof csvString}`);
  }
  const lines = csvString.trim().split('\n');
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }
  return rows;
}

module.exports = { capitalize, slugify, truncate, parseCSV };
