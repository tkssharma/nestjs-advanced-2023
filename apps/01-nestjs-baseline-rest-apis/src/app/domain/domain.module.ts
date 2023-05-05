import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DBModule } from '@dev/database';
import { UserModule } from './users/user.module';
import { UsersEntity } from './users/user.entity';
import { UserController } from './users/user.controller';
import { METHODS } from 'http';
import { RouteInfo } from '@nestjs/common/interfaces';
import { AuthMiddleware } from '../core/middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { AppLoggerMiddleware } from '../core/middleware/app-log.middleware';
import { AppLoggerModule, LoggerMiddleware } from '@dev/logger';
import { EmailModule } from '@dev/email';
import { ConfigModule, ConfigService } from '@dev/config';
import { HttpClientModule } from '@dev/http';
export const GLOBAL_PREFIX = '/api/v1';

/*
useClass - to get a private instance of the options provider.
useFactory - to use a function as the options provider.
useExisting - to re-use an existing (shared, SINGLETON) service as the options provider.
*/
@Module({
  imports: [
    HttpClientModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiUrl: config.get().externalApi.apiUrl,
        apiKey: config.get().externalApi.apiKey,
      }),
    }),
    EmailModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          service: config.get().email.service_name,
          user: config.get().email.username,
          pass: config.get().email.password,
        };
      },
    }),
    AppLoggerModule,
    UserModule,
    AuthModule,
    DBModule.forRoot({
      entities: [UsersEntity],
    }),
  ],
  providers: [],
  controllers: [],
})
export class DomainModule implements NestModule {
  public authRoutes: Array<RouteInfo> = [
    {
      path: `*`,
      method: RequestMethod.ALL,
    },
  ];

  public publicRoutes: Array<RouteInfo> = [
    {
      path: `${GLOBAL_PREFIX}/health`,
      method: RequestMethod.GET,
    },
  ];

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...this.publicRoutes)
      .forRoutes(...this.authRoutes);

    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
