import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDto } from "../dto";

const getCurrentUserByContext = (context: ExecutionContext) : UserDto => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)

)
