import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
