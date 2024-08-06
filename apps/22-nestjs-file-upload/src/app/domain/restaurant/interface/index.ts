import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user ? req.user : null;
});
export const UserData = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    // ACCESSING PROP DIRECTLY
    return data ? user?.[data] : user;
  },
);

import { Logger } from '@nestjs/common';

export function LogExecutionTime(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      const result = await originalMethod.apply(this, args);
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      Logger.log(
        `Method ${propertyKey} execution time: ${executionTime}ms`,
        target.constructor.name,
      );
      return result;
    };
    return descriptor;
  };
}

export interface UserMetaData {
  auth0_id: string;
  email: string;
  roles: string[];
}
