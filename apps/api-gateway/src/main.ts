import express from 'express';
import { initializeApp } from '@conecta360/utils';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

initializeApp(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API Gateway is running' });
});

app.listen(port, () => {
  console.log(`API Gateway inicializado na porta ${port}`);
});
