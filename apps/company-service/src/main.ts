import express from 'express';
import { initializeApp } from '@conecta360/utils';

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
initializeApp(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Company Service is running' });
});

app.listen(port, () => {
  console.log(`Company Service inicializado na porta ${port}`);
});
