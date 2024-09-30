import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { DomainModule } from './domain/domain.module';
import { AuthMiddleware } from './auth/auth-middleware';

@Module({
  imports: [ConfigModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
