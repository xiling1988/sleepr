import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@app/common/config';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [PrismaService],
    exports: [PrismaService],
})

export class PrismaModule {}
