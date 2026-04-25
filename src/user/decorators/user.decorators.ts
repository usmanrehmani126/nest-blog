import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const CustomUserDecorator = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user) {
    return null;
  }
  if (data) {
    return user[data];
  }
  return user;
});
