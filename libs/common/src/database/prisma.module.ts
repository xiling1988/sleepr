import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as Joi from 'joi';

@Global()
@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
            DATABASE_URL: Joi.string().required(),
    })})],
    providers: [PrismaService],
    exports: [PrismaService],
})

export class PrismaModule {}
