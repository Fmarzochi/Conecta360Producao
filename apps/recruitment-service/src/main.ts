import express from 'express';
import { initializeApp } from '@conecta360/utils';

const app = express();
const port = process.env.PORT || 3006;

app.use(express.json());
initializeApp(app);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Recruitment Service is running' });
});

app.listen(port, () => {
  console.log(`Recruitment Service inicializado na porta ${port}`);
});
