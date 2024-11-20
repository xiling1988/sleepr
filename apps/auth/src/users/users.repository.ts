//Repository for Users that extends the abstract repository from /libs/common/src/database/abstract.repository.ts
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, PrismaService } from '@app/common/database';
import { User } from './model/user.model';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
    constructor(protected readonly prisma: PrismaService) {
      super(prisma);
    }
  protected readonly logger = new Logger(UserRepository.name);
  protected get modelName(): string {
    return 'user';
  }

}