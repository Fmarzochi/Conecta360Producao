import express from 'express';
import { initializeApp } from '@conecta360/utils';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

initializeApp(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Auth Service is running' });
});

app.listen(port, () => {
  console.log(`Auth Service inicializado na porta ${port}`);
});
