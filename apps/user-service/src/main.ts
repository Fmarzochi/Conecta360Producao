import express from 'express';
import { initializeApp } from '@conecta360/utils';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

initializeApp(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'User Service is running' });
});

app.listen(port, () => {
  console.log(`User Service inicializado na porta ${port}`);
});
