import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Global()
@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            DATABASE_URL: Joi.string().required(),
    })})],
    providers: [PrismaService],
    exports: [PrismaService],
})

export class PrismaModule {}
