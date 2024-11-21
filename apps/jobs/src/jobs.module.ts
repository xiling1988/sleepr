import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaModule } from '@app/common/database';
import { JobsRepository } from './jobs.repository';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';


@Module({
  imports: [PrismaModule, LoggerModule, ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      JOBS_PORT: Joi.number().required(),
      DATABASE_URL: Joi.string().required(),
      
    }),
  })],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository],
  exports: [JobsRepository],
})
export class JobsModule {}
