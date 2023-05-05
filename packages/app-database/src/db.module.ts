import { Module } from "@nestjs/common";
import { DbConfig } from "./db.interface";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from "@dev/config";
import { ConfigService } from "@dev/config";
import { ConfigDatabase } from "@dev/config";

@Module({})
export class DBModule {
  private static getConnectionOptions(
    config: ConfigService,
    dbConfig: DbConfig
  ): TypeOrmModuleOptions {
    const dbData = config.get().db;
    if (!dbData) {
      throw Error("");
    }
    const connectionOptions = this.getConnectionOptionsPostgres(dbData);
    return {
      ...connectionOptions,
      entities: dbConfig.entities,
      synchronize: true,
      logging: true,
    };
  }

  private static getConnectionOptionsPostgres(
    dbData: ConfigDatabase
  ): TypeOrmModuleOptions {
    return {
      type: "postgres",
      url: dbData.url,
      keepConnectionAlive: true,
      ssl:
        process.env.NODE_ENV !== "local" && process.env.NODE_ENV !== "test"
          ? { rejectUnauthorized: false }
          : false,
    };
  }

  public static forRoot(dbConfig: DbConfig) {
    return {
      module: DBModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return DBModule.getConnectionOptions(configService, dbConfig);
          },
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
