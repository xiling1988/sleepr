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
                // setting the request to any, as the request COULD come from express but also from a microservice via the MessagePattern(TCP call.)
                (request: any) => {
                    // Extract the token from the request.
                    // If the request is from a microservice, the token will not be in the cookies but in the Authentication header.
                    // So we write a condition to check if the token is in the cookies, if not, we check the headers.
                    const token = request?.cookies?.Authentication || request?.Authentication;
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