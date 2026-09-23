/**
 * String Helper Functions
 * =======================
 * Complete each function using GitHub Copilot's inline suggestions.
 * 
 * Instructions:
 * 1. Place your cursor inside the function body
 * 2. Start typing or press Enter to trigger Copilot
 * 3. Review the suggestion, then press Tab to accept
 * 4. Notice how Copilot adapts to JavaScript conventions
 */

/**
 * Capitalize the first letter of each word in a string.
 * @param {string} str - The input string
 * @returns {string} The string with each word capitalized
 * @example capitalize("hello world") => "Hello World"
 */
function capitalize(str) {
  // Let Copilot suggest the implementation here
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
  // Let Copilot suggest the implementation here
}

/**
 * Convert a string to a URL-friendly slug.
 * - Convert to lowercase
 * - Replace spaces with hyphens
 * - Remove non-alphanumeric characters (except hyphens)
 * - Remove consecutive hyphens
 * @param {string} str - The input string
 * @returns {string} The slugified string
 * @example slugify("Hello World! Test") => "hello-world-test"
 */
function slugify(str) {
  // Let Copilot suggest the implementation here
}

/**
 * Count the number of words in a string.
 * Words are separated by whitespace.
 * @param {string} str - The input string
 * @returns {number} The word count
 * @example countWords("Hello world foo bar") => 4
 */
function countWords(str) {
  // Let Copilot suggest the implementation here
}

module.exports = { capitalize, truncate, slugify, countWords };
