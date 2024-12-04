import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@prisma/client";

const getCurrentUserByContext = (context: ExecutionContext) : User => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)

)
