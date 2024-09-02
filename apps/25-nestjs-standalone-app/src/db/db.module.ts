import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigDBData } from '../config/config.interface';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Logger } from '../logger/logger';
import { AppLoggerModule } from '../logger/logger.module';
import { DbConfigError } from './db.errors';
import { DbConfig } from './db.interface';
import { DatabaseService } from './db.service';
@Module({})
export class DbModule {
  private static getConnectionOptions(
    config: ConfigService,
    dbconfig: DbConfig,
  ): TypeOrmModuleOptions {
    const dbdata = config.get().db;
    if (!dbdata) {
      throw new DbConfigError('Database config is missing');
    }
    const connectionOptions = DbModule.getConnectionOptionsPostgres(dbdata);
    return {
      ...connectionOptions,
      entities: dbconfig.entities,
      synchronize: false,
      logging: true,
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

  public static forRoot(dbconfig: DbConfig): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule, AppLoggerModule],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          useFactory: (configService: ConfigService, logger: Logger) =>
            DbModule.getConnectionOptions(configService, dbconfig),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [DatabaseService],
      exports: [DatabaseService],
    };
  }
}
