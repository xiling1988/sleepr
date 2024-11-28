import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import { TokenPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

  async login(user: User , response: Response) {
    // console.log('Response BEFORE modifying: ', response);
    const tokenPayload : TokenPayload = { userId: user.id };  

    const expires = new Date();
    console.log('FRESH EXPIRES', new Date(expires.getTime()).toISOString());
    const expirationInSeconds = +this.configService.get<number>('JWT_EXPIRATION');
    console.log('JWT_EXPIRATION (seconds):', expirationInSeconds);
    expires.setSeconds(expires.getSeconds() + expirationInSeconds);
    console.log('NEW EXPIRES', new Date(expires.getTime()).toISOString());
    const token = this.jwtService.sign(tokenPayload, { expiresIn: this.configService.get<string>('JWT_EXPIRATION_STRING') });  

    console.log('Generated Token:', token);
    console.log('Decoded Token:', this.jwtService.decode(token));
    console.log('LOGIN JWT_EXPIRATION:', this.configService.get<number>('JWT_EXPIRATION'));

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
  });
}
  getHello(): string {
    return 'Hello World!';
  }
}
