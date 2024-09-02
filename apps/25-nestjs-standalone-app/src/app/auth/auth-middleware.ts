import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Response } from 'express';
import AuthService from './auth-service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authorizationService: AuthService) {}

  public async use(req: any, _: Response, next: NextFunction) {
    const { authorization } = req.headers;

    /* if (!authorization) {
      throw new HttpException(
        { message: 'MISSING_AUTH_HEADER' },
        HttpStatus.BAD_REQUEST,
      );
    } */
    // we will add this logic
    /*
    const { roles, email, auth0_id } = await this.authorizationService.init(
      authorization,
    ); */

    const { roles, email, auth0_id } = {
      roles: ['admin'],
      email: 'test@gmail.com',
      auth0_id: '23424',
    };

    // if all good we will get data
    // set user session
    //console.log(roles, email, auth0_id);
    req.user = { roles, email, auth0_id };
    next();
  }
}
