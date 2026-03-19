import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from '@conecta360/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const expressApp = app.getHttpAdapter().getInstance();
  initializeApp(expressApp);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Auth Service inicializado na porta ${port}`);
}
bootstrap();
