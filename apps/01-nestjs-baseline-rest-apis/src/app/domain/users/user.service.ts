import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UsersEntity } from './user.entity';
import { CreateUserDto } from './user.dto';
import { UserDaoService } from './user.dao.service';
import { AuthService } from '../auth/auth.service';
import { MyLoggerService } from '@dev/logger';
import { HTTP_CLIENT_TOKEN, HttpClientService } from '@dev/http';

@Injectable()
export class UserService {
  constructor(
    @Inject(HTTP_CLIENT_TOKEN)
    private readonly apiService: HttpClientService,
    private readonly logger: MyLoggerService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly userDaoService: UserDaoService,
    @InjectRepository(UsersEntity) private userRepo: Repository<UsersEntity>,
  ) {}
  async fetchUsers() {
    try {
      this.logger.log(`handling fetchUsers`);
      try {
        await this.apiService.fetch('get', {});
      } catch (err) {
        console.log(err);
      }
      return await this.userRepo.find({});
    } catch (err) {
      this.logger.error(err);
    }
  }

  async createUser(body: CreateUserDto) {
    return await this.userRepo.save(body);
  }
}
