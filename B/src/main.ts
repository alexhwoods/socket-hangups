import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.getHttpAdapter();

  const server = httpAdapter.getHttpServer() as Server;
  server.keepAliveTimeout = 1;

  console.log(JSON.stringify(server));
  await app.listen(4002);
}
bootstrap();
