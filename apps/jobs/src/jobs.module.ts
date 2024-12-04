import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaModule } from '@app/common/database';
import { JobsRepository } from './jobs.repository';
import { JwtAuthGuard, LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';


@Module({
  imports: [PrismaModule, LoggerModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './apps/jobs/.env',
    validationSchema: Joi.object({
      HTTP_JOBS_PORT: Joi.number().required(),
      TCP_AUTH_PORT: Joi.number().required(),
      AUTH_HOST: Joi.string().required(),
      DATABASE_URL: Joi.string().required(),
    }),

  }),
  ClientsModule.registerAsync([
    {
      name: AUTH_SERVICE,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: configService.get('AUTH_HOST'),
          port: configService.get('TCP_AUTH_PORT'),
        },
      }),
      inject: [ConfigService],
  }
  ]),
],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, JwtAuthGuard],
  exports: [JobsRepository],
})
export class JobsModule {}
