import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";


export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(username, password);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}