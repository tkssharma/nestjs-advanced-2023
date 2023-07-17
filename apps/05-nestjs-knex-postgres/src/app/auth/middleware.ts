import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Response } from 'express';
import { MISSING_AUTH_HEADER } from '../app.constats';
import { RequestModel } from './user';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  public async use(req: RequestModel, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException(
        { message: MISSING_AUTH_HEADER },
        HttpStatus.BAD_REQUEST,
      );
    }
    const { user_id, roles } = { user_id: '1', roles: [] };
    req.user = { user_id, roles };
    next();
  }
}
