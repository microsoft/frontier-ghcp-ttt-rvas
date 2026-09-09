/**
 * String Helper Functions — Solution
 * ===================================
 * Reference implementations for Exercise 2.
 */

/**
 * Capitalize the first letter of each word in a string.
 * @param {string} str - The input string
 * @returns {string} The string with each word capitalized
 * @example capitalize("hello world") => "Hello World"
 */
function capitalize(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Truncate a string to a maximum length, adding "..." if truncated.
 * If the string is shorter than maxLength, return it unchanged.
 * @param {string} str - The input string
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} The truncated string
 * @example truncate("Hello World", 5) => "Hello..."
 */
function truncate(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

/**
 * Convert a string to a URL-friendly slug.
 * @param {string} str - The input string
 * @returns {string} The slugified string
 * @example slugify("Hello World! Test") => "hello-world-test"
 */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Count the number of words in a string.
 * Words are separated by whitespace.
 * @param {string} str - The input string
 * @returns {number} The word count
 * @example countWords("Hello world foo bar") => 4
 */
function countWords(str) {
  if (!str || !str.trim()) {
    return 0;
  }
  return str.trim().split(/\s+/).length;
}

module.exports = { capitalize, truncate, slugify, countWords };
