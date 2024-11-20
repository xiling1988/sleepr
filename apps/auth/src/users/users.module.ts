import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '@app/common';
import { LoggerModule } from '@app/common';

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
