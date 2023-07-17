import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  KnexModule,
  KnexModuleAsyncOptions,
  KnexModuleOptions,
} from 'nest-knexjs';

import { ConfigDBData } from '../config/config.interface';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Logger } from '../logger/logger';
import { AppLoggerModule } from '../logger/logger.module';
import { DbConfigError } from './db.errors';
import { DbConfig } from './db.interface';
import knexfile from '../../knexfile';
@Module({})
export class DbModule {
  private static getConnectionOptions(
    config: ConfigService,
  ): KnexModuleOptions {
    //@ts-ignore
    const configOptions = knexfile[process.env.NODE_ENV || 'develop'];
    return {
      name: process.env.NODE_ENV || 'develop',
      config: configOptions,
      retryAttempts: 4,
      retryDelay: 20000,
    };
  }

  private static getConnectionOptionsPostgres(
    dbdata: ConfigDBData,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: dbdata.url,
      keepConnectionAlive: true,
      ssl:
        process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test'
          ? { rejectUnauthorized: false }
          : false,
    };
  }

  public static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [
        KnexModule.forRootAsync({
          imports: [ConfigModule, AppLoggerModule],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          useFactory: (configService: ConfigService, logger: Logger) =>
            DbModule.getConnectionOptions(configService),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
