import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaModule } from '@app/common/database';
import { JobsRepository } from './jobs.repository';
import { LoggerModule } from '@app/common';



@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository],
  exports: [JobsRepository],
})
export class JobsModule {}
