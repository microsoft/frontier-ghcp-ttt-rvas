const express = require('express');
const app = express();

app.use(express.json());

// In-memory task storage
let tasks = [];
let nextId = 1;

// GET /tasks - List all tasks
// BUG 1: Filter logic is inverted — returns tasks that DON'T match the status
app.get('/tasks', (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtered = tasks.filter(t => t.status !== status);
    return res.json(filtered);
  }
  res.json(tasks);
});

// GET /tasks/:id - Get a single task
// BUG 2: ID comparison uses strict equality with string vs number mismatch
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = {
    id: nextId++,
    title,
    description: description || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id - Update a task
// BUG 3: Spread operator order is wrong — req.body values get overwritten by old task values
app.put('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks[taskIndex] = { ...req.body, ...tasks[taskIndex] };
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deleted = tasks.splice(taskIndex, 1)[0];
  res.json(deleted);
});

// Reset tasks (for testing)
app.resetTasks = () => {
  tasks = [];
  nextId = 1;
};

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task API running on port ${PORT}`);
  });
}

module.exports = app;
