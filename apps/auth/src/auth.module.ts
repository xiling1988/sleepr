import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule, PrismaModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersService } from './users/users.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PrismaModule ,UsersModule, LoggerModule, ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      AUTH_PORT: Joi.number().required(),
      DATABASE_URL: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION: Joi.string().required(),
    })}), JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { 
        expiresIn: `${configService.get('JWT_EXPIRATION')}s`
      },
    }),
    inject: [ConfigService],
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
