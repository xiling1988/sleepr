import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";


export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly authService: AuthService) {
    super();
  }
}