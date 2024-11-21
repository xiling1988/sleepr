import { NestFactory } from '@nestjs/core';
import { JobsModule } from './jobs.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(JobsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  await app.listen(configService.get('JOBS_PORT'));  
  
}
bootstrap();
