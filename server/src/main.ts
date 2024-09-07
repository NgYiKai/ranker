import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketIOAdapter } from './socket-io-adapter';

async function bootstrap() {
  const logger = new Logger('Main (main.ts)');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const serverPort = parseInt(configService.get('SERVER_PORT'));
  const clientPort = parseInt(configService.get('CLIENT_PORT'));
  const clientURL = configService.get('CLIENT_URL');

  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      clientURL,
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
    ],
  });
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  await app.listen(serverPort);

  logger.log(`Server running on port ${serverPort}`);
}
bootstrap();
