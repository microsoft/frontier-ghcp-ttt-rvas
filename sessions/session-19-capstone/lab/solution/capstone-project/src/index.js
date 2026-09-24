const express = require('express');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/bookmarks', bookmarkRoutes);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Bookmark API running on port ${PORT}`);
  });
}

module.exports = app;
