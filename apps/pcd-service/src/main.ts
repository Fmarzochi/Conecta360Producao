import express from 'express';
import { initializeApp } from '@conecta360/utils';

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
initializeApp(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PCD Service is running' });
});

app.listen(port, () => {
  console.log(`PCD Service inicializado na porta ${port}`);
});
