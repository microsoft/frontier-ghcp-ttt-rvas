const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (request, response) => {
  response.json({ status: 'ok' });
});

// Challenge: implement POST /api/decisions from challenge-brief.md.

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Engineering Decision API listening on port ${port}`);
  });
}

module.exports = app;