const express = require('express');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Bookmark routes
app.use('/api/bookmarks', bookmarkRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Internal server error' }
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Bookmark API running on port ${PORT}`);
  });
}

module.exports = app;
