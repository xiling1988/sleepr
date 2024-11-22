import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

  async login(user: User , response: Response) {
    const tokenPayload = { userId: user.id.toString() };

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION'));

    const token = this.jwtService.sign(tokenPayload, { expiresIn: this.configService.get<number>('JWT_EXPIRATION') });

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
  });
}
  getHello(): string {
    return 'Hello World!';
  }
}
