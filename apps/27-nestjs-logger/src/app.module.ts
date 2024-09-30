import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './app/domain/domain.module';
// import { MyLogger } from './app/shared/logger.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [DomainModule, TerminusModule, LoggerModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}