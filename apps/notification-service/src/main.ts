import express from 'express';
import { initializeApp } from '@conecta360/utils';

const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());
initializeApp(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Notification Service is running' });
});

app.listen(port, () => {
  console.log(`Notification Service inicializado na porta ${port}`);
});
