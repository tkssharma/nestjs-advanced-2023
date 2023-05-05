// Package.
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Response } from 'express';

export const MISSING_AUTH_HEADER = 'Missing Authorization Header';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  public async use(req: any, res: Response, next: NextFunction) {
    const tag = 'AuthMiddleware';
    console.log(tag);
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException(
        { message: MISSING_AUTH_HEADER },
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}
