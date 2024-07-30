import { Injectable } from '@nestjs/common';
import { asyncErrorHandler } from '../../errors/async-error-handler';
import { PrismaService } from '../../prisma/prisma.service';
import { PasswordHash } from './hash.service';
import { ConfigId } from '../../types';

@Injectable()
export class RtTokenService {
  updateRtHash = asyncErrorHandler(
    async (userId: ConfigId, rt: string): Promise<void> => {
      const hash = await PasswordHash.hashRefreshToken(rt);
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshTokenHash: hash,
        },
      });
    },
  );

  constructor(private prisma: PrismaService) {}
}
