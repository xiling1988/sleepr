import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { TokenPayload } from '../interfaces/jwt-payload.interface';
import { GetUserDto } from "../users/dto";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private readonly usersService: UsersService) {
        console.log('STRATEGY LOG')
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    console.log('Cookies:', request?.cookies);
                    console.log('Headers:', request?.headers);
                    const token = request?.cookies?.Authentication || request?.headers?.authorization;
                    console.log('Extracted Token:', token);
                    
                    return token || null; // Return null if no token is found.
                }
              ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(payload) {
        console.log('Current Time:', Math.floor(Date.now() / 1000)); // Current time in seconds
        console.log('Token Payload:', payload);
        return this.usersService.getUser({id: payload.userId});  
    }
}