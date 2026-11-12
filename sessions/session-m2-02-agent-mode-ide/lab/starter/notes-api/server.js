const express = require('express');
const notesRouter = require('./src/routes/notes');

const app = express();
app.use(express.json());
app.use('/api/notes', notesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`notes-api listening on ${port}`));
}

module.exports = app;
