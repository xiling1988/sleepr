//Repository for Jobs that extends the abstract repository from /libs/common/src/database/abstract.repository.ts
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, PrismaService } from '@app/common/database';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsRepository extends AbstractRepository<Job> {
    constructor(protected readonly prisma: PrismaService) {
      super(prisma);
    }
  protected readonly logger = new Logger(JobsRepository.name);
  protected get modelName(): string {
    return 'job';
  }

}