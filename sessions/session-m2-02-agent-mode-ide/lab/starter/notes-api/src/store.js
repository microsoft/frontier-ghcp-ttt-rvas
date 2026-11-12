// In-memory store. Data resets when the server restarts.
let notes = [];
let nextId = 1;

function list() {
  return notes;
}

function get(id) {
  return notes.find((n) => n.id === id);
}

function create({ title, body = '' }) {
  const now = new Date().toISOString();
  const note = { id: nextId++, title, body, createdAt: now, updatedAt: now };
  notes.push(note);
  return note;
}

function update(id, changes) {
  const note = get(id);
  if (!note) return undefined;
  Object.assign(note, changes, { updatedAt: new Date().toISOString() });
  return note;
}

function remove(id) {
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return undefined;
  return notes.splice(index, 1)[0];
}

function reset() {
  notes = [];
  nextId = 1;
}

module.exports = { list, get, create, update, remove, reset };
