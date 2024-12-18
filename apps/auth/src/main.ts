import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { options } from 'joi';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      //By defining the host as 0.0.0.0 we allow the service to be accessed from any IP address.
      // This allows any other service to connect to the auth service.
      host: '0.0.0.0',
      port: configService.get('TCP_AUTH_PORT'),
    }
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.startAllMicroservices();
  await app.listen(configService.get('HTTP_AUTH_PORT'));  
}
bootstrap();