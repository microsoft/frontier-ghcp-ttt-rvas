import express from 'express';
import productsRouter from './routes/products.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/products', productsRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Storefront Product API listening on port ${port}`);
  });
}

export default app;
