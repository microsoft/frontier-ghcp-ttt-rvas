let currentId = 0;

function generateId() {
  return ++currentId;
}

function timestamp() {
  return new Date().toISOString();
}

module.exports = { generateId, timestamp };
