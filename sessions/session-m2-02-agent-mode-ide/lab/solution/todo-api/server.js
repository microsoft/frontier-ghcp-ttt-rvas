const express = require('express');
const app = express();

app.use(express.json());

const todosRouter = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');

app.use('/api/todos', todosRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Todo API running on port ${PORT}`);
  });
}

module.exports = app;
