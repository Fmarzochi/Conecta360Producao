import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from '@conecta360/utils';
import { Reflector } from '@nestjs/core';
import { TenantInterceptor } from '@conecta360/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();
  initializeApp(expressApp);

  const port = process.env.PORT || 3005;
  await app.listen(port);
  console.log(`PCD Service inicializado na porta ${port}`);
}
bootstrap();
