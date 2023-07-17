import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { CreateUserDto, UserQueryDto } from './user.dto';
import { UserDaoService } from './user.dao.service';
import { AuthService } from '../auth/auth.service';
import { MyLoggerService } from '@dev/logger';
import { HTTP_CLIENT_TOKEN, HttpClientService } from '@dev/http';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @Inject(HTTP_CLIENT_TOKEN)
    private readonly apiService: HttpClientService,
    private readonly logger: MyLoggerService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly userDaoService: UserDaoService,
    @InjectRepository(UsersEntity) private userRepo: Repository<UsersEntity>,
  ) {}
  async fetchUsers(data: UserQueryDto) {
    try {
      throw new ForbiddenException();
      return await this.userRepo.find({});
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async createUser(body: CreateUserDto) {
    return await this.userRepo.save(body);
  }
}
