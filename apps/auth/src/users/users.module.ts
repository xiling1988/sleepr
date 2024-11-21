import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '@app/common';
import { LoggerModule } from '@app/common';
import { UserRepository } from './users.repository';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
