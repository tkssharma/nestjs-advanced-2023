import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as JwksClient from 'jwks-rsa';
import {
  JKWS_CACHE,
  JKWS_RATE_LIMIT,
  JKWS_REQUESTS_PER_MINUTE,
} from '../app.constants';
import * as util from 'util';

@Injectable()
export default class AuthService {
  async init(authToken: string) {
    const tokenString = this.getToken(authToken);
    const decode = this.decodeToken(tokenString);
    // https://tkssharma.auth0.com/.well-known/jwks.json
    const client = JwksClient({
      jwksUri: 'https://tkssharma.auth0.com/.well-known/jwks.json',
      rateLimit: JKWS_RATE_LIMIT,
      cache: JKWS_CACHE,
      jwksRequestsPerMinute: JKWS_REQUESTS_PER_MINUTE,
    });
    const getSignKey = util.promisify(client.getSigningKey);
    try {
      const key: any = await getSignKey(decode.header.kid);
      const signingKey = key.publicKey || key.rsaPublicKey;
      return this.verify(tokenString, signingKey, decode);
    } catch (err) {
      throw new HttpException(
        { message: 'UNAUTHORIZED' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  private async verify(tokenString: string, signingKey: string, decoded: any) {
    try {
      jwt.verify(tokenString, signingKey);
      const { payload } = decoded;
      const metaLink = 'https://tkssharma.com';

      // if all good that means token is valid
      // return decode token
      // exatrct data from here
      return {
        roles: payload['https://tkssharma.com/roles'],
        email: payload.email,
        auth0_id: payload.sub,
      };
    } catch (err) {
      throw new HttpException(
        { message: 'UNAUTHORIZED' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private decodeToken(tokenString: string) {
    const decoded = jwt.decode(tokenString, { complete: true, json: true });
    if (!decoded || !decoded.header || !decoded.header.kid) {
      throw new HttpException(
        { message: 'INVALID_AUTH_TOKEN' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return decoded;
  }
  // <Bearer> tokenstring
  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new HttpException(
        { message: 'INVALID_BEARER_TOKEN' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return match[1];
  }
}
