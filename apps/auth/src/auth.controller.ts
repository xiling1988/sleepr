import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // This line let's 'validate' the user before reaching the route handler function: login. 
  // It also adds the user object (returned from the validate function) to the request object (req.user).
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    // As we have the user object in the request object, the @CurrentUser decorator extracts the user from the request object.
    // This saves us from writing req.user in the route handler function, and can be used in other functions as well,
    //  where having the user object as user (and not req.user) is handy.
    @CurrentUser() user: User,
    // setting the passthrough option to true, allows us to access and modify the response object (eg setting a cookie as we do)
    // in the route handler function (authService.login). There, we don't need to call the express response.send() as the
    // returning of the response is handled by NestJS. The response object is passed to the function as an argument by reference,
    // which allows NestJS to keep track of the response object. After the route handler function is executed, NestJS will send the response.
    @Res({ passthrough: true }) response: Response) {
    // calling the login method of the authService, which generates a JWT token and sets it as a cookie in the response object.
    await this.authService.login(user, response);
    // calling the response.send(user) method here is not really needed (matter of choice).
    // We could as well just return the user object here and let NestJS handle the sending of the response.
    // In fact I'm going to leave it like that as it looks cleaner. Bottom line is that we can do both.
    return user;
  }


  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
