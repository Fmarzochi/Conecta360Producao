import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from '@conecta360/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // O initializeApp já carrega o .env usando a lógica local-primeiro
  // Mas no NestJS, poderíamos inicializar o config antes do bootstrap.
  // Por enquanto, mantemos a compatibilidade.
  const expressApp = app.getHttpAdapter().getInstance();
  initializeApp(expressApp);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API Gateway inicializado na porta ${port}`);
}
bootstrap();
