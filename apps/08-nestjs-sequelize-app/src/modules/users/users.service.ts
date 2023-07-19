import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userModel.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userModel.findOne<User>({ where: { id } });
  }
}
