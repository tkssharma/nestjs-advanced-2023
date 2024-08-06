import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (_data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // if route is protected, there is a user set in auth.middleware
    if (req.user) {
      return req.user;
    }
    return null;
  },
);

export interface UserMetaData {
  uid: string;
  email: string;
}
