import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Response } from 'express';
import AuthService from './auth-service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authorizationService: AuthService) {}

  public async use(req: any, _: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException(
        { message: 'MISSING_AUTH_HEADER' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const { user_id } = await this.authorizationService.init(authorization);
    req.user = { user_id };
    next();
  }
}
