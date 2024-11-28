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
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [PrismaModule ,UsersModule, LoggerModule, ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      AUTH_PORT: Joi.number().required(),
      DATABASE_URL: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION: Joi.number().required(),
      JWT_EXPIRATION_STRING: Joi.string().required(),
    })}), JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => {
      const expiration = configService.get<number>('JWT_EXPIRATION');
      console.log('JWT_EXPIRATION:', expiration); // Log this value
      return ({
      secret: configService.get<string>('JWT_SECRET'),
      expirationString: configService.get<string>('JWT_EXPIRATION_STRING'),
      signOptions: { 
        expiresIn: expiration,
      },
    })},
    inject: [ConfigService],

  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
