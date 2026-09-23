const express = require('express');
const app = express();

app.use(express.json());

const itemsRouter = require('./routes/api');
app.use('/api/items', itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth-base API running on port ${PORT}`);
});

module.exports = app;
