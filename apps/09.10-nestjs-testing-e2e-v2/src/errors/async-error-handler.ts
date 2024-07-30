// utils/async-error-handler.ts

import { ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const asyncErrorHandler = (
  asyncFun: (...args: any[]) => Promise<any>,
) => {
  return async (...args: any[]) => {
    try {
      return await asyncFun(...args);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  };
};
