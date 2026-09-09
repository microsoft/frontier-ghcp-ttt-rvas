const express = require('express');

const app = express();
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// TODO: Add bookmark routes here
// Hint: Create src/routes/bookmarks.js and require it

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Bookmark API running on port ${PORT}`);
  });
}

module.exports = app;
