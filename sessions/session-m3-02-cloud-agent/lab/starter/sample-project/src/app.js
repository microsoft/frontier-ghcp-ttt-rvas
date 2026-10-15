const express = require('express');
const app = express();

app.use(express.json());

// In-memory task storage
let tasks = [];
let nextId = 1;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/tasks — List all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id — Get a single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id, 10));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// POST /api/tasks — Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, priority } = req.body;
  const task = {
    id: nextId++,
    title: title || 'Untitled',
    priority: priority || 'medium',
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  res.status(201).json(task);
});

// DELETE /api/tasks/:id — Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

// Reset tasks (for testing)
app.resetTasks = () => {
  tasks = [];
  nextId = 1;
};

// Start server only when run directly (not during tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Task API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
