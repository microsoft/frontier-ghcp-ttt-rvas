const express = require('express');
const { createDecisionRouter } = require('./routes/decisions');

function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/health', (request, response) => {
    response.json({ status: 'ok' });
  });

  app.use('/api/decisions', createDecisionRouter());

  app.use((error, request, response, next) => {
    if (error.type === 'entity.parse.failed') {
      return response.status(400).json({
        error: {
          code: 'INVALID_JSON',
          message: 'Request body must contain valid JSON'
        }
      });
    }

    console.error(error);
    return response.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error'
      }
    });
  });

  return app;
}

const app = createApp();
const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Engineering Decision API listening on port ${port}`);
  });
}

module.exports = app;
module.exports.createApp = createApp;