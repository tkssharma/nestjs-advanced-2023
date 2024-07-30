import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { asyncErrorHandler } from '../errors/async-error-handler';
import { PasswordHash } from './hash';
import { TokenService } from './token';
import { Tokens } from './type';
import { RtTokenService } from './hash/rt-hash.service';
import { ConfigId } from '../types';

@Injectable()
export class AuthService {
  /**Singup - Local*/
  signupLocal = asyncErrorHandler(async (dto: AuthDto): Promise<Tokens> => {
    const hash = await PasswordHash.hashData(dto.password);
    //user created
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    //token created and returned
    const tokens = await this.tokenService.getTokens(user.id, user.email);
    //refresh token hash updated in the database
    await this.rtTokenService.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  });

  /**Singin - Local*/
  signinLocal = asyncErrorHandler(async (dto: AuthDto): Promise<Tokens> => {
    //find user
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //return error if user not found
    if (!user) {
      throw new NotFoundException('User not found');
    }
    //verify password
    const passwordMatches = await PasswordHash.verifyPassword(
      user.hash,
      dto.password,
    );

    //return error if password does not match
    if (!passwordMatches)
      throw new ForbiddenException('Password does not match');

    //token created and returned
    const tokens = await this.tokenService.getTokens(user.id, user.email);
    //refresh token hash updated in the database
    await this.rtTokenService.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  });

  /**Logout Local*/
  signoutLocal = asyncErrorHandler(
    async (userId: ConfigId): Promise<boolean> => {
      // The 'updateMany' method is used instead of 'update' because 'update' only updates the first record it finds that matches the criteria.
      // In this case, if there are multiple records with the same 'userId' and a non-null 'refreshTokenHash', 'update' would only update one of them.
      // By using 'updateMany', we ensure that all matching records are updated, not just the first one found.
      // If the user clicks the logout button multiple times, the 'updateMany' function will still execute without errors,
      // but it won't change anything after the first click because the 'refreshTokenHash' is already null.
      await this.prisma.user.updateMany({
        where: {
          id: userId,
          refreshTokenHash: {
            not: null,
          },
        },
        data: {
          refreshTokenHash: null,
        },
      });
      return true;
    },
  );

  /**Refresh Token*/
  refreshToken = asyncErrorHandler(
    async (userId: ConfigId, rt: string): Promise<Tokens> => {
      //find user by id
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      //return error if user not found or refresh token hash is null
      if (!user || !user.refreshTokenHash)
        throw new ForbiddenException(
          'User not found or refresh token hash is null',
        );

      //verify refresh token
      const rtMatches = await PasswordHash.verifyPassword(
        user.refreshTokenHash,
        rt,
      );

      //return error if refresh token does not match
      if (!rtMatches)
        throw new ForbiddenException('Refresh token does not match');

      //token created
      const tokens = await this.tokenService.getTokens(user.id, user.email);

      //refresh token hash updated in the database
      await this.rtTokenService.updateRtHash(user.id, tokens.refresh_token);

      //return tokens
      return tokens;
    },
  );

  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
    private rtTokenService: RtTokenService,
  ) {}
}
