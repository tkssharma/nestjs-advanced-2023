import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserNotFoundException } from './exceptions/userNotFound.exception';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async create(user: CreateUserDto) {
    const address = user.address;
    return this.prismaService.user.create({
      data: {
        ...user,
        address: {
          create: address,
        },
      },
      include: {
        address: true,
      },
    });
  }
}
