import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDaoService } from './user.dao.service';
import { AuthModule } from '../auth/auth.module';
import { AppLoggerModule } from '@dev/logger';

const UserDaoMockService = {};

@Module({
  imports: [
    AppLoggerModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserDaoService],
  exports: [UserService, UserDaoService],
})
export class UserModule {}
