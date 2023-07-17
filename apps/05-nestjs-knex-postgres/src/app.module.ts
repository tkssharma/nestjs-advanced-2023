import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { DomainModule } from './app/module/entity.module';
// import { DomainModule } from './app/module/entity.module';
import { ConfigModule } from './config/config.module';
import { AppLoggerModule } from './logger/logger.module';
@Module({
  imports: [ConfigModule, AppLoggerModule, DomainModule],
  controllers: [AppController],
})
export class AppModule {}
