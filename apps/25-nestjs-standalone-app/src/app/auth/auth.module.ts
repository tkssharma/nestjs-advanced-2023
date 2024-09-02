import { Module, Type } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigModule } from '../../config/config.module';
import AuthService from './auth-service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
